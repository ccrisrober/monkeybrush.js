#pragma glslify: Material = require(./material.glsl)
#pragma glslify: PointLight = require(./light.glsl)
vec3 blinnPhong (
	Material material,
	PointLight light,
	vec3 surfaceNormal,
	vec3 surfacePosition,
	vec3 viewDirection) {

	vec3 L = normalize(light.position - surfacePosition);
	vec3 H = normalize(viewDirection + surfaceNormal);
	vec3 ambient = light.ambient * material.color;
	vec3 diffuse = max(0.0, dot(L, surfaceNormal)) * light.diffuse *
	material.color;
	float specular = pow(max(0.0, dot(L, H)), material.phongExponent);
	return material.kAmbient * ambient +
		material.kDiffuse * diffuse +
		material.kSpecular * specular;
}
#pragma glslify: export(blinnPhong)