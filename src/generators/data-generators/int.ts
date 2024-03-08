import { ReflectMetadataType } from "@t/reflect-data";
import _ from "lodash";
import { isPrimeNumber } from "@utils/check-prime";

export function generateInt<T>(
    obj: T,
    key: string | number | symbol,
    reflectData: ReflectMetadataType["Number"]
) {
    Object.defineProperty<T>(obj, key, {
        ...Object.getOwnPropertyDescriptor(obj, key),
        value: generatorNumber(reflectData)
    });
}

export function generatorNumber(
    reflectData: ReflectMetadataType["Number"]
): number {
    let res = _.random(reflectData.min, reflectData.max, false);

    if (reflectData.is.includes("odd")) {
        if (res % 2 === 0) res++;
    }

    if (reflectData.is.includes("even")) if (res % 2 === 1) res++;
    if (reflectData.is.includes("prime")) while (!isPrimeNumber(res)) res++;

    return res;
}
