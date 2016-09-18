#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 uv;

uniform sampler2D tex;
uniform float iGlobalTime;

uniform float twirl_amount;

void main() {
	vec2 uvv = vec2(uv.x, 1.0 - uv.y);
	vec2 uv2 = uvv - 0.5;
	float angle = atan(uv2.y, uv2.x);
	float radius = length(uv2);
	angle += radius * twirl_amount;// * cos(iGlobalTime);
	vec2 shifted = radius * vec2(cos(angle), sin(angle));

	fragColor = texture(tex, (shifted + 0.5));
}
