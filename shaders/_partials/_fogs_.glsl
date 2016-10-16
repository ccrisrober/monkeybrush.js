#ifdef ENABLE_FOG
    uniform vec3 fogColor;
    #ifdef ENABLE_FOGEXP2
        uniform float fogDensity;
    #else
        uniform float fogNear;
        uniform float fogFar;
    #endif
#endif


// ============================


#ifdef ENABLE_FOG
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    #ifdef ENABLE_FOGEXP2
        const float LOG2 = 1.442695;
        float fogFactor = exp2(-fogDensity * fogDensity * depth * depth * LOG2);
        fogFactor = 1.0 - clamp(fogFactor, 0.0, 1.0);
    #else
        float fogFactor = smoothstep(fogNear, fogFar, depth);
    #endif
    fogColor = mix(fogColor, vec4(fogColor, fogColor.w), fogFactor);
#endif


// ====================
// Default:
// fog.Add("fogDensity", 0.00025f);
// fog.Add("fogNear", 1);
// fog.Add("fogFar", 2000);
// fog.Add("fogColor", Color.White);
