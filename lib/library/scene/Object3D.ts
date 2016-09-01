/// Copyright (C) 2016 [MonkeyBrush.js]
///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of this
/// software and associated documentation files (the "Software"), to deal in the Software
/// without restriction, including without limitation the rights to use, copy, modify,
/// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
/// permit persons to whom the Software is furnished to do so, subject to the following
/// conditions:
///
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
/// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
/// OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
/// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
/// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


import { Vect3 } from "../maths/Vect3";
import { Quat } from "../maths/Quat";

"use strict";

class Object3D {
    protected _childs: Array<Object3D>;
    public _id: string;
    constructor() {
        this._childs = [];
        this._id = Object3D.uid();
    }
    public add(...childs: Object3D[]) {
        childs.forEach((obj: Object3D) => {
            this._childs.push(obj);
        });
    }
    public remove(child: Object3D) {
        const indexOf = this._childs.indexOf(child);
        if (indexOf > -1) {
            this._childs.splice(indexOf, 1);
        }
    }
    public removeAll() {
        this._childs = [];
    }

    protected _position: Vect3 = new Vect3();
    protected _quat: Quat = new Quat();
    protected _scale: Vect3 = new Vect3(1.0, 1.0, 1.0);

    public rotateX(angle: number) {
        this.rotateAxis(new Vect3(1, 0, 0), angle);
    }

    public rotateY(angle: number) {
        this.rotateAxis(new Vect3(0, 1, 0), angle);
    }

    public rotateZ(angle: number) {
        this.rotateAxis(new Vect3(0, 0, 1), angle);
    }

    protected rotateAxis(axis: Vect3, angle: number) {
        let q: Quat = new Quat();
        Quat.fromAxis(axis, angle, q);
        this._quat = this._quat.mult(q);
    }

    get position(): Vect3 { return this._position; }
    get scale(): Vect3 { return this._scale; }
    set position(v: Vect3) { this._position = v; }
    set scale(v: Vect3)  { this._scale = v; }


    // ===========
    // ===========
    protected static uidCounters = {};

    protected static uid(id: string = "id") {
        Object3D.uidCounters[id] = Object3D.uidCounters[id] || 1;
        const count = Object3D.uidCounters[id]++;
        return `${id}-${count}`;
    }
};

export { Object3D };
