import { fakeName } from "@/fake/name.list";
import { ReflectMetadataType } from "@t/reflect-data";
import _ from "lodash";

export function generateFakeName<T>(
    obj: T,
    key: string | number | symbol,
    reflectData: ReflectMetadataType["FakeName"]
) {
    Object.defineProperty<T>(obj, key, {
        ...Object.getOwnPropertyDescriptor(obj, key),
        value: fakeName[_.random(0, fakeName.length - 1)]
    });
}
