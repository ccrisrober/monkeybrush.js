/// <reference path="./src/typings/dat-gui.d.ts" />
/// <reference path="./src/typings/gl-matrix.d.ts" />
/// <reference path="./src/typings/log4javascript.d.ts" />
/// <reference path="./src/typings/stats.d.ts" />
/// <reference path="./src/typings/webgl2.d.ts" />
/// <reference path="./dist/monkeybrush.d.ts" />

let SimpleConfig = function () {
    return {
        resume: true,
        layer: 32
    }
};
class MyScene extends MB.Scene {
    constructor() {
        super(SimpleConfig(), "EY", 2);
        this.mainShader = "prog";
        this.angle = 0;
    }
    protected angle: number;
    public loadAssets() {
    };
    protected mainShader: string;

    protected tex3d: MB.Texture3D;
    protected texture: WebGLTexture;
    public initialize() {
        var _this = this;

        var gl = MB.Core.getInstance().getGL();

        MB.ProgramManager.addWithFun("prog", function () {
            let emitProgram = new MB.Program();
            emitProgram.addShader(
            `#version 300 es                              
                #define NUM_PARTICLES           200          
                #define ATTRIBUTE_POSITION      0            
                #define ATTRIBUTE_VELOCITY      1            
                #define ATTRIBUTE_SIZE          2            
                #define ATTRIBUTE_CURTIME       3            
                #define ATTRIBUTE_LIFETIME      4            
                uniform float u_time;                        
                uniform float u_emissionRate;                
                uniform mediump sampler3D s_noiseTex;        
                                                            
                layout(location = ATTRIBUTE_POSITION) in vec2 a_position; 
                layout(location = ATTRIBUTE_VELOCITY) in vec2 a_velocity; 
                layout(location = ATTRIBUTE_SIZE) in float a_size;        
                layout(location = ATTRIBUTE_CURTIME) in float a_curtime;  
                layout(location = ATTRIBUTE_LIFETIME) in float a_lifetime;
                                                            
                out vec2 v_position;                         
                out vec2 v_velocity;                         
                out float v_size;                            
                out float v_curtime;                         
                out float v_lifetime;                        
                                                            
                float randomValue( inout float seed )        
                {                                            
                    float vertexId = 1.0; // TODO: float( gl_VertexID ) / float( NUM_PARTICLES );
                    vec3 texCoord = vec3( u_time, vertexId, seed );        
                    seed += 0.1;                              
                    return texture( s_noiseTex, texCoord ).r; 
                }                                            
                void main()                                  
                    {                                            
                    float seed = u_time;                       
                    float lifetime = a_curtime - u_time;       
                    if( lifetime <= 0.0 && randomValue(seed) < u_emissionRate )
                    {                                          
                        v_position = vec2( 0.0, -1.0 );         
                        v_velocity = vec2( randomValue(seed) * 2.0 - 1.00,   
                                            randomValue(seed) * 1.4 + 1.0 );  
                        v_size = randomValue(seed) * 20.0 + 60.0;            
                        v_curtime = u_time;                     
                        v_lifetime = 2.0;                       
                    }                                          
                    else                                       
                    {                                          
                        v_position = a_position;                
                        v_velocity = a_velocity;                
                        v_size = a_size;                        
                        v_curtime = a_curtime;                  
                        v_lifetime = a_lifetime;                
                    }                                          
                    gl_Position = vec4( v_position, 0.0, 1.0 );
                }
            `, MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);
            emitProgram.setFooFragment();
            emitProgram.compile();
            emitProgram.autocatching();
            console.log(emitProgram);

            return emitProgram;
        });
        
    };
    public update(dt: number) {
        this.angle += MB.Timer.deltaTime() * 0.001;

        this.__resize__();
    };
    public draw(dt: number) {
        MB.Core.getInstance().clearColorAndDepth();
        var prog = MB.ProgramManager.get(this.mainShader);
        prog.use();
        
    };
    public cameraUpdate() {
    };
    public textCB(gui) {
        gui.add(this.text, "layer", 0, 64);
    };
};

var myScene: MyScene;

window.onload = function () {
    myScene = new MyScene();
    myScene.start();
};