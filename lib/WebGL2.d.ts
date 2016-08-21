interface HTMLCanvasElement extends HTMLElement {
    /**
      * Returns an object that provides methods and properties for drawing and manipulating images and graphics on a canvas element in a document. A context object includes information about colors, line widths, fonts, and other graphic parameters that can be drawn on a canvas.
      * @param contextId The identifier (ID) of the type of canvas to create. Internet Explorer 9 and Internet Explorer 10 support only a 2-D context using canvas.getContext("2d"); IE11 Preview also supports 3-D or WebGL context using canvas.getContext("experimental-webgl");
      */
    getContext(contextId: "webgl2"): WebGL2RenderingContext;
}

interface WebGLQuery extends WebGLObject {
}

interface WebGLSampler extends WebGLObject {
}

interface WebGLSync extends WebGLObject {
}

interface WebGLTransformFeedback extends WebGLObject {
}



interface WebGLVertexArrayObject extends WebGLObject {
}

//type TexImageSource = ImageBitmap | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
declare type TexImageSource = ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
//typedef(Uint32Array or sequence < GLuint>) UniformUIVSource;
declare type UniformUIVSource = Uint32Array | number[];
//typedef(Float32Array or sequence <GLfloat>) UniformMatrixFVSource;
declare type UniformMatrixFVSource = Float32Array | number[];
//typedef(Int32Array or sequence < GLint>) VertexAttribIVSource;
declare type VertexAttribIVSource = Int32Array | number[];
//typedef(Uint32Array or sequence <GLuint>) VertexAttribUIVSource;
declare type VertexAttribUIVSource = Uint32Array | number[];
//typedef(Int32Array or sequence < GLint>) ClearBufferIVSource;
declare type ClearBufferIVSource = Int32Array | number[];
//typedef(Uint32Array or sequence < GLuint>) ClearBufferUIVSource;
declare type ClearBufferUIVSource = Uint32Array | number[];
//typedef(Float32Array or sequence < GLfloat>) ClearBufferFVSource;
declare type ClearBufferFVSource = Float32Array | number[];

