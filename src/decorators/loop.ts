import DataTypes from "../enums/datatypes";
import Effect from "../enums/effect";
import { LoopReflectDataType } from "@t/reflect-data";

/**
 * Repeat generate a test case template
 * @param time - x times repeat
 * @constructor
 */
export function Loop<T extends Object, P extends keyof T>(
    time: number | `${string}`
) {
    return function <T extends Object, P extends keyof T>(
        target: T,
        propertyKey: P
    ) {
        const metadataKey = `effect:${propertyKey.toString()}`;

        const objEffect: Array<string> = Reflect.hasMetadata("effect", target)
            ? Reflect.getMetadata("effect", target)
            : [];

        if (!objEffect.includes(propertyKey.toString())) {
            Reflect.defineMetadata(
                "effect",
                [...objEffect, propertyKey.toString()],
                target
            );
        }

        const effectList: Array<Effect> = Reflect.hasMetadata(
            metadataKey,
            target
        )
            ? Reflect.getMetadata(metadataKey, target)
            : [];

        Reflect.defineMetadata(
            metadataKey,
            [...effectList, Effect.Loop],
            target
        );

        Reflect.defineMetadata(`${metadataKey}:time`, time, target);

        Reflect.defineMetadata(
            `datatype:${String(propertyKey)}`,
            <LoopReflectDataType>{
                type: DataTypes.Loop
            },
            target
        );
    };
}
