var expect = chai.expect;
var should = chai.should();
describe("WebGL supporting", function() {
    describe("Array types", function() {
        it("Float32Array", function() {
            expect(Float32Array).to.not.be.null;
        });
        it("Uint16Array", function() {
            expect(Uint16Array).to.not.be.null;
        });
    });
    describe("WebGL types", function() {
        it("WebGLShader", function() {
            expect(WebGLShader).to.not.be.null;
        });
        it("WebGLTransformFeedback", function() {
            expect(WebGLTransformFeedback).to.not.be.null;
        });
        it("WebGLFramebuffer", function() {
            expect(WebGLFramebuffer).to.not.be.null;
        });
    });
});
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
describe("Curves", function() {
    describe("Line2D", function() {
        var numPoints = 5;
        var init = new MB.Vect2(0.0, 0.0);
        var finish = new MB.Vect2(10.0, 0.0);
        var curveLine2D = new MB.curves.Line2D(init, finish);
        it("Point 3", function() {
            var point = curveLine2D.evaluate(3 / numPoints);
            expect(point._value[0]).to.equal(3 * 2);
        });
        it("Point 4", function() {
            var point = curveLine2D.evaluate(4 / numPoints);
            expect(point._value[0]).to.equal(4 * 2);
        });
    });
    describe("Line3D", function() {
        var numPoints = 5;
        var init = new MB.Vect3(0.0, 0.0, 5.0);
        var finish = new MB.Vect3(10.0, 0.0, 10.0);
        var curveLine3D = new MB.curves.Line3D(init, finish);
        it("Point 3", function() {
            var point = curveLine3D.evaluate(3 / numPoints);
            expect(point._value[0]).to.equal(3 * 2);
            expect(point._value[2]).to.equal(3 + 5);
        });
        it("Point 4", function() {
            var point = curveLine3D.evaluate(4 / numPoints);
            expect(point._value[0]).to.equal(4 * 2);
            expect(point._value[2]).to.equal(4 + 5);
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
