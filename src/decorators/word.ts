import { ReflectMeta } from "@/metadata";
import GENERATE_VALUE_TYPE from "@enums/datatypes";

export function Word(min: number, max: number) {
    return function <T extends Object>(target: T, propertyKey: string) {
        ReflectMeta.setDataTypeGenerate(
            GENERATE_VALUE_TYPE.Word,
            propertyKey,
            {
                min,
                max
            },
            target
        );
    };
}