interface WebGL2RenderingContext extends WebGLRenderingContext
{
    READ_BUFFER : number;
    UNPACK_ROW_LENGTH : number;
    UNPACK_SKIP_ROWS : number;
    UNPACK_SKIP_PIXELS : number;
    PACK_ROW_LENGTH : number;
    PACK_SKIP_ROWS : number;
    PACK_SKIP_PIXELS : number;
    COLOR : number;
    DEPTH : number;
    STENCIL : number;
    RED : number;
    RGB8 : number;
    RGBA8 : number;
    RGB10_A2 : number;
    TEXTURE_BINDING_3D : number;
    UNPACK_SKIP_IMAGES : number;
    UNPACK_IMAGE_HEIGHT : number;
    TEXTURE_3D : number;
    TEXTURE_WRAP_R : number;
    MAX_3D_TEXTURE_SIZE : number;
    UNSIGNED_INT_2_10_10_10_REV : number;
    MAX_ELEMENTS_VERTICES : number;
    MAX_ELEMENTS_INDICES : number;
    TEXTURE_MIN_LOD : number;
    TEXTURE_MAX_LOD : number;
    TEXTURE_BASE_LEVEL : number;
    TEXTURE_MAX_LEVEL : number;
    MIN : number;
    MAX : number;
    DEPTH_COMPONENT24 : number;
    MAX_TEXTURE_LOD_BIAS : number;
    TEXTURE_COMPARE_MODE : number;
    TEXTURE_COMPARE_FUNC : number;
    CURRENT_QUERY : number;
    QUERY_RESULT : number;
    QUERY_RESULT_AVAILABLE : number;
    STREAM_READ : number;
    STREAM_COPY : number;
    STATIC_READ : number;
    STATIC_COPY : number;
    DYNAMIC_READ : number;
    DYNAMIC_COPY : number;
    MAX_DRAW_BUFFERS : number;
    DRAW_BUFFER0 : number;
    DRAW_BUFFER1 : number;
    DRAW_BUFFER2 : number;
    DRAW_BUFFER3 : number;
    DRAW_BUFFER4 : number;
    DRAW_BUFFER5 : number;
    DRAW_BUFFER6 : number;
    DRAW_BUFFER7 : number;
    DRAW_BUFFER8 : number;
    DRAW_BUFFER9 : number;
    DRAW_BUFFER10 : number;
    DRAW_BUFFER11 : number;
    DRAW_BUFFER12 : number;
    DRAW_BUFFER13 : number;
    DRAW_BUFFER14 : number;
    DRAW_BUFFER15 : number;
    MAX_FRAGMENT_UNIFORM_COMPONENTS : number;
    MAX_VERTEX_UNIFORM_COMPONENTS : number;
    SAMPLER_3D : number;
    SAMPLER_2D_SHADOW : number;
    FRAGMENT_SHADER_DERIVATIVE_HINT : number;
    PIXEL_PACK_BUFFER : number;
    PIXEL_UNPACK_BUFFER : number;
    PIXEL_PACK_BUFFER_BINDING : number;
    PIXEL_UNPACK_BUFFER_BINDING : number;
    FLOAT_MAT2x3 : number;
    FLOAT_MAT2x4 : number;
    FLOAT_MAT3x2 : number;
    FLOAT_MAT3x4 : number;
    FLOAT_MAT4x2 : number;
    FLOAT_MAT4x3 : number;
    SRGB : number;
    SRGB8 : number;
    SRGB8_ALPHA8 : number;
    COMPARE_REF_TO_TEXTURE : number;
    RGBA32F : number;
    RGB32F : number;
    RGBA16F : number;
    RGB16F : number;
    VERTEX_ATTRIB_ARRAY_INTEGER : number;
    MAX_ARRAY_TEXTURE_LAYERS : number;
    MIN_PROGRAM_TEXEL_OFFSET : number;
    MAX_PROGRAM_TEXEL_OFFSET : number;
    MAX_VARYING_COMPONENTS : number;
    TEXTURE_2D_ARRAY : number;
    TEXTURE_BINDING_2D_ARRAY : number;
    R11F_G11F_B10F : number;
    UNSIGNED_INT_10F_11F_11F_REV : number;
    RGB9_E5 : number;
    UNSIGNED_INT_5_9_9_9_REV : number;
    TRANSFORM_FEEDBACK_BUFFER_MODE : number;
    MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS : number;
    TRANSFORM_FEEDBACK_VARYINGS : number;
    TRANSFORM_FEEDBACK_BUFFER_START : number;
    TRANSFORM_FEEDBACK_BUFFER_SIZE : number;
    TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN : number;
    RASTERIZER_DISCARD : number;
    MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS : number;
    MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS : number;
    INTERLEAVED_ATTRIBS : number;
    SEPARATE_ATTRIBS : number;
    TRANSFORM_FEEDBACK_BUFFER : number;
    TRANSFORM_FEEDBACK_BUFFER_BINDING : number;
    RGBA32UI : number;
    RGB32UI : number;
    RGBA16UI : number;
    RGB16UI : number;
    RGBA8UI : number;
    RGB8UI : number;
    RGBA32I : number;
    RGB32I : number;
    RGBA16I : number;
    RGB16I : number;
    RGBA8I : number;
    RGB8I : number;
    RED_INTEGER : number;
    RGB_INTEGER : number;
    RGBA_INTEGER : number;
    SAMPLER_2D_ARRAY : number;
    SAMPLER_2D_ARRAY_SHADOW : number;
    SAMPLER_CUBE_SHADOW : number;
    UNSIGNED_INT_VEC2 : number;
    UNSIGNED_INT_VEC3 : number;
    UNSIGNED_INT_VEC4 : number;
    INT_SAMPLER_2D : number;
    INT_SAMPLER_3D : number;
    INT_SAMPLER_CUBE : number;
    INT_SAMPLER_2D_ARRAY : number;
    UNSIGNED_INT_SAMPLER_2D : number;
    UNSIGNED_INT_SAMPLER_3D : number;
    UNSIGNED_INT_SAMPLER_CUBE : number;
    UNSIGNED_INT_SAMPLER_2D_ARRAY : number;
    DEPTH_COMPONENT32F : number;
    DEPTH32F_STENCIL8 : number;
    FLOAT_32_UNSIGNED_INT_24_8_REV : number;
    FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING : number;
    FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE : number;
    FRAMEBUFFER_ATTACHMENT_RED_SIZE : number;
    FRAMEBUFFER_ATTACHMENT_GREEN_SIZE : number;
    FRAMEBUFFER_ATTACHMENT_BLUE_SIZE : number;
    FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE : number;
    FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE : number;
    FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE : number;
    FRAMEBUFFER_DEFAULT : number;
    DEPTH_STENCIL_ATTACHMENT : number;
    DEPTH_STENCIL : number;
    UNSIGNED_INT_24_8 : number;
    DEPTH24_STENCIL8 : number;
    UNSIGNED_NORMALIZED : number;
    DRAW_FRAMEBUFFER_BINDING : number; /* Same as FRAMEBUFFER_BINDING */
    READ_FRAMEBUFFER : number;
    DRAW_FRAMEBUFFER : number;
    READ_FRAMEBUFFER_BINDING : number;
    RENDERBUFFER_SAMPLES : number;
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER : number;
    MAX_COLOR_ATTACHMENTS : number;
    COLOR_ATTACHMENT1 : number;
    COLOR_ATTACHMENT2 : number;
    COLOR_ATTACHMENT3 : number;
    COLOR_ATTACHMENT4 : number;
    COLOR_ATTACHMENT5 : number;
    COLOR_ATTACHMENT6 : number;
    COLOR_ATTACHMENT7 : number;
    COLOR_ATTACHMENT8 : number;
    COLOR_ATTACHMENT9 : number;
    COLOR_ATTACHMENT10 : number;
    COLOR_ATTACHMENT11 : number;
    COLOR_ATTACHMENT12 : number;
    COLOR_ATTACHMENT13 : number;
    COLOR_ATTACHMENT14 : number;
    COLOR_ATTACHMENT15 : number;
    FRAMEBUFFER_INCOMPLETE_MULTISAMPLE : number;
    MAX_SAMPLES : number;
    HALF_FLOAT : number;
    RG : number;
    RG_INTEGER : number;
    R8 : number;
    RG8 : number;
    R16F : number;
    R32F : number;
    RG16F : number;
    RG32F : number;
    R8I : number;
    R8UI : number;
    R16I : number;
    R16UI : number;
    R32I : number;
    R32UI : number;
    RG8I : number;
    RG8UI : number;
    RG16I : number;
    RG16UI : number;
    RG32I : number;
    RG32UI : number;
    VERTEX_ARRAY_BINDING : number;
    R8_SNORM : number;
    RG8_SNORM : number;
    RGB8_SNORM : number;
    RGBA8_SNORM : number;
    SIGNED_NORMALIZED : number;
    COPY_READ_BUFFER : number;
    COPY_WRITE_BUFFER : number;
    COPY_READ_BUFFER_BINDING : number; /* Same as COPY_READ_BUFFER */
    COPY_WRITE_BUFFER_BINDING : number; /* Same as COPY_WRITE_BUFFER */
    UNIFORM_BUFFER : number;
    UNIFORM_BUFFER_BINDING : number;
    UNIFORM_BUFFER_START : number;
    UNIFORM_BUFFER_SIZE : number;
    MAX_VERTEX_UNIFORM_BLOCKS : number;
    MAX_FRAGMENT_UNIFORM_BLOCKS : number;
    MAX_COMBINED_UNIFORM_BLOCKS : number;
    MAX_UNIFORM_BUFFER_BINDINGS : number;
    MAX_UNIFORM_BLOCK_SIZE : number;
    MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS : number;
    MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS : number;
    UNIFORM_BUFFER_OFFSET_ALIGNMENT : number;
    ACTIVE_UNIFORM_BLOCKS : number;
    UNIFORM_TYPE : number;
    UNIFORM_SIZE : number;
    UNIFORM_BLOCK_INDEX : number;
    UNIFORM_OFFSET : number;
    UNIFORM_ARRAY_STRIDE : number;
    UNIFORM_MATRIX_STRIDE : number;
    UNIFORM_IS_ROW_MAJOR : number;
    UNIFORM_BLOCK_BINDING : number;
    UNIFORM_BLOCK_DATA_SIZE : number;
    UNIFORM_BLOCK_ACTIVE_UNIFORMS : number;
    UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES : number;
    UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER : number;
    UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER : number;
    INVALID_INDEX : number;
    MAX_VERTEX_OUTPUT_COMPONENTS : number;
    MAX_FRAGMENT_INPUT_COMPONENTS : number;
    MAX_SERVER_WAIT_TIMEOUT : number;
    OBJECT_TYPE : number;
    SYNC_CONDITION : number;
    SYNC_STATUS : number;
    SYNC_FLAGS : number;
    SYNC_FENCE : number;
    SYNC_GPU_COMMANDS_COMPLETE : number;
    UNSIGNALED : number;
    SIGNALED : number;
    ALREADY_SIGNALED : number;
    TIMEOUT_EXPIRED : number;
    CONDITION_SATISFIED : number;
    WAIT_FAILED : number;
    SYNC_FLUSH_COMMANDS_BIT : number;
    VERTEX_ATTRIB_ARRAY_DIVISOR : number;
    ANY_SAMPLES_PASSED : number;
    ANY_SAMPLES_PASSED_CONSERVATIVE : number;
    SAMPLER_BINDING : number;
    RGB10_A2UI : number;
    INT_2_10_10_10_REV : number;
    TRANSFORM_FEEDBACK : number;
    TRANSFORM_FEEDBACK_PAUSED : number;
    TRANSFORM_FEEDBACK_ACTIVE : number;
    TRANSFORM_FEEDBACK_BINDING : number;
    COMPRESSED_R11_EAC : number;
    COMPRESSED_SIGNED_R11_EAC : number;
    COMPRESSED_RG11_EAC : number;
    COMPRESSED_SIGNED_RG11_EAC : number;
    COMPRESSED_RGB8_ETC2 : number;
    COMPRESSED_SRGB8_ETC2 : number;
    COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 : number;
    COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 : number;
    COMPRESSED_RGBA8_ETC2_EAC : number;
    COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : number;
    TEXTURE_IMMUTABLE_FORMAT : number;
    MAX_ELEMENT_INDEX : number;
    TEXTURE_IMMUTABLE_LEVELS : number;

    TIMEOUT_IGNORED : number;

    /* WebGL-specific enums */
    MAX_CLIENT_WAIT_TIMEOUT_WEBGL : number;

    /* Buffer objects */
    copyBufferSubData(readTarget : number, writeTarget :number, readOffset : number,
    writeOffset : number, size : number) : void;
    // MapBufferRange, in particular its read-only and write-only modes,
    // can not be exposed safely to JavaScript. GetBufferSubData
    // replaces it for the purpose of fetching data back from the GPU.
    getBufferSubData(target: number, offset: number, returnedData?: ArrayBuffer) : void;

    /* Framebuffer objects */
    blitFramebuffer(srcX0 : number, srcY0 : number, srcX1 : number, srcY1 : number, dstX0 : number, dstY0 : number,
    dstX1 : number, dstY1 : number, mask : number, filter : number) : void;
    framebufferTextureLayer(target : number, attachment : number, texture : WebGLTexture, level : number,
    layer : number) : void;
    invalidateFramebuffer(target : number, attachments : number[]);
    invalidateSubFramebuffer(target : number, attachments : number[],
        x : number, y : number, width : number, height : number) : void;
    readBuffer(src : number) : void;

    /* Renderbuffer objects */
    getInternalformatParameter(target : number, internalformat : number, pname : number) : any;
    renderbufferStorageMultisample(target : number, samples : number, internalformat : number,
    width : number, height : number) : void;

    /* Texture objects */
    texStorage2D(target : number, levels : number, internalformat : number, width : number, height : number) : void;
    texStorage3D(target : number, levels : number, internalformat : number, width : number, height : number,
    depth : number) : void;
    texImage3D(target : number, level : number, internalformat : number,
    width : number, height : number, depth : number, border : number, format : number,
    type : number, pixels : ArrayBufferView) : void;
    texSubImage3D(target : number, level : number, xoffset : number, yoffset : number, zoffset : number,
    width : number, height : number, depth : number, format : number, type : number,
    pixels : ArrayBufferView) : void;
    texSubImage3D(target : number, level : number, xoffset : number, yoffset : number, zoffset : number,
    format : number, type : number, source : TexImageSource) : void;
    copyTexSubImage3D(target : number, level : number, xoffset : number, yoffset : number, zoffset : number,
    x : number, y : number, width : number, height : number) : void;
    compressedTexImage3D(target : number, level : number, internalformat : number,
    width : number, height : number, depth : number,
    border: number, data: ArrayBufferView) : void;
    compressedTexSubImage3D(target : number, level : number, xoffset : number, yoffset : number, zoffset : number,
    width : number, height : number, depth : number,
    format : number, data : ArrayBufferView) : void;

    /* Programs and shaders */
    getFragDataLocation(program : WebGLProgram, name : string) : number;

