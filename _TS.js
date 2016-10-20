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
var MyScene = (function (_super) {
    __extends(MyScene, _super);
    function MyScene(numPlanets) {
        if (numPlanets === void 0) { numPlanets = 10; }
        _super.call(this, "App", new MB.GLContextW2(document.getElementById("canvas")));
        this.camera = new MB.Camera2(MB.Vect3.createFromScalar(0.0));
        this.planetnum = 10;
        this.planetnum = numPlanets;
    }
    MyScene.prototype.initialize = function () {
        this.shader = new MB.TFMaterial(this._context, {
            name: "TFShader",
            vertexShader: "#version 300 es\n            precision highp float;\n            in vec4 coord;\n            in vec4 coord2;\n            out vec4 vel;\n            void main() {\n                float timePFrame = 0.01;\n                float dist = coord.x * coord.x + coord.y * coord.y + coord.z * coord.z;\n                float res = 0.07 / (dist * sqrt(dist));\n                vel = coord2 - vec4(vec3(res * timePFrame), 1.0) * coord;\n                gl_Position = coord + vel * vec4(vec3(timePFrame), 0.0);\n                gl_PointSize = (gl_Position.z + 1.1) * 20.1;\n            }",
            fragmentShader: "#version 300 es\n            precision highp float;\n            out vec4 fragColor;\n            void main() {\n                fragColor = vec4(vec3(1.0), 1.0);\n            }",
            tfs: {
                varying: ["gl_Position", "vel"],
                mode: MB.ctes.TFMode.Interleaved
            }
        });
        console.log(this.shader);
        var vertices = new Float32Array(this.planetnum * 8);
        for (var i = 0; i < this.planetnum; ++i) {
            vertices[i * 8] = Math.random() * 2 - 1;
            vertices[i * 8 + 1] = Math.random() * 2 - 1;
            vertices[i * 8 + 2] = Math.random() * 2 - 1;
            vertices[i * 8 + 3] = 1.0;
            vertices[i * 8 + 4] = Math.random() / 4.0 + 0.01;
            vertices[i * 8 + 5] = Math.random() / 4.0 + 0.01;
            vertices[i * 8 + 6] = Math.random() / 4.0 + 0.01;
            vertices[i * 8 + 7] = 0.0;
        }
        var gl = this.context.gl;
        /*======= Associating shaders to buffer objects =======*/
        // Bind vertex buffer object
        this.vb = new MB.VertexBuffer(this.context, MB.ctes.BufferType.Array);
        this.fb = new MB.VertexBuffer(this.context, MB.ctes.BufferType.Array);
        // Pass the vertex data to the buffer
        var bufA = new Float32Array(vertices);
        this.vb.bufferData(bufA, MB.ctes.UsageType.StaticDraw);
        this.fb.bufferData(bufA, MB.ctes.UsageType.StaticDraw);
        this.ttf = new MB.TransformFeedback(this.context);
        this.ttf.bind();
        this.coord = gl.getAttribLocation(this.shader.program.id(), "coord");
        this.coord2 = gl.getAttribLocation(this.shader.program.id(), "coord2");
        gl.enableVertexAttribArray(this.coord);
        gl.enableVertexAttribArray(this.coord2);
    };
    ;
    MyScene.prototype.update = function (dt) {
    };
    ;
    MyScene.prototype.draw = function () {
        var gl = this.context.gl;
        this.vb.bind();
        gl.vertexAttribPointer(this.coord, 4, gl.FLOAT, false, 32, 0);
        gl.vertexAttribPointer(this.coord2, 4, gl.FLOAT, false, 32, 16);
        this.context.state.color.clearBuffer();
        this.fb.bindBufferBase(MB.ctes.BufferType.TransformFeedback, 0);
        this.shader.use();
        this.ttf.beginPoints();
        gl.drawArrays(gl.POINTS, 0, this.planetnum);
        this.ttf.end();
        gl.bindBufferBase(MB.ctes.BufferType.TransformFeedback, 0, null);
        // Swap buffers
        var t = this.vb;
        this.vb = this.fb;
        this.fb = t;
    };
    ;
    return MyScene;
}(MB.App2));
;
window.onload = function () {
    var scene = new MyScene(300);
    scene.start();
};
