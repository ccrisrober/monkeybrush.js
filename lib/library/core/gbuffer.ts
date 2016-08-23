/// <reference path="../maths/vector2.ts" />
/// <reference path="../textures/simpleTexture2D.ts" />
/// <reference path="../textures/renderBufferTexture.ts" />
/// <reference path="core.ts" />
/// <reference path="framebuffer.ts" />

import Vector2 from "../maths/vector2"
import SimpleTexture2D from "../textures/simpleTexture2D"
import RenderBufferTexture from "../textures/renderBufferTexture"
import Core from "./core"
import Framebuffer from "./framebuffer"

"use strict";

enum gbuffer_type {
    position,
    normal,
    diffuse,
    num_textures
}

class GBuffer {
    /**
     * [framebuffer description]
     * @type {Framebuffer}
     */
    protected framebuffer: Framebuffer;

    /**
     * @param {Vector2<number>}
     */
    constructor(size: Vector2<number>) {
        const gl = Core.getInstance().getGL();

        this.framebuffer = new Framebuffer([
            // Position color buffer
            new SimpleTexture2D(size, {
                "internalformat": gl.RGB,
                "format": gl.RGB,
                "type": gl.FLOAT,
                "minFilter": gl.NEAREST,
                "maxFilter": gl.NEAREST
            }),
            // Normal color buffer
            new SimpleTexture2D(size, {
                "internalformat": gl.RGB,
                "format": gl.RGB,
                "type": gl.FLOAT,
                "minFilter": gl.NEAREST,
                "maxFilter": gl.NEAREST
            }),
            // Color + Specular color buffer
            new SimpleTexture2D(size, {
                "internalformat": gl.RGB,
                "format": gl.RGB,
                "type": gl.FLOAT,
                "minFilter": gl.NEAREST,
                "maxFilter": gl.NEAREST
            })
        ], size, true, true, {});

        console.log("done");
    }
    /**
     * 
     */
    public bindForReading() {
        this.framebuffer.onlyBindTextures();
    }
    /**
     * 
     */
    public bindForWriting() {
        this.framebuffer.bind();
    }
    /**
     * 
     */
    public destroy() {
        const gl = Core.getInstance().getGL();
        if (this.framebuffer) {
            this.framebuffer.destroy();
        }
    }

    // TODO: Rebuild
}