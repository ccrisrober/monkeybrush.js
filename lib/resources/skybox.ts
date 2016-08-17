/// <reference path="../core/core.ts" />
/// <reference path="../core/shaderProgram.ts" />
/// <reference path="../textures/texture.ts" />
/// <reference path="../gl-matrix.d.ts" />

class Skybox {
	constructor(dir: string) {
		console.log("Load skybox ...");
		var faces : Array<string> = [];
		faces.push(dir + "/right.jpg");
		faces.push(dir + "/left.jpg");
		faces.push(dir + "/top.jpg");
		faces.push(dir + "/bottom.jpg");
		faces.push(dir + "/back.jpg");
		faces.push(dir + "/front.jpg");

		var gl : WebGLRenderingContext = Core.getInstance().getGL();

		this.ss = new ShaderProgram();

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
		
		this.ss.addShader(vs, shader_type.vertex, mode.read_text);

		var fg: string = `#version 300 es
    	precision highp float;
		in vec3 TexCoords;
		out vec4 color;
		uniform samplerCube skybox;
		void main() { 
			color = texture(skybox, TexCoords);
		}`;

		this.ss.addShader(fg, shader_type.fragment, mode.read_text);
		this.ss.compile();

		this.ss.addUniforms(["view", "projection"]);

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
		//this.skyboxVAO = (<any>gl).createVertexArray();
		this.skyboxVBO = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.skyboxVBO);
		gl.bufferData(gl.ARRAY_BUFFER, skyboxVertices, gl.STATIC_DRAW);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
		//(<any>gl).bindVertexArray(null);
		this._loadCubemap(faces);
	}
	public render(view: Float32Array, projection: Float32Array) {
		var gl : WebGLRenderingContext = Core.getInstance().getGL();
		gl.depthFunc(gl.LEQUAL);
		this.ss.use();
		// get projection and view from camera and send it to ss

		var auxView = mat3.create();
		auxView = mat3.fromMat4(auxView, view);
		// Remove any translation
		auxView = new Float32Array([
			auxView[0], auxView[1], auxView[2], 0.0,
			auxView[3], auxView[4], auxView[5], 0.0,
			auxView[6], auxView[7], auxView[8], 0.0,
				   0.0,		   0.0,		   0.0, 0.0
		]);
		this.ss.sendUniformMat4("view", auxView);
		this.ss.sendUniformMat4("projection", projection);

		//(<any>gl).bindVertexArray(this.skyboxVAO);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubeMapTexture);
    	gl.drawArrays(gl.TRIANGLES, 0, 36);
    	//(<any>gl).bindVertexArray(null);

		gl.depthFunc(gl.LESS);
	}
	public destroy() {
		var gl : WebGLRenderingContext = Core.getInstance().getGL()
		//gl.bindVertexArray(0);
		//gl.deleteVertexArrays(this.skyboxVAO);
		gl.deleteTexture(this.cubeMapTexture);
	}

	protected skyboxVAO; // TODO: SI SE USA FALLA WTF
	protected skyboxVBO : WebGLBuffer;
	protected cubeMapTexture: WebGLTexture;	/// TODO: Move to Texture class option
	protected ss: ShaderProgram;
	protected model: Float32Array;

	//protected textures: Array<Texture2D> = new Array(6);
	//protected tex: Texture;

	protected _loadCubemap(faces: Array<string>) {
		var gl = Core.getInstance().getGL();
		this.cubeMapTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubeMapTexture);
		faces.forEach(function(face: string, i: number) {
			var img = ResourceMap.retrieveAsset(face);
			gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, 
				gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
		});
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, (<any>gl).TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	}
}