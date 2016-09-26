namespace MB {
    export namespace Decorators {
        export function sealed(constructor: Function) {
            Object.seal(constructor);
            Object.seal(constructor.prototype);
        };
        export function logProperty(target: any, key: string): void {
            let newKey = `__logged${key}`;
            Object.defineProperty(target, newKey, {
                enumerable: false,
                configurable: false,
                writable: true,
                value: target[key]
            });
            // property getter
            let getter = function () {
                let val = this[newKey];
                MB.Log.debug(`Get: ${key} => ${val}`);
                return val;
            };

            // property setter
            let setter = function (newVal: any) {
                MB.Log.debug(`Set: ${key} => ${newVal}`);
                this[newKey] = newVal;
            };

            // Delete property.
            if (delete this[key]) {

                // Create new property with getter and setter
                Object.defineProperty(target, key, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            }
        }
    };
};
