import GENERATE_VALUE_TYPE from "@enums/datatypes";
import {
    FakeNameReflectDataType,
    NumberArrayReflectDataType,
    NumberDataType,
    ReflectDataBaseType,
    ReflectMetadataType,
    UseLogicReflectDataType,
    WordArrayReflectDataType,
    WordReflectDataType
} from "@t/reflect-data";
import metadataKey, { MetaDataKeyType } from "@/constants/metadata-key";
import { TestCase } from "@classes/input-test-case";

function setDataTypeGenerate<
    T extends GENERATE_VALUE_TYPE & (string | number),
    O extends Object,
    Q extends T extends GENERATE_VALUE_TYPE.Number
        ? ReflectMetadataType["Number"]
        : T extends GENERATE_VALUE_TYPE.NumberArray
          ? ReflectMetadataType["NumberArray"]
          : T extends GENERATE_VALUE_TYPE.Word
            ? ReflectMetadataType["Word"]
            : T extends GENERATE_VALUE_TYPE.WordArray
              ? ReflectMetadataType["WordArray"]
              : T extends GENERATE_VALUE_TYPE.UseLogic
                ? ReflectMetadataType["UseLogic"]
                : never
>(type: T, propertyKey: string, data: Omit<Q, "type">, target: O) {
    console.log(
        MetadataKeyOf(metadataKey.generateValueTypePrefix, propertyKey)
    );
    Reflect.defineMetadata(
        MetadataKeyOf(metadataKey.generateValueTypePrefix, propertyKey),
        <typeof data & { type: GENERATE_VALUE_TYPE }>{
            ...data,
            type
        },
        target
    );
}

function getDataTypeGenerate(target: TestCase, propertyKey: string) {
    const metaDataKey = MetadataKeyOf(
        metadataKey.generateValueTypePrefix,
        propertyKey
    );
    if (!Reflect.hasMetadata(metaDataKey, target)) {
        throw new Error(metaDataKey + " not found in Reflect metadata.");
    }
    const res: ReflectDataBaseType = Reflect.getMetadata(metaDataKey, target);
    switch (res.type) {
        case GENERATE_VALUE_TYPE.Number:
            return res as NumberDataType;

        case GENERATE_VALUE_TYPE.NumberArray:
            return res as NumberArrayReflectDataType;

        case GENERATE_VALUE_TYPE.Word:
            return res as WordReflectDataType;

        case GENERATE_VALUE_TYPE.WordArray:
            return res as WordArrayReflectDataType;

        case GENERATE_VALUE_TYPE.FakeName:
            return res as FakeNameReflectDataType;

        case GENERATE_VALUE_TYPE.UseLogic:
            return res as UseLogicReflectDataType;
    }
    return null;
}

export function MetadataKeyOf(
    metadataK: MetaDataKeyType,
    propertyKey: string | number | symbol
): string {
    if (metadataK == metadataKey.generateValueTypePrefix) {
        return [metadataK, propertyKey].join(":");
    }
    return null;
}

export function existsDataType(target: TestCase, propertyKey: string) {
    return Reflect.hasMetadata(
        MetadataKeyOf(metadataKey.generateValueTypePrefix, propertyKey),
        target
    );
}

export const ReflectMeta = {
    setDataTypeGenerate,
    getDataTypeGenerate,
    existsDataType
};
