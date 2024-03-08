import GENERATE_VALUE_TYPE from "../enums/datatypes";
import { ReflectMeta } from "@/metadata";

/**
 * Make array of number with element which >= $min and <= max
 * @param element - Number of elements in the array
 * @param min - Minimum of elements in array
 * @param max - Maximum of elements in array
 * @constructor
 */
export function NumberArray(
    element: number | string,
    min: number,
    max: number
) {
    return function <T extends Object, P extends keyof T & string>(
        target: T,
        propertyKey: P
    ) {
        ReflectMeta.setDataTypeGenerate(
            GENERATE_VALUE_TYPE.NumberArray,
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
