/// <reference path="./src/typings/dat-gui.d.ts" />
/// <reference path="./src/typings/gl-matrix.d.ts" />
/// <reference path="./src/typings/log4javascript.d.ts" />
/// <reference path="./src/typings/stats.d.ts" />
/// <reference path="./src/typings/webgl2.d.ts" />
/// <reference path="./dist/monkeybrush.d.ts" />

let MyConfig = function() {
    return {
        variable: true
    };
};
class MyScene extends MB.App {
    protected homePoint = new MB.Vect3(-2.7, -1.4, 11.8);
    protected camera = new MB.Camera2(this.homePoint);

    protected cube: MB.Drawable;
    protected view: MB.Mat4;
    protected projection: MB.Mat4;

    protected identityMatrix: MB.Mat4 = MB.Mat4.identity.clone();
    protected model = new MB.Mat4();
    protected angle = 0;

    constructor() {
        super("App", new MB.GLContextW2(<HTMLCanvasElement>document.getElementById("canvas")), MyConfig());
    }
    protected mainShader: string = "prog";
    loadAssets() { }
    initialize() {
        this.cube = new MB.Cube(this._context, 15.0);
        let that = this;
        MB.ProgramManager.addWithFun("prog", (): MB.Program => {
            let prog: MB.Program = new MB.Program(that._context);
            prog.addShader("shader-vs", MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_script);
            prog.addShader("shader-fs", MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_script);
            prog.compile();
            prog.use();
            prog.addUniforms(["projection", "view", "model", "viewPos"]);
            return prog;
        });
        this.cameraUpdate();
    }
    update(dt: number) {
        this.camera.timeElapsed = MB.Timer.deltaTime() / 10.0;
        this.camera.update(this.cameraUpdate.bind(this));
        this.angle += MB.Timer.deltaTime() * 0.001;
    }
    draw() {
        this.clearColorAndDepth();
        let prog = MB.ProgramManager.get(this.mainShader);
        prog.use();
        this.model =
            this.identityMatrix.clone()
                .translate(MB.Vect3.createFromScalar(0.0))
                .rotate(90.0 * Math.PI / 180, MB.Vect3.yAxis)
                .rotate(this.angle * 0.5, MB.Vect3.yAxis)
                .scale(new MB.Vect3(0.25, 0.25, 0.25));
        prog.sendUniformMat4("model", this.model);
        this.cube.render();
    }
    cameraUpdate() {
        this.view = this.camera.GetViewMatrix();
        this.projection = this.camera.GetProjectionMatrix(this.context.canvas);
        let prog = MB.ProgramManager.get(this.mainShader);
        prog.use();
        prog.sendUniformVec3("viewPos", this.camera.GetPos());
        prog.sendUniformMat4("projection", this.projection);
        prog.sendUniformMat4("view", this.view);
    }
    textCB(gui: dat.GUI) {
        gui.add(this.text, "variable", true);
    }
};

window.onload = () => {
    new MyScene().start();
};