    /* Uniforms and attributes */
    uniform1ui(location : WebGLUniformLocation, v0 : number) : void;
    uniform2ui(location: WebGLUniformLocation, v0: number, v1 : number) : void;
    uniform3ui(location: WebGLUniformLocation, v0: number, v1: number, v2 : number) : void;
    uniform4ui(location: WebGLUniformLocation, v0: number, v1: number, v2: number, v3 : number) : void;
    
    uniform1uiv(location: WebGLUniformLocation, value: UniformUIVSource) : void;
    uniform2uiv(location: WebGLUniformLocation, value: UniformUIVSource) : void;
    uniform3uiv(location: WebGLUniformLocation, value: UniformUIVSource) : void;
    uniform4uiv(location: WebGLUniformLocation, value: UniformUIVSource) : void;

    uniformMatrix2x3fv(location: WebGLUniformLocation, transpose: boolean, value: UniformMatrixFVSource) : void;
    uniformMatrix3x2fv(location: WebGLUniformLocation, transpose: boolean, value: UniformMatrixFVSource) : void;
    uniformMatrix2x4fv(location: WebGLUniformLocation, transpose: boolean, value: UniformMatrixFVSource): void;
    uniformMatrix4x2fv(location: WebGLUniformLocation, transpose: boolean, value: UniformMatrixFVSource): void;
    uniformMatrix3x4fv(location: WebGLUniformLocation, transpose: boolean, value: UniformMatrixFVSource): void;
    uniformMatrix4x3fv(location: WebGLUniformLocation, transpose: boolean, value: UniformMatrixFVSource): void;
    vertexAttribI4i(index : number, x : number, y : number, z : number, w : number) : void;

    //typedef(Int32Array or sequence < GLint>) VertexAttribIVSource;

    vertexAttribI4iv(index : number, values: VertexAttribIVSource) : void;
    vertexAttribI4ui(index : number, x : number, y : number, z : number, w : number) : void;
    //typedef(Uint32Array or sequence < GLuint>) VertexAttribUIVSource;
    vertexAttribI4uiv(index: number, values: VertexAttribUIVSource) : void;
    vertexAttribIPointer(index: number, size : number, type: number, stride: number, offset: number) : void;

    /* Writing to the drawing buffer */
    vertexAttribDivisor(index: number, divisor: number);
    drawArraysInstanced(mode: number, first: number, count: number, instanceCount: number) : void;
    drawElementsInstanced(mode: number, count: number, type: number, offset: number, instanceCount: number) : void;
    /* TODO(kbr): argue against exposing this because it can't safely
    offer better performance than drawElements */
    drawRangeElements(mode: number, start: number, end: number, count: number, type: number, offset : number) : void;

