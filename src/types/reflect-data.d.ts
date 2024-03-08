import GENERATE_VALUE_TYPE from "../enums/datatypes";
type NumberValueRequiredType = "odd" | "even" | "prime";

interface ReflectDataBaseType {
    type: GENERATE_VALUE_TYPE;
}

export interface NumberDataType extends ReflectDataBaseType {
    type: GENERATE_VALUE_TYPE.Number;
    min: number;
    max: number;
    is: NumberValueRequiredType[];
}

export type ReflectMetadataType = {
    Number: NumberDataType;
    NumberArray: NumberArrayReflectDataType;
    Word: WordReflectDataType;
    WordArray: WordArrayReflectDataType;
    FakeName: FakeNameReflectDataType;
    UseLogic: UseLogicReflectDataType;
};

export type UseLogicFunction = (
    ...args: (string | number | Array<string | number>)[]
) => string | number;

export interface UseLogicReflectDataType extends ReflectDataBaseType {
    type: GENERATE_VALUE_TYPE.UseLogic;
    LogicFn: UseLogicFunction;
    args: Array<string | number | Array<string | number>>;
}

export interface NumberArrayReflectDataType extends ReflectDataBaseType {
    type: GENERATE_VALUE_TYPE.NumberArray;
    min: number;
    max: number;
    element: number | string;
}

export interface WordReflectDataType extends ReflectDataBaseType {
    type: GENERATE_VALUE_TYPE.Word;
    min: number;
    max: number;
}

export interface WordArrayReflectDataType extends ReflectDataBaseType {
    type: GENERATE_VALUE_TYPE.WordArray;
    min: number;
    max: number;
    element: number | string;
}

export interface FakeNameReflectDataType extends ReflectDataBaseType {
    type: GENERATE_VALUE_TYPE.FakeName;
}

export interface LoopReflectDataType extends ReflectDataBaseType {
    type: GENERATE_VALUE_TYPE.Loop;
}
