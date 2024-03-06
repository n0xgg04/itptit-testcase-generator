import DataTypes from "@enums/datatypes";
import { TestCase } from "@classes/input-test-case";
import _ from "lodash";
import getNumberOfVariable from "@utils/validator";
import getOutputOf from "@utils/output-generator-by-datatype";
import Effect from "@enums/effect";
import {
    IntReflectDataType,
    NumberArrayReflectDataType
} from "@t/reflect-data";

type ReflectData = IntReflectDataType | NumberArrayReflectDataType;

/**
 * Generate function
 * @param template - Class Template
 */
export function generate(template: new (...args: []) => TestCase): string {
    const testCaseInstance = new template();
    const resultTemplate = testCaseInstance.template;
    const variables = Object.getOwnPropertyNames(testCaseInstance);
    variables.forEach((v) => {
        const reflectData: ReflectData = Reflect.getMetadata(
            `datatype:${v}`,
            testCaseInstance
        );
        const propsDes = Object.getOwnPropertyDescriptor(testCaseInstance, v);
        if (Reflect.hasMetadata(`datatype:${v}`, testCaseInstance)) {
            switch (reflectData.type) {
                case DataTypes.Int:
                    Object.defineProperty(testCaseInstance, v, {
                        ...propsDes,
                        value: _.random(reflectData.min, reflectData.max, false)
                    });
                    break;

                case DataTypes.NumberArray:
                    let elements_total = reflectData.element;
                    elements_total = getNumberOfVariable(
                        elements_total,
                        testCaseInstance
                    );
                    const data: Array<number> = _.times(elements_total).map(
                        () => _.random(reflectData.min, reflectData.max, false)
                    );
                    Object.defineProperty(testCaseInstance, v, {
                        ...propsDes,
                        value: data
                    });

                    break;
            }
        }
    });

    let result = resultTemplate;
    //! Render
    variables.forEach((v) => {
        if (!Reflect.hasMetadata(`datatype:${v}`, testCaseInstance)) return;
        result = result.replaceAll(
            "$" + v,
            _.trimStart(
                getOutputOf(
                    testCaseInstance[v as keyof typeof testCaseInstance],
                    (
                        Reflect.getMetadata(
                            `datatype:${v}`,
                            testCaseInstance
                        ) as ReflectData
                    ).type
                )
            )
        );
    });

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
