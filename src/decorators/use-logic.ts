import { ReflectMeta } from "@/metadata";
import GENERATE_VALUE_TYPE from "@enums/datatypes";
import { UseLogicFunction } from "@t/reflect-data";

export function UseLogic(
    fn: UseLogicFunction,
    args: (number | string | Array<number | string>)[]
) {
    return function <T extends Object>(target: T, propertyKey: string) {
        ReflectMeta.setDataTypeGenerate(
            GENERATE_VALUE_TYPE.UseLogic,
            propertyKey,
            {
                LogicFn: fn,
                args: args
            },
            target
        );
    };
}
