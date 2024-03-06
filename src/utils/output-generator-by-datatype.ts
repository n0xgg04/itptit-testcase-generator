import DataTypes from "../enums/datatypes";

function getOutputOf(
    data: number | Array<unknown> | string,
    type: DataTypes
): string {
    switch (type) {
        case DataTypes.Int:
            return data.toString();
        case DataTypes.NumberArray:
            return data.toString().replaceAll(",", " ");

        case DataTypes.Loop:
            return "";
    }
}

export default getOutputOf;
