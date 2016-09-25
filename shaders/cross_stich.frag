#version 300 es
precision highp float;

out vec4 fragColor;

uniform sampler2D tex;
uniform float stich;
uniform vec2 size;

void main() {
    vec2 uv = (gl_FragCoord.xy / size.xy) * size.xy;
    vec3 color;

    float plx = size.x * stich / 640.0;
    float ply = size.y * stich / 360.0;

    vec2 tlPos = floor(uv / vec2(plx, ply));
    tlPos *= vec2(plx, ply);
    vec2 blPos = tlPos;
    blPos.y += (ply - 1.0); // To create cross stiching
    if (
        (mod(uv.x, plx) == mod(uv.y, ply)) ||
        (((uv.x - blPos.x) == (blPos.y - uv.y)))
    ) {
        color = vec3(0.0, 0.0, 0.0);    // Cross stiching color
    } else {
        color = texture(tex, tlPos * vec2(1.0/size.xy)).xyz;
    }
    fragColor = vec4(color, 1.0);
}
