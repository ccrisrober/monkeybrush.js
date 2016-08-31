precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec3 offset;

varying vec3 outPosition;
varying vec3 outNormal;
varying vec2 outUV;
varying vec3 lp;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform vec3 lightPosition;

highp mat4 transpose(in highp mat4 inMatrix) {
    highp vec4 i0 = inMatrix[0];
    highp vec4 i1 = inMatrix[1];
    highp vec4 i2 = inMatrix[2];
    highp vec4 i3 = inMatrix[3];

    highp mat4 outMatrix = mat4(
                 vec4(i0.x, i1.x, i2.x, i3.x),
                 vec4(i0.y, i1.y, i2.y, i3.y),
                 vec4(i0.z, i1.z, i2.z, i3.z),
                 vec4(i0.w, i1.w, i2.w, i3.w)
	);

    return outMatrix;
}

void main() {
	//mat3 normalMatrix = mat3(inverse(transpose(model)));
	mat3 normalMatrix = mat3(transpose(model));


	vec3 pos = position;


	//outPosition = (view * model * vec4(pos, 1.0)).xyz;
	vec4 pp = model * vec4(pos, 1.0);
	pp.xyz += offset;
	pp = view * pp;
	outPosition = pp.xyz;
	outUV = uv;
	outNormal = normal; // normalize(normalMatrix * normal);
	gl_Position = projection * pp;

	lp = (view * model * vec4(lightPosition, 1.0)).rgb;
}
