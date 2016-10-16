namespace MBS {
    export class SimpleMaterial extends MB.Material {
        protected _ambientColor: MB.Color3 = MB.Color3.Black.clone();
        get ambientColor(): MB.Color3 { return this._ambientColor; };
        set ambientColor(c: MB.Color3) { this._ambientColor = c; };
        protected _diffuseColor: MB.Color3 = MB.Color3.White.clone();
        get diffuseColor(): MB.Color3 { return this._diffuseColor; };
        set diffuseColor(c: MB.Color3) { this._diffuseColor = c; };
        protected _specularColor: MB.Color3 = MB.Color3.White.clone();
        get specularColor(): MB.Color3 { return this._specularColor; };
        set specularColor(c: MB.Color3) { this._specularColor = c; };
        protected _emissiveColor: MB.Color3 = MB.Color3.Black.clone();
        get emissiveColor(): MB.Color3 { return this._emissiveColor; };
        set emissiveColor(c: MB.Color3) { this._emissiveColor = c; };
        protected _specularPower: number = 32.0;
        get specularPower(): number { return this._specularPower; };
        set specularPower(p: number) { this._specularPower = p; };


        public diffuseTexture: MB.Texture;
        public ambientTexture: MB.Texture;
        public emissiveTexture: MB.Texture;
        public specularTexture: MB.Texture;

        constructor() {
            super();
        }
    }
}
