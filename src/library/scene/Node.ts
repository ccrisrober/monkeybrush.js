namespace MBS {
    export class Node {
        protected _id: string;
        protected _isEnabled: boolean;
        protected _tag: string;
        protected _name: string;
        public isEnabled(): boolean {
            if (!this._isEnabled) {
                return false;
            }
            return true;
        };
        public hasParent(): boolean {
            return this.parent !== null;
        };
        public setEnabled(v: boolean) {
            this._isEnabled = v;
            for (var i = 0, l = this._children.length; i < l; ++i) {
                this._children[i].setEnabled(v);
            }
        };
        protected _generateUUID(): string {
            let d = new Date().getTime();
            let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                let r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };
        public get tag(): string { return this._tag; };
        public set tag(t: string) { this._tag = t; };
        public get name(): string { return this._name; };
        public set name(n: string) { this._name = n; };
        constructor(name: string = "dummy", tag: string = "SimpleTag") {
            this._name = name;
            this._id = this._generateUUID();
            this._children = new Array<Node>();
            this._components = new Array<Component>();
            this._parent = null;
            this._transform = new Transform();
            this._tag = tag;
            this._isEnabled = true;
        };
        public get parent(): Node { return this._parent; };
        public set parent(p: Node) {
            // TODO: Check parent in p node (addChild or removeChild in p.parent)
            this._parent = p;
        };
        public addChild(n: Node) {
            n.parent = this;
            this._children.push(n);
        };
        public removeChild(n: Node) {
            let idx = this._children.indexOf(n);
            if (idx !== -1) {
                this._children.splice(idx, 1);
            }
        };
        public addComponent(c: Component) {
            c.node = this;
            this._components.push(c);
        }
        public get transform(): Transform { return this._transform; };
        public get children(): Array<Node> { return this._children; };
        protected _parent: Node;
        protected _children: Array<Node>;
        public _components: Array<Component>;
        protected _transform: Transform;

        public get worldPosition(): MB.Vect3 {
            let res = new MB.Vect3();
            this._updateMatrixWorld(true);
            return res.setFromMatrixPosition(this.transform._matrixWorld);
        };
        public get worldScale(): MB.Vect3 {
            let res = new MB.Vect3();
            let p = new MB.Vect3();
            let q = new MB.Quat();
            this._updateMatrixWorld(true);
            this.transform._matrixWorld.decompose(p, q, res);
            return res;
        };
        public _updateMatrixWorld(force: boolean = false) {
            if (this.transform._autoUpdate === true) {
                this.transform.updateMatrix();
            }
            if (this.transform._matrixWorldNeedUpdate === true || force === true) {
                if (!this.parent) {
                    this.transform._matrixWorld.copy(this.transform._matrix);
                } else {
                    this.parent.transform._matrixWorld.mult(this.transform._matrix, this.transform._matrixWorld);
                }

                this.transform._matrixWorldNeedUpdate = false;

                force = true;
            }
            for (let i = 0, l = this._children.length; i < l; ++i) {
                this._children[i]._updateMatrixWorld(force);
            }
        };
        public removeAll() {
            // TODO: Clear Nodes ...
            this._children.length = 0;
        };
        public findByName(name: string) {
            return this._searchName(name, this);
        };
        protected _searchName(name: string, elem: MBS.Node): MBS.Node {
            if (elem.hasParent() && elem._name === name) {
                return elem;
            }
            // Search in childrens
            for (let i = 0, l = elem._children.length; i < l; ++i) {
                let children = this._searchName(name, elem._children[i]);
                if (children) {
                    return children;
                }
            }
        };
        public findByTag(tagName: string): Array<MBS.Node> {
            return this._searchTag(tagName, this, []);
        };
        protected _searchTag(name: string, elem: MBS.Node, nodes: Array<MBS.Node>): Array<MBS.Node> {
            if (name === undefined) {
                return nodes;
            }
            if (elem.hasParent() && elem._tag === name) {
                nodes.push(elem);
            }
            // Search in childrens
            for (let i = 0, l = elem._children.length; i < l; ++i) {
                let children = this._searchTag(name, elem._children[i], nodes);
            }
            return nodes;
        };
        // TODO: Search by type, layer ...
        public getComponent<T extends Component>(type: { new (): T }): T {
            let c: Component = null;
            for (var i = 0, l = this._components.length; i < l; ++i) {
                c = this._components[i];
                if (c instanceof type) {
                    return c;
                }
            }
            return null;
        };
        public getComponents(): Array<Component> {
            let list: Array<Component> = [];
            let c: Component = null;
            for (var i = 0, l = this._components.length; i < l; ++i) {
                list.push(this._components[i]);
            }
            return list;
        };
        public getComponentsWithType<T extends Component>(type: { new(): T}): Array<T> {
            let list: Array<T> = [];
            let c: Component = null;
            for (var i = 0, l = this._components.length; i < l; ++i) {
                c = this._components[i];
                if (c instanceof type) {
                    list.push(c);
                }
            }
            return list;
        };
        public getComponentsInChildren(): Array<Component> {
            let list: Array<Component> = [];
            // TODO: I added owner components!! ... FAIL
            list = list.concat(this.getComponents());
            for (let i = 0, lc = this._children.length; i < lc; ++i) {
                let arr = this._children[i].getComponentsInChildren();
                list = list.concat(arr);
            }
            return list;
        };
    };
};
