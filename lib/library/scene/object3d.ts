
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

    // ===========
    // ===========
    protected static uidCounters = {};

    protected static uid(id: string = "id") {
        Object3D.uidCounters[id] = Object3D.uidCounters[id] || 1;
        const count = Object3D.uidCounters[id]++;
        return `${id}-${count}`;
    }
}