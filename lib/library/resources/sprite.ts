/// <reference path="../core/program.ts" />
/// <reference path="../extras/vertexBuffer.ts" />

"use strict";

class Sprite {
	static prog: Program;
	static buffer: VertexBuffer;
	static initialize() {
		Sprite.prog = new Program();
		Sprite.prog.addShader(`#version 300 es
precision mediump float;

layout(location = 0) in vec3 position;
layout(location = 2) in vec2 texCoord;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

out vec2 outTexCoord;

void main() {
	gl_Position = projection * view * model * vec4(position, 1.0);
	outTexCoord = texCoord;
}`, shader_type.vertex, mode.read_text);
		Sprite.prog.addShader(`#version 300 es
precision mediump float;

uniform sampler2D tex;

in vec2 outTexCoord;

out vec4 fragColor;

void main() {
	fragColor = texture(tex, outTexCoord);
}`, shader_type.fragment, mode.read_text);

		const gl = Core.getInstance().getGL();
		let initTC = [
			1.0, 1.0,
			0.0, 1.0,
			1.0, 0.0,
			0.0, 0.0
		];

		Sprite.buffer = new VertexBuffer(BufferType.Array);
		Sprite.buffer.bufferData(new Float32Array(initTC), gl.DYNAMIC_DRAW);
		Sprite.buffer.unbind();
	}
};

Sprite.initialize();