#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 uv;

uniform sampler2D tex;
uniform int mode;
uniform float brightness;

float sRGB_gamma_correct(float c) {
    const float a = 0.055;
    if (c < 0.0031308) return 12.92*c;
    else return (1.0+a)*pow(c, 1.0/2.4) - a;
}

void main() {
    fragColor = texture(tex, uv);
    if (mode == 1) {
        fragColor.rgb = brightness * pow( abs( fragColor.rgb ), vec3( 1.0 / 2.2 ) ); // gamma correction
    } else if (mode == 2) {
        fragColor.rgb = fragColor.rgb / ( 1.0 + fragColor.rgb );
        fragColor.rgb = brightness * pow( abs( fragColor.rgb ), vec3( 1.0 / 2.2 ) ); // gamma correction
    } else if (mode == 3) {
        vec3 color = fragColor.rgb * pow( abs( brightness ), 2.2 );
        color = max(vec3(0.), color - vec3(0.004));
        color = (color * (6.2 * color + .5)) / (color * (6.2 * color + 1.7) + 0.06);
        fragColor.rgb = color;
    } else if (mode == 4) {
        fragColor.r = sRGB_gamma_correct(fragColor.r);
        fragColor.g = sRGB_gamma_correct(fragColor.g);
        fragColor.b = sRGB_gamma_correct(fragColor.b);
    } else if (mode == 5) {
        float A = 0.15;
        float B = 0.50;
        float C = 0.10;
        float D = 0.20;
        float E = 0.02;
        float F = 0.30;
        float W = 11.2;
        float exposure = brightness;
        fragColor.rgb *= exposure;
        fragColor.rgb = ((fragColor.rgb *
            (A * fragColor.rgb + C * B) + D * E) / (fragColor.rgb *
            (A * fragColor.rgb + B) + D * F)) - E / F;
        float white = ((W * (A * W + C * B) + D * E) / (W * (A * W + B) + D * F)) - E / F;
        fragColor.rgb /= white;
        fragColor.rgb = pow(fragColor.rgb, vec3(1. / 2.2));
    }
}
