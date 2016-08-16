#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;

out vec4 fragColor;

uniform sampler2D texSampler;

void main() {
	//fragColor = vec4(normalize(outNormal), 1.0);
	//fragColor = vec4(normalize(outPosition), 1.0);
	//fragColor = vec4(outPosition, 1.0);
	//fragColor = vec4(outUV, 0.0, 1.0);

	vec3 color = texture(texSampler, outUV).rgb;
	fragColor = vec4(color, 1.0);
}