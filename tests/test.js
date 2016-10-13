var expect = chai.expect;
var should = chai.should();
describe("Canvas context supporting", function() {
    it("Should support 2D canvas", function() {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        expect(ctx).to.not.be.null;
    });
    it("Should support WebGL 1 context", function() {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("webgl");
        expect(ctx).to.not.be.null;
    });
    it("Should support WebGL 1 context MB", function() {
        var ctx = new MB.GLContextW1(document.getElementById("canvas"));
        expect(ctx.gl).to.be.an.instanceof(WebGLRenderingContext);
    });
    it("Should support WebGL 2 context", function() {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("webgl2");
        expect(ctx).to.not.be.null;
    });
    it("Should support WebGL 2 context MB", function() {
        var canvas = document.getElementById("canvas");
        var ctx = new MB.GLContextW2(canvas);
        expect(ctx.gl).to.be.an.instanceof(WebGL2RenderingContext);
    });
});