    /* Multiple Render Targets */
    drawBuffers(buffers : number[]) : void;
    //typedef(Int32Array or sequence < GLint>) ClearBufferIVSource;
    //typedef(Uint32Array or sequence < GLuint>) ClearBufferUIVSource;
    //typedef(Float32Array or sequence < GLfloat>) ClearBufferFVSource;

    clearBufferiv(buffer: number, drawbuffer: number, value: ClearBufferIVSource) : void;
    clearBufferuiv(buffer: number, drawbuffer: number, value: ClearBufferUIVSource) : void;
    clearBufferfv(buffer: number, drawbuffer: number, value: ClearBufferFVSource) : void;
    clearBufferfi(buffer: number, drawbuffer: number, depth: number, stencil : number) : void;

    /* Query Objects */
    createQuery(): WebGLQuery;
    deleteQuery(query: WebGLQuery);
    isQuery(query: WebGLQuery) : boolean;
    beginQuery(target: number, query: WebGLQuery) : void;
    endQuery(target : number) : void;
    getQuery(target : number, pname : number): WebGLQuery;
    getQueryParameter(query: WebGLQuery, pname : number) : any;

    /* Sampler Objects */
    createSampler() : WebGLSampler;
    deleteSampler(sampler: WebGLSampler) : void;
    isSampler(sampler: WebGLSampler) : boolean;
    bindSampler(unit: number, sampler: WebGLSampler) : void;
    samplerParameteri(sampler: WebGLSampler, pname: number, param: number) : void;
    samplerParameterf(sampler: WebGLSampler, pname: number, param: number) : void;
    getSamplerParameter(sampler: WebGLSampler, pname: number) : any;

    /* Sync objects */
    fenceSync(condition: number, flags: number): WebGLSync;
    isSync(sync: WebGLSync) : boolean;
    deleteSync(sync: WebGLSync) : void;
    clientWaitSync(sync: WebGLSync, flags: number, timeout: number) : number;
    waitSync(sync: WebGLSync, flags: number, timeout: number): number;
    getSyncParameter(sync: WebGLSync, pname : number): any;

    /* Transform Feedback */
    createTransformFeedback(): WebGLTransformFeedback;
    deleteTransformFeedback(feedback: WebGLTransformFeedback) : void;
    isTransformFeedback(feedback: WebGLTransformFeedback) : boolean;
    bindTransformFeedback(target: number, id: WebGLTransformFeedback) : void;
    beginTransformFeedback(primitiveMode: number) : void;
    endTransformFeedback() : void;
    transformFeedbackVaryings(program: WebGLProgram, varyings: string[], bufferMode: number) : void;
    getTransformFeedbackVarying(program: WebGLProgram, index: number): WebGLActiveInfo;
    pauseTransformFeedback() : void;
    resumeTransformFeedback() : void;

    /* Uniform Buffer Objects and Transform Feedback Buffers */
    bindBufferBase(target: number, index: number, buffer: WebGLBuffer) : void;
    bindBufferRange(target: number, index: number, buffer: WebGLBuffer, offset: number, size: number) : void;
    getIndexedParameter(target: number, index: number): any;
    getUniformIndices(program: WebGLProgram, uniformNames: string[]) : number[];
    getActiveUniforms(program: WebGLProgram, uniformIndices: number[], pname: number): any;
    getUniformBlockIndex(program: WebGLProgram, uniformBlockName: string) : number;
    getActiveUniformBlockParameter(program: WebGLProgram, uniformBlockIndex: number, pname: number): any;
    /* TODO: if there were a fake enum for GL_UNIFORM_BLOCK_NAME, then this could be folded into getActiveUniformBlockParameter */
    getActiveUniformBlockName(program: WebGLProgram, uniformBlockIndex: number) : string;
    uniformBlockBinding(program: WebGLProgram, uniformBlockIndex: number, uniformBlockBinding: number) : void;

    /* Vertex Array Objects */
    createVertexArray(): WebGLVertexArrayObject;
    deleteVertexArray(vertexArray: WebGLVertexArrayObject) : void;
    isVertexArray(vertexArray: WebGLVertexArrayObject) : boolean;
    bindVertexArray(array: WebGLVertexArrayObject) : void;
}