# monkeybrush.js
![Logo](logo.png)

## init
```bash
npm install && bower install
grunt # Open server and open webpage
grunt serve # Only open server (http://localhost:3030/index.html)
```
![alt tag](descarga.png)

## TODO
- [ ] Add glTF (https://github.com/KhronosGroup/glTF)
- [x] Add quad/plane model
- [x] Add cube model
- [x] Add sphere model
- [x] Add torus model
- [x] Add object parser (faces: x1/y1/z1 x2/y2/z2 x3/y3/z3)
- [x] Finish Perspective Camera
- [x] Finish Orthographic Camera
- [x] Add texture 2D
- [x] Add texture 3D
- [x] Add framebuffer
- [ ] Float texture (gl.getExtension("OES_texture_float_linear");) (?)
- [x] Instancing
- [ ] Sprites (HUD)
- [x] VertexArray class
- [ ] Create "shadertoy" for desktop
- [x] Rim Lighting
- [x] Deferred Shading
- [ ] Tiled Deferred Shading
- [ ] SSAO
- [ ] HDR
- [ ] Simple Shadow
- [ ] Fonts
- [x] Audio supporting (Background)
- [x] Audio supporting (SimpleAudio)
- [x] HDR images supporting
- [ ] Webcam texture
- [ ] Video texture
- [ ] Occlusion Query
- [ ] Multi context
- [ ] Picking
- [ ] Workers
- [ ] Basic Transparency
- [ ] Woit Transparency
- [x] Transform feedback
- [ ] Shader extraction (https://github.com/mattdesl/gl-shader-extract)
- [ ] UBO (projection, view, model, normalMatrix)
- [x] Vect2
- [x] Vect3
- [x] Vect3
- [x] Quaternion
- [x] Mat2
- [ ] Mat3
- [ ] Mat4
- [x] Webpack integration
- [x] Key input
- [x] Mouse input

```bash
tslint lib/**/*.ts --exclude lib/**/*.d.ts > tslintwarnings.txt
```
https://www.npmjs.com/package/webpack-glsl-loader
http://www.jbrantly.com/es6-modules-with-typescript-and-webpack/
