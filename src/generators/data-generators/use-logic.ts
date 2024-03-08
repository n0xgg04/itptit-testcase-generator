import { ReflectMetadataType } from "@t/reflect-data";
import getNumberOfVariable from "@utils/validator";
import { TestCase } from "@classes/input-test-case";
import { ReflectMeta } from "@/metadata";
import GENERATE_VALUE_TYPE from "@enums/datatypes";

export function generateByLogicFunction<T extends TestCase>(
    obj: T,
    key: string | number | symbol,
    reflectData: ReflectMetadataType["UseLogic"]
) {
    Object.defineProperty<T>(obj, key, {
        ...Object.getOwnPropertyDescriptor(obj, key),
        value: run(reflectData, obj)
    });
}

function run<T extends TestCase>(
    data: ReflectMetadataType["UseLogic"],
    obj: T
): string | number {
    const { LogicFn, args } = data;
    const realArgs = args.map((i) => {
        switch (typeof i) {
            case "string":
                const props = i.replaceAll("$", "");
                if (ReflectMeta.existsDataType(obj, props)) {
                    if (
                        ReflectMeta.getDataTypeGenerate(obj, props).type !==
                        GENERATE_VALUE_TYPE.Number
                    ) {
                        return obj[props];
                    }
                }
                return getNumberOfVariable(i, obj);

            case "number":
                return i;
        }
    });
    return LogicFn.apply(null, realArgs);
}
