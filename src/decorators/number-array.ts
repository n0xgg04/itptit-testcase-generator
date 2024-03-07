import DataTypes from "../enums/datatypes";
import { NumberArrayReflectDataType } from "@t/reflect-data";

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
    return function <T extends Object, P extends keyof T>(
        target: T,
        propertyKey: P
    ) {
        Reflect.defineMetadata(
            `datatype:${String(propertyKey)}`,
            <NumberArrayReflectDataType>{
                type: DataTypes.NumberArray,
                min,
                max,
                element
            },
            target
        );
    };
}
