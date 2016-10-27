var expect = chai.expect;
var should = chai.should();
describe("WebGL supporting", function() {
    describe("Array types", function() {
        describe("Uint", function() {
            it("Uint8Array", function() {
                expect(Uint8Array).to.not.be.null;
            });
            it("Uint16Array", function() {
                expect(Uint16Array).to.not.be.null;
            });
            it("Uint32Array", function() {
                expect(Uint32Array).to.not.be.null;
            });
        });
        describe("Int", function() {
            it("Int8Array", function() {
                expect(Int8Array).to.not.be.null;
            });
            it("Int16Array", function() {
                expect(Int16Array).to.not.be.null;
            });
            it("Int32Array", function() {
                expect(Int32Array).to.not.be.null;
            });
        });
        describe("Float", function() {
            it("Float32Array", function() {
                expect(Float32Array).to.not.be.null;
            });
            it("Float64Array", function() {
                expect(Float64Array).to.not.be.null;
            });
        });
    });
    describe("WebGL types", function() {
        describe("WebGL1", function() {

            it("WebGLRenderingContext", function() {
                expect(WebGLRenderingContext).to.not.be.null;
            });
            it("WebGLBuffer", function() {
                expect(WebGLBuffer).to.not.be.null;
            });
            it("WebGLFramebuffer", function() {
                expect(WebGLFramebuffer).to.not.be.null;
            });
            it("WebGLProgram", function() {
                expect(WebGLProgram).to.not.be.null;
            });
            it("WebGLRenderbuffer", function() {
                expect(WebGLRenderbuffer).to.not.be.null;
            });
            it("WebGLShader", function() {
                expect(WebGLShader).to.not.be.null;
            });
            it("WebGLTexture", function() {
                expect(WebGLTexture).to.not.be.null;
            });
            it("WebGLUniformLocation", function() {
                expect(WebGLUniformLocation).to.not.be.null;
            });

        });
        describe("WebGL2", function() {

            it("WebGL2RenderingContext", function() {
                expect(WebGL2RenderingContext).to.not.be.null;
            });
            it("WebGLQuery", function() {
                expect(WebGLQuery).to.not.be.null;
            });
            it("WebGLSampler", function() {
                expect(WebGLSampler).to.not.be.null;
            });
            it("WebGLSync", function() {
                expect(WebGLSync).to.not.be.null;
            });
            it("WebGLTransformFeedback", function() {
                expect(WebGLTransformFeedback).to.not.be.null;
            });
            it("WebGLVertexArrayObject", function() {
                expect(WebGLVertexArrayObject).to.not.be.null;
            });

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
describe("MonkeyBrush", function() {
    it("MB founded", function() {
        expect(MB).to.be.a("object");
    });
    it("MBS founded", function() {
        expect(MBS).to.be.a("object");
    });
    it("MBX founded", function() {
        expect(MBX).to.be.a("object");
    });
    it("MB version founded", function() {
        expect(MB.VERSION).to.be.a("string");
    });
    it("window MB/S founded", function() {
        expect(window).include.keys(["MB", "MBS", "MBX"]);
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
describe("Geometry functions", function() {
    it("Triangle centroid", function() {
        var centroid = MB.GeometryFunctions.triangleCentroid(new Float32Array([0, 1, 0]), new Float32Array([1, 0, 0]), new Float32Array([0, 0, 1]));
        expect(centroid[0]).to.equal(0.3333333432674408);
        expect(centroid[1]).to.equal(0.3333333432674408);
        expect(centroid[2]).to.equal(0.3333333432674408);
    });
    it("Remove degenerate indices", function() {
        var cells = MB.GeometryFunctions.removeDegerateIndices([[0, 1, 2], [0, 1, 1]]);
        expect(cells.length).to.equal(1);
    });
    it("Remove degenerate indices with vertices", function() {
        var cells = MB.GeometryFunctions.removeDegerateIndicesWithVertices(
            [
                [0, 1, 2],
                [0, 1, 1],
                [0, 2, 2],
                [1, 2, 3],
            ], [
                [0, 0, 0],
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 0]
            ]
        );
        expect(cells.length).to.equal(2);
    });
    it("Remove orphan vertices", function() {
        var mesh = MB.GeometryFunctions.removeOrphanVertices([
            [0, 2, 3]
        ], [
            [0, 0, 0],
            [0, 0, 0], // <- unused
            [1, 0, 3],
            [1, 0, 3],  // <- unused
            [0, 1, 0]
        ]);
        expect(mesh.positions.length).to.equal(3);
    });
    it("Triangulate quad", function() {
        var indices = MB.GeometryFunctions.triangulateQuadFace([[0, 1, 2, 3]]);
        expect(indices.length).to.equal(2);

        expect(indices[0][0]).to.equal(0);
        expect(indices[0][1]).to.equal(1);
        expect(indices[0][2]).to.equal(2);

        expect(indices[1][0]).to.equal(0);
        expect(indices[1][1]).to.equal(2);
        expect(indices[1][2]).to.equal(3);
    });
});
describe("Material", function() {
    describe("PostProcessMaterial", function() {
        var canvas = document.createElement("canvas");
        var ctx = new MB.GLContextW2(canvas);
        var prog = new MB.PostProcessMaterial(ctx, {
            name: "firsStepShader",
            fragmentShader: [
                "#version 300 es",
                "precision highp float;",
                "in vec2 uv;",
                "uniform sampler2D tex;",
                "out vec4 fragColor;",
                "void main() {",
                "    fragColor = texture(tex, uv);",
                "}"
            ].join("\n"),
            uniforms: {
                tex: {
                    type: MB.UniformType.Integer,
                    value: 0
                },
                time: { type: MB.UniformType.Float }
            }
        });
        it("Texture type", function() {
            expect(prog.uniforms.tex.type).to.equal(MB.UniformType.Integer);
        });
        it("Texture value", function() {
            expect(prog.uniforms.tex.value).to.equal(0);
        });
        it("Uniform undefined", function() {
            expect(prog.uniforms.time).to.be.undefined;
        });
    });
});
describe("Maths", function() {
    describe("Vect2", function() {
        it("Add", function() {
            var v1 = new MB.Vect2(1, 0);
            var v2 = new MB.Vect2(5, 0);
            v1.add(v2);
            expect(v1.x).to.equal(6);
            expect(v1.y).to.equal(0);
        });
        it("Static Add", function() {
            var v1 = new MB.Vect2(1, 0);
            var v2 = new MB.Vect2(5, 0);
            var vv = MB.Vect2.add(v1, v2);
            expect(vv.x).to.equal(6);
            expect(vv.y).to.equal(0);
        });
        it("Sub", function() {
            var v1 = new MB.Vect2(1, 0);
            var v2 = new MB.Vect2(5, 0);
            v1.sub(v2);
            expect(v1.x).to.equal(-4);
            expect(v1.y).to.equal(0);
        });
        it("Static Sub", function() {
            var v1 = new MB.Vect2(1, 0);
            var v2 = new MB.Vect2(5, 0);
            var vv = MB.Vect2.sub(v1, v2);
            expect(vv.x).to.equal(-4);
            expect(vv.y).to.equal(0);
        });
    });
    describe("Vect3", function() {
        it("Add", function() {
            var v1 = new MB.Vect3(1, 0, 2);
            var v2 = new MB.Vect3(5, 0, 3);
            v1.add(v2);
            expect(v1.x).to.equal(6);
            expect(v1.y).to.equal(0);
            expect(v1.z).to.equal(5);
        });
        it("Static Add", function() {
            var v1 = new MB.Vect3(1, 0, 2);
            var v2 = new MB.Vect3(5, 0, 3);
            var vv = MB.Vect3.add(v1, v2);
            expect(vv.x).to.equal(6);
            expect(vv.y).to.equal(0);
            expect(vv.z).to.equal(5);
        });
        it("Sub", function() {
            var v1 = new MB.Vect3(1, 0, 2);
            var v2 = new MB.Vect3(5, 0, 3);
            v1.sub(v2);
            expect(v1.x).to.equal(-4);
            expect(v1.y).to.equal(0);
            expect(v1.z).to.equal(-1);
        });
        it("Static Sub", function() {
            var v1 = new MB.Vect3(1, 0, 2);
            var v2 = new MB.Vect3(5, 0, 3);
            var vv = MB.Vect3.sub(v1, v2);
            expect(vv.x).to.equal(-4);
            expect(vv.y).to.equal(0);
            expect(vv.z).to.equal(-1);
        });
        it("Dot", function() {
            var v1 = new MB.Vect3(1, 0, 2);
            var v2 = new MB.Vect3(5, 0, 3);
            var dot = MB.Vect3.dot(v1, v2);
            expect(dot).to.equal(11);
        });
        it("Cross", function() {
            var v1 = new MB.Vect3(1, 0, 0);
            var v2 = new MB.Vect3(0, 0, 1);
            var cross = MB.Vect3.cross(v1, v2);
            var eq = cross.exactEquals(new MB.Vect3(0, -1, 0));
            expect(eq).to.equal(true);
        });
    });
    describe("Vect4", function() {
        it("Add", function() {
            var v1 = new MB.Vect4(1, 0, 0, 1);
            var v2 = new MB.Vect4(5, 0, 0, 1);
            v1.add(v2);
            expect(v1.x).to.equal(6);
            expect(v1.y).to.equal(0);
            expect(v1.z).to.equal(0);
            expect(v1.w).to.equal(2);
        });
        it("Static Add", function() {
            var v1 = new MB.Vect4(1, 0, 0, 1);
            var v2 = new MB.Vect4(5, 0, 0, 1);
            var vv = MB.Vect4.add(v1, v2);
            expect(vv.x).to.equal(6);
            expect(vv.y).to.equal(0);
            expect(vv.z).to.equal(0);
            expect(vv.w).to.equal(2);
        });
        it("Sub", function() {
            var v1 = new MB.Vect4(1, 0, 0, 1);
            var v2 = new MB.Vect4(5, 0, 0, 1);
            v1.sub(v2);
            expect(v1.x).to.equal(-4);
            expect(v1.y).to.equal(0);
            expect(v1.z).to.equal(0);
            expect(v1.w).to.equal(0);
        });
        it("Static Sub", function() {
            var v1 = new MB.Vect4(1, 0, 0, 1);
            var v2 = new MB.Vect4(5, 0, 0, 1);
            var vv = MB.Vect4.sub(v1, v2);
            expect(vv.x).to.equal(-4);
            expect(vv.y).to.equal(0);
            expect(vv.z).to.equal(0);
            expect(vv.w).to.equal(0);
        });
    });
    describe("Mathf", function() {
        it("Sign positive", function() {
            expect(MB.Mathf.sign(5)).to.equal(1);
        });
        it("Sign negative", function() {
            expect(MB.Mathf.sign(-5)).to.equal(-1);
        });
        it("Nearest POT", function() {
            expect(MB.Mathf.nearestPOT(150)).to.equal(128);
        });
        it("isPOT true", function() {
            expect(MB.Mathf.isPOT(256)).to.equal(true);
        });
        it("isPOT false", function() {
            expect(MB.Mathf.isPOT(150)).to.equal(false);
        });
    });
});
describe("Others tests", function() {
    it("Color3 HEX-Color", function() {
        var color = MB.Color3.createFromHex(0xA52A2A);
        var hex = "0x" + (
            MB.Mathf.toHex((255 * color.r) | 0) +
            MB.Mathf.toHex((255 * color.g) | 0) +
            MB.Mathf.toHex((255 * color.b) | 0));
        expect(hex).to.equal("0xA52A2A");
    });
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
    it("Flatten array", function() {
        var arr = [0, [1, 2], 3, [4, [5, 6]]];
        expect(arr.length).to.equal(4);
        var arr2 = MB.Utils.flattenArray(arr);
        expect(arr2.length).to.equal(7);
    });
    describe("Array to vector", function() {
        it("MB.Vect2", function() {
            var vv = MB.Utils.arrayToVector([0, 1]);
            expect(vv).to.be.an.instanceof(MB.Vect2);
        });
        it("MB.Vect3", function() {
            var vv = MB.Utils.arrayToVector([0, 1, 2]);
            expect(vv).to.be.an.instanceof(MB.Vect3);
        });
        it("MB.Vect4", function() {
            var vv = MB.Utils.arrayToVector([0, 1, 2, 4]);
            expect(vv).to.be.an.instanceof(MB.Vect4);
        });
    });
    describe("CustomPingPong", function() {
        describe("Not replace", function() {
            var pp = new MB.CustomPingPong(1, 2);
            it("First element", function() {
                expect(pp.first()).to.equal(1);
            });
            it("Last element", function() {
                expect(pp.last()).to.equal(2);
            });
        });
        describe("With replace", function() {
            var pp = new MB.CustomPingPong(1, 2);
            pp.swap();
            it("First element (replace)", function() {
                expect(pp.first()).to.equal(2);
            });
            it("Last element (replace)", function() {
                expect(pp.last()).to.equal(1);
            });
        });
    });
});
