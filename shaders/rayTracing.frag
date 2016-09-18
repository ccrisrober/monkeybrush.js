#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 uv;

uniform float iGlobalTime;

#define INFINITY 100000.0

vec4 sphere1 = vec4(0.0, 1.0, 0.0, 0.5);

float iSphere(in vec3 sc, in vec3 sr, in vec4 sph) {
    vec3 oc = sc - sph.xyz;
    float b = dot(oc, sr);
    float c = dot(oc,oc) - sph.w * sph.w;
    float t = b * b - c;
    if (t > 0.0) {
    	t = -b - sqrt(t);
    }
    return t;

}

vec3 nSphere(in vec3 pos, in vec4 sph) {
	return (pos - sph.xyz) / sph.w;
}

float iPlane(in vec3 ro, in vec3 rd) {
    return -ro.y / rd.y;
}

vec3 nPlane(in vec3 pos) {
	return vec3(0.0, 1.0, 0.0);
}

float intersect(in vec3 ro, in vec3 rd, out float hit) {
    hit = INFINITY; // infinity kinda
    float id = -1.0;
	float tsph = iSphere(ro, rd, sphere1); // test for instersection with sphere
    float tpla = iPlane(ro, rd);  // intersece with plane
    if(tsph > 0.0) {
        id = 1.0; // intersected with sphere
        hit = tsph; //setting what value of t the intersection took place
    }
    if(tpla > 0.0 && tpla < hit) { // if I interesect with t and this is before the sphere
        id = 2.0; // intersected with plane
        hit = tpla;
    }
    
    return id;
}

void main() {
    vec3 light = normalize(vec3(0.57703));
    
    // Move sphere
    sphere1.xyz += vec3(
    	0.5 * cos(iGlobalTime),
    	0.33 * cos(iGlobalTime),
    	0.5 * sin(iGlobalTime)
	);
    
    // Generate a ray with origin ro and direction rd
    vec3 ro = vec3(0.0, 1.0, 2.5);
   	// I believe it is world space transforms
    vec3 rd = normalize(vec3((-1.0 + 2.0 * uv) * vec2(1.78,1.0), -1.0));
    
    float hit;
    float id = intersect(ro, rd, hit);
    
    // Lighting Calculations need normals
    vec3 col = vec3(0.0, 0.0, 0.0);
	// Sphere hit
    if(id > 0.5 && id < 1.5) {
        vec3 pos = ro + hit * rd;
        vec3 nor = nSphere(pos, sphere1);
        float diff = clamp(dot(nor, light), 0.0, 1.0);
        float ao = 0.5 + 0.5 * nor.y; // ambient oclusion trick
        col = vec3(1.0, 0.0, 1.0) * diff * ao + vec3(0.1, 0.2, 0.4) * ao;
    } 
    // Plane hit
    else if(id > 1.5) { 
        vec3 pos = ro + hit * rd;
        vec3 nor = nPlane(pos);
        float diff = clamp(dot(nor,light), 0.0, 1.0);
        float amb = smoothstep(0.0, 2.0 * sphere1.w, length(pos.xz - sphere1.xz)); // ambient oclusion trick
        col = vec3(amb * 0.7);
    }
    // Gamma correction
    col = sqrt(col);
	fragColor = vec4(col,1.0);
}