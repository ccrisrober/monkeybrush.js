#version 300 es
precision highp float;

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;
layout(location = 2) in vec2 uv;
layout(location = 3) in vec3 offset;

out vec3 outPosition;
out vec3 outNormal;
out vec2 outUV;
out vec3 lp;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform vec3 lightPosition;
uniform float time;

uniform sampler2D tex;

void main() {

	vec3 pos = position;

    /*mat3 normalMatrix = mat3(inverse(transpose(model)));
    float heightFactor = 7.5;

    const vec2 size = vec2(0.5,0.0);
    const ivec3 off = ivec3(-1,0,1);
    vec4 wave = texture(tex, uv);
    float s11 = wave.x;
    float s01 = textureOffset(tex, uv, off.xy).x;
    float s21 = textureOffset(tex, uv, off.zy).x;
    float s10 = textureOffset(tex, uv, off.yx).x;
    float s12 = textureOffset(tex, uv, off.yz).x;
    vec3 va = normalize(vec3(size.xy,s21-s01));
    vec3 vb = normalize(vec3(size.yx,s12-s10));
    vec4 bump = vec4( cross(va,vb), s11 );

    //pos.y += heightFactor * bump.w; // * sin(time + bump.w);
    outNormal = bump.xyz;


    lp = (view * model * vec4(lightPosition, 1.0)).rgb;



		//outPosition = (view * model * vec4(pos, 1.0)).xyz;
		vec4 pp = model * vec4(pos, 1.0);
		pp.xyz += offset;
		pp = view * pp;
		outPosition = pp.xyz;
		outUV = uv;
		outNormal = normalize(normalMatrix * normal);*/
	gl_Position = projection * view * model * vec4(pos, 1.0);

    outPosition = vec3(view * model * vec4(pos, 1.0));

    gl_PointSize = 25.0;
	mat3 normalMatrix = mat3(inverse(transpose(model)));
	outNormal = normalize(normalMatrix * normal);
	outUV = uv;
}
