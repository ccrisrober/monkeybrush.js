#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 uv;

uniform sampler2D tex;
uniform int mode;

void main() {
	//determine the inverse of texture size
	vec2 t = vec2(textureSize(tex, 0));
    vec2 uvv = vec2(uv.x, 1.0 - uv.y);

    float tx = 1.0/t.x;
    float ty = 1.0/t.y;

    vec2 tc[9];
    tc[0] = vec2(-tx,-ty);
    tc[1] = vec2(0,-ty);
    tc[2] = vec2(+tx,-ty);
    tc[3] = vec2(-tx,0);
    tc[4] = vec2(0,0);
    tc[5] = vec2(+tx,0);
    tc[6] = vec2(-tx,+ty);
    tc[7] = vec2(0,+ty);
    tc[8] = vec2(+tx,+ty);

    vec3 compensation = vec3(0.0,0.0,0.0);

    float coeff[9];
    // no operation
    // 0, 0, 0
    // 0, 1, 0
    // 0, 0, 0
    coeff[0] = 0.0;
    coeff[1] = 0.0;
    coeff[2] = 0.0;
    coeff[3] = 0.0;
    coeff[4] = 1.0;
    coeff[5] = 0.0;
    coeff[6] = 0.0;
    coeff[7] = 0.0;
    coeff[8] = 0.0;


    if (mode == 1) {
        // blur
        coeff[0] = 1.0 / 9.0; coeff[1] = 1.0 / 9.0; coeff[2] = 1.0 / 9.0;
        coeff[3] = 1.0 / 9.0; coeff[4] = 1.0 / 9.0; coeff[5] = 1.0 / 9.0;
        coeff[6] = 1.0 / 9.0; coeff[7] = 1.0 / 9.0; coeff[8] = 1.0 / 9.0;
    } else if (mode == 2) {
        // sharpen
        // -1, -1, -1,
        // -1,  9, -1,
        // -1, -1, -1
        coeff[0] =-1.0;
        coeff[1] =-1.0;
        coeff[2] =-1.0;
        coeff[3] =-1.0;
        coeff[4] = 9.0;
        coeff[5] =-1.0;
        coeff[6] =-1.0;
        coeff[7] =-1.0;
        coeff[8] =-1.0;
    } else if (mode == 3) {
        // edge
        // -1, -1, -1,
        // -1,  8, -1,
        // -1, -1, -1
        coeff[0] = 0.0; coeff[1] =-1.0; coeff[2] = 0.0;
        coeff[3] =-1.0; coeff[4] = 4.0; coeff[5] =-1.0;
        coeff[6] = 0.0; coeff[7] =-1.0; coeff[8] = 0.0;
    } else if (mode == 4) {
        // emboss
        // 2, 0, 0,
        // 0,-1, 0,
        // 0, 0, -1
        coeff[0] = 2.0; coeff[1] = 0.0; coeff[2] = 0.0;
        coeff[3] = 0.0; coeff[4] =-1.0; coeff[5] = 0.0;
        coeff[6] = 0.0; coeff[7] = 0.0; coeff[8] =-1.0;

        compensation = vec3(0.5,0.5,0.5);
    }

    vec3 frag = vec3(0.0);
    // for(int i=0; i<9; i++)
    //   frag += texture(tex, uvv + tc[i]).rgb * coeff[i];
    frag += texture(tex, uvv + tc[0]).rgb * coeff[0];
    frag += texture(tex, uvv + tc[1]).rgb * coeff[1];
    frag += texture(tex, uvv + tc[2]).rgb * coeff[2];
    frag += texture(tex, uvv + tc[3]).rgb * coeff[3];
    frag += texture(tex, uvv + tc[4]).rgb * coeff[4];
    frag += texture(tex, uvv + tc[5]).rgb * coeff[5];
    frag += texture(tex, uvv + tc[6]).rgb * coeff[6];
    frag += texture(tex, uvv + tc[7]).rgb * coeff[7];
    frag += texture(tex, uvv + tc[8]).rgb * coeff[8];

    if (mode == 5) {
        // grayscale
        float gray = dot(frag,vec3(0.299, 0.587, 0.114));
        gray = ((gray-0.5)*1.5)+0.5;
        fragColor.rgb = vec3(gray,gray,gray);
    } else if (mode == 6) {
        // contrast
        frag = frag - vec3(0.5,0.5,0.5);
        frag = frag * 2.0;
        frag = frag + vec3(0.5,0.5,0.5);
        fragColor.rgb = frag;
    }  else  if (mode == 7) {
        // brighten
        frag = frag * 2.0;
        fragColor.rgb = frag;
    } else if (mode == 8) {
        // darken
        frag = frag / 2.0;
        fragColor.rgb = frag;
    } else if (mode == 9) {
        // sepia
        float gray = dot( frag, vec3(0.299,0.587,0.114) );
        fragColor.rgb = vec3(1.2,1.0,0.8)*gray;
    } else {
        fragColor.rgb = frag + compensation;
    }
    fragColor.a = 1.0;
}
