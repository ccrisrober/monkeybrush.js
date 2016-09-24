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

class MyScene extends MB.Scene {
    protected homePoint = new MB.Vect3(-2.7, -1.4, 11.8);
    protected camera = new MB.Camera2(this.homePoint);

    protected cubito: MB.models.Drawable;
    protected view: MB.Mat4;
    protected projection: MB.Mat4;

    protected identityMatrix: MB.Mat4 = MB.Mat4.identity.clone();
    protected model = new MB.Mat4();
    protected angle = 0;

    constructor() {
        super(SimpleConfig(), "App", 2);
    }
    protected mainShader: string = "prog";
    loadAssets() { }
    initialize() {
        this.cubito = new MB.models.Cube(15.0);
        MB.resources.ProgramManager.addWithFun("prog", (): MB.core.Program => {
            let prog: MB.core.Program = new MB.core.Program();
            prog.addShader("shaders/demoShader.vert",
                MB.constants.ProgramCte.shader_type.vertex, MB.constants.ProgramCte.mode.read_file);
            prog.addShader("shaders/demoShader.frag",
                MB.constants.ProgramCte.shader_type.fragment, MB.constants.ProgramCte.mode.read_file);
            prog.compile();
            prog.use();
            prog.addUniforms(["projection", "view", "model"]);
            return prog;
        });
        this.cameraUpdate();
    }
    update(dt: number) {
        this.camera.timeElapsed = MB.extras.Timer.deltaTime() / 10.0;
        this.camera.update(this.cameraUpdate.bind(this));
        this.angle += MB.extras.Timer.deltaTime() * 0.001;
    }
    draw(dt?: number) {
        MB.core.Core.getInstance().clearColorAndDepth();
        let prog = MB.resources.ProgramManager.get(this.mainShader);
        prog.use();
        this.model =
            this.identityMatrix.clone()
                .translate(new MB.Vect3(i * 1.0, j * 1.0, k * 1.0))
                .rotate(90.0 * Math.PI / 180, MB.Vect3.yAxis)
                .rotate(this.angle * 0.5 * dd, MB.Vect3.yAxis)
                .scale(new MB.Vect3(0.25, 0.25, 0.25));
        prog.sendUniformMat4("model", this.model);
        this.cubito.render();
        this.skybox.render(this.view, this.projection);
    }
    public pos = 0;
    cameraUpdate() {
        let canvas = MB.core.Core.getInstance().canvas();
        this.view = this.camera.GetViewMatrix();
        this.projection = this.camera.GetProjectionMatrix(canvas.width, canvas.height);
        let prog = MB.resources.ProgramManager.get(this.mainShader);
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
