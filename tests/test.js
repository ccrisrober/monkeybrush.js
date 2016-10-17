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
describe("Geometry", function() {
    describe("Cube geometry", function() {
        var canvas = document.createElement("canvas");
        var ctx = new MB.GLContextW2(canvas);
        var size = 7.5;
        var cube = new MB.Cube(ctx, size);
        it("Indices", function() {
            expect(cube._indicesLen).to.equal(6 * 6);
        });
        it("Size", function() {
            expect(cube._side).to.equal(size);
        });
        it("Attr value", function() {
            expect(cube._geometry._attrs.vertices._arr[0]).to.equal(-size / 2.0);
        });
    });
});
describe("Others tests", function() {
    it("EventDispatcher", function() {
        var MyObj = function() {
            this.sayHello = function() {
                this.dispatchEvent({
                    type: "hello",
                    target: "everybody"
                });
            }
        };
        Object.assign(MyObj.prototype, MBX.EventDispatcher.prototype);
        var myObj = new MyObj();
        myObj.addEventListener("hello", function(ev) {
            console.log(ev);
            expect(ev.target).to.equal("everybody");
        });
        myObj.sayHello();
    });
});
