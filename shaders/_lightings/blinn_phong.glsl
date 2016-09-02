// Code based in https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_shading_model
float blinnPhong(in vec3 lightDir, in vec3 viewDir, in vec3 surfNormal, float shininess) {
    vec3 h = normalize(viewDir + lightDir);
    return pow(max(dot(surfNormal, h), 0.0), shininess);
}
