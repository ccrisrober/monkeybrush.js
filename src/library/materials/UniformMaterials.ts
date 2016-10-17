namespace MBX {
    export namespace UniformMaterials {
        export function bumpMapping(): { [key: string]: MB.IUniformMaterial; } {
            return {
                bumpTex: { type: MB.UniformType.Integer },
                bumpScale: { type: MB.UniformType.Float }
            };
        };
        export function normalMapping(): { [key: string]: MB.IUniformMaterial; } {
            return {
                normalTex: { type: MB.UniformType.Integer },
                normalScale: { type: MB.UniformType.Float }
            };
        };
        export function texture(): { [key: string]: MB.IUniformMaterial; } {
            return {
                text: { type: MB.UniformType.Integer }
            };
        };
        export function fog(): { [key: string]: MB.IUniformMaterial; } {
            return {
                fogDensity: {
                    type: MB.UniformType.Float,
                    value: 0.04
                },
                fogNear: {
                    type: MB.UniformType.Float,
                    value: 1
                },
                fogFar: {
                    type: MB.UniformType.Float,
                    value: 1000
                },
                fogColor: {
                    type: MB.UniformType.Vector3,
                    value: MB.Vect3.createFromScalar(1.0)
                }
            };
        };
    };
};
