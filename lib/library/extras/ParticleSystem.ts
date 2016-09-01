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


import { List } from "../maths/List";

"use strict";

class Particle {
    public id: number;
    public t: number;
    public x: number;
    public y: number;
    public vx: number;
    public vy: number;
    public ttl: number;
};

class ParticleSystem {
    protected _count: number;
    protected _active: List<Particle> = new List<Particle>();
    constructor(count: number) {
        this._count = count;
    };
    get count(): number { return this._count; };
    protected createPool(count: number) {
        for (let i = 0; i < count; ++i) {
            let p = new Particle();
            p.id = i;
            // TODO
        }
    };
    protected update(dt: number) {
        /*let node = this._active.first();
        let last = this._active.last();

        while (node !== last) {
            let p = node.obj;

            p.t += dt / p.ttl;
            if (p.t >= 1.0) {
                // TODO
            }


            node = node.next;
        }*/
    }
};

export { Particle, ParticleSystem };
