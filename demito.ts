/// <reference path="./src/typings/gl-matrix.d.ts" />

namespace MBS {
    export class Camera {
        // Camera attrs
        public position : Float32Array;
        protected front : Float32Array;
        protected up : Float32Array;
        protected right : Float32Array;
        protected worldUp : Float32Array;

        // Euler angles
        protected yaw : number;
        protected pitch : number;

        // Camera options
        protected movSpeed : number = 0.05;
        protected mouseSensivity : number = 0.25;

        public GetPos() : Float32Array {
            return this.position;
        }

        public timeElapsed : number;
        public scene: Scene;

        constructor(_scene: Scene, position: Float32Array = vec3.fromValues(0, 0, 0),
            up: Float32Array = vec3.fromValues(0, 1, 0), yaw : number = -90.0, pitch : number = 0.0) {
            this.scene = _scene;
            this.front = vec3.fromValues(0, 0, -1);
            this.position = position;
            this.worldUp = up;
            this.yaw = yaw;
            this.pitch = pitch;

            this.right = vec3.create();
            this.up = vec3.create();

            this.updateCameraVectors();
            _scene._childrens.push(this);
        }

        public processKeyboard(direction: number, deltaTime: number) {
            if (this.timeElapsed > 25) {
                return;
            }
            var velocity : number = this.movSpeed * this.timeElapsed; //deltaTime;
            //console.log(direction);
            if(direction == 0) {
                this.position = vec3.scaleAndAdd(this.position, this.position, this.front, velocity);
            } else if(direction == 1) {
                this.position = vec3.scaleAndAdd(this.position, this.position, this.front, -velocity);
            } else if(direction == 2) {
                this.position = vec3.scaleAndAdd(this.position, this.position, this.right, -velocity);
            } else if(direction == 3) {
                this.position = vec3.scaleAndAdd(this.position, this.position, this.right, velocity);
            } else if(direction == 4) {
                this.position = vec3.scaleAndAdd(this.position, this.position, this.up, velocity);
            } else if(direction == 5) {
                this.position = vec3.scaleAndAdd(this.position, this.position, this.up, -velocity);
            }
        }

        public processMouseMovement(xOffset: number, yOffset: number) {
            this.yaw += xOffset;
            this.pitch += yOffset;

            if(this.pitch > 89.0) {
                this.pitch = 89.0;
            }
            if(this.pitch < -89.0) {
                this.pitch = -89.0;
            }
            this.updateCameraVectors();
        }

        public updateCameraVectors() {
            var front : Float32Array = vec3.fromValues(
                Math.cos(glMatrix.toRadian(this.yaw)) * Math.cos(glMatrix.toRadian(this.pitch)),
                Math.sin(glMatrix.toRadian(this.pitch)),
                Math.sin(glMatrix.toRadian(this.yaw)) * Math.cos(glMatrix.toRadian(this.pitch))
            );
            this.front = vec3.normalize(this.front, front);

            // Recalculate right and up vector
            this.right = vec3.cross(this.right, this.front, this.worldUp);
            this.right = vec3.normalize(this.right, this.right);
            this.up = vec3.cross(this.up, this.right, this.front);
            this.up = vec3.normalize(this.up, this.up);
        }

        private view : Float32Array = mat4.create();
        private proj : Float32Array = mat4.create();

        public GetViewMatrix() : Float32Array {
            var aux = vec3.create();
            this.view = mat4.lookAt(this.view, this.position, vec3.add(aux, this.position, this.front), this.up);
            return this.view;
        }

        public GetProjectionMatrix(w, h) : Float32Array {
            this.proj = mat4.perspective(this.proj, 45.0, (w*1.0)/(h*1.0), 0.1, 1000.0);
            return this.proj;
        }
    };
    export class Context {
        protected _canvas: HTMLCanvasElement;
        protected _gl: WebGLRenderingContext;
        constructor(canvas: HTMLCanvasElement) {
            this._canvas = canvas;
            this._gl = <WebGLRenderingContext>canvas.getContext("webgl2");
            if (this._gl != null) console.log("CONTEXT OK");
            this._gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
            this._gl.clearDepth(1.0);                 // Clear everything
            this._gl.enable(this._gl.DEPTH_TEST);           // Enable depth testing
            this._gl.depthFunc(this._gl.LEQUAL);            // Near things obscure far things
        }
        public gl() {
            return this._gl;
        }
        public canvas() {
            return this._canvas;
        }
        public run(renderFunction: (dt: number) => void): void {
            renderFunction(Date.now());
            //this.run(renderFunction);
        }
        public resize(ev) {
            console.log("RESIZE");
            console.log(ev);
        }
    };
    export class Entity {
        public render() {
            // TODO: Redefine
        }
    };
    export class Scene {
        protected _context: Context;
        public clearColor: Array<number>;
        public _childrens: Array<any> = [];
        constructor(ctx: Context) {
            this._context = ctx;
            console.log("SCENE OK");
        }
        public render(dt: number) {
            for (var i = 0; i < this._childrens.length; i++) {
                if (this._childrens[i]["render"]) {
                    this._childrens[i].render();
                }
            }
        }
        public getContext(): Context {
            return this._context;
        }
    }
    export class Cube extends Entity {
        protected _vao;
        protected _scene: Scene;
        protected _indicesLen: number;
        constructor(scene: Scene, side: number = 1.0) {
            super();
            this._scene = scene;

            const gl: any = this._scene.getContext().gl();
            this._vao = gl.createVertexArray();

            const side2 = side / 2.0;

            let verts = [
                // Front
               -side2, -side2, side2,
                side2, -side2, side2,
                side2,  side2, side2,
               -side2,  side2, side2,
               // Right
                side2, -side2, side2,
                side2, -side2, -side2,
                side2,  side2, -side2,
                side2,  side2, side2,
               // Back
               -side2, -side2, -side2,
               -side2,  side2, -side2,
                side2,  side2, -side2,
                side2, -side2, -side2,
               // Left
               -side2, -side2, side2,
               -side2,  side2, side2,
               -side2,  side2, -side2,
               -side2, -side2, -side2,
               // Bottom
               -side2, -side2, side2,
               -side2, -side2, -side2,
                side2, -side2, -side2,
                side2, -side2, side2,
               // Top
               -side2,  side2, side2,
                side2,  side2, side2,
                side2,  side2, -side2,
               -side2,  side2, -side2
            ];

            let el = [
                0, 1, 2, 0, 2, 3,
                4, 5, 6, 4, 6, 7,
                8, 9, 10, 8, 10, 11,
                12, 13, 14, 12, 14, 15,
                16, 17, 18, 16, 18, 19,
                20, 21, 22, 20, 22, 23
            ];

            gl.bindVertexArray(this._vao);

            this._addElementArray(new Uint16Array(el));

            var vb = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vb);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(0);
            gl.vertexAttribPointer(0,
                3,
                gl.FLOAT,
                false,
                3 * Float32Array.BYTES_PER_ELEMENT,
                0);
            gl.bindVertexArray(null);

            this._indicesLen = el.length;
            scene._childrens.push(this);
        };
        protected _addElementArray(el: Uint16Array) {
            const gl = this._scene.getContext().gl();
            var vb = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vb);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, el, gl.STATIC_DRAW);
        };
        public render() {
            const gl: any = this._scene.getContext().gl();
            gl.bindVertexArray(this._vao);
            gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
        };
    };
}
// https://github.com/maldicion069/monkeybrush.js/tree/fd5d27c250e57f96e9f8e7285715122f201ee3ae/lib/library
