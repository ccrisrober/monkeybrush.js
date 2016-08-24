
export default {
    sealed: function(constructor: Function) {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    }
};
