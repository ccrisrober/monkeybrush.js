/// <reference path="./src/typings/dat-gui.d.ts" />
/// <reference path="./src/typings/gl-matrix.d.ts" />
/// <reference path="./src/typings/stats.d.ts" />
/// <reference path="./src/typings/webgl2.d.ts" />
/// <reference path="./dist/monkeybrush.d.ts" />

class MyScene extends MB.App2 {
    protected camera = new MB.Camera2(MB.Vect3.createFromScalar(0.0));
    constructor() {
        super("App", new MB.GLContextW2(<HTMLCanvasElement>document.getElementById("canvas")));
    }
    public initialize() {
    };
    public update(dt: number) {

    };
    public draw() {
    };
};

window.onload = function() {
    let scene: MyScene = new MyScene();
    scene.start()
};
