/// <reference path="./src/typings/dat-gui.d.ts" />
/// <reference path="./src/typings/gl-matrix.d.ts" />
/// <reference path="./src/typings/log4javascript.d.ts" />
/// <reference path="./src/typings/stats.d.ts" />
/// <reference path="./src/typings/webgl2.d.ts" />
/// <reference path="./dist/monkeybrush.d.ts" />

let MyConfig = function() {
    return {
        Ro: 0.1,
        reset: function() {
            myScene.reset(this.Ro);
        }
    };
};
class MyScene extends MB.App {
    constructor() {
        super("App", new MB.GLContextW2(<HTMLCanvasElement>document.getElementById("canvas")), MyConfig());
    }
    initialize() {
        let that = this;
        MB.ProgramManager.addWithFun("prog", (): MB.Program => {
            let prog: MB.Program = new MB.Program(that._context);
            prog.addShader("shader-vs", MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_script);
            prog.addShader("shader-fs", MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_script);
            prog.compile();
            prog.use();
            prog.addUniforms(["tex"]);
            return prog;
        });
        MB.ProgramManager.addWithFun("prog_show", (): MB.Program => {
            let prog: MB.Program = new MB.Program(that._context);
            prog.addShader("shader-vs", MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_script);
            prog.addShader("show-fs", MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_script);
            prog.compile();
            prog.use();
            prog.addUniforms(["tex"]);
            return prog;
        });

        const ww = 256; // this.context.canvas.width;
        const hh = 256; // this.context.canvas.height;
        const Ro = this.text.Ro;

        var pixels = [];
        for(var i = 0; i < ww; ++i) {
            for(var j = 0; j < hh; ++j) {
                if(Math.random() > Ro) pixels.push( 0, 0.0, 0.0, 0.0);
                else pixels.push( 255.0, 0.0, 0.0, 0.0);
            }
        }

        const size = new MB.Vect2(ww, hh);

        this.tex = new MB.SimpleTexture2D(this.context, new Float32Array(pixels), size, {
            minFilter: MB.ctes.TextureFilter.Nearest,
            magFilter: MB.ctes.TextureFilter.Nearest,
            type: this.context.gl.FLOAT // TODO
        });

        this.tex2 = new MB.SimpleTexture2D(this.context, new Float32Array(pixels), size, {
            minFilter: MB.ctes.TextureFilter.Nearest,
            magFilter: MB.ctes.TextureFilter.Nearest,
            type: this.context.gl.FLOAT // TODO
        });

        this.fbo = new MB.Framebuffer(
            this.context,
            [this.tex],
            size
        );
        console.log(this.fbo.isValid());

        this.pp = new MB.PostProcess(this.context);

        this.textures = [this.tex, this.tex2];

        this.cameraUpdate();
    }
    protected textures: Array<MB.SimpleTexture2D>;
    protected tex: MB.SimpleTexture2D;
    protected tex2: MB.SimpleTexture2D;
    protected fbo: MB.Framebuffer;
    protected pp: MB.PostProcess;
    update(dt: number) {
    }
    protected _it: number = 1;
    draw() {
        this.clearColorAndDepth();
        let prog: MB.Program;
        this.state.setViewport(new MB.Vector4<number>(0.0, 0.0, 256.0, 256.0));

        prog = MB.ProgramManager.get("prog");
        prog.use();
        prog.sendUniform1i("tex", 0);

        this.textures[1].bind(0);
        this.fbo.bind();
        this.fbo.replaceTexture(this.textures[0], 0);
        this.textures.reverse();
        this.pp.render();
        this.fbo.unbind();

        this.state.setViewport(new MB.Vector4<number>(0.0, 0.0, 512.0, 512.0));

        prog = MB.ProgramManager.get("prog_show");
        prog.use();
        this.tex.bind(0);
        prog.sendUniform1i("tex", 0);
        this.pp.render();

        this._it - this._it;
    }
    textCB(gui: dat.GUI) {
        gui.add(this.text, "Ro", 0.01, 1.0);
        gui.add(this.text, "reset");
    }
    protected _resetTime: boolean = false;
    reset(Ro: number) {

        this.text.resume = false;

        const ww = 256; // this.context.canvas.width;
        const hh = 256; // this.context.canvas.height;

        var pixels = [];
        for(var i = 0; i < ww; ++i) {
            for(var j = 0; j < hh; ++j) {
                if(Math.random() > Ro) pixels.push( 0, 0.0, 0.0, 0.0);
                else pixels.push( 255.0, 0.0, 0.0, 0.0);
            }
        }

        const size = new MB.Vect2(ww, hh);

        // TODO: DEBERIA CREAR UN UPDATE
        this.tex.destroy();
        this.tex = new MB.SimpleTexture2D(this.context, new Float32Array(pixels), size, {
            minFilter: MB.ctes.TextureFilter.Nearest,
            magFilter: MB.ctes.TextureFilter.Nearest,
            type: this.context.gl.FLOAT // TODO
        });
        this.tex2.destroy();
        this.tex2 = new MB.SimpleTexture2D(this.context, new Float32Array(pixels), size, {
            minFilter: MB.ctes.TextureFilter.Nearest,
            magFilter: MB.ctes.TextureFilter.Nearest,
            type: this.context.gl.FLOAT // TODO
        });
        this.textures = [this.tex, this.tex2];
        this.text.resume = true;
    }
};
let myScene: MyScene;
window.onload = () => {
    myScene = new MyScene();
    myScene.start();
};
