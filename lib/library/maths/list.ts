class Node<T> {
    constructor(public obj: T = null, public next: Node<T> = null, public prev: Node<T> = null) {
    }
};

class List<T> {
    private root = new Node<T>();

    constructor() {
        this.root.next = this.root;
        this.root.prev = this.root;
    };
    public first(): Node<T> {
        return this.root.next;
    }
    public last(): Node<T> {
        return this.root.prev;
    }
    public pop(): T {
        let ret = this.last().obj;
        this.remove(this.last());
        return ret;
    }
    public isEmpty(): boolean {
        return this.root.next === this.root;
    }
    public insertNodeBefore(node: Node<T>, ref: Node<T> = this.root.next): void {
        node.next = ref;
        node.prev = ref.prev;
        node.prev.next = node;
        ref.prev = node;
    }
    public insertBefore(node: T, ref: Node<T> = this.root.next): void {
        this.insertNodeBefore(new Node<T>(node), ref);
    }
    public remove(ref: Node<T>): Node<T> {
        if (ref === this.root)
            return;
        ref.next.prev = ref.prev;
        ref.prev.next = ref.next;
        return ref;
    }
};

export { Node, List };
