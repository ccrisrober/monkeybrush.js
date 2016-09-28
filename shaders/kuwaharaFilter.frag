#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 uv;

uniform sampler2D tex;
const int radius = 12;

void main() {

}
/*void mainImage( out vec4 fragColor, in vec2 fragCoord )  {
vec2 src_size = vec2 (1.0 / iResolution.x, 1.0 / iResolution.y);
vec2 uv = fragCoord.xy/iResolution.xy;
float n = float((radius + 1) * (radius + 1));
int i; 
int j;
vec3 m0 = vec3(0.0); vec3 m1 = vec3(0.0); vec3 m2 = vec3(0.0); vec3 m3 = vec3(0.0);
vec3 s0 = vec3(0.0); vec3 s1 = vec3(0.0); vec3 s2 = vec3(0.0); vec3 s3 = vec3(0.0);
vec3 c;

for (int j = -radius; j <= 0; ++j)  {
for (int i = -radius; i <= 0; ++i)  {
c = texture2D(iChannel0, uv + vec2(i,j) * src_size).rgb;
m0 += c;
s0 += c * c;
}
}

for (int j = -radius; j <= 0; ++j)  {
for (int i = 0; i <= radius; ++i)  {
c = texture2D(iChannel0, uv + vec2(i,j) * src_size).rgb;
m1 += c;
s1 += c * c;
}
}

for (int j = 0; j <= radius; ++j)  {
for (int i = 0; i <= radius; ++i)  {
c = texture2D(iChannel0, uv + vec2(i,j) * src_size).rgb;
m2 += c;
s2 += c * c;
}
}

for (int j = 0; j <= radius; ++j)  {
for (int i = -radius; i <= 0; ++i)  {
c = texture2D(iChannel0, uv + vec2(i,j) * src_size).rgb;
m3 += c;
s3 += c * c;
}
}


float min_sigma2 = 1e+2;
m0 /= n;
s0 = abs(s0 / n - m0 * m0);

float sigma2 = s0.r + s0.g + s0.b;
if (sigma2 < min_sigma2) {
min_sigma2 = sigma2;
fragColor = vec4(m0, 1.0);
}

m1 /= n;
s1 = abs(s1 / n - m1 * m1);

sigma2 = s1.r + s1.g + s1.b;
if (sigma2 < min_sigma2) {
min_sigma2 = sigma2;
fragColor = vec4(m1, 1.0);
}

m2 /= n;
s2 = abs(s2 / n - m2 * m2);

sigma2 = s2.r + s2.g + s2.b;
if (sigma2 < min_sigma2) {
min_sigma2 = sigma2;
fragColor = vec4(m2, 1.0);
}

m3 /= n;
s3 = abs(s3 / n - m3 * m3);

sigma2 = s3.r + s3.g + s3.b;
if (sigma2 < min_sigma2) {
min_sigma2 = sigma2;
fragColor = vec4(m3, 1.0);
}
}*/