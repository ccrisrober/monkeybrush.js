# MonkeyBrush
Monkey Brush is a library that adds OOP for WebGL 1/2 using Typescript.

## Doc
<a href="./tutorials.md">Doc</a>

## Example
```typescript
let SimpleConfig = function() {
    return {
        resume: true
    };
};

class MyScene extends MonkeyBrush.Scene {
    protected homePoint = new MonkeyBrush.maths.Vect3(-2.7, -1.4, 11.8);
    protected camera = new MonkeyBrush.Camera2(this.homePoint);

    protected cubito: MonkeyBrush.models.Drawable;
    protected view: MonkeyBrush.maths.Mat4;
    protected projection: MonkeyBrush.maths.Mat4;

    protected identityMatrix: MonkeyBrush.maths.Mat4 = MonkeyBrush.maths.Mat4.identity.clone();
    protected model = new MonkeyBrush.maths.Mat4();
    protected angle = 0;

    constructor() {
        super(SimpleConfig(), "App", 2);
    }
    protected mainShader: string = "prog";
    loadAssets() { }
    initialize() {
        this.cubito = new MonkeyBrush.models.Cube(15.0);
        MonkeyBrush.resources.ProgramManager.addWithFun("prog", (): MonkeyBrush.core.Program => {
            let prog: MonkeyBrush.core.Program = new MonkeyBrush.core.Program();
            prog.addShader("shaders/demoShader.vert",
                MonkeyBrush.constants.ProgramCte.shader_type.vertex, MonkeyBrush.constants.ProgramCte.mode.read_file);
            prog.addShader("shaders/demoShader.frag",
                MonkeyBrush.constants.ProgramCte.shader_type.fragment, MonkeyBrush.constants.ProgramCte.mode.read_file);
            prog.compile();
            prog.use();
            prog.addUniforms(["projection", "view", "model"]);
            return prog;
        });
        this.cameraUpdate();
    }
    update(dt: number) {
        this.camera.timeElapsed = MonkeyBrush.extras.Timer.deltaTime() / 10.0;
        this.camera.update(this.cameraUpdate.bind(this));
        this.angle += MonkeyBrush.extras.Timer.deltaTime() * 0.001;
    }
    draw(dt?: number) {
        MonkeyBrush.core.Core.getInstance().clearColorAndDepth();
        let prog = MonkeyBrush.resources.ProgramManager.get(this.mainShader);
        prog.use();
        this.model =
            this.identityMatrix.clone()
                .translate(new MonkeyBrush.maths.Vect3(i * 1.0, j * 1.0, k * 1.0))
                .rotate(90.0 * Math.PI / 180, MonkeyBrush.maths.Vect3.yAxis)
                .rotate(this.angle * 0.5 * dd, MonkeyBrush.maths.Vect3.yAxis)
                .scale(new MonkeyBrush.maths.Vect3(0.25, 0.25, 0.25));
        prog.sendUniformMat4("model", this.model);
        this.cubito.render();
        this.skybox.render(this.view, this.projection);
    }
    public pos = 0;
    cameraUpdate() {
        let canvas = MonkeyBrush.core.Core.getInstance().canvas();
        this.view = this.camera.GetViewMatrix();
        this.projection = this.camera.GetProjectionMatrix(canvas.width, canvas.height);
        let prog = MonkeyBrush.resources.ProgramManager.get(this.mainShader);
        prog.use();
        prog.sendUniformVec3("viewPos", this.camera.GetPos());
        prog.sendUniformMat4("projection", this.projection);
        prog.sendUniformMat4("view", this.view);
    }
    textCB(gui: dat.GUI) { }
};

window.onload = () => {
    new MyScene().start();
};
```
