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



"use strict";

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
