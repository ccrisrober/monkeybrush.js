namespace MB {
    export class Entity {
        protected _parent: Entity;
        constructor(glContext: GLContext) {
            this._parent = null;
        }
        get translate() { return null; }
        set translate(vec) { }
        get rotate() { return null; }
        set rotate(vec) { }
        get quaternion() { return null; }
        set quaternion(quat) { }
        get scale() { return null; }
        set scale(vec) { }
        public isTransparent(): boolean {
            return false;
        };
        get parent(): Entity {
            return this._parent;
        };

        addChild(elem: Entity) { };
        removeChild(elem: Entity) { };
        removeAll() { };
    };
};
