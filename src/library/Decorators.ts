namespace MB {
    export namespace Decorators {
        /**
         * Seals an object, preventing new properties from being added to it and
         *     marking all existing properties as non-configurable.
         * Values of present properties can still be changed as long as they are writable.
         * @param {Function} constructor
         */
        export function sealed(constructor: Function) {
            Object.seal(constructor);
            Object.seal(constructor.prototype);
        };
    };
};
