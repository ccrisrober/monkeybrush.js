#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in float NdotL;
in vec3  ReflectVec;
in vec3  ViewVec;

out vec4 fragColor;

const vec3 SurfaceColor = vec3(1.0, 1.0, 1.0);
const vec3 CoolColor = vec3(159.0/255., 148.0/255., 1.);
const vec3 WarmColor = vec3(1.0, 75.0/255., 75./255.);
const float DiffuseWarm = 0.5;
const float DiffuseCool = 0.25;

void main() {
    vec3 kcool    = min(CoolColor + DiffuseCool * SurfaceColor, 1.0);
    vec3 kwarm    = min(WarmColor + DiffuseWarm * SurfaceColor, 1.0);
    vec3 kfinal   = mix(kcool, kwarm, NdotL);

    vec3 nreflect = normalize(ReflectVec);
    vec3 nview    = normalize(ViewVec);

    float spec    = max(dot(nreflect, nview), 0.0);
    spec          = pow(spec, 32.0);

    fragColor = vec4(min(kfinal + spec, 1.0), 1.0);
}
