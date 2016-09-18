#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 uv;

uniform float iGlobalTime;

#define RAY_STEPS 75

const float BRIGHTNESS = 1.2;
const float GAMMA = 2.;
const float SATURATION = 0.53;

float detail = .001;
#define t iGlobalTime*.5

const vec3 origin=vec3(-1.,.7,0.);
float det=0.0;

mat2 rotation(float a) {
	return mat2(cos(a),sin(a),-sin(a),cos(a));	
}

// "Amazing Surface" fractal
vec4 formula(vec4 p) {
	p.xz = abs(p.xz+ 1.)-abs(p.xz-1.5)-p.xz;
	p.y -=.45;
	p.xy *= rotation(radians(66.));
	p *= 2./clamp(dot(p.xyz,p.xyz),.2,1.);
	return p;
}

// Distance function
float distFun(vec3 pos) {
	pos.y+=sin(pos.z-t*4.)*.45; //waves!
	float hid=0.;
	vec3 tpos=pos;
	tpos.z=abs(3.-mod(tpos.z,9.));
	vec4 p=vec4(tpos,1.);
	for (int i=0; i<7; ++i) {
        p = formula(p);
    }
	float fr=(length(max(vec2(0.),p.yz-1.5))-1.)/p.w;
	float ro=max(abs(pos.x+1.)-.3,pos.y-.35);
		  ro=max(ro,-max(abs(pos.x+1.)-.1,pos.y-.5));
	pos.z=abs(.25-mod(pos.z,.5));
		  ro=max(ro,-max(abs(pos.z)-.2,pos.y-.3));
		  ro=max(ro,-max(abs(pos.z)-.01,-pos.y+.32));
	float d=min(fr,ro);
	return d;
}


// Camera path
vec3 path(float ti) {
	vec3  p=vec3(0.0,(1.)*.5,-ti*5.)*.5;
	return p;
}

// Calc normals, and here is edge detection, set to variable "edge"

float edge=0.;
vec3 normal(vec3 p) { 
	vec3 e = vec3(0.0,det*5.,0.0);

	float d1=distFun(p-e.yxx),d2=distFun(p+e.yxx);
	float d3=distFun(p-e.xyx),d4=distFun(p+e.xyx);
	float d5=distFun(p-e.xxy),d6=distFun(p+e.xxy);
	float d=distFun(p);
	edge=abs(d-0.5*(d2+d1))+abs(d-0.5*(d4+d3))+abs(d-0.5*(d6+d5));//edge finder
	edge=min(1.,pow(edge,.55)*15.);
	return normalize(vec3(d1-d2,d3-d4,d5-d6));
}

// Raymarching and 2D graphics
vec3 raymarch(in vec3 from, in vec3 dir)
{
	edge=0.;
	vec3 p, norm;
	float d = 50.;
	float totdist = 0.;
	for (int i = 0; i < RAY_STEPS; ++i) {
		if (d > det && totdist < 50.0) {
			p = from + totdist * dir;
			d = distFun(p);
			det = detail * exp(.1 * totdist);
			totdist+=d; 
		}
	}
	p -= (det - d) * dir;
	norm = vec3(0.5) - normal(p);
	vec3 col = (1.-abs(norm))*max(0.,1.-edge); // set normal as color with dark edges
	totdist=clamp(totdist,0.,26.);
	dir.y-=.02;
	
	vec3 backg = vec3(1.);
	if (totdist>25.) col=backg; // hit background
	col=pow(col,vec3(GAMMA))*BRIGHTNESS;
	col=mix(vec3(length(col)),col,SATURATION);
	return col;
}

// get camera position
vec3 move_camera(inout vec3 dir) {
	vec3 go = path(t*.66);
	vec3 adv = path(t);
	vec3 advec = normalize(adv-go);
	float an = atan(advec.x,advec.z);
	dir.xz *= mat2(cos(an),sin(an),-sin(an),cos(an));
	return go;
}

void main() {
	vec2 uvv = uv*2.-1.;
	
	float fov = 1.0 - max(0.0, 1.0 - iGlobalTime * 0.3);
	vec3 dir =normalize(vec3(uvv*fov,1.));
    
	vec3 from = origin + move_camera(dir);
    
	fragColor = vec4(raymarch(from, dir), 1.0);
}
