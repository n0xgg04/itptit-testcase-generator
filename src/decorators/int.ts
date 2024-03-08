import "reflect-metadata";
import GENERATE_VALUE_TYPE from "../enums/datatypes";
import { NumberValueRequiredType } from "@t/reflect-data";
import { ReflectMeta } from "@/metadata";

/**
 * Create a number variable like int, long long
 * @param min - Minimum of value
 * @param max - Maximum of value
 * @param is - Value must be odd/even/prime number
 * @constructor
 */

export function Int(
    min: number,
    max: number,
    is: NumberValueRequiredType[] = []
) {
    return function <T extends Object, P extends keyof T & string>(
        target: T,
        propertyKey: P
    ) {
        ReflectMeta.setDataTypeGenerate(
            GENERATE_VALUE_TYPE.Number,
            propertyKey,
            {
                min,
                max,
                is
            },
            target
        );
    };
}
