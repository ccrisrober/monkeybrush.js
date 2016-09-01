float phongSpecular(vec3 lightDir, vec3 viewDir, vec3 surfNormal, float shininess) {
    vec3 reflectDir = reflect(-lightDir, surfNormal);
    return pow(max(dot(viewDir, reflectDir), 0.0), shininess);
}
