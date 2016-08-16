/// <reference path="core/core.ts" />
/// <reference path="stats.d.ts" />
/// <reference path="dat-gui.d.ts" />
/// <reference path="core/shaderProgram.ts" />
/// <reference path="resources/shaderManager.ts" />

/// <reference path="core/postprocess.ts" />
/// <reference path="extras/timer.ts" />

var stats: Stats = new Stats();
stats.setMode(0);
document.body.appendChild(stats.domElement);

var SimpleConfig = function() {
	return { };
};
var pp: PostProcess;
var gui: dat.GUI;

function initialize() {
    ShaderManager.addWithFun("pp", (): ShaderProgram => {
        var prog2: ShaderProgram = new ShaderProgram();
        prog2.addShader(`#version 300 es
            precision highp float;
            layout(location = 0) in vec3 vertPosition;
            out vec2 texCoord;
            void main(void) {
                texCoord = vec2(vertPosition.xy * 0.5) + vec2(0.5);
                gl_Position = vec4(vertPosition, 1.0);
            }`, shader_type.vertex, mode.read_text);
        prog2.addShader(`#version 300 es
            precision highp float;
            /*uniform sampler2D dataTexture;*/

            out vec4 fragColor;
            in vec2 texCoord;

            uniform float time;

            void main() {
                fragColor = vec4(texCoord, 0.0, 1.0);
                fragColor.rgb = vec3(cos(time), 0.0, 1.0);
            }`, shader_type.fragment, mode.read_text);
        prog2.compile();

        prog2.addUniforms(["time"]);
        return prog2;
    });
}

// @param dt: Global time in seconds
function drawScene(dt: number) {
    Core.getInstance().clearColorAndDepth();

    var prog2 = ShaderManager.get("pp");
    prog2.use();

    prog2.sendUniform1f("time", dt);

    PostProcess.render();
}

// =====================================================================
// =====================================================================
// =====================================================================
// =====================================================================

window.onload = () => {
    Core.getInstance().initialize([1.0, 1.0, 1.0, 1.0]);

    var text = SimpleConfig();

    if(Object.keys(text).length > 0) {
        gui = new dat.GUI();

        for(var index in text) { 
            gui.add(text, index);
        }
    }
    initialize();

    requestAnimationFrame(loop);
}

function loop(dt: number) {
    Input.getInstance().update();

	stats.begin();
    dt *= 0.001; // convert to seconds

	drawScene(dt);    // User cliet

	stats.end();
	requestAnimationFrame(loop);
}