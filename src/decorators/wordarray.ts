import { ReflectMeta } from "@/metadata";
import GENERATE_VALUE_TYPE from "@enums/datatypes";

export function WordArray(element: number | string, min: number, max: number) {
    return function <T extends Object, P extends keyof T & string>(
        target: T,
        propertyKey: P
    ) {
        ReflectMeta.setDataTypeGenerate(
            GENERATE_VALUE_TYPE.WordArray,
            propertyKey,
            {
                min,
                max,
                element
            },
            target
        );
    };
}
