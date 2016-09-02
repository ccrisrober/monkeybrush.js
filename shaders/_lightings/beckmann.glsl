// Code based in https://crossclj.info/fun/thi.ng.glsl.lighting.cljs/beckmann-distribution.html
float distribution(float v, float roughness) {
    float NdotH = max(v, 1e-4);
    float cos2Alpha = NdotH * NdotH;
    float tan2Alpha = (cos2Alpha - 1.0) / cos2Alpha;
    float roughness2 = roughness * roughness;
    float denom = 3.1415 * roughness2 * cos2Alpha * cos2Alpha;
    return exp(tan2Alpha / roughness2) / denom;
}
float beckmann(vec3 lightDirection, vec3 viewDir, vec3 surfNormal, float roughness) {
  return distribution(dot(surfNormal, normalize(lightDirection + viewDir)), roughness);
}
