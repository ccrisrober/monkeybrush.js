#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 uv;

uniform float ampScale;
/* uniform */ vec3 woodColor = vec3(0.32, 0.17, 0.09);

float rand(vec2 n) {
	return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 n) {
	const vec2 d = vec2(0.0, 1.0);
	vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
	return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float fbm(vec2 n) {
	float total = 0.0, amplitude = 1.0;
	for (int i = 0; i < 4; i++) {
		total += noise(n) * amplitude;
		n += n;
		amplitude *= 0.5;
	}
	return total;
}

void main() {
	float ratioy = mod(uv.x * ampScale, 2.0 + fbm(uv * 0.8));
	vec3 wood = woodColor * ratioy;
	fragColor = vec4(wood, 1.0);
}
