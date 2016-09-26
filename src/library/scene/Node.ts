namespace MBS {
    export class Node {
        public _scene: Scene;
        public _parentNode: Node;
        public _children: Array<Node>;

        public set parent(parent: Node) {
            if (this._parentNode === parent) {
                return;
            }
            if (this._parentNode) {
                let idx = this._parentNode._children.indexOf(this);
                if (idx !== -1) {
                    this._parentNode._children.splice(idx, 1);
                }
            }
            this._parentNode = parent;
            if (this._parentNode) {
                if (!this._parentNode._children) {
                    this._parentNode._children = new Array<Node>();
                }
                this._parentNode._children.push(this);
            }
        }

        public get parent(): Node {
            return this._parentNode;
        }

        protected _name: string;
        protected _id: string;

        constructor(name: string, scene: Scene) {
            this._name = name;
            this._id = this._generateUUID();
            this._scene = scene;
        };

        public getScene(): Scene {
            return this._scene;
        }

        public getEngine(): Engine {
            return this._scene.getEngine();
        }

        protected _generateUUID(): string {
            let d = new Date().getTime();
            let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                let r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };
    }
}
