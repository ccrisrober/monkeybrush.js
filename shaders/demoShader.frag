#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;
in vec3 lp;

out vec4 fragColor;

uniform sampler2D tex;
uniform sampler2D tex2;

uniform vec3 viewPos;

vec3 normals(vec3 pos) {
    vec3 fdx = dFdx(pos);
    vec3 fdy = dFdy(pos);
    return normalize(cross(fdx, fdy));
}

void main() {
    //fragColor = vec4(outUV, 0.0, 1.0);

    //fragColor = texture(tex, outUV);

    //fragColor = vec4(outNormal, 1.0);

    vec3 color = vec3(0.0, 0.0, 1.0);
    //color = texture(tex2, outUV).xyz;

    // Ambient
    vec3 ambient = vec3(0.2);

    // Diffuse
    vec3 norm = normalize(normals(outPosition)); //outNormal);
    vec3 lightDir = normalize(lp - outPosition);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = vec3(0.5) * diff;

    // Specular
    vec3 viewDir = normalize(viewPos - outPosition);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 1.0);
    vec3 specular = vec3(spec);

    // Attenuation
    float dst    = length(lp - outPosition);
    float attenuation = 1.0f / (1.0 + 0.09 * dst + 0.032 * (dst * dst));

    //ambient  *= attenuation;
    //diffuse  *= attenuation;
    //specular *= attenuation;

    fragColor = vec4((ambient + diffuse + specular) * color, 1.0);

    fragColor.rgb = outNormal;
    //fragColor.rgb = normals(outPosition);
    //fragColor = texture(tex, vec2(gl_PointCoord.x, gl_PointCoord.y));
}
