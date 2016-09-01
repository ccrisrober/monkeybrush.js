vec2 matcap(in vec3 eyePos, in vec3 surfNormal) {
    vec3 R = reflect(eyePos, surfNormal);

    float m = 2.0 * sqrt(
        pow(R.x, 2.0) +
        pow(R.y, 2.0) +
        pow(R.z + 1.0, 2.0)
    );

    return R.xy / m + 0.5;
}

/*
    vec2 uv = matcap(eyeVector, normalVector);
    gl_FragColor = vec4(texture2D(texture, uv).rgb, 1.0);
*/
