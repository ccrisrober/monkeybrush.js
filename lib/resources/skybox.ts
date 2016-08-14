/// <reference path="../core/core.ts" />
/// <reference path="../core/shaderProgram.ts" />
/// <reference path="../core/texture.ts" />
/// <reference path="../gl-matrix.d.ts" />

class Skybox {
	constructor(dir: string) {
		console.log("Load skybox ...");
		var faces : Array<string> = [];
		faces.push("textures/" + dir + "/right.jpg");
		faces.push("textures/" + dir + "/left.jpg");
		faces.push("textures/" + dir + "/top.jpg");
		faces.push("textures/" + dir + "/bottom.jpg");
		faces.push("textures/" + dir + "/back.jpg");
		faces.push("textures/" + dir + "/front.jpg");

		var gl : WebGLRenderingContext = Core.getInstance().getGL();

		var vs: string = `#version 300 es
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
		
		this.ss.addShader(vs, gl.VERTEX_SHADER, mode.read_text);

		var fg: string = `#version 300 es
    	precision highp float;
		in vec3 TexCoords;
		out vec4 color;
		uniform samplerCube skybox;
		void main() { 
			color = texture(skybox, TexCoords);
		}`;

		this.ss.addShader(fg, gl.FRAGMENT_SHADER, mode.read_text);
		this.ss.compile_and_link();

		var skyboxVertices = new Float32Array([
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

		// Setup vertex vao
		//this.skyboxVAO = gl.createVertexArray();
		this.skyboxVBO = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.skyboxVBO);
		gl.bufferData(gl.ARRAY_BUFFER, skyboxVertices, gl.STATIC_DRAW);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
		//gl.bindVertexArray(0);
		this.cubeMapTexture = this._loadCubemap(faces);

		this.ss.addUniforms(["view", "projection"]);
	}
	public render() {
		var gl : WebGLRenderingContext = Core.getInstance().getGL();
		gl.depthFunc(gl.LEQUAL);
		this.ss.use();
		// get projection and view from camera and send it to ss

		gl.depthFunc(gl.LESS);
	}
	public destroy() {
		var gl : WebGLRenderingContext = Core.getInstance().getGL();
		//gl.bindVertexArray(0);
		//gl.deleteVertexArrays(this.skyboxVAO);
		//gl.deleteTexture
	}

	protected skyboxVAO;
	protected skyboxVBO : WebGLBuffer;
	protected cubeMapTexture;
	protected ss: ShaderProgram;
	protected model: Float32Array;
	protected tex: Texture;

	protected _loadCubemap(faces: Array<string>) {

	}
}