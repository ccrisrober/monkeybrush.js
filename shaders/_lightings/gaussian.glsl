float gaussianSpecular(vec3 lightDir, vec3 viewDir, vec3 surfNormal, float shininess) {
    vec3 h = normalize(lightDir + viewDir);
    float theta = acos(dot(h, surfNormal));
    float e = theta / shininess;
    return -(e * e);
}
// Code based in https://paroj.github.io/gltut/Illumination/Tut11%20Gaussian.html
