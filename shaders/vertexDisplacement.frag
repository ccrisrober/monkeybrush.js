#version 300 es
precision highp float;

in vec3 outPosition;
in vec3 outNormal;
in vec2 outUV;
in vec3 lp;

uniform sampler2D tex;

uniform vec3 viewPos;

layout ( location = 0 ) out vec4 fragColor;

vec3 phongModel(vec3 kd) {
    vec3 n = outNormal;
    if( !gl_FrontFacing ) n = -n;
    vec3 s = normalize(lp - outPosition);
    vec3 v = normalize(-outPosition);
    vec3 r = reflect( -s, n );
    float sDotN = max( dot(s,n), 0.0 );
    vec3 diffuse = kd * sDotN;
    vec3 spec = vec3(0.0);
    if( sDotN > 0.0 )
        spec = vec3(1.0) *
            pow( max( dot(r,v), 0.0 ), 1.0 );

    return vec3(0.8) + diffuse + spec;
}

void main()
{
    fragColor = vec4( phongModel(vec3(1.0, 0.8, 0.0)) , 1.0 );
}
