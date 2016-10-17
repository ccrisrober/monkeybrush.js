namespace MBX {
    export interface Event {
        type: string;
        target?: any;
    };
    export interface EventListener {
        (ev: MBX.Event): void;
    };
    export class EventDispatcher {
        public addEventListener(eventType: string, cb: MBX.EventListener) {
            if (!this._callbacks) {
                this._callbacks = {};
            }
            if (!this._callbacks.hasOwnProperty(eventType)) {
                this._callbacks[eventType] = [cb];
                return;
            }
            // Check exists
            if (this._callbacks[eventType].indexOf(cb) !== -1) {
                this._callbacks[eventType].push(cb);
            }
        };
        public removeEventListener(eventType: string, cb: MBX.EventListener) {
            if (!this._callbacks) return;
            if (!this._callbacks.hasOwnProperty(eventType)) {
                return;
            }
            let index = this._callbacks[eventType].indexOf(cb);
            if (index !== -1) {
                this._callbacks[eventType].splice(index, 1);
            }
        };
        public dispatchEvent(ev: MBX.Event) {
            if (!this._callbacks) return;
            if (!this._callbacks.hasOwnProperty(ev.type)) {
                return;
            }
            for (var i in this._callbacks[ev.type]) {
                this._callbacks[ev.type][i](ev);
            }
        };
        public hasEvent(eventType: string, cb: MBX.EventListener): boolean {
            if (!this._callbacks) return false;
            if (this._callbacks.hasOwnProperty(eventType)
                && this._callbacks[eventType].indexOf(cb) !== -1) {
                return true;
            }
            return false;
        };
        protected _callbacks: { [eventType: string]: [MBX.EventListener]; };
    };
};
