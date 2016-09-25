#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;

out vec4 fragColor;

uniform vec3 viewPos;

const float specularExp = 128.0;

vec3 heat(int i);
void main() {
    vec3 N = normalize(outNormal);
    vec3 L = normalize(viewPos - outPosition);
    vec3 diffu = vec3(1.0, 1.0, 0.0);


    vec3 l = normalize(N);
    vec3 n = normalize(L);
    vec3 H = normalize(l + vec3(0.0,0.0,1.0));

    // compute diffuse equation
    float dif=dot(N,L);
    vec3 diffuse = diffu * vec3(clamp(dif,0.0,1.0));

    // Use specular as red heat colors
    float NdotH = max(0.0, dot(n,H));
    vec3 specular = vec3(0.0);
    if (dif > 0.0) specular = vec3(pow(NdotH, specularExp));

    vec3 color = clamp( (diffuse + specular), 0.0, 1.0);

    float gray = dot( color.rgb, vec3(0.299,0.587,0.114) );
    if (gray >= 1.0) gray = 0.999;
    if (gray < 0.0) gray = 0.0;

    int col1 = int(gray*3.0);
    int col2 = col1 + 1;
    float t = fract(gray*3.0);
    color.rgb = heat(col1)*(1.0-t) + heat(col2)*t;





    fragColor = vec4(color,1.0)+vec4(color*0.3,1.0);
}

vec3 heat(int i) {
    if (i==0)
        return vec3(0.0,0.0,1.0);
    if (i==1)
        return vec3(0.0,1.0,0.0);
    if (i==2)
        return vec3(1.0,1.0,0.0);
    else
        return vec3(1.0,0.0,0.0);
}
