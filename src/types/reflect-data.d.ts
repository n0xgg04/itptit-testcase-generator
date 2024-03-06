import DataTypes from "../enums/datatypes";

interface ReflectDataBase {
    type: DataTypes;
}

export interface IntReflectDataType extends ReflectDataBase {
    type: DataTypes.Int;
    min: number;
    max: number;
}

export interface NumberArrayReflectDataType extends ReflectDataBase {
    type: DataTypes.NumberArray;
    min: number;
    max: number;
    element: number | string;
}

export interface LoopReflectDataType extends ReflectDataBase {
    type: DataTypes.Loop;
}
