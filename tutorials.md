## Flat shading
```glsl
[ vertex code ]
flat out vec3 outNormal;
[ fragment code ]
flat in vec3 outNormal;
```

## Anisotropic Filter
```javascript
var ext = gl_.getExtension("EXT_texture_filter_anisotropic");
var max_anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, 4);
```

## Occlusion query
```typescript
let query: Query = new Query();

// =======================================
// =======================================
// =======================================

if (renderOK === false) {
    query.useAnySamplesConservative(function() {
        gl.colorMask(false, false, false, false);
        gl.depthMask(false);
        // Draw
        gl.colorMask(true, true, true, true);
        gl.depthMask(true);
    });
    renderOK = true;
} else {
    if (!query.isResultAvailable()) {
        return;
    } else {
        var samplesPassed = query.getResult();
        console.log('Any samples passed: ' + Number(samplesPassed));
        if (query) {
            // Draw
            renderOK = false;
        }
    }
};

// =======================================
// =======================================
// =======================================

query.destroy();
```

## Sampler
```typescript
let samplerA: Sampler = new Sampler();
samplerA.setParams({
    minFilter: gl.NEAREST,
    magFilter: gl.NEAREST,
    wrapS: gl.CLAMP_TO_EDGE,
    wrapT: gl.CLAMP_TO_EDGE/*,
    wrapR: gl.CLAMP_TO_EDGE,
    compareFunc: gl.NONE,
    compareMode: gl.LEQUAL*/
});
let samplerB: Sampler = new Sampler();
samplerB.setParams({
    minFilter: gl.LINEAR,
    magFilter: gl.LINEAR,
    wrapS: gl.REPEAT,
    wrapT: gl.REPEAT/*,
    minLOD: -1000.0,
    maxLOD: 1000.0*/
});

let samplerC: Sampler = new Sampler();
samplerC.setParams({
    minFilter: gl.NEAREST,
    magFilter: gl.LINEAR,
    wrapS: gl.MIRRORED_REPEAT,
    wrapT: gl.CLAMP_TO_EDGE,
});

samplerA.bind(0);
tex2d.bind(0);
```
## Sync
```typescript
let sync: Sync;
function update(...) {
    // ...
    sync = new Sync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
}
function draw(...) {
    sync.wait(0, gl.TIMEOUT_IGNORED);
    sync.destroy();
    // draw objects
}

```

## Uniform Buffer Object (UBO)
```glsl
#version 300 es
precision highp float;
...

layout(std140, column_major) uniform;

uniform UboDemo {
    mat4 projection;
    mat4 view;
} ubo1;

uniform mat4 model;

...

void main() {
    ...
    outPosition = model * vec4(pos, 1.0);
    outPosition = ubo1.view * outPosition;
    gl_Position = ubo1.projection * outPosition;
}
```

```typescript
// Create
let uniformPerDrawBuffer: VertexUBO = new VertexUBO(program, "UboDemo", 0);

// Update
let transforms = new Float32Array([]);
transforms = utils.Float32Concat(transforms, projection);
transforms = utils.Float32Concat(transforms, view);

uniformPerDrawBuffer.update(transforms);

// Drawing
...
...
```

## Custom model
```typescript
let customModel: CustomModel = new CustomModel([
    0,  1,  2,
    0,  2,  3,
    0,  3,  4,
    0,  4,  5,
    0,  5,  6,
    0,  6,  7,
    0,  7,  8,
    0,  8,  9,
    0,  9, 10,
    0, 10,  1
], [
      1.5,       0.0,       0.0,
     -1.5,       1.0,       0.0,
     -1.5,  0.809017,  0.587785,
     -1.5,  0.309017,  0.951057,
     -1.5, -0.309017,  0.951057,
     -1.5, -0.809017,  0.587785,
     -1.5,      -1.0,       0.0,
     -1.5, -0.809017, -0.587785,
     -1.5, -0.309017, -0.951057,
     -1.5,  0.309017, -0.951057,
     -1.5,  0.809017, -0.587785
]);
```
## Random numbers
```javascript
for (var i = 0; i < 10; ++i) {
    console.log(utils.random.nextInt(1, 6));
}
for (var i = 0; i < 10; ++i) {
    console.log(utils.random.next());
}
```


## Stereo rendering (anaglyph)
```typescript
if (enableStereo) {
    this.camera.translate(-this.dio, 0.0, 0.0);
    gl.colorMask(true, false, false, false);
    // Draw scene
    this.camera.translate(this.dio, 0.0, 0.0);
    gl.colorMask(false, true, true, true);
    // Draw scene
    gl.colorMask(true, true, true, true);
}
```

## Stereo rendering (complex)
```typescript
// left eye
gl.viewport(0, 0, canvas.width / 2, canvas.height);
mat4.multiply(mvpMatrix, leftEyeProjectionMatrix, leftEyeViewMatrix);
gl.uniformMatrix4fv(uniforms.uMVPMatrixLocation, false, mvpMatrix);
// Draw scene

// right eye
gl.viewport(canvas.width / 2, 0, canvas.width / 2, canvas.height);
mat4.multiply(mvpMatrix, rightEyeProjectionMatrix, rightEyeViewMatrix);
gl.uniformMatrix4fv(uniforms.uMVPMatrixLocation, false, mvpMatrix);
// Draw scene
```

## Video texture
```typescript 
let videoTex: MB.VideoTexture;
function load() {
    // ...
    MB.Loaders.loadVideo("assets/video/Possum vs Cat.mp4", "video");
}

function init() {
    // ...
    videoTex = new MB.VideoTexture(MB.ResourceMap.retrieveAsset("video"));
}

function draw() {
   // ...
   videoTex.bind(0); 
}
```

## Webcamp texture
```typescript 
let webcamTex: MB.VideoTexture;
function load() {
    // ...
    MB.Loaders.loadWebCam();    # Only load this one time
}

function init() {
    // ...
    webcamTex = new MB.WebcamTexture();
}

function draw() {
   // ...
   webcamTex.bind(0); 
}
```
