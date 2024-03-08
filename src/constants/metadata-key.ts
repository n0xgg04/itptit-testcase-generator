const metadataKey = {
    generateValueTypePrefix: "datatype"
};

type UnionOfObject<O extends Object> = O[keyof O];

export type MetaDataKeyType = UnionOfObject<typeof metadataKey>;
export default metadataKey;
