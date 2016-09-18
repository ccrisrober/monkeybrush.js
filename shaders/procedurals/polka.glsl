#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 uv;

uniform float time;

uniform float radiusAngle;
/*uniform */ vec3 dotColor = vec3(1.0, 0.0, 0.0);
/*uniform */ vec3 Color = vec3(0.0, 1.0, 0.0);


void main(void)
{
	float dotSize = radiusAngle * 0.25;
	vec2 square = vec2(radiusAngle, radiusAngle);

	vec2 position = mod(gl_FragCoord.xy, square) - square * 0.5;
	float length = length(position);
	float inside = step(length, dotSize);

	fragColor = vec4(mix(Color, dotColor, inside), 1.0);
}