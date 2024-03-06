import "reflect-metadata";
import DataTypes from "../enums/datatypes";
import { IntReflectDataType } from "@t/reflect-data";

export function Int(min: number, max: number) {
    return function <T extends Object, P extends keyof T>(
        target: T,
        propertyKey: P
    ) {
        Reflect.defineMetadata(
            `datatype:${String(propertyKey)}`,
            <IntReflectDataType>{
                type: DataTypes.Int,
                min,
                max
            },
            target
        );
    };
}
