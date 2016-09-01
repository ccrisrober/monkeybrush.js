float orenNayarDiffuse(vec3 lightDir, vec3 viewDir, vec3 surfNormal, float roughness, float albedo) {
  float LdotV = dot(lightDir, viewDir);

  // calculate intermediary values
  float NdotL = dot(lightDir, surfNormal);
  float NdotV = dot(surfNormal, viewDir);

  float s = LdotV - NdotL * NdotV;
  float t = mix(1.0, max(NdotL, NdotV), step(0.0, s));

  float roughnessSquared = roughness * roughness;
  float roughnessSquared9 = (roughnessSquared / (roughnessSquared + 0.09));

  float A = 1.0 + roughnessSquared * (albedo / (roughnessSquared + 0.13) + 0.5 / (roughnessSquared + 0.33));
  float B = 0.45 * roughnessSquared9;

  return albedo * max(0.0, NdotL) * (A + B * s / t) / 3.1415;
}
