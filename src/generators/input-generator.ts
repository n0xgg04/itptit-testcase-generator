import GENERATE_VALUE_TYPE from "@enums/datatypes";
import { TestCase } from "@classes/input-test-case";
import _ from "lodash";
import getNumberOfVariable from "@utils/validator";
import formatOutputValue from "@utils/output-generator-by-datatype";
import Effect from "@enums/effect";
import { NumberDataType, NumberArrayReflectDataType } from "@t/reflect-data";
import { MetadataKeyOf, ReflectMeta } from "@/metadata";
import metadataKey from "@/constants/metadata-key";
import generator from "@/generators/data-generators";

type ReflectData = NumberDataType | NumberArrayReflectDataType;

/**
 * Generate function
 * @param template - Class Template
 */
export function generate(template: new (...args: []) => TestCase): string {
    const testCaseInstance = new template();
    const resultTemplate = testCaseInstance.template;
    const variables = Object.getOwnPropertyNames(testCaseInstance);
    variables.forEach((v) => {
        if (ReflectMeta.existsDataType(testCaseInstance, v)) {
            const reflectData = ReflectMeta.getDataTypeGenerate(
                testCaseInstance,
                v
            );

            //TODO: Add more here
            switch (reflectData.type) {
                case GENERATE_VALUE_TYPE.Number:
                    generator.generateInt(testCaseInstance, v, reflectData);
                    break;

                case GENERATE_VALUE_TYPE.NumberArray:
                    generator.generateNumberArray(
                        testCaseInstance,
                        v,
                        reflectData
                    );
                    break;

                case GENERATE_VALUE_TYPE.Word:
                    generator.generateWord(testCaseInstance, v, reflectData);
                    break;

                case GENERATE_VALUE_TYPE.WordArray:
                    generator.generateWordArray(
                        testCaseInstance,
                        v,
                        reflectData
                    );
                    break;

                case GENERATE_VALUE_TYPE.FakeName:
                    generator.generateFakeName(
                        testCaseInstance,
                        v,
                        reflectData
                    );
                    break;

                case GENERATE_VALUE_TYPE.UseLogic:
                    generator.generateByLogicFunction(
                        testCaseInstance,
                        v,
                        reflectData
                    );
            }
        }
    });

    let result = resultTemplate;

    //! Read value from props
    variables.forEach((v: keyof typeof testCaseInstance) => {
        if (!ReflectMeta.existsDataType(testCaseInstance, v)) return;

        result = result.replaceAll(
            "$" + v,
            _.trimStart(
                formatOutputValue(
                    testCaseInstance[v],
                    ReflectMeta.getDataTypeGenerate(testCaseInstance, v).type
                )
            )
        );
    });

    //! Read effects
    const effectMethod = Reflect.hasMetadata("effect", testCaseInstance)
        ? (Reflect.getMetadata("effect", testCaseInstance) as Array<string>)
        : [];

    effectMethod.forEach((v) => {
        const effectList = Reflect.getMetadata(
            `effect:${v}`,
            testCaseInstance
        ) as Array<Effect>;
        if (effectList.includes(Effect.Loop)) {
            let res = "";
            const loopTime = getNumberOfVariable(
                Reflect.getMetadata(`effect:${v}:time`, testCaseInstance),
                testCaseInstance
            );

            _.times(loopTime).map((i) => {
                const append = (
                    testCaseInstance[
                        v as keyof typeof testCaseInstance
                    ] as unknown as Function
                )();
                if (i != 0) res += `\n`;
                res += `${append}`;
            });
            result = result.replaceAll("$" + v, res);
        }
    });

    return _.trim(result);
}
