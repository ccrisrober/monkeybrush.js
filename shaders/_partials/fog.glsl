vec3 viewDir = normalize(viewPos - outPosition);
float dst = length(outPosition - viewPos);

float minDist = minMaxDist.x;
float maxDist = minMaxDist.y;
vec3 fogColor = vec3(1.0);
float fogFactor;

fogFactor = (maxDist - dst) / (maxDist - minDist);

fogFactor = clamp(fogFactor, 0.0, 1.0);
color = mix(fogColor, color, fogFactor);