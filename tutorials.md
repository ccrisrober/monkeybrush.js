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
