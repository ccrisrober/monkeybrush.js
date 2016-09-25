#version 300 es
precision highp float;

in vec2 uv;
uniform float MaxIterations;
uniform float Zoom;
uniform vec2 center;
uniform sampler2D tex;
/*
zoom: 2.0,
offsetX: 0.7,
offsetY: -0.01,
iter: */
const float ColorOffset = 69.0;
const vec3 InnerColor = vec3(0.0, 0.0, 1.0);

/*mZoom    = 1.0f;
mXcenter = -1.36f;
mYcenter = 0.0f;
#elif 1
// tendrilis
mZoom = 0.15f;
mXcenter = -0.0002f;
mYcenter = 0.7383f*/

out vec4 fragColor;

void main() {
    float real = uv.x * Zoom + center.x;
    float imag = uv.y * Zoom + center.y;


    real = 1.3333 * (uv.x - 0.5) * Zoom - center.x;
    imag = (uv.y - 0.5) * Zoom - center.y;


    float Creal = real; // for a julia set = -0.765
    float Cimag = imag; // for a julia set = +0.110

    float r2 = 0.0;
    float iter;

    for( iter = 0.0; iter < MaxIterations && r2 < 4.0; ++iter )
    {
        float tempreal = real;
        real = (tempreal * tempreal) - (imag * imag) + Creal;
        imag = 2.0 * tempreal * imag + Cimag;
        r2 = (real*real) + (imag*imag);
    }

    // base the color on the number of iterations

    vec3 color;
    if (r2 < 4.0)
        color = InnerColor;
    else
        color = texture(tex, vec2(fract(iter*0.01+ColorOffset), 0.0) ).rgb;

    fragColor = vec4( color, 1.0);
}
