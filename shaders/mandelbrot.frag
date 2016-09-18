#version 300 es
precision highp float;

in vec2 uv;
uniform float zoom;
uniform vec2 offset;
uniform int iter;

uniform sampler2D tex;

out vec4 fragColor;

void main() {
	vec2 z, c;

    c.x = 1.3333 * (uv.x - 0.5) * zoom - offset.x;
    c.y = (uv.y - 0.5) * zoom - offset.y;

    int i;
    z = c;
    for(i=0; i<iter; i++) {
        float x = (z.x * z.x - z.y * z.y) + c.x;
        float y = (z.y * z.x + z.x * z.y) + c.y;

        //float ii = float(i);
        //fragColor = vec4(sin(ii * 2.0), ii, sin(ii * 2.0), 1.0);

        if((x * x + y * y) > 4.0) break;
        z.x = x;
        z.y = y;
    }

    fragColor = texture(tex, vec2((i == iter ? 0.0 : float(i)) / 100.0, 0));
    //fragColor = texture(tex, vec2(uv.x, 0.0));
}