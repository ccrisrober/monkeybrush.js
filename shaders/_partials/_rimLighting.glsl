// vec3 viewDir = normalize(viewPos - outPosition);

//rim lighting
float rim = 1.0 - max(dot(viewDir, outNormal), 0.0);
rim = smoothstep(0.8, 1.0, rim);
vec3 finalRim = LightColor * vec3(rim);