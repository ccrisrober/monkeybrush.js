/// <reference path="library/App.ts" />

/// <reference path="library/core/core.ts" />
/// <reference path="library/core/input.ts" />
/// <reference path="library/core/program.ts" />
/// <reference path="library/resources/programManager.ts" />
/// <reference path="library/resources/resourceMap.ts" />
/// <reference path="library/resources/loaders.ts" />

/// <reference path="library/extras/timer.ts" />
/// <reference path="library/extras/transformFeedback.ts" />

/// <reference path="library/_demoCamera.ts" />
/// <reference path="library/constants/_constants.ts" />
/// <reference path="library/core/vertexArray.ts" />
/*
import App from "./library/App";

import Core from "./library/core/core";
import Input from "./library/core/input";
import Program from "./library/core/program";
import ProgramManager from "./library/resources/programManager";
import ResourceMap from "./library/resources/resourceMap";
import loaders from "./library/resources/loaders";
import Timer from "./library/extras/timer";
import TransformFeedback from "./library/extras/transformFeedback";
import Vector2 from "./library/maths/vector2";
import Vector3 from "./library/maths/vector3";
import Camera2 from "./library/_demoCamera";

import ProgramCte from "./library/constants/ProgramCte";
import TransfFeedCte from "./library/constants/TransfFeedCte";

import VertexArray from "./library/extras/vertexArray";

"use strict";

let camera = new Camera2(new Float32Array([-2.7, -1.4, 11.8]));

let gl_: WebGLRenderingContext;

let SimpleConfig = function() {
    return {
        max: 10
    };
};

let view;
let projection;

let identityMatrix = mat4.create();
mat4.identity(identityMatrix);
let model = mat4.create();
let angle = 0;

let text = SimpleConfig();
function loadAssets() {
}

const mainShader: string = "prog";

function initialize() {
    gl_ = Core.getInstance().getGL();

    let canvasSize = new Vector2<number>(
        gl_.canvas.width,
        gl_.canvas.height
    );

    ProgramManager.addWithFun("prog", (): Program => {
        let prog: Program = new Program();

        prog.addShader(`#version 300 es
        precision highp float;
        in float inValue;
        out float outValue;

        void main()
        {
            outValue = sqrt(inValue);
        }
        `, ProgramCte.shader_type.vertex, ProgramCte.mode.read_text);

        prog.addShader(`#version 300 es
        precision highp float;
        out vec4 fragColor;
        void main() {
            fragColor = vec4(1.0);
        }
        `, ProgramCte.shader_type.fragment, ProgramCte.mode.read_text);

        prog._compile();


        let feedbackVaryings = ["outValue"];
        gl_.transformFeedbackVaryings(
            prog.program(),
            feedbackVaryings,
            gl_.INTERLEAVED_ATTRIBS);

        prog._link();


        prog.addUniforms(["projection", "view", "model",
            "normalMatrix", "texSampler", "viewPos", "lightPosition"]);
        return prog;
    });

    let vao: VertexArray = new VertexArray();
    vao.bind();

    let data = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0]);

    let vbo = gl_.createBuffer();
    gl_.bindBuffer(gl_.ARRAY_BUFFER, vbo);
    gl_.bufferData(gl_.ARRAY_BUFFER, data, gl_.STATIC_DRAW);

    let program = ProgramManager.get("prog");
    program.use();

    let inputAttrib = gl_.getAttribLocation(program.program(), "inValue");
    gl_.enableVertexAttribArray(inputAttrib);
    gl_.vertexAttribPointer(inputAttrib, 1, gl_.FLOAT, false, 0, 0);

    // Create transform feedback buffer
    let tbo = gl_.createTransformFeedback();
    // gl_.bindBuffer(gl_.ARRAY_BUFFER, tbo);
    // gl_.bindBufferBase(gl_.ARRAY_BUFFER,
    //    data.length * Float32Array.BYTES_PER_ELEMENT,
    //    gl_.STATIC_READ);

    // Perform feedback tranform
    gl_.enable(gl_.RASTERIZER_DISCARD);

    gl_.bindTransformFeedback(gl_.TRANSFORM_FEEDBACK_BUFFER, tbo);

    gl_.beginTransformFeedback(gl_.POINTS);
        gl_.drawArrays(gl_.POINTS, 0, 5);
    gl_.endTransformFeedback();

    gl_.disable(gl_.RASTERIZER_DISCARD);

    gl_.flush();

    // Fetch and print results
    let feedback = new ArrayBuffer(
        data.length * Float32Array.BYTES_PER_ELEMENT);
    gl_.getBufferSubData(
        gl_.TRANSFORM_FEEDBACK_BUFFER,
        0,
        feedback
    );

    cameraUpdateCb();
}

function cameraUpdateCb() {
    let canvas = Core.getInstance().canvas();
    view = camera.GetViewMatrix();
    projection = camera.GetProjectionMatrix(canvas.width, canvas.height);

    let prog = ProgramManager.get(mainShader);
    prog.use();
    prog.sendUniformMat4("view", view);
    prog.sendUniformMat4("projection", projection);
    prog.sendUniformVec3("viewPos", camera.position);
}

// @param dt: Global time in seconds
function drawScene(dt: number) {
    const gl = Core.getInstance().getGL();
    camera.timeElapsed = Timer.deltaTime() / 10.0;

    camera.update(cameraUpdateCb);

    Core.getInstance().clearColorAndDepth();
}

// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //
// ============================================================================================ //


window.onload = () => {
    _init__.init(loadAssets, function(gui) {
        gui.add(text, "max", 5, 100);
    });
    _init__.start(initialize, drawScene);
};
*/
