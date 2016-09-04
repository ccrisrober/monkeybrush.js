struct LightResult {
    vec3 diffuse;
    vec3 specular;
};

LightResult computeHemisphericLighting(
    vec3 viewDir, vec3 norm, vec3 lightPosition, vec3 diffuseColor,
    vec3 specularColor, vec3 groundColor, float shininess /* glossy factor */) {

    LightResult result;
 
    // Diffuse
    float dotNL = dot(norm, lightPosition) * 0.5 + 0.5;
    result.diffuse = mix(groundColor, diffuseColor, dotNL);
 
    // Specular
    vec3 angle = normalize(viewDir + lightPosition);
    float spec = max(0., dot(norm, angle));
    spec = pow(spec, max(1.0, shininess));
 
    result.specular = spec * specularColor;
 
    return result;
}
