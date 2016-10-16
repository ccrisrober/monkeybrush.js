#version 300 es
precision highp float;
precision highp int;

#define SHADER_NAME ${ShaderName}
uniform vec3 cameraPosition;

in vec3 outPosition;
in vec3 outNormal;

out ve4 fragColor;



#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;




void main() {
    fragColor = vec4(outNormal, 1.0);

    #ifdef USE_FOG
        float depth = gl_FragCoord.z / gl_FragCoord.w;
        #ifdef FOG2
            float fogFactor = 0.0;
        #else
            float fogFactor = smoothstep(fogNear, fogFar, depth);
        #endif
        fragColor.rgb = mix(fragColor.rgb, fogColor, fogFactor);
    #endif
}
