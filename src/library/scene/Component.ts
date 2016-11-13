namespace MBS {
    export abstract class Component {
        public node: Node;
        public update(dt: number) {
            // Override its neccesary
        };
        public getComponent<T extends Component>(type: { new (): T }): T {
            return this.node.getComponent(type);
        };
    };
};
