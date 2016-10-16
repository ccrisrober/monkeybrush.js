namespace MB {
    export interface PostProcessMaterialParams {
        name: string;
        uniforms?: { [key: string]: MB.IUniformMaterial; };
        fragmentShader: string;
    };
    export class PostProcessMaterial extends MB.ShaderMaterial {
        constructor(context: MB.GLContext, params: MB.PostProcessMaterialParams) {
            super(context, {
                name: params.name,
                uniforms: params.uniforms,
                vertexShader: "#version 300 es\n#import<VertexPP>",
                fragmentShader: params.fragmentShader
            });
        }
    };
}
