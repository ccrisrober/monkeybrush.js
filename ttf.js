/// <reference path="./src/typings/dat-gui.d.ts" />
/// <reference path="./src/typings/gl-matrix.d.ts" />
/// <reference path="./src/typings/log4javascript.d.ts" />
/// <reference path="./src/typings/stats.d.ts" />
/// <reference path="./src/typings/webgl2.d.ts" />
/// <reference path="./dist/monkeybrush.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SimpleConfig = function () {
    return {
        resume: true,
        layer: 32
    };
};
var MyScene = (function (_super) {
    __extends(MyScene, _super);
    function MyScene() {
        _super.call(this, SimpleConfig(), "EY", 2);
        this.mainShader = "prog";
        this.angle = 0;
    }
    MyScene.prototype.loadAssets = function () {
    };
    ;
    MyScene.prototype.initialize = function () {
        var _this = this;
        var gl = MB.Core.getInstance().getGL();
        MB.ProgramManager.addWithFun("prog", function () {
            var emitProgram = new MB.Program();
            emitProgram.addShader("#version 300 es                              \n                #define NUM_PARTICLES           200          \n                #define ATTRIBUTE_POSITION      0            \n                #define ATTRIBUTE_VELOCITY      1            \n                #define ATTRIBUTE_SIZE          2            \n                #define ATTRIBUTE_CURTIME       3            \n                #define ATTRIBUTE_LIFETIME      4            \n                uniform float u_time;                        \n                uniform float u_emissionRate;                \n                uniform mediump sampler3D s_noiseTex;        \n                                                            \n                layout(location = ATTRIBUTE_POSITION) in vec2 a_position; \n                layout(location = ATTRIBUTE_VELOCITY) in vec2 a_velocity; \n                layout(location = ATTRIBUTE_SIZE) in float a_size;        \n                layout(location = ATTRIBUTE_CURTIME) in float a_curtime;  \n                layout(location = ATTRIBUTE_LIFETIME) in float a_lifetime;\n                                                            \n                out vec2 v_position;                         \n                out vec2 v_velocity;                         \n                out float v_size;                            \n                out float v_curtime;                         \n                out float v_lifetime;                        \n                                                            \n                float randomValue( inout float seed )        \n                {                                            \n                    float vertexId = 1.0; // TODO: float( gl_VertexID ) / float( NUM_PARTICLES );\n                    vec3 texCoord = vec3( u_time, vertexId, seed );        \n                    seed += 0.1;                              \n                    return texture( s_noiseTex, texCoord ).r; \n                }                                            \n                void main()                                  \n                    {                                            \n                    float seed = u_time;                       \n                    float lifetime = a_curtime - u_time;       \n                    if( lifetime <= 0.0 && randomValue(seed) < u_emissionRate )\n                    {                                          \n                        v_position = vec2( 0.0, -1.0 );         \n                        v_velocity = vec2( randomValue(seed) * 2.0 - 1.00,   \n                                            randomValue(seed) * 1.4 + 1.0 );  \n                        v_size = randomValue(seed) * 20.0 + 60.0;            \n                        v_curtime = u_time;                     \n                        v_lifetime = 2.0;                       \n                    }                                          \n                    else                                       \n                    {                                          \n                        v_position = a_position;                \n                        v_velocity = a_velocity;                \n                        v_size = a_size;                        \n                        v_curtime = a_curtime;                  \n                        v_lifetime = a_lifetime;                \n                    }                                          \n                    gl_Position = vec4( v_position, 0.0, 1.0 );\n                }\n            ", MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);
            emitProgram.setFooFragment();
            emitProgram.compile();
            emitProgram.autocatching();
            console.log(emitProgram);
            return emitProgram;
        });
    };
    ;
    MyScene.prototype.update = function (dt) {
        this.angle += MB.Timer.deltaTime() * 0.001;
        this.__resize__();
    };
    ;
    MyScene.prototype.draw = function (dt) {
        MB.Core.getInstance().clearColorAndDepth();
        var prog = MB.ProgramManager.get(this.mainShader);
        prog.use();
    };
    ;
    MyScene.prototype.cameraUpdate = function () {
    };
    ;
    MyScene.prototype.textCB = function (gui) {
        gui.add(this.text, "layer", 0, 64);
    };
    ;
    return MyScene;
}(MB.Scene));
;
var myScene;
window.onload = function () {
    myScene = new MyScene();
    myScene.start();
};
