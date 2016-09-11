/**
 * ICustomModel interface
 * @interface ICustomModel
 */
interface ICustomModel {
    indices: Array<number>;
    vertices: Array<number>;
    normals?: Array<number>;
    regenerateNormals?: boolean;    // TODO: Unused
    generateTangents?: boolean;    // TODO: Unused
    texCoords?: Array<number>;
};

export { ICustomModel };
