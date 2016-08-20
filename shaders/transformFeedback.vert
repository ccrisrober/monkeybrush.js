#version 300 es
in vec3 position;
void main(void) {
   gl_PointSize = 20.;
   gl_Position = vec4(-position.x, position.yz, 1.0);
}
