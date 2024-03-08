import getNumberOfVariable from "@utils/validator";
import _ from "lodash";
import { ReflectMetadataType } from "@t/reflect-data";
import { TestCase } from "@classes/input-test-case";
import { generate } from "random-words";

export function generateWordArray<T extends TestCase>(
    obj: T,
    key: string | number | symbol,
    reflectData: ReflectMetadataType["WordArray"]
) {
    let elements_total = reflectData.element;
    elements_total = getNumberOfVariable(elements_total, obj);
    const data = generate({
        minLength: reflectData.min,
        maxLength: reflectData.max,
        exactly: elements_total
    }) as string[];

    Object.defineProperty<T>(obj, key, {
        ...Object.getOwnPropertyDescriptor(obj, key),
        value: data
    });
}
