# monkeybrush.js
![Logo](_images/logo.png)

Monkey Brush is a library that adds OOP for WebGL 1/2 using Typescript

## init
```bash
npm install && bower install
gulp build-debug # Compile project
gulp typedoc # Generate documentation
gulp tslint # Check tslint style
gulp typescript # Generate definition file
```
<div style="width: 100%">
    <img src="_images/descarga.png"      width="24.61%" />
    <img src="_images/descarga (1).png"  width="24.61%" />
    <img src="_images/descarga (2).png"  width="24.61%" />
    <img src="_images/descarga (3).png"  width="24.61%" />
    <img src="_images/descarga (4).png"  width="24.61%" />
    <img src="_images/descarga (5).png"  width="24.61%" />
    <img src="_images/descarga (6).png"  width="24.61%" />
    <img src="_images/descarga (7).png"  width="24.61%" />
    <img src="_images/descarga (8).png"  width="24.61%" />
    <img src="_images/descarga (9).png"  width="24.61%" />
    <img src="_images/descarga (10).png" width="24.61%" />
    <img src="_images/descarga (11).png" width="24.61%" />
    <img src="_images/descarga (12).png" width="24.61%" />
    <img src="_images/descarga (13).png" width="24.61%" />
    <img src="_images/descarga (14).png" width="24.61%" />
</div>

## Doc
<a href="./tutorials.md">Doc</a>

## TODO

### Models
- [ ] Add glTF (https://github.com/KhronosGroup/glTF)

### Cameras
- [ ] Orbit Camera
- [ ] Free Camera (FPS Camera)
- [ ] Cube Camera

### Shading lighting
- [ ] Ward shading
- [ ] Cook-Torrance shading

### Maths
- [ ] SIMD instructions

### Resources
- [ ] Fonts
- [ ] Generate video capture

### Core
- [ ] Sprites (HUD)
- [ ] Picking
- [ ] PBO (http://www.songho.ca/opengl/gl_pbo.html#create)

### Help

## Changelog
- (09/17/2016) Release first version
- (09/19/2016) Completed Depth, Color, Stencil, Culling and Blending in GlobalState.
- (09/20/2016) Added VertexBufferGeometry to models
- (09/26/2016) Removed Core. GLContext time.
- (09/29/2016) Refactorized all textures classes.
- (10/11/2016) Started scenegraph with node, scene and engine.
- (10/14/2016) Started test environment.
- (10/15/2016) Started material system.
- (10/17/2016) Added EventDispatcher.
- (10/18/2016) Added Volumetric Model material.
