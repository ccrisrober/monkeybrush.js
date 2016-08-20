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