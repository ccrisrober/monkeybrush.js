# monkeybrush.js
![Logo](logo.png)

Monkey Brush is a library that adds OOP for WebGL 1/2 using Typescript

## init
```bash
npm install && bower install
npm start # Open server in 3000 port
npm script build # Compile project
tslint lib/**/*.ts --exclude lib/**/*.d.ts > tslintwarnings.txt # Check TSlint rules
```
<div style="width: 100%">
    <img src="descarga.png" width="33%" />
    <img src="descarga (2).png" width="33%" />
    <img src="descarga (3).png" width="33%" />
    <img src="descarga (4).png" width="33%" />
</div>

## Doc
<a href="./tutorials.md">Doc</a>

## TODO

### Models
- [x] Add quad/plane model
- [x] Add cube model
- [x] Add sphere model
- [x] Add torus model
- [x] Add cone model
- [x] Add prism model
- [x] Add cylinder model
- [x] Add disc model
- [x] Add object parser (faces: x1/y1/z1 x2/y2/z2 x3/y3/z3)
- [x] Add custom model (indices, vertices, normals and texcoords list)
- [ ] Add glTF (https://github.com/KhronosGroup/glTF)

### Cameras
- [x] Finish Perspective Camera
- [x] Finish Orthographic Camera

### Textures
- [x] Add texture 2D
- [x] Add texture 3D
- [x] Add framebuffer
- [ ] Inmutable texturea

### WebGL2
- [x] Transform feedback
- [x] Occlusion Query
- [x] Query object
- [x] Sampler object
- [x] Sync object
- [ ] UBO (projection, view, model, normalMatrix)

### Maths
- [x] Vect2
- [x] Vect3
- [x] Vect3
- [x] Quaternion
- [x] Mat2
- [x] Mat3
- [x] Mat4

### Resources
- [x] Audio supporting (Background)
- [x] Audio supporting (SimpleAudio)
- [x] HDR images supporting
- [x] Image upload
- [x] Skybox supporting
- [ ] Fonts
- [ ] Video texture
- [ ] Webcam texture
- [ ] Generate video capture

### Core
- [x] App class
- [x] Key input
- [x] Mouse input
- [x] Easing functions
- [x] VertexArray class
- [x] Instancing
- [ ] Sprites (HUD)
- [ ] Picking
- [ ] Multi context
- [ ] Workers

### Development
- [x] Grunt integration
- [x] Webpack integration
- [x] Typescript definition file for WebGL2RenderingContext
- [x] Shader uniforms and attributes extraction

### Demos
- [x] Rim Lighting
- [x] Deferred Shading
- [x] Tone mapping
- [x] Skybox reflection and refraction
- [ ] Heightmap
- [ ] Texture LOD DEMO
- [ ] Normal Mapping
- [ ] Bump Mapping
- [ ] Tiled Deferred Shading
- [ ] SSAO
- [ ] HDR
- [ ] Basic Transparency
- [ ] Woit Transparency
- [ ] Simple Shadow
- [ ] Create "shadertoy" for desktop

### Help
> - tslint lib/**/*.ts --exclude lib/**/*.d.ts > tslintwarnings.txt
> - https://www.npmjs.com/package/webpack-glsl-loader
> - http://www.jbrantly.com/es6-modules-with-typescript-and-webpack/
