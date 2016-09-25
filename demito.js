/// <reference path="./src/typings/gl-matrix.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MBS;
(function (MBS) {
    var Camera = (function () {
        function Camera(_scene, position, up, yaw, pitch) {
            if (position === void 0) { position = vec3.fromValues(0, 0, 0); }
            if (up === void 0) { up = vec3.fromValues(0, 1, 0); }
            if (yaw === void 0) { yaw = -90.0; }
            if (pitch === void 0) { pitch = 0.0; }
            // Camera options
            this.movSpeed = 0.05;
            this.mouseSensivity = 0.25;
            this.view = mat4.create();
            this.proj = mat4.create();
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
        Camera.prototype.GetPos = function () {
            return this.position;
        };
        Camera.prototype.processKeyboard = function (direction, deltaTime) {
            if (this.timeElapsed > 25) {
                return;
            }
            var velocity = this.movSpeed * this.timeElapsed; //deltaTime;
            //console.log(direction);
            if (direction == 0) {
                this.position = vec3.scaleAndAdd(this.position, this.position, this.front, velocity);
            }
            else if (direction == 1) {
                this.position = vec3.scaleAndAdd(this.position, this.position, this.front, -velocity);
            }
            else if (direction == 2) {
                this.position = vec3.scaleAndAdd(this.position, this.position, this.right, -velocity);
            }
            else if (direction == 3) {
                this.position = vec3.scaleAndAdd(this.position, this.position, this.right, velocity);
            }
            else if (direction == 4) {
                this.position = vec3.scaleAndAdd(this.position, this.position, this.up, velocity);
            }
            else if (direction == 5) {
                this.position = vec3.scaleAndAdd(this.position, this.position, this.up, -velocity);
            }
        };
        Camera.prototype.processMouseMovement = function (xOffset, yOffset) {
            this.yaw += xOffset;
            this.pitch += yOffset;
            if (this.pitch > 89.0) {
                this.pitch = 89.0;
            }
            if (this.pitch < -89.0) {
                this.pitch = -89.0;
            }
            this.updateCameraVectors();
        };
        Camera.prototype.updateCameraVectors = function () {
            var front = vec3.fromValues(Math.cos(glMatrix.toRadian(this.yaw)) * Math.cos(glMatrix.toRadian(this.pitch)), Math.sin(glMatrix.toRadian(this.pitch)), Math.sin(glMatrix.toRadian(this.yaw)) * Math.cos(glMatrix.toRadian(this.pitch)));
            this.front = vec3.normalize(this.front, front);
            // Recalculate right and up vector
            this.right = vec3.cross(this.right, this.front, this.worldUp);
            this.right = vec3.normalize(this.right, this.right);
            this.up = vec3.cross(this.up, this.right, this.front);
            this.up = vec3.normalize(this.up, this.up);
        };
        Camera.prototype.GetViewMatrix = function () {
            var aux = vec3.create();
            this.view = mat4.lookAt(this.view, this.position, vec3.add(aux, this.position, this.front), this.up);
            return this.view;
        };
        Camera.prototype.GetProjectionMatrix = function (w, h) {
            this.proj = mat4.perspective(this.proj, 45.0, (w * 1.0) / (h * 1.0), 0.1, 1000.0);
            return this.proj;
        };
        return Camera;
    }());
    MBS.Camera = Camera;
    ;
    var Context = (function () {
        function Context(canvas) {
            this._canvas = canvas;
            this._gl = canvas.getContext("webgl2");
            if (this._gl != null)
                console.log("CONTEXT OK");
            this._gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
            this._gl.clearDepth(1.0); // Clear everything
            this._gl.enable(this._gl.DEPTH_TEST); // Enable depth testing
            this._gl.depthFunc(this._gl.LEQUAL); // Near things obscure far things
        }
        Context.prototype.gl = function () {
            return this._gl;
        };
        Context.prototype.canvas = function () {
            return this._canvas;
        };
        Context.prototype.run = function (renderFunction) {
            renderFunction(Date.now());
            //this.run(renderFunction);
        };
        Context.prototype.resize = function (ev) {
            console.log("RESIZE");
            console.log(ev);
        };
        return Context;
    }());
    MBS.Context = Context;
    ;
    var Entity = (function () {
        function Entity() {
        }
        Entity.prototype.render = function () {
            // TODO: Redefine
        };
        return Entity;
    }());
    MBS.Entity = Entity;
    ;
    var Scene = (function () {
        function Scene(ctx) {
            this._childrens = [];
            this._context = ctx;
            console.log("SCENE OK");
        }
        Scene.prototype.render = function (dt) {
            for (var i = 0; i < this._childrens.length; i++) {
                if (this._childrens[i]["render"]) {
                    this._childrens[i].render();
                }
            }
        };
        Scene.prototype.getContext = function () {
            return this._context;
        };
        return Scene;
    }());
    MBS.Scene = Scene;
    var Cube = (function (_super) {
        __extends(Cube, _super);
        function Cube(scene, side) {
            if (side === void 0) { side = 1.0; }
            _super.call(this);
            this._scene = scene;
            var gl = this._scene.getContext().gl();
            this._vao = gl.createVertexArray();
            var side2 = side / 2.0;
            var verts = [
                // Front
                -side2, -side2, side2,
                side2, -side2, side2,
                side2, side2, side2,
                -side2, side2, side2,
                // Right
                side2, -side2, side2,
                side2, -side2, -side2,
                side2, side2, -side2,
                side2, side2, side2,
                // Back
                -side2, -side2, -side2,
                -side2, side2, -side2,
                side2, side2, -side2,
                side2, -side2, -side2,
                // Left
                -side2, -side2, side2,
                -side2, side2, side2,
                -side2, side2, -side2,
                -side2, -side2, -side2,
                // Bottom
                -side2, -side2, side2,
                -side2, -side2, -side2,
                side2, -side2, -side2,
                side2, -side2, side2,
                // Top
                -side2, side2, side2,
                side2, side2, side2,
                side2, side2, -side2,
                -side2, side2, -side2
            ];
            var el = [
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
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
            gl.bindVertexArray(null);
            this._indicesLen = el.length;
            scene._childrens.push(this);
        }
        ;
        Cube.prototype._addElementArray = function (el) {
            var gl = this._scene.getContext().gl();
            var vb = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vb);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, el, gl.STATIC_DRAW);
        };
        ;
        Cube.prototype.render = function () {
            var gl = this._scene.getContext().gl();
            gl.bindVertexArray(this._vao);
            gl.drawElements(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
        };
        ;
        return Cube;
    }(Entity));
    MBS.Cube = Cube;
    ;
})(MBS || (MBS = {}));
// https://github.com/maldicion069/monkeybrush.js/tree/fd5d27c250e57f96e9f8e7285715122f201ee3ae/lib/library
