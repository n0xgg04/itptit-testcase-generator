import { ReflectMeta } from "@/metadata";
import GENERATE_VALUE_TYPE from "@enums/datatypes";

export default function FakeName(target: Object, propertyKey: string) {
    ReflectMeta.setDataTypeGenerate(
        GENERATE_VALUE_TYPE.FakeName,
        propertyKey,
        {},
        target
    );
}
