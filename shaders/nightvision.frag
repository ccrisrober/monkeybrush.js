#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 uv;

uniform sampler2D tex;
uniform float radius;
uniform vec2 size;

// Returns the relative luminance of the color value
float luminance(vec3 color) {
	return dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
}

float noise(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
	float noiseValue = noise(uv);
	vec4 color = texture(tex, uv);
	float green = luminance( color.rgb );
	float dist1 = length(gl_FragCoord.xy - vec2(size.x * 0.25, size.y * 0.5));
	float dist2 = length(gl_FragCoord.xy - vec2(3.0 * size.x * 0.25, size.y * 0.5));
	if( dist1 > radius && dist2 > radius ) green = 0.0;
	fragColor = vec4(0.0, green * clamp(noiseValue + 0.25, 0.0, 1.0), 0.0 ,1.0);
}
