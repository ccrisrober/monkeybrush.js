#version 300 es
precision highp float;
/*uniform sampler2D dataTexture;*/

out vec4 fragColor;
in vec2 texCoord;

uniform float time;

void main() {
	fragColor = vec4(texCoord, 0.0, 1.0);
	//fragColor.rgb = vec3(cos(time), 0.0, 1.0);
}