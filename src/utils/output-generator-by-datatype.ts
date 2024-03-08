import GENERATE_VALUE_TYPE from "../enums/datatypes";
function formatOutputValue(
    data: number | Array<unknown> | string,
    type: GENERATE_VALUE_TYPE
): string {
    switch (type) {
        case GENERATE_VALUE_TYPE.Number:
            return data.toString();
        case GENERATE_VALUE_TYPE.NumberArray:
            return data.toString().replaceAll(",", " ");

        case GENERATE_VALUE_TYPE.WordArray:
            return data.toString().replaceAll(",", " ");

        case GENERATE_VALUE_TYPE.Loop:
            return "";
    }
    return data.toString();
}

export default formatOutputValue;
