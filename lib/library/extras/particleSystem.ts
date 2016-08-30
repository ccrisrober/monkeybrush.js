import { List } from "../maths/list";

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
        let node = this._active.first();
        let last = this._active.last();

        while (node !== last) {
            let p = node.obj;

            p.t += dt / p.ttl;
            if (p.t >= 1.0) {
                // TODO
            }


            node = node.next;
        }
    }
};

export { ParticleSystem };
