/// <reference path="../core/core.ts" />
abstract class Drawable {
	protected _vao: any; // TODO: WebGLVertexArrayObject;
	abstract render();
    // TODO: unused DELETE PLS
    protected addAttrib(attribLocation, buffer, data, numElems) {
        const gl = Core.getInstance().getGL();

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

        gl.vertexAttribPointer(
            attribLocation, // Attribute location
            numElems, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            false,
            numElems * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            0 // Offset from the beginning of a single vertex to this attribute
        );
        gl.enableVertexAttribArray(attribLocation);
    }
    // TODO: USED?
    protected createBuffer(data, handle) {
        const gl = Core.getInstance().getGL();
        gl.bindBuffer(gl.ARRAY_BUFFER, handle);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        return handle;
    }
    // TODO: USED?
    protected addAttrib_(attribLocation, buffer, numElems) {
        const gl = Core.getInstance().getGL();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(
            attribLocation, // Attribute location
            numElems, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            false,
            numElems * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            0 // Offset from the beginning of a single vertex to this attribute
        );
        gl.enableVertexAttribArray(attribLocation);
    }

}