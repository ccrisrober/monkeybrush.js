#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 uv;

uniform sampler2D tex;

const float kernel[9] = float[9](
	/*-1.0,-1.0,-1.0, 
	-1.0, 8.0,-1.0, 
	-1.0,-1.0,-1.0*/
	0.0, 1.0, 0.0,
	1.0, 5.0, 1.0,
	0.0, 1.0, 0.0
);

void main() {
	//determine the inverse of texture size
	vec2 t = vec2(textureSize(tex, 0));
	vec2 delta = 1.0 / t;

	vec4 color = vec4(0);
	int index = 8;
	vec2 uvv = vec2(uv.x, 1.0 - uv.y);
	for(int j=-1; j <= 1; ++j) {
		for(int i=-1; i <= 1;++i) {
			color += kernel[index--] * texture(tex, uvv + (vec2(i, j) * delta));
		}
	}
	color /= 9.0;
	fragColor = color + texture(tex, uvv); 
}
