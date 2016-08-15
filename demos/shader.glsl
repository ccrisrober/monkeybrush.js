precision mediump float;
#pragma glslify: Material = require(./material.glsl)
#pragma glslify: Light = require(./light.glsl)
#pragma glslify: computeColor = require(./blinnPhong.glsl)
#define NUM_LIGHTS 16
varying vec3 normal, position, viewDirection;
uniform Material material;
uniform Light lights[NUM_LIGHTS];

void main() {
	vec3 color = vec3(0,0,0);
	for(int i = 0; i<NUM_LIGHTS; ++i) {
		color += computeColor(
		material,
		lights[i],
		normal,
		position,
		viewDirection);
	}
	gl_FragColor = vec4(color, 1.0);
}