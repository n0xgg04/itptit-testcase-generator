import DataTypes from "../enums/datatypes";
import { NumberArrayReflectDataType } from "@t/reflect-data";

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
