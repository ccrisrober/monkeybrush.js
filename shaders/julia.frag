#version 300 es
precision highp float;

in vec2 uv;
uniform vec2 offset;
uniform int iter;

uniform sampler2D tex;

out vec4 fragColor;

void main() {
    vec2 z;
    z.x = 3.0 * (uv.x - 0.5);
    z.y = 2.0 * (uv.y - 0.5);

    int i;
    for(i=0; i<iter; i++) {
        float x = (z.x * z.x - z.y * z.y) + offset.x;
        float y = (z.y * z.x + z.x * z.y) + offset.y;

        if((x * x + y * y) > 4.0) break;
        z.x = x;
        z.y = y;
    }

    fragColor = texture(tex, vec2((i == iter ? 0.0 : float(i)) / 100.0, 0));
    //fragColor = texture(tex, vec2(uv.x, 0.0));
}