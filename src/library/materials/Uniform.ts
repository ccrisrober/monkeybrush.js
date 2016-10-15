namespace MB {
    export class Uniform {
        public isDirty: boolean;
        public _type: UniformType;
        public _value: any;
        constructor(type: UniformType, value: any) {
            this._type = type;
            this._value = value;
            this.isDirty = true;
        };
        get type(): UniformType { return this._type; };
        get value(): any { return this._value; };
        set value(v: any) {
            this._value = v;
            this.isDirty = true;
        }
    };
};
