/// <reference path="../core/core.ts" />
/// <reference path="../core/program.ts" />
/// <reference path="resourceMap.ts" />
/// <reference path="../textures/cubemapTexture.ts" />
/// <reference path="../core/depth.ts" />

"use strict";

class Skybox {
	/**
	 * [skyboxVBO description]
	 * @type {WebGLBuffer}
	 */
	protected skyboxVBO: WebGLBuffer;
	/**
	 * [_prog description]
	 * @type {Program}
	 */
	protected _prog: Program;
	/**
	 * [cubeMapTexture description]
	 * @type {CubeMapTexture}
	 */
	protected cubeMapTexture: CubeMapTexture;
	/**
	 * @param {string}
	 */
	constructor(dir: string) {
		console.log("Load skybox ...");
		let faces: Array<string> = [];
		faces.push(dir + "/right.jpg");
		faces.push(dir + "/left.jpg");
		faces.push(dir + "/top.jpg");
		faces.push(dir + "/bottom.jpg");
		faces.push(dir + "/back.jpg");
		faces.push(dir + "/front.jpg");

		const gl: WebGLRenderingContext = Core.getInstance().getGL();

		this._prog = new Program();

		let vs: string = `#version 300 es
    	precision highp float;
		layout (location = 0) in vec3 position;
		out vec3 TexCoords;
		uniform mat4 projection;
		uniform mat4 view;
		void main() {
			vec4 pos = projection * view * vec4(position, 1.0);
			gl_Position = pos.xyww;
			TexCoords = position;
		}`;
		
		this._prog.addShader(vs, shader_type.vertex, mode.read_text);

		let fg: string = `#version 300 es
    	precision highp float;
		in vec3 TexCoords;
		out vec4 color;
		uniform samplerCube skybox;
		void main() { 
			color = texture(skybox, TexCoords);
		}`;

		this._prog.addShader(fg, shader_type.fragment, mode.read_text);
		this._prog.compile();

		this._prog.addUniforms(["view", "projection"]);

		let skyboxVertices = new Float32Array([
			// Positions          
			-1.0,  1.0, -1.0,
			-1.0, -1.0, -1.0,
			 1.0, -1.0, -1.0,
			 1.0, -1.0, -1.0,
			 1.0,  1.0, -1.0,
			-1.0,  1.0, -1.0,
	  
			-1.0, -1.0,  1.0,
			-1.0, -1.0, -1.0,
			-1.0,  1.0, -1.0,
			-1.0,  1.0, -1.0,
			-1.0,  1.0,  1.0,
			-1.0, -1.0,  1.0,
	  
			 1.0, -1.0, -1.0,
			 1.0, -1.0,  1.0,
			 1.0,  1.0,  1.0,
			 1.0,  1.0,  1.0,
			 1.0,  1.0, -1.0,
			 1.0, -1.0, -1.0,
	   
			-1.0, -1.0,  1.0,
			-1.0,  1.0,  1.0,
			 1.0,  1.0,  1.0,
			 1.0,  1.0,  1.0,
			 1.0, -1.0,  1.0,
			-1.0, -1.0,  1.0,
	  
			-1.0,  1.0, -1.0,
			 1.0,  1.0, -1.0,
			 1.0,  1.0,  1.0,
			 1.0,  1.0,  1.0,
			-1.0,  1.0,  1.0,
			-1.0,  1.0, -1.0,
	  
			-1.0, -1.0, -1.0,
			-1.0, -1.0,  1.0,
			 1.0, -1.0, -1.0,
			 1.0, -1.0, -1.0,
			-1.0, -1.0,  1.0,
			 1.0, -1.0,  1.0
		]);

		this.skyboxVBO = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.skyboxVBO);
		gl.bufferData(gl.ARRAY_BUFFER, skyboxVertices, gl.STATIC_DRAW);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
		this._loadCubemap(faces);
	}
	/**
	 * @param {Float32Array}
	 * @param {Float32Array}
	 */
	public render(view: Float32Array, projection: Float32Array) {
		const gl: WebGLRenderingContext = Core.getInstance().getGL();
		Depth.comparison(ComparisonFunc.LessEqual);
		this._prog.use();

		let auxView = mat3.create();
		auxView = mat3.fromMat4(auxView, view);
		// Remove any translation
		auxView = new Float32Array([
			auxView[0], auxView[1], auxView[2], 0.0,
			auxView[3], auxView[4], auxView[5], 0.0,
			auxView[6], auxView[7], auxView[8], 0.0,
				   0.0,		   0.0,		   0.0, 0.0
		]);
		this._prog.sendUniformMat4("view", auxView);
		this._prog.sendUniformMat4("projection", projection);

		this.cubeMapTexture.bind(0);
    	gl.drawArrays(gl.TRIANGLES, 0, 36);

		Depth.comparison(ComparisonFunc.Less);
	}
	/**
	 * 
	 */
	public destroy() {
		const gl: WebGLRenderingContext = Core.getInstance().getGL();
		this.cubeMapTexture.destroy();
	}
	/**
	 * @param {Array<string>}
	 */
	protected _loadCubemap(faces: Array<string>) {
		this.cubeMapTexture = new CubeMapTexture();
		this.cubeMapTexture.bind();

		faces.forEach(function(face: string, i: number) {
			let img = ResourceMap.retrieveAsset(face);
			this.cubeMapTexture.addImage(i, img);
		}.bind(this));

		this.cubeMapTexture.finishTex();
		this.cubeMapTexture.unbind();
	}
}