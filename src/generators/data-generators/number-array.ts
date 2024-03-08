import getNumberOfVariable from "@utils/validator";
import _ from "lodash";
import { ReflectMetadataType } from "@t/reflect-data";
import { TestCase } from "@classes/input-test-case";

export function generateNumberArray<T extends TestCase>(
    obj: T,
    key: string | number | symbol,
    reflectData: ReflectMetadataType["NumberArray"]
) {
    let elements_total = reflectData.element;
    elements_total = getNumberOfVariable(elements_total, obj);
    const data: Array<number> = _.times(elements_total).map(() =>
        _.random(reflectData.min, reflectData.max, false)
    );
    Object.defineProperty<T>(obj, key, {
        ...Object.getOwnPropertyDescriptor(obj, key),
        value: data
    });
}
