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


/// <reference path="../maths/vector3.ts" />

import Vector3 from "../maths/vector3";

class Ray {
    protected _origin: Vector3<number>;
    protected _direction: Vector3<number>;
    constructor(origin: Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0),
        direction: Vector3<number> = new Vector3<number>(0.0, 0.0, 0.0)) {
        this._origin = origin;
        this._direction = direction;
    }
    get origin(): Vector3<number> { return this._origin; }
    set origin(origin: Vector3<number>) { this._origin = origin; }
    get direction(): Vector3<number> { return this._direction; }
    set direction(direction: Vector3<number>) { this._direction = direction; }

    public point_at(t: number) {
        return new Vector3<number>(
            this._origin.x + t * this._direction.x,
            this._origin.y + t * this._direction.y,
            this._origin.z + t * this._direction.z
        );
    }
};

export default Ray;
