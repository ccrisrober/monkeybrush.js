#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 uv;

uniform sampler2D tex;

uniform float       exposure;

vec3 decode_pnghdr(const in vec4 color){
    // remove gamma correction
    vec4 res = color * color;
    // decoded RI
    float ri = pow(2.0, res.w * 32.0 - 16.0);
    // decoded HDR pixel
    res.xyz = res.xyz * ri;
    return res.xyz;
}

void main()
{
    vec4 color = texture(tex, uv).xyzw;
    color.xyz  = decode_pnghdr(color);
    // apply gamma correction and exposure
    fragColor = vec4(pow(exposure * color.xyz, vec3(0.474)), 1.0);
}
