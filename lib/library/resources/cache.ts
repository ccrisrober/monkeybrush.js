namespace cache {
    let _files = {};
    export function add (key: string, value: any) {
        _files[key] = value;
    };
    export function get (key: string): any {
        return _files[key];
    };
    export function remove(key: string) {
        delete _files[key];
    };
    export function clear() {
        _files = {};
    };
};

export { cache };
