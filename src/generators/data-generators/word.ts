import { ReflectMetadataType } from "@t/reflect-data";
import { generate as randomWord } from "random-words";

export function generateWord<T>(
    obj: T,
    key: string | number | symbol,
    reflectData: ReflectMetadataType["Word"]
) {
    Object.defineProperty<T>(obj, key, {
        ...Object.getOwnPropertyDescriptor(obj, key),
        value: generate(reflectData)
    });
}

export function generate(reflectData: ReflectMetadataType["Word"]): string {
    return randomWord({
        minLength: reflectData.min,
        maxLength: reflectData.max,
        exactly: 1
    })[0];
}
