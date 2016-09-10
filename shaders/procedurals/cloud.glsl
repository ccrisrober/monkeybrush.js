// Params:
//  -vec4 skyColor = vec4(0.0, 0.0,0.6, 1.0);
//  -vec4 cloudColor = vec4(1.0);

float rand(vec2 n) {
    return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 n) {
    vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float fbm(vec2 n) {
    float total = 0.0, amplitude = 1.0;
    for (int i = 0; i < 111; i++) {
        total += noise(n) * amplitude;
        n += n;
        amplitude *= 0.5;
    }
    return total;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    uv.x += iGlobalTime * 0.1;
    uv.y += iGlobalTime * 0.05;
    vec2 p = uv * 25.0;
    fragColor = mix(skyColor, cloudColor, fbm(p));
}
