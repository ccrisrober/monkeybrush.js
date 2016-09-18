"use strict";
var MB;
(function (MB) {
    MB.VERSION = "1.9.0";
})(MB || (MB = {}));
;

if (Number["epsilon"] === undefined) {
    Number["epsilon"] = 0.0001;
}
if (Number["smallEpsilon"] === undefined) {
    Number["smallEpsilon"] = 0.0000001;
}
if (Number["defaultIOR"] === undefined) {
    Number["defaultIOR"] = 1.000277;
}
if (Math["degree"] === undefined) {
    Math["degree"] = Math.PI / 180.0;
}
;
if (Math["toRadian"] === undefined) {
    Math["toRadian"] = function (a) {
        return a * Math["degree"];
    };
}
;
if (Math["trunc"] === undefined) {
    Math["trunc"] = function (x) {
        return x - x % 1;
    };
}
;

"use strict";

"use strict";
var MB;
(function (MB) {
    var Box2D = (function () {
        function Box2D(min, max) {
            if (min === void 0) { min = new MB.Vect2(Infinity, Infinity); }
            if (max === void 0) { max = new MB.Vect2(-Infinity, -Infinity); }
            this._min = min;
            this._max = max;
            this._center = MB.Vect2.add(this._min, this._max).scale(0.5);
        }
        Object.defineProperty(Box2D.prototype, "min", {
            get: function () {
                return this._min;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Box2D.prototype, "max", {
            get: function () {
                return this._max;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Box2D.prototype, "center", {
            get: function () {
                return this._center;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Box2D.prototype, "size", {
            get: function () {
                return MB.Vect2.sub(this.max, this.min);
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        Box2D.prototype.containtsPoint = function (p) {
            if (p.x > this._min.x || p.x < this._max.x ||
                p.y > this._min.y || p.y < this._max.y) {
                return true;
            }
            return false;
        };
        Box2D.prototype.containsBox = function (b) {
            if ((this._min.x <= b._min.x) && (b._max.x <= this._max.x) &&
                (this._min.y <= b._min.y) && (b._max.y <= this._max.y)) {
                return true;
            }
            return false;
        };
        ;
        Box2D.prototype.intersectsBox = function (b) {
            if (b._max.x < this._min.x || b._min.x > this._max.x ||
                b._max.y < this._min.y || b._min.y > this._max.y) {
                return false;
            }
            return true;
        };
        ;
        Box2D.prototype.isEqual = function (b) {
            return b._min.isEquals(this._min) && b._max.isEquals(this._max);
        };
        return Box2D;
    }());
    MB.Box2D = Box2D;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Box3D = (function () {
        function Box3D(min, max) {
            if (min === void 0) { min = new MB.Vect3(Infinity, Infinity, Infinity); }
            if (max === void 0) { max = new MB.Vect3(-Infinity, -Infinity, -Infinity); }
            this._min = min;
            this._max = max;
            this._center = MB.Vect3.add(this._min, this._max).scale(0.5);
        }
        Object.defineProperty(Box3D.prototype, "min", {
            get: function () {
                return this._min;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Box3D.prototype, "max", {
            get: function () {
                return this._max;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Box3D.prototype, "center", {
            get: function () {
                return this._center;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Box3D.prototype, "size", {
            get: function () {
                return MB.Vect3.sub(this.max, this.min);
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        Box3D.prototype.containtsPoint = function (p) {
            if (p.x > this._min.x || p.x < this._max.x ||
                p.y > this._min.y || p.y < this._max.y ||
                p.z > this._min.z || p.z < this._max.z) {
                return true;
            }
            return false;
        };
        Box3D.prototype.containsBox = function (b) {
            if ((this._min.x <= b._min.x) && (b._max.x <= this._max.x) &&
                (this._min.y <= b._min.y) && (b._max.y <= this._max.y) &&
                (this._min.z <= b._min.z) && (b._max.z <= this._max.z)) {
                return true;
            }
            return false;
        };
        ;
        Box3D.prototype.intersectsBox = function (b) {
            if (b._max.x < this._min.x || b._min.x > this._max.x ||
                b._max.y < this._min.y || b._min.y > this._max.y ||
                b._max.z < this._min.z || b._min.z > this._max.z) {
                return false;
            }
            return true;
        };
        ;
        Box3D.createFromArray = function (array) {
            var minX = +Infinity;
            var minY = +Infinity;
            var minZ = +Infinity;
            var maxX = -Infinity;
            var maxY = -Infinity;
            var maxZ = -Infinity;
            for (var i = 0, size = array.length; i < size; i += 3) {
                var x = array[i], y = array[i + 1], z = array[i + 2];
                if (x < minX)
                    minX = x;
                if (y < minY)
                    minY = y;
                if (z < minZ)
                    minZ = z;
                if (x > maxX)
                    maxX = x;
                if (y > maxY)
                    maxY = y;
                if (z > maxZ)
                    maxZ = z;
            }
            return new Box3D(new MB.Vect3(minX, minY, minZ), new MB.Vect3(maxX, maxY, maxZ));
        };
        ;
        return Box3D;
    }());
    MB.Box3D = Box3D;
    ;
})(MB || (MB = {}));
;

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MB;
(function (MB) {
    var curves;
    (function (curves) {
        var Curve2D = (function () {
            function Curve2D() {
            }
            return Curve2D;
        }());
        curves.Curve2D = Curve2D;
        ;
        var Ellipse = (function (_super) {
            __extends(Ellipse, _super);
            function Ellipse(center, radius, startAngle, endAngle, isClockwise) {
                _super.call(this);
                this._center = center;
                this._radius = radius;
                this._startAngle = startAngle;
                this._endAngle = endAngle;
                this._isClockwise = isClockwise;
            }
            ;
            Ellipse.prototype.evaluate = function (t) {
                var TWOPI = Math.PI * 2;
                var deltaAngle = this._endAngle - this._startAngle;
                if (deltaAngle < 0)
                    deltaAngle += TWOPI;
                if (deltaAngle > TWOPI)
                    deltaAngle -= TWOPI;
                var angle = this._isClockwise ? this._endAngle + (1 - t) *
                    (TWOPI - deltaAngle) : this._startAngle + t * deltaAngle;
                var tx = this._center.x + this._radius.x * Math.cos(angle);
                var ty = this._center.y + this._radius.y * Math.sin(angle);
                return new MB.Vect2(tx, ty);
            };
            return Ellipse;
        }(Curve2D));
        curves.Ellipse = Ellipse;
        ;
        var Line2D = (function (_super) {
            __extends(Line2D, _super);
            function Line2D(x, y) {
                _super.call(this);
                this._p1 = x;
                this._p2 = y;
            }
            ;
            Line2D.prototype.evaluate = function (t) {
                return MB.Vect2.add(MB.Vect2.sub(this._p2, this._p1).multByScalar(t), this._p1);
            };
            ;
            return Line2D;
        }(Curve2D));
        curves.Line2D = Line2D;
        ;
        var Line3D = (function () {
            function Line3D(x, y) {
                this._p1 = x;
                this._p2 = y;
            }
            ;
            Line3D.prototype.interpolate = function (t) {
                return MB.Vect3.add(MB.Vect3.sub(this._p2, this._p1).multByScalar(t), (this._p1));
            };
            ;
            return Line3D;
        }());
        curves.Line3D = Line3D;
        ;
        var CubicBezier = (function (_super) {
            __extends(CubicBezier, _super);
            function CubicBezier(cpi, cpp1, cpp2, cpe) {
                _super.call(this);
                this._curves = [];
                this._list = [cpi, cpp1, cpp2, cpe];
            }
            ;
            CubicBezier.prototype.bezierCurveInterpolation = function (p0, p1, p2, p3, t) {
                return (p0 * Math.pow(1 - t, 3)) +
                    (3 * p1 * Math.pow(1 - t, 2) * t) +
                    (3 * p2 * t * t * (1 - t)) +
                    (p3 * t * t * t);
            };
            ;
            CubicBezier.prototype.evaluate = function (t) {
                return new MB.Vect2(this.bezierCurveInterpolation(this._list[0].x, this._list[1].x, this._list[2].x, this._list[3].x, t), this.bezierCurveInterpolation(this._list[0].y, this._list[1].y, this._list[2].y, this._list[3].y, t));
            };
            ;
            CubicBezier.prototype.getPoints = function (subdivisions) {
            };
            ;
            return CubicBezier;
        }(Curve2D));
        curves.CubicBezier = CubicBezier;
        ;
        var QuadraticBezier = (function (_super) {
            __extends(QuadraticBezier, _super);
            function QuadraticBezier(cpi, cpp, cpe) {
                _super.call(this);
                this._curves = [];
                this._list = [cpi, cpp, cpe];
            }
            ;
            QuadraticBezier.prototype.bezierCurveInterpolation = function (p0, p1, p2, t) {
                return (p0 * Math.pow((1 - t), 2)) +
                    (2 * p1 * (1 - t) * t) +
                    (p2 * Math.pow(t, 2));
            };
            ;
            QuadraticBezier.prototype.evaluate = function (t) {
                return new MB.Vect2(this.bezierCurveInterpolation(this._list[0].x, this._list[1].x, this._list[2].x, t), this.bezierCurveInterpolation(this._list[0].y, this._list[1].y, this._list[2].y, t));
            };
            ;
            return QuadraticBezier;
        }(Curve2D));
        curves.QuadraticBezier = QuadraticBezier;
    })(curves = MB.curves || (MB.curves = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Mat2 = (function () {
        function Mat2(values) {
            if (values === void 0) { values = null; }
            this._value = new Float32Array(4);
            if (values) {
                this.init(values);
            }
        }
        ;
        Mat2.prototype.init = function (values) {
            for (var i = 0; i < 4; ++i) {
                this._value[i] = values[i];
            }
            return this;
        };
        ;
        Mat2.prototype.isEquals = function (mat, threshold) {
            if (threshold === void 0) { threshold = false; }
            for (var i = 0; i < 4; ++i) {
                if (threshold) {
                    if (Math.abs(this._value[i] - mat._value[i]) > 0.00001) {
                        return false;
                    }
                }
                else {
                    if (Math.abs(this._value[i] - mat._value[i]) !== 0) {
                        return false;
                    }
                }
            }
            return true;
        };
        ;
        Mat2.prototype.transpose = function () {
            var t = this._value[1];
            this._value[1] = this._value[2];
            this._value[2] = t;
            return this;
        };
        ;
        Mat2.prototype.determinant = function () {
            return this._value[0] * this._value[3] - this._value[2] * this._value[1];
        };
        ;
        Mat2.prototype.invert = function () {
            var det = this.determinant();
            if (!det)
                return null;
            this._value[0] = det * this._value[3];
            this._value[1] = det * -this._value[1];
            this._value[2] = det * -this._value[2];
            this._value[3] = det * this._value[0];
            return this;
        };
        ;
        Mat2.prototype.add = function (m) {
            for (var i = 0; i < 4; ++i) {
                this._value[i] += m._value[i];
            }
            return this;
        };
        Mat2.prototype.sub = function (m) {
            for (var i = 0; i < 4; ++i) {
                this._value[i] -= m._value[i];
            }
            return this;
        };
        Mat2.prototype.mult = function (m) {
            var a11 = this._value[0], a12 = this._value[1], a21 = this._value[2], a22 = this._value[3];
            this._value[0] = a11 * this._value[0] + a12 * this._value[2];
            this._value[1] = a11 * this._value[1] + a12 * this._value[3];
            this._value[2] = a21 * this._value[0] + a22 * this._value[2];
            this._value[3] = a21 * this._value[1] + a22 * this._value[3];
            return this;
        };
        ;
        Mat2.prototype.identity = function () {
            this._value[0] = 1;
            this._value[1] = 0;
            this._value[2] = 0;
            this._value[3] = 1;
            return this;
        };
        ;
        Mat2.prototype.toString = function () {
            return "Mat2(\n                " + this._value[0] + ", " + this._value[1] + ",\n                " + this._value[2] + ", " + this._value[3] + "\n           )";
        };
        ;
        Mat2.prototype.rotate = function (angle) {
            var a11 = this._value[0], a12 = this._value[1], a21 = this._value[2], a22 = this._value[3], s = Math.sin(angle), c = Math.cos(angle);
            this._value[0] = a11 * c + a12 * s;
            this._value[1] = a11 * -s + a12 * c;
            this._value[2] = a21 * c + a22 * s;
            this._value[3] = a21 * -s + a22 * c;
            return this;
        };
        ;
        Mat2.prototype.scale = function (v) {
            var a11 = this._value[0], a12 = this._value[1], a21 = this._value[2], a22 = this._value[3];
            var x = v.x, y = v.y;
            this._value[0] = a11 * x;
            this._value[1] = a12 * y;
            this._value[2] = a21 * x;
            this._value[3] = a22 * y;
            return this;
        };
        ;
        return Mat2;
    }());
    MB.Mat2 = Mat2;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Mat3 = (function () {
        function Mat3(values) {
            if (values === void 0) { values = null; }
            this._value = new Float32Array(9);
            if (values) {
                this.init(values);
            }
        }
        ;
        Mat3.prototype.init = function (values) {
            for (var i = 0; i < 9; ++i) {
                this._value[i] = values[i];
            }
            return this;
        };
        ;
        Mat3.prototype.isEquals = function (mat, threshold) {
            if (threshold === void 0) { threshold = false; }
            for (var i = 0; i < 9; ++i) {
                if (threshold) {
                    if (Math.abs(this._value[i] - mat._value[i]) > 0.00001) {
                        return false;
                    }
                }
                else {
                    if (Math.abs(this._value[i] - mat._value[i]) !== 0) {
                        return false;
                    }
                }
            }
            return true;
        };
        ;
        Mat3.prototype.toMat4 = function (result) {
            if (result === void 0) { result = null; }
            if (result) {
                return MB.Mat4.create([
                    this._value[0],
                    this._value[1],
                    this._value[2],
                    0,
                    this._value[3],
                    this._value[4],
                    this._value[5],
                    0,
                    this._value[6],
                    this._value[7],
                    this._value[8],
                    0,
                    0,
                    0,
                    0,
                    1
                ]);
            }
            else {
                return new MB.Mat4([
                    this._value[0],
                    this._value[1],
                    this._value[2],
                    0,
                    this._value[3],
                    this._value[4],
                    this._value[5],
                    0,
                    this._value[6],
                    this._value[7],
                    this._value[8],
                    0,
                    0,
                    0,
                    0,
                    1
                ]);
            }
        };
        Mat3.prototype.transpose = function () {
            var t01 = this._value[1], t02 = this._value[2], t12 = this._value[5];
            this._value[1] = this._value[3];
            this._value[2] = this._value[6];
            this._value[3] = t01;
            this._value[5] = this._value[7];
            this._value[6] = t02;
            this._value[7] = t12;
            return this;
        };
        ;
        Mat3.prototype.determinant = function () {
            var a00 = this._value[0], a01 = this._value[1], a02 = this._value[2], a10 = this._value[3], a11 = this._value[4], a12 = this._value[5], a20 = this._value[6], a21 = this._value[7], a22 = this._value[8];
            var det01 = a22 * a11 - a12 * a21, det11 = -a22 * a10 + a12 * a20, det21 = a21 * a10 - a11 * a20;
            return a00 * det01 + a01 * det11 + a02 * det21;
        };
        ;
        Mat3.prototype.invert = function () {
            var a00 = this._value[0], a01 = this._value[1], a02 = this._value[2], a10 = this._value[3], a11 = this._value[4], a12 = this._value[5], a20 = this._value[6], a21 = this._value[7], a22 = this._value[8];
            var det01 = a22 * a11 - a12 * a21, det11 = -a22 * a10 + a12 * a20, det21 = a21 * a10 - a11 * a20;
            var det = a00 * det01 + a01 * det11 + a02 * det21;
            if (!det)
                return null;
            det = 1.0 / det;
            this._value[0] = det01 * det;
            this._value[1] = (-a22 * a01 + a02 * a21) * det;
            this._value[2] = (a12 * a01 - a02 * a11) * det;
            this._value[3] = det11 * det;
            this._value[4] = (a22 * a00 - a02 * a20) * det;
            this._value[5] = (-a12 * a00 + a02 * a10) * det;
            this._value[6] = det21 * det;
            this._value[7] = (-a21 * a00 + a01 * a20) * det;
            this._value[8] = (a11 * a00 - a01 * a10) * det;
            return this;
        };
        ;
        Mat3.prototype.add = function (m) {
            for (var i = 0; i < 9; ++i) {
                this._value[i] += m._value[i];
            }
            return this;
        };
        ;
        Mat3.prototype.sub = function (m) {
            for (var i = 0; i < 9; ++i) {
                this._value[i] -= m._value[i];
            }
            return this;
        };
        ;
        Mat3.prototype.mult = function (m) {
            var a00 = this._value[0], a01 = this._value[1], a02 = this._value[2], a10 = this._value[3], a11 = this._value[4], a12 = this._value[5], a20 = this._value[6], a21 = this._value[7], a22 = this._value[8];
            var b00 = this._value[0], b01 = this._value[1], b02 = this._value[2], b10 = this._value[3], b11 = this._value[4], b12 = this._value[5], b20 = this._value[6], b21 = this._value[7], b22 = this._value[8];
            this._value[0] = b00 * a00 + b01 * a10 + b02 * a20;
            this._value[1] = b00 * a01 + b01 * a11 + b02 * a21;
            this._value[2] = b00 * a02 + b01 * a12 + b02 * a22;
            this._value[3] = b10 * a00 + b11 * a10 + b12 * a20;
            this._value[4] = b10 * a01 + b11 * a11 + b12 * a21;
            this._value[5] = b10 * a02 + b11 * a12 + b12 * a22;
            this._value[6] = b20 * a00 + b21 * a10 + b22 * a20;
            this._value[7] = b20 * a01 + b21 * a11 + b22 * a21;
            this._value[8] = b20 * a02 + b21 * a12 + b22 * a22;
            return this;
        };
        ;
        Mat3.prototype.identity = function () {
            this._value[0] = 1;
            this._value[1] = 0;
            this._value[2] = 0;
            this._value[3] = 0;
            this._value[4] = 1;
            this._value[5] = 0;
            this._value[6] = 0;
            this._value[7] = 0;
            this._value[8] = 1;
            return this;
        };
        ;
        Mat3.prototype.toString = function () {
            return "Mat3(\n                " + this._value[0] + ", " + this._value[1] + ",  " + this._value[2] + ",\n                " + this._value[3] + ", " + this._value[4] + ",  " + this._value[5] + ",\n                " + this._value[6] + ", " + this._value[7] + ",  " + this._value[8] + "\n           )";
        };
        ;
        Mat3.prototype.translate = function (v) {
            var a00 = this._value[0], a01 = this._value[1], a02 = this._value[2], a10 = this._value[3], a11 = this._value[4], a12 = this._value[5], a20 = this._value[6], a21 = this._value[7], a22 = this._value[8], x = v[0], y = v[1];
            this._value[6] = x * a00 + y * a10 + a20;
            this._value[7] = x * a01 + y * a11 + a21;
            this._value[8] = x * a02 + y * a12 + a22;
            return this;
        };
        ;
        Mat3.prototype.rotate = function (angle, axis) {
            var x = axis.x, y = axis.y, z = axis.z;
            var length = Math.sqrt(x * x + y * y + z * z);
            if (!length)
                return null;
            if (length !== 1) {
                length = 1 / length;
                x *= length;
                y *= length;
                z *= length;
            }
            var s = Math.sin(angle);
            var c = Math.cos(angle);
            var t = 1.0 - c;
            var a00 = this._value[0], a01 = this._value[1], a02 = this._value[2], a10 = this._value[4], a11 = this._value[5], a12 = this._value[6], a20 = this._value[8], a21 = this._value[9], a22 = this._value[10];
            var b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s, b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s, b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;
            this._value[0] = a00 * b00 + a10 * b01 + a20 * b02;
            this._value[1] = a01 * b00 + a11 * b01 + a21 * b02;
            this._value[2] = a02 * b00 + a12 * b01 + a22 * b02;
            this._value[3] = a00 * b10 + a10 * b11 + a20 * b12;
            this._value[4] = a01 * b10 + a11 * b11 + a21 * b12;
            this._value[5] = a02 * b10 + a12 * b11 + a22 * b12;
            this._value[6] = a00 * b20 + a10 * b21 + a20 * b22;
            this._value[7] = a01 * b20 + a11 * b21 + a21 * b22;
            this._value[8] = a02 * b20 + a12 * b21 + a22 * b22;
            return this;
        };
        ;
        Mat3.prototype.scale = function (v) {
            var x = v[0], y = v[1];
            this._value[0] *= x;
            this._value[1] *= x;
            this._value[2] *= x;
            this._value[3] *= y;
            this._value[4] *= y;
            this._value[5] *= y;
            return this;
        };
        ;
        return Mat3;
    }());
    MB.Mat3 = Mat3;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Mat4 = (function () {
        function Mat4(values) {
            if (values === void 0) { values = null; }
            this._value = new Float32Array(16);
            this.mult = function (b, dest) {
                if (dest === void 0) { dest = null; }
                if (!dest)
                    dest = this;
                var a00 = this._value[0], a01 = this._value[1], a02 = this._value[2], a03 = this._value[3], a10 = this._value[4], a11 = this._value[5], a12 = this._value[6], a13 = this._value[7], a20 = this._value[8], a21 = this._value[9], a22 = this._value[10], a23 = this._value[11], a30 = this._value[12], a31 = this._value[13], a32 = this._value[14], a33 = this._value[15];
                var b0 = b._value[0], b1 = b._value[1], b2 = b._value[2], b3 = b._value[3];
                dest._value[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                dest._value[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                dest._value[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                dest._value[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                b0 = b._value[4];
                b1 = b._value[5];
                b2 = b._value[6];
                b3 = b._value[7];
                dest._value[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                dest._value[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                dest._value[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                dest._value[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                b0 = b._value[8];
                b1 = b._value[9];
                b2 = b._value[10];
                b3 = b._value[11];
                dest._value[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                dest._value[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                dest._value[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                dest._value[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                b0 = b._value[12];
                b1 = b._value[13];
                b2 = b._value[14];
                b3 = b._value[15];
                dest._value[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
                dest._value[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
                dest._value[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
                dest._value[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
                return dest;
            };
            if (values) {
                this._value = new Float32Array(16);
                for (var i = 0; i < 16; ++i) {
                    this._value[i] = values[i];
                }
            }
            else {
                this._value = new Float32Array([
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 0]);
            }
        }
        ;
        Mat4.prototype.clone = function () {
            return new Mat4([
                this._value[0], this._value[1], this._value[2], this._value[3],
                this._value[4], this._value[5], this._value[6], this._value[7],
                this._value[8], this._value[9], this._value[10], this._value[11],
                this._value[12], this._value[13], this._value[14], this._value[15],
            ]);
        };
        ;
        Mat4.create = function (values) {
            return new Mat4(values);
        };
        ;
        Mat4.prototype.transpose = function (dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            var a01 = this._value[1], a02 = this._value[2], a03 = this._value[3], a12 = this._value[6], a13 = this._value[7], a23 = this._value[11];
            dest._value[1] = this._value[4];
            dest._value[2] = this._value[8];
            dest._value[3] = this._value[12];
            dest._value[4] = a01;
            dest._value[6] = this._value[9];
            dest._value[7] = this._value[13];
            dest._value[8] = a02;
            dest._value[9] = a12;
            dest._value[11] = this._value[14];
            dest._value[12] = a03;
            dest._value[13] = a13;
            dest._value[14] = a23;
            return dest;
        };
        ;
        Mat4.prototype.inverse = function (dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            var a00 = this._value[0], a01 = this._value[1], a02 = this._value[2], a03 = this._value[3], a10 = this._value[4], a11 = this._value[5], a12 = this._value[6], a13 = this._value[7], a20 = this._value[8], a21 = this._value[9], a22 = this._value[10], a23 = this._value[11], a30 = this._value[12], a31 = this._value[13], a32 = this._value[14], a33 = this._value[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) {
                return null;
            }
            det = 1.0 / det;
            dest._value[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            dest._value[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            dest._value[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            dest._value[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            dest._value[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            dest._value[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            dest._value[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            dest._value[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            dest._value[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            dest._value[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            dest._value[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            dest._value[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            dest._value[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            dest._value[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            dest._value[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            dest._value[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
            return dest;
        };
        ;
        Mat4.prototype.determinant = function () {
            var a00 = this._value[0], a01 = this._value[1], a02 = this._value[2], a03 = this._value[3], a10 = this._value[4], a11 = this._value[5], a12 = this._value[6], a13 = this._value[7], a20 = this._value[8], a21 = this._value[9], a22 = this._value[10], a23 = this._value[11], a30 = this._value[12], a31 = this._value[13], a32 = this._value[14], a33 = this._value[15];
            var det00 = a00 * a11 - a01 * a10, det01 = a00 * a12 - a02 * a10, det02 = a00 * a13 - a03 * a10, det03 = a01 * a12 - a02 * a11, det04 = a01 * a13 - a03 * a11, det05 = a02 * a13 - a03 * a12, det06 = a20 * a31 - a21 * a30, det07 = a20 * a32 - a22 * a30, det08 = a20 * a33 - a23 * a30, det09 = a21 * a32 - a22 * a31, det10 = a21 * a33 - a23 * a31, det11 = a22 * a33 - a23 * a32;
            return (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06);
        };
        ;
        Mat4.prototype.translate = function (v, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            var x = v.x, y = v.y, z = v.z;
            dest._value[12] = this._value[0] * x + this._value[4] * y + this._value[8] * z + this._value[12];
            dest._value[13] = this._value[1] * x + this._value[5] * y + this._value[9] * z + this._value[13];
            dest._value[14] = this._value[2] * x + this._value[6] * y + this._value[10] * z + this._value[14];
            dest._value[15] = this._value[3] * x + this._value[7] * y + this._value[11] * z + this._value[15];
            return dest;
        };
        ;
        Mat4.prototype.scale = function (v, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            var x = v.x, y = v.y, z = v.z;
            dest._value[0] *= x;
            dest._value[1] *= x;
            dest._value[2] *= x;
            dest._value[3] *= x;
            dest._value[4] *= y;
            dest._value[5] *= y;
            dest._value[6] *= y;
            dest._value[7] *= y;
            dest._value[8] *= z;
            dest._value[9] *= z;
            dest._value[10] *= z;
            dest._value[11] *= z;
            dest._value[12] = this._value[12];
            dest._value[13] = this._value[13];
            dest._value[14] = this._value[14];
            dest._value[15] = this._value[15];
            return dest;
        };
        ;
        Mat4.prototype.rotate = function (angle, axis, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            var x = axis.x, y = axis.y, z = axis.z, len = Math.sqrt(x * x + y * y + z * z), s, c, t, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22;
            if (Math.abs(len) < 0.0001) {
                return null;
            }
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
            s = Math.sin(angle);
            c = Math.cos(angle);
            t = 1 - c;
            a00 = this._value[0];
            a01 = this._value[1];
            a02 = this._value[2];
            a03 = this._value[3];
            a10 = this._value[4];
            a11 = this._value[5];
            a12 = this._value[6];
            a13 = this._value[7];
            a20 = this._value[8];
            a21 = this._value[9];
            a22 = this._value[10];
            a23 = this._value[11];
            b00 = x * x * t + c;
            b01 = y * x * t + z * s;
            b02 = z * x * t - y * s;
            b10 = x * y * t - z * s;
            b11 = y * y * t + c;
            b12 = z * y * t + x * s;
            b20 = x * z * t + y * s;
            b21 = y * z * t - x * s;
            b22 = z * z * t + c;
            dest._value[0] = a00 * b00 + a10 * b01 + a20 * b02;
            dest._value[1] = a01 * b00 + a11 * b01 + a21 * b02;
            dest._value[2] = a02 * b00 + a12 * b01 + a22 * b02;
            dest._value[3] = a03 * b00 + a13 * b01 + a23 * b02;
            dest._value[4] = a00 * b10 + a10 * b11 + a20 * b12;
            dest._value[5] = a01 * b10 + a11 * b11 + a21 * b12;
            dest._value[6] = a02 * b10 + a12 * b11 + a22 * b12;
            dest._value[7] = a03 * b10 + a13 * b11 + a23 * b12;
            dest._value[8] = a00 * b20 + a10 * b21 + a20 * b22;
            dest._value[9] = a01 * b20 + a11 * b21 + a21 * b22;
            dest._value[10] = a02 * b20 + a12 * b21 + a22 * b22;
            dest._value[11] = a03 * b20 + a13 * b21 + a23 * b22;
            if (dest !== this) {
                dest._value[12] = this._value[12];
                dest._value[13] = this._value[13];
                dest._value[14] = this._value[14];
                dest._value[15] = this._value[15];
            }
            return dest;
        };
        ;
        Mat4.frustum = function (l, r, b, t, n, f) {
            var rl = (r - l), tb = (t - b), fn = (f - n);
            return new Mat4([
                (n * 2.0) / rl, 0.0, 0.0, 0.0,
                0.0, (n * 2.0) / tb, 0.0, 0.0,
                (r + l) / rl, (t + b) / tb, -(f + n) / fn, -1.0,
                0.0, 0.0, -(f * n * 2.0) / fn, 0.0
            ]);
        };
        ;
        Mat4.perspective = function (fovy, aspect, near, far) {
            var top = near * Math.tan(fovy * Math.PI / 360.0), right = top * aspect;
            return Mat4.frustum(-right, right, -top, top, near, far);
        };
        ;
        Mat4.orthographic = function (l, r, b, t, n, f) {
            var rl = (r - l), tb = (t - b), fn = (f - n);
            return new Mat4([
                2.0 / rl, 0.0, 0.0, 0.0,
                0.0, 2.0 / tb, 0.0, 0.0,
                0.0, 0.0, -2.0 / fn, 0.0,
                -(l + r) / rl, -(t + b) / tb, -(f + n) / fn, 1.0
            ]);
        };
        ;
        Mat4.lookAt = function (pos, target, up) {
            if (pos.isEquals(target)) {
                return this.identity;
            }
            var z = MB.Vect3.sub(pos, target).normalize();
            var x = MB.Vect3.cross(up, z).normalize();
            var y = MB.Vect3.cross(z, x).normalize();
            return new Mat4([
                x.x, y.x, z.x, 0,
                x.y, y.y, z.y, 0,
                x.z, y.z, z.z, 0,
                -MB.Vect3.dot(x, pos), -MB.Vect3.dot(y, pos), -MB.Vect3.dot(z, pos), 1
            ]);
        };
        ;
        Mat4.product = function (m1, m2, result) {
            if (result === void 0) { result = null; }
            var a00 = m1._value[0], a01 = m1._value[1], a02 = m1._value[2], a03 = m1._value[3], a10 = m1._value[4], a11 = m1._value[5], a12 = m1._value[6], a13 = m1._value[7], a20 = m1._value[8], a21 = m1._value[9], a22 = m1._value[10], a23 = m1._value[11], a30 = m1._value[12], a31 = m1._value[13], a32 = m1._value[14], a33 = m1._value[15];
            var b00 = m2._value[0], b01 = m2._value[1], b02 = m2._value[2], b03 = m2._value[3], b10 = m2._value[4], b11 = m2._value[5], b12 = m2._value[6], b13 = m2._value[7], b20 = m2._value[8], b21 = m2._value[9], b22 = m2._value[10], b23 = m2._value[11], b30 = m2._value[12], b31 = m2._value[13], b32 = m2._value[14], b33 = m2._value[15];
            if (result) {
                return Mat4.create([
                    b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
                    b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
                    b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
                    b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
                    b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
                    b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
                    b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
                    b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
                    b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
                    b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
                    b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
                    b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
                    b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
                    b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
                    b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
                    b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33
                ]);
            }
            else {
                return Mat4.create([
                    b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
                    b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
                    b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
                    b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
                    b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
                    b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
                    b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
                    b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
                    b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
                    b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
                    b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
                    b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
                    b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
                    b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
                    b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
                    b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33
                ]);
            }
        };
        ;
        Mat4.prototype.toMat3 = function () {
            return new MB.Mat3([
                this._value[0],
                this._value[1],
                this._value[2],
                this._value[4],
                this._value[5],
                this._value[6],
                this._value[8],
                this._value[9],
                this._value[10]
            ]);
        };
        Mat4.identity = Mat4.create([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
        return Mat4;
    }());
    MB.Mat4 = Mat4;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Mathf;
    (function (Mathf) {
        function lerp(x, x1, x2, q00, q01) {
            return ((x2 - x) / (x2 - x1)) * q00 + ((x - x1) / (x2 - x1)) * q01;
        }
        Mathf.lerp = lerp;
        ;
        function biLerp(x, y, q11, q12, q21, q22, x1, x2, y1, y2) {
            var r1 = lerp(x, x1, x2, q11, q21);
            var r2 = lerp(x, x1, x2, q12, q22);
            return lerp(y, y1, y2, r1, r2);
        }
        Mathf.biLerp = biLerp;
        ;
        function triLerp(x, y, z, q000, q001, q010, q011, q100, q101, q110, q111, x1, x2, y1, y2, z1, z2) {
            var x00 = lerp(x, x1, x2, q000, q100);
            var x10 = lerp(x, x1, x2, q010, q110);
            var x01 = lerp(x, x1, x2, q001, q101);
            var x11 = lerp(x, x1, x2, q011, q111);
            var r0 = lerp(y, y1, y2, x00, x01);
            var r1 = lerp(y, y1, y2, x10, x11);
            return lerp(z, z1, z2, r0, r1);
        }
        Mathf.triLerp = triLerp;
        ;
        Mathf.Deg2Rad = Math.PI / 180;
        Mathf.Rad2Deg = 180 / Math.PI;
        function degToRad(degs) {
            return degs * this.Deg2Rad;
        }
        Mathf.degToRad = degToRad;
        ;
        function radToDeg(rads) {
            return rads * this.Rad2Deg;
        }
        Mathf.radToDeg = radToDeg;
        ;
        function isPOT(v) {
            return (v & (v - 1)) === 0 && v !== 0;
        }
        Mathf.isPOT = isPOT;
        ;
        function nearestPOT(v) {
            return Math.pow(2, Math.round(Math.log(v) / Math.LN2));
        }
        Mathf.nearestPOT = nearestPOT;
        ;
        function clamp(v, min, max) {
            return Math.min(max, Math.max(min, v));
        }
        Mathf.clamp = clamp;
        ;
        function clamp01(v) {
            return Math.min(1.0, Math.max(0.0, v));
        }
        Mathf.clamp01 = clamp01;
        ;
        function sign(v) {
            if (v === 0 || isNaN(v)) {
                return v;
            }
            return (v > 0) ? 1 : -1;
        }
        Mathf.sign = sign;
        ;
        function normalizeAngle(radAngle) {
            radAngle = radAngle % (2 * Math.PI);
            return radAngle >= 0 ? radAngle : radAngle + 2 * Math.PI;
        }
        Mathf.normalizeAngle = normalizeAngle;
        function smoothstep(x, min, max) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = 1; }
            if (x <= min)
                return 0;
            if (x >= max)
                return 1;
            x = (x - min) / (max - min);
            return x * x * (3 - 2 * x);
        }
        Mathf.smoothstep = smoothstep;
        ;
        function smootherstep(x, min, max) {
            if (x <= min)
                return 0;
            if (x >= max)
                return 1;
            x = (x - min) / (max - min);
            return Math.pow(x, 3) * (x * (x * 6 - 15) + 10);
        }
        Mathf.smootherstep = smootherstep;
        ;
        function toHex(n) {
            var str = n.toString(16);
            if (n <= 15) {
                return ("0" + str).toUpperCase();
            }
            return str.toUpperCase();
        }
        Mathf.toHex = toHex;
        ;
        function angleBetween2DPoints(p0, p1) {
            var delta = MB.Vect2.sub(p1, p0);
            return Math.atan2(delta.y, delta.x);
        }
        Mathf.angleBetween2DPoints = angleBetween2DPoints;
        ;
        function angleBetween3DPoints(p0, p1) {
            var delta = MB.Vect3.sub(p1, p0);
            return Math.atan2(delta.z, delta.x);
        }
        Mathf.angleBetween3DPoints = angleBetween3DPoints;
        ;
        function CatmullRom2D(p0, p1, p2, p3, t) {
            var t2 = t * t;
            var t3 = t * t2;
            var x = 0.5 * ((((2.0 * p1.x) + ((-p0.x + p2.x) * t)) +
                (((((2.0 * p0.x) - (5.0 * p1.x)) + (4.0 * p2.x)) - p3.x) * t2)) +
                ((((-p0.x + (3.0 * p1.x)) - (3.0 * p2.x)) + p3.x) * t3));
            var y = 0.5 * ((((2.0 * p1.y) + ((-p0.y + p2.y) * t)) +
                (((((2.0 * p0.y) - (5.0 * p1.y)) + (4.0 * p2.y)) - p3.y) * t2)) +
                ((((-p0.y + (3.0 * p1.y)) - (3.0 * p2.y)) + p3.y) * t3));
            return new MB.Vect2(x, y);
        }
        Mathf.CatmullRom2D = CatmullRom2D;
        ;
        function Hermite2D(p0, t0, p1, t1, t) {
            var t2 = t * t;
            var t3 = t * t2;
            var part1 = ((2.0 * t3) - (3.0 * t2)) + 1.0;
            var part2 = (-2.0 * t3) + (3.0 * t2);
            var part3 = (t3 - (2.0 * t2)) + t;
            var part4 = t3 - t2;
            var x = (((p0.x * part1) + (p1.x * part2)) + (t0.x * part3)) + (t1.x * part4);
            var y = (((p0.y * part1) + (p1.y * part2)) + (t0.y * part3)) + (t1.y * part4);
            return new MB.Vect2(x, y);
        }
        Mathf.Hermite2D = Hermite2D;
        ;
        function CatmullRom3D(p0, p1, p2, p3, t) {
            var t2 = t * t;
            var t3 = t * t2;
            var x = 0.5 * ((((2.0 * p1.x) + ((-p0.x + p2.x) * t)) +
                (((((2.0 * p0.x) - (5.0 * p1.x)) + (4.0 * p2.x)) - p3.x) * t2)) +
                ((((-p0.x + (3.0 * p1.x)) - (3.0 * p2.x)) + p3.x) * t3));
            var y = 0.5 * ((((2.0 * p1.y) + ((-p0.y + p2.y) * t)) +
                (((((2.0 * p0.y) - (5.0 * p1.y)) + (4.0 * p2.y)) - p3.y) * t2)) +
                ((((-p0.y + (3.0 * p1.y)) - (3.0 * p2.y)) + p3.y) * t3));
            var z = 0.5 * ((((2.0 * p1.z) + ((-p0.z + p2.z) * t)) +
                (((((2.0 * p0.z) - (5.0 * p1.z)) + (4.0 * p2.z)) - p3.z) * t2)) +
                ((((-p0.z + (3.0 * p1.z)) - (3.0 * p2.z)) + p3.z) * t3));
            return new MB.Vect3(x, y, z);
        }
        Mathf.CatmullRom3D = CatmullRom3D;
        ;
        function Hermite3D(p0, t0, p1, t1, t) {
            var t2 = t * t;
            var t3 = t * t2;
            var part1 = ((2.0 * t3) - (3.0 * t2)) + 1.0;
            var part2 = (-2.0 * t3) + (3.0 * t2);
            var part3 = (t3 - (2.0 * t2)) + t;
            var part4 = t3 - t2;
            var x = (((p0.x * part1) + (p1.x * part2)) + (t0.x * part3)) + (t1.x * part4);
            var y = (((p0.y * part1) + (p1.y * part2)) + (t0.y * part3)) + (t1.y * part4);
            var z = (((p0.z * part1) + (p1.z * part2)) + (t0.z * part3)) + (t1.z * part4);
            return new MB.Vect3(x, y, z);
        }
        Mathf.Hermite3D = Hermite3D;
        ;
    })(Mathf = MB.Mathf || (MB.Mathf = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Path = (function () {
        function Path(points) {
            if (points === void 0) { points = []; }
            this._currentPoint = new MB.Vect2();
            this._curves = new Array(0);
            if (points.length) {
                this.moveTo(points[0].x, points[0].y);
                for (var i = 1, size = points.length; i < size; ++i) {
                    this.lineTo(points[i].x, points[i].y);
                }
            }
        }
        ;
        Path.prototype.moveTo = function (x, y) {
            this._currentPoint.setXY(x, y);
        };
        ;
        Path.prototype.lineTo = function (x, y) {
            var curve = new MB.curves.Line2D(this._currentPoint.clone(), new MB.Vect2(x, y));
            this._curves.push(curve);
            this._currentPoint.setXY(x, y);
        };
        ;
        Path.prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
            var curve = new MB.curves.QuadraticBezier(this._currentPoint.clone(), new MB.Vect2(cpx, cpy), new MB.Vect2(x, y));
            this._curves.push(curve);
            this._currentPoint.setXY(x, y);
        };
        ;
        Path.prototype.bezierCurveTo = function (cpx1, cpy1, cpx2, cpy2, x, y) {
            var curve = new MB.curves.CubicBezier(this._currentPoint.clone(), new MB.Vect2(cpx1, cpy1), new MB.Vect2(cpx2, cpy2), new MB.Vect2(x, y));
            this._curves.push(curve);
            this._currentPoint.setXY(x, y);
        };
        ;
        return Path;
    }());
    MB.Path = Path;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Quat = (function () {
        function Quat(x, y, z, w) {
            if (x === void 0) { x = 0.0; }
            if (y === void 0) { y = 0.0; }
            if (z === void 0) { z = 0.0; }
            if (w === void 0) { w = 0.0; }
            this._value = new Float32Array([x, y, z, w]);
        }
        Object.defineProperty(Quat.prototype, "x", {
            get: function () { return this._value[0]; },
            set: function (v) { this._value[0] = v; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Quat.prototype, "y", {
            get: function () { return this._value[1]; },
            set: function (v) { this._value[1] = v; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Quat.prototype, "z", {
            get: function () { return this._value[2]; },
            set: function (v) { this._value[2] = v; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Quat.prototype, "w", {
            get: function () { return this._value[3]; },
            set: function (v) { this._value[3] = v; },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        ;
        ;
        ;
        Quat.create = function (values) {
            return new Quat(values[0], values[1], values[2], values[3]);
        };
        ;
        Quat.prototype.reset = function () {
            for (var i = 0; i < 4; ++i) {
                this._value[i] = 0.0;
            }
        };
        Quat.prototype.setIdentity = function () {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;
            return this;
        };
        Quat.prototype.add = function (q) {
            for (var i = 0; i < 4; ++i) {
                this._value[i] += q._value[i];
            }
            return this;
        };
        Quat.prototype.rem = function (q) {
            for (var i = 0; i < 4; ++i) {
                this._value[i] -= q._value[i];
            }
            return this;
        };
        Quat.add = function (q, q2, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Quat();
            dest.x = q.x + q2.x;
            dest.y = q.y + q2.y;
            dest.z = q.z + q2.z;
            dest.w = q.w + q2.w;
            return dest;
        };
        Quat.rem = function (q, q2, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Quat();
            dest.x = q.x - q2.x;
            dest.y = q.y - q2.y;
            dest.z = q.z - q2.z;
            dest.w = q.w - q2.w;
            return dest;
        };
        Quat.prototype.roll = function () {
            var x = this.x, y = this.y, z = this.z, w = this.w;
            return Math.atan2(2.0 * (x * y + w * z), w * w + x * x - y * y - z * z);
        };
        Quat.prototype.pitch = function () {
            var x = this.x, y = this.y, z = this.z, w = this.w;
            return Math.atan2(2.0 * (y * z + w * x), w * w - x * x - y * y + z * z);
        };
        Quat.prototype.yaw = function () {
            return Math.asin(2.0 * (this.x * this.z - this.w * this.y));
        };
        Quat.prototype.clone = function () {
            return new Quat(this._value[0], this._value[1], this._value[2], this._value[3]);
        };
        Quat.dot = function (q1, q2) {
            return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
        };
        Quat.prototype.mult = function (q) {
            var q1x = this._value[0], q1y = this._value[1], q1z = this._value[2], q1w = this._value[3];
            var q2x = q.x, q2y = q.y, q2z = q.z, q2w = q.w;
            this.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y;
            this.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z;
            this.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x;
            this.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
            return this;
        };
        Quat.prototype.normalize = function (dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            var x = this.x, y = this.y, z = this.z, w = this.w;
            var length = Math.sqrt(x * x + y * y + z * z + w * w);
            if (!length) {
                dest.x = 0;
                dest.y = 0;
                dest.z = 0;
                dest.w = 0;
                return dest;
            }
            length = 1 / length;
            dest.x = x * length;
            dest.y = y * length;
            dest.z = z * length;
            dest.w = w * length;
            return dest;
        };
        Quat.prototype.inverse = function () {
            var dot = Quat.dot(this, this);
            if (!dot) {
                this.reset();
                return this;
            }
            var invDot = dot ? 1.0 / dot : 0;
            this.x *= -invDot;
            this.y *= -invDot;
            this.z *= -invDot;
            this.w *= invDot;
            return this;
        };
        ;
        Quat.prototype.conjugate = function () {
            this._value[0] = -this._value[0];
            this._value[1] = -this._value[1];
            this._value[2] = -this._value[2];
            return this;
        };
        ;
        Quat.fromAxis = function (axis, angle, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Quat();
            angle *= 0.5;
            var sin = Math.sin(angle);
            dest.x = axis.x * sin;
            dest.y = axis.y * sin;
            dest.z = axis.z * sin;
            dest.w = Math.cos(angle);
            return dest;
        };
        return Quat;
    }());
    MB.Quat = Quat;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Interpolation;
    (function (Interpolation) {
        function linear(p0, p1, t) {
            return (p1 - p0) * t + p0;
        }
        Interpolation.linear = linear;
        ;
        function bezier(x1, y1, x2, y2, t) {
            var f0 = 1 - 3 * x2 + 3 * x1;
            var f1 = 3 * x2 - 6 * x1;
            var f2 = 3 * x1;
            var rt = t;
            for (var i = 0; i < 5; ++i) {
                var rt2 = rt * rt;
                var rt3 = rt2 * rt;
                var x = f0 * rt3 + f1 * rt2 + f2 * rt;
                var slope = 1.0 / (3.0 * f0 * rt2 + 2.0 * f1 * rt + f2);
                rt -= (x - t) * slope;
                rt = Math.min(1, Math.max(0, rt));
            }
            return 3 * Math.pow(1 - rt, 2) * rt * y1 +
                3 * (1 - rt) * Math.pow(rt, 2) * y2 +
                Math.pow(rt, 3);
        }
        Interpolation.bezier = bezier;
        ;
        function catmullRom(p0, p1, p2, p3, t) {
            var v0 = (p2 - p0) * 0.5, v1 = (p3 - p1) * 0.5, t2 = t * t, t3 = t * t2;
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 +
                (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        }
        Interpolation.catmullRom = catmullRom;
        ;
    })(Interpolation = MB.Interpolation || (MB.Interpolation = {}));
    ;
    var Spline2D = (function () {
        function Spline2D(intpMode, points) {
            if (intpMode === void 0) { intpMode = "catmullRom"; }
            if (points === void 0) { points = []; }
            this.controlPoints = [];
            this._intpMode = intpMode;
            this.controlPoints = points;
        }
        ;
        Spline2D.prototype.evaluate = function (t) {
            var point = (this.controlPoints.length - 1) * t;
            var intPoint = Math.floor(point);
            var w = point - intPoint;
            var p0 = this.controlPoints[intPoint === 0 ? intPoint : intPoint - 1];
            var p1 = this.controlPoints[intPoint];
            var p2 = this.controlPoints[intPoint > this.controlPoints.length - 2 ?
                this.controlPoints.length - 1 : intPoint + 1];
            var p3 = this.controlPoints[intPoint > this.controlPoints.length - 3 ?
                this.controlPoints.length - 1 : intPoint + 2];
            return new MB.Vect2(Interpolation[this._intpMode](p0.x, p1.x, p2.x, p3.x, w), Interpolation[this._intpMode](p0.y, p1.y, p2.y, p3.y, w));
        };
        ;
        return Spline2D;
    }());
    MB.Spline2D = Spline2D;
    ;
    var Spline3D = (function () {
        function Spline3D(intpMode, points) {
            if (intpMode === void 0) { intpMode = "catmullRom"; }
            if (points === void 0) { points = []; }
            this.controlPoints = [];
            this._oldDT = 0;
            this._currentDT = 0;
            this._intpMode = intpMode;
            this.controlPoints = points;
        }
        ;
        Spline3D.prototype.evaluate = function (t) {
            var point = (this.controlPoints.length - 1) * t;
            var intPoint = Math.floor(point);
            var w = point - intPoint;
            var p0 = this.controlPoints[intPoint === 0 ? intPoint : intPoint - 1];
            var p1 = this.controlPoints[intPoint];
            var p2 = this.controlPoints[intPoint > this.controlPoints.length - 2 ?
                this.controlPoints.length - 1 : intPoint + 1];
            var p3 = this.controlPoints[intPoint > this.controlPoints.length - 3 ?
                this.controlPoints.length - 1 : intPoint + 2];
            return new MB.Vect3(Interpolation[this._intpMode](p0.x, p1.x, p2.x, p3.x, w), Interpolation[this._intpMode](p0.y, p1.y, p2.y, p3.y, w), Interpolation[this._intpMode](p0.z, p1.z, p2.z, p3.z, w));
        };
        ;
        Spline3D.prototype.getTangent = function (oldDT, currentDT) {
            if (oldDT === void 0) { oldDT = this._oldDT; }
            if (currentDT === void 0) { currentDT = this._currentDT; }
            var p0 = this.evaluate(oldDT);
            var p1 = this.evaluate(currentDT);
            return MB.Vect3.sub(p1, p0).normalize();
        };
        ;
        Spline3D.prototype.angleBetweenPoints = function (oldDT, currentDT) {
            if (oldDT === void 0) { oldDT = this._oldDT; }
            if (currentDT === void 0) { currentDT = this._currentDT; }
            var p0 = this.evaluate(oldDT);
            var p1 = this.evaluate(currentDT);
            var angle = Math.atan2(p1.z - p0.z, p1.x - p0.x);
            return angle * Math.PI / 180.0;
        };
        ;
        return Spline3D;
    }());
    MB.Spline3D = Spline3D;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Vect2 = (function () {
        function Vect2(x, y) {
            var _this = this;
            if (x === void 0) { x = 0.0; }
            if (y === void 0) { y = 0.0; }
            this.toString = function () {
                return "Vect2(" + _this.x + ", " + _this.y + ")";
            };
            this._value = new Float32Array([x, y]);
        }
        ;
        Vect2.create = function (values) {
            return new Vect2(values[0], values[1]);
        };
        ;
        Vect2.createFromScalar = function (value) {
            return new Vect2(value, value);
        };
        ;
        Vect2.prototype.clone = function () {
            return new Vect2(this.x, this.y);
        };
        ;
        Vect2.prototype.add = function (v) {
            this.x += v.x;
            this.y += v.y;
            return this;
        };
        ;
        Vect2.prototype.sub = function (v) {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        };
        ;
        Vect2.prototype.mult = function (v) {
            this.x *= v.x;
            this.y *= v.y;
            return this;
        };
        ;
        Vect2.prototype.multByScalar = function (s) {
            this.x *= s;
            this.y *= s;
            return this;
        };
        ;
        Vect2.prototype.div = function (v) {
            this.x /= v.x;
            this.y /= v.y;
            return this;
        };
        ;
        Vect2.prototype.scale = function (value, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            dest.x *= value;
            dest.y *= value;
            return dest;
        };
        ;
        Vect2.prototype.scaleAndAdd = function (v, scale, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            dest.x = this.x + (v.x * scale);
            dest.y = this.y + (v.y * scale);
            return dest;
        };
        ;
        Vect2.distance = function (v, v2) {
            return Math.sqrt(this.squaredDistance(v, v2));
        };
        ;
        Vect2.squaredDistance = function (v, v2) {
            var x = v2.x - v.x, y = v2.y - v.y;
            return (x * x + y * y);
        };
        ;
        Vect2.prototype.negate = function (dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            dest.x = -this.x;
            dest.y = -this.y;
            return dest;
        };
        ;
        Vect2.prototype.inverse = function (dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            dest.x = 1 / this.x;
            dest.y = 1 / this.y;
            return dest;
        };
        ;
        Vect2.prototype.normalize = function (dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            var len = this.x * this.x + this.y * this.y;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                dest.x = this.x * len;
                dest.y = this.y * len;
            }
            return dest;
        };
        ;
        Vect2.dot = function (v, v2) {
            return (v.x * v2.x + v.y * v2.y);
        };
        ;
        Object.defineProperty(Vect2.prototype, "value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Vect2.prototype, "x", {
            get: function () { return this._value[0]; },
            set: function (value) {
                this._value[0] = value;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Vect2.prototype, "y", {
            get: function () { return this._value[1]; },
            set: function (value) {
                this._value[1] = value;
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        ;
        Vect2.prototype.exactEquals = function (other) {
            return this.x === other.x && this.y === other.y;
        };
        Vect2.prototype.isEquals = function (vec, threshold) {
            if (threshold === void 0) { threshold = false; }
            for (var i = 0; i < 2; ++i) {
                if (threshold) {
                    if (Math.abs(this._value[i] - vec._value[i]) > 0.00001) {
                        return false;
                    }
                }
                else {
                    if (Math.abs(this._value[i] - vec._value[i]) !== 0) {
                        return false;
                    }
                }
            }
            return true;
        };
        ;
        Vect2.add = function (v, v2, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Vect2();
            dest.x = v.x + v2.x;
            dest.y = v.y + v2.y;
            return dest;
        };
        ;
        Vect2.sub = function (v, v2, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Vect2();
            dest.x = v.x - v2.x;
            dest.y = v.y - v2.y;
            return dest;
        };
        ;
        Vect2.mult = function (v, v2, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Vect2();
            dest.x = v.x * v2.x;
            dest.y = v.y * v2.y;
            return dest;
        };
        ;
        Vect2.div = function (v, v2, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Vect2();
            dest.x = v.x / v2.x;
            dest.y = v.y / v2.y;
            return dest;
        };
        ;
        Vect2.min = function (v0, v2) {
            var x = (v0.x < v2.x) ? v0.x : v2.x;
            var y = (v0.y < v2.y) ? v0.y : v2.y;
            return new Vect2(x, y);
        };
        ;
        Vect2.max = function (v0, v2) {
            var x = (v0.x > v2.x) ? v0.x : v2.x;
            var y = (v0.y > v2.y) ? v0.y : v2.y;
            return new Vect2(x, y);
        };
        ;
        Vect2.lerp = function (init, end, t) {
            var x = init.x + ((end.x - init.x) * t);
            var y = init.y + ((end.y - init.y) * t);
            return new Vect2(x, y);
        };
        ;
        Vect2.clamp = function (value, min, max) {
            var x = (value.x > max.x) ? max.x : (value.x < min.x) ? min.x : value.x;
            var y = (value.y > max.y) ? max.y : (value.y < min.y) ? min.y : value.y;
            return new Vect2(x, y);
        };
        ;
        Vect2.prototype.setXY = function (x, y) {
            this.x = x;
            this.y = y;
        };
        return Vect2;
    }());
    MB.Vect2 = Vect2;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Vect3 = (function () {
        function Vect3(x, y, z) {
            var _this = this;
            if (x === void 0) { x = 0.0; }
            if (y === void 0) { y = 0.0; }
            if (z === void 0) { z = 0.0; }
            this.toString = function () {
                return "Vect3(" + _this.x + ", " + _this.y + ", " + _this.z + ")";
            };
            this._value = new Float32Array([x, y, z]);
        }
        ;
        Vect3.create = function (value) {
            return new Vect3(value[0], value[1], value[2]);
        };
        ;
        Vect3.createFromScalar = function (value) {
            if (value === void 0) { value = 0.0; }
            return new Vect3(value, value, value);
        };
        ;
        Vect3.prototype.clone = function () {
            return new Vect3(this.x, this.y, this.z);
        };
        ;
        Vect3.prototype.add = function (v) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
        };
        ;
        Vect3.prototype.sub = function (v) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            return this;
        };
        ;
        Vect3.prototype.mult = function (v) {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
            return this;
        };
        ;
        Vect3.prototype.multByScalar = function (s) {
            this.x *= s;
            this.y *= s;
            this.z *= s;
            return this;
        };
        ;
        Vect3.prototype.div = function (v) {
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.y;
            return this;
        };
        ;
        Vect3.prototype.scale = function (value, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            dest.x *= value;
            dest.y *= value;
            dest.z *= value;
            return dest;
        };
        ;
        Vect3.scaleAndAdd = function (a, b, scale, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Vect3();
            dest.x = a.x + (b.x * scale);
            dest.y = a.y + (b.y * scale);
            dest.z = a.z + (b.z * scale);
            return dest;
        };
        ;
        Vect3.distance = function (v, v2) {
            return Math.sqrt(this.squaredDistance(v, v2));
        };
        ;
        Vect3.squaredDistance = function (v, v2) {
            var x = v2.x - v.x, y = v2.y - v.y, z = v2.z - v.z;
            return (x * x + y * y + z * z);
        };
        ;
        Vect3.prototype.negate = function (dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            dest.x = -this.x;
            dest.y = -this.y;
            dest.z = -this.z;
            return dest;
        };
        ;
        Vect3.prototype.inverse = function (dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            dest.x = 1 / this.x;
            dest.y = 1 / this.y;
            dest.z = 1 / this.z;
            return dest;
        };
        ;
        Vect3.prototype.normalize = function (dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            var length = this.length();
            if (length === 1) {
                return this;
            }
            if (length === 0) {
                dest.x = 0;
                dest.y = 0;
                dest.z = 0;
                return dest;
            }
            length = 1.0 / length;
            dest.x *= length;
            dest.y *= length;
            dest.z *= length;
            return dest;
        };
        ;
        Vect3.dot = function (v, v2) {
            var x = v.x, y = v.y, z = v.z;
            var x2 = v2.x, y2 = v2.y, z2 = v2.z;
            return (x * x2 + y * y2 + z * z2);
        };
        ;
        Object.defineProperty(Vect3.prototype, "value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Vect3.prototype, "x", {
            get: function () { return this._value[0]; },
            set: function (value) {
                this._value[0] = value;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Vect3.prototype, "y", {
            get: function () { return this._value[1]; },
            set: function (value) {
                this._value[1] = value;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Vect3.prototype, "z", {
            get: function () { return this._value[2]; },
            set: function (value) {
                this._value[2] = value;
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        ;
        ;
        Vect3.prototype.exactEquals = function (other) {
            return this.x === other.x && this.y === other.y && this.z === other.z;
        };
        Vect3.prototype.isEquals = function (vec, threshold) {
            if (threshold === void 0) { threshold = false; }
            for (var i = 0; i < 3; ++i) {
                if (threshold) {
                    if (Math.abs(this._value[i] - vec._value[i]) > 0.00001) {
                        return false;
                    }
                }
                else {
                    if (Math.abs(this._value[i] - vec._value[i]) !== 0) {
                        return false;
                    }
                }
            }
            return true;
        };
        ;
        Vect3.cross = function (v, v2, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Vect3();
            var x = v.x, y = v.y, z = v.z;
            var x2 = v2.x, y2 = v2.y, z2 = v2.z;
            dest.x = y * z2 - z * y2;
            dest.y = z * x2 - x * z2;
            dest.z = x * y2 - y * x2;
            return dest;
        };
        ;
        Vect3.add = function (v, v2, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Vect3();
            dest.x = v.x + v2.x;
            dest.y = v.y + v2.y;
            dest.z = v.z + v2.z;
            return dest;
        };
        ;
        Vect3.sub = function (v, v2, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Vect3();
            dest.x = v.x - v2.x;
            dest.y = v.y - v2.y;
            dest.z = v.z - v2.z;
            return dest;
        };
        ;
        Vect3.mult = function (v, v2, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Vect3();
            dest.x = v.x * v2.x;
            dest.y = v.y * v2.y;
            dest.z = v.z * v2.z;
            return dest;
        };
        ;
        Vect3.div = function (v, v2, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Vect3();
            dest.x = v.x / v2.x;
            dest.y = v.y / v2.y;
            dest.z = v.z / v2.z;
            return dest;
        };
        ;
        Vect3.prototype.length = function () {
            return Math.sqrt(this.squaredLength());
        };
        ;
        Vect3.prototype.squaredLength = function () {
            var x = this.x, y = this.y, z = this.z;
            return (x * x + y * y + z * z);
        };
        ;
        Vect3.min = function (v0, v2) {
            var x = (v0.x < v2.x) ? v0.x : v2.x;
            var y = (v0.y < v2.y) ? v0.y : v2.y;
            var z = (v0.z > v2.z) ? v0.z : v2.z;
            return new Vect3(x, y, z);
        };
        ;
        Vect3.max = function (v0, v2) {
            var x = (v0.x > v2.x) ? v0.x : v2.x;
            var y = (v0.y > v2.y) ? v0.y : v2.y;
            var z = (v0.z > v2.z) ? v0.z : v2.z;
            return new Vect3(x, y, z);
        };
        ;
        Vect3.lerp = function (init, end, t) {
            var x = init.x + ((end.x - init.x) * t);
            var y = init.y + ((end.y - init.y) * t);
            var z = init.z + ((end.z - init.z) * t);
            return new Vect3(x, y, z);
        };
        ;
        Vect3.clamp = function (value, min, max) {
            var x = (value.x > max.x) ? max.x : (value.x < min.x) ? min.x : value.x;
            var y = (value.y > max.y) ? max.y : (value.y < min.y) ? min.y : value.y;
            var z = (value.z > max.z) ? max.z : (value.z < min.z) ? min.z : value.z;
            return new Vect3(x, y, z);
        };
        ;
        Vect3.xAxis = new Vect3(1.0, 0.0, 0.0);
        Vect3.yAxis = new Vect3(0.0, 1.0, 0.0);
        Vect3.zAxis = new Vect3(0.0, 0.0, 1.0);
        Vect3.up = new Vect3(0.0, 1.0, 1.0);
        return Vect3;
    }());
    MB.Vect3 = Vect3;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Vect4 = (function () {
        function Vect4(x, y, z, w) {
            var _this = this;
            if (x === void 0) { x = 0.0; }
            if (y === void 0) { y = 0.0; }
            if (z === void 0) { z = 0.0; }
            if (w === void 0) { w = 0.0; }
            this.toString = function () {
                return "Vect4(" + _this.x + ", " + _this.y + ", " + _this.z + ", " + _this.w + ")";
            };
            this._value = new Float32Array([x, y, z, w]);
        }
        ;
        Vect4.create = function (value) {
            return new Vect4(value[0], value[1], value[2], value[3]);
        };
        ;
        Vect4.createFromScalar = function (value) {
            return new Vect4(value, value, value, value);
        };
        ;
        Vect4.prototype.clone = function () {
            return new Vect4(this.x, this.y, this.z, this.w);
        };
        ;
        Vect4.prototype.add = function (v) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            this.w += v.w;
            return this;
        };
        ;
        Vect4.prototype.sub = function (v) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            this.w -= v.w;
            return this;
        };
        ;
        Vect4.prototype.mult = function (v) {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
            this.w *= v.w;
            return this;
        };
        ;
        Vect4.prototype.div = function (v) {
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;
            this.w /= v.w;
            return this;
        };
        ;
        Vect4.prototype.scale = function (value, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            dest.x *= value;
            dest.y *= value;
            dest.z *= value;
            dest.w *= value;
            return dest;
        };
        ;
        Vect4.prototype.scaleAndAdd = function (v, scale, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            dest.x = this.x + (v.x * scale);
            dest.y = this.y + (v.y * scale);
            dest.z = this.z + (v.z * scale);
            dest.w = this.w + (v.w * scale);
            return dest;
        };
        ;
        Vect4.distance = function (v, v2) {
            return Math.sqrt(this.squaredDistance(v, v2));
        };
        ;
        Vect4.squaredDistance = function (v, v2) {
            var x = v2.x - v.x, y = v2.y - v.y, z = v2.z - v.z, w = v2.w - v.w;
            return (x * x + y * y + z * z + w * w);
        };
        ;
        Vect4.prototype.negate = function (dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            dest.x = -this.x;
            dest.y = -this.y;
            dest.z = -this.z;
            dest.w = -this.w;
            return dest;
        };
        ;
        Vect4.prototype.inverse = function (dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            dest.x = 1 / this.x;
            dest.y = 1 / this.y;
            dest.z = 1 / this.z;
            dest.w = 1 / this.w;
            return dest;
        };
        ;
        Vect4.prototype.normalize = function (dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = this;
            var len = this.x * this.x + this.y * this.y +
                this.z * this.z + this.w * this.w;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                dest.x = this.x * len;
                dest.y = this.y * len;
                dest.z = this.z * len;
                dest.w = this.w * len;
            }
            return dest;
        };
        ;
        Vect4.dot = function (v, v2) {
            var x = v.x, y = v.y, z = v.z, w = v.w;
            var x2 = v2.x, y2 = v2.y, z2 = v2.z, w2 = v2.w;
            return (x * x2 + y * y2 + z * z2 + w * w2);
        };
        ;
        Object.defineProperty(Vect4.prototype, "value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Vect4.prototype, "x", {
            get: function () { return this._value[0]; },
            set: function (value) {
                this._value[0] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vect4.prototype, "y", {
            get: function () { return this._value[1]; },
            set: function (value) {
                this._value[1] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vect4.prototype, "z", {
            get: function () { return this._value[2]; },
            set: function (value) {
                this._value[2] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vect4.prototype, "w", {
            get: function () { return this._value[3]; },
            set: function (value) {
                this._value[3] = value;
            },
            enumerable: true,
            configurable: true
        });
        Vect4.prototype.exactEquals = function (other) {
            return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
        };
        Vect4.prototype.isEquals = function (vec, threshold) {
            if (threshold === void 0) { threshold = false; }
            for (var i = 0; i < 4; ++i) {
                if (threshold) {
                    if (Math.abs(this._value[i] - vec._value[i]) > 0.00001) {
                        return false;
                    }
                }
                else {
                    if (Math.abs(this._value[i] - vec._value[i]) !== 0) {
                        return false;
                    }
                }
            }
            return true;
        };
        ;
        Vect4.add = function (v, v2, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Vect4();
            dest.x = v.x + v2.x;
            dest.y = v.y + v2.y;
            dest.z = v.z + v2.z;
            dest.w = v.w + v2.w;
            return dest;
        };
        ;
        Vect4.sub = function (v, v2, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Vect4();
            dest.x = v.x - v2.x;
            dest.y = v.y - v2.y;
            dest.z = v.z - v2.z;
            dest.w = v.w - v2.w;
            return dest;
        };
        ;
        Vect4.mult = function (v, v2, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Vect4();
            dest.x = v.x * v2.x;
            dest.y = v.y * v2.y;
            dest.z = v.z * v2.z;
            dest.w = v.w * v2.w;
            return dest;
        };
        ;
        Vect4.div = function (v, v2, dest) {
            if (dest === void 0) { dest = null; }
            if (!dest)
                dest = new Vect4();
            dest.x = v.x / v2.x;
            dest.y = v.y / v2.y;
            dest.z = v.z / v2.z;
            dest.w = v.w / v2.w;
            return dest;
        };
        ;
        return Vect4;
    }());
    MB.Vect4 = Vect4;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Vector2 = (function () {
        function Vector2(x, y) {
            this._x = x;
            this._y = y;
        }
        ;
        Vector2.prototype.isEqual = function (other) {
            return this.x === other.x && this.y === other.y;
        };
        ;
        Object.defineProperty(Vector2.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (x) {
                this._x = x;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Vector2.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (y) {
                this._y = y;
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        ;
        return Vector2;
    }());
    MB.Vector2 = Vector2;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Vector3 = (function () {
        function Vector3(x, y, z) {
            this._x = x;
            this._y = y;
            this._z = z;
        }
        ;
        Vector3.prototype.isEqual = function (other) {
            return this.x === other.x && this.y === other.y && this.z === other.z;
        };
        ;
        Object.defineProperty(Vector3.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (x) {
                this._x = x;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Vector3.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (y) {
                this._y = y;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Vector3.prototype, "z", {
            get: function () {
                return this._z;
            },
            set: function (z) {
                this._z = z;
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        ;
        ;
        return Vector3;
    }());
    MB.Vector3 = Vector3;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Vector4 = (function () {
        function Vector4(x, y, z, w) {
            this._x = x;
            this._y = y;
            this._z = z;
            this._w = w;
        }
        ;
        Vector4.prototype.isEqual = function (other) {
            return this.x === other.x && this.y === other.y
                && this.z === other.z && this.w === other.w;
        };
        ;
        Object.defineProperty(Vector4.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (x) {
                this._x = x;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Vector4.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (y) {
                this._y = y;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Vector4.prototype, "z", {
            get: function () {
                return this._z;
            },
            set: function (z) {
                this._z = z;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Vector4.prototype, "w", {
            get: function () {
                return this._w;
            },
            set: function (w) {
                this._w = w;
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        ;
        ;
        ;
        return Vector4;
    }());
    MB.Vector4 = Vector4;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Camera2 = (function () {
        function Camera2(position, up, yaw, pitch) {
            if (position === void 0) { position = new MB.Vect3(0, 0, 0); }
            if (up === void 0) { up = new MB.Vect3(0, 1, 0); }
            if (yaw === void 0) { yaw = -90.0; }
            if (pitch === void 0) { pitch = 0.0; }
            this.movSpeed = 0.05;
            this.mouseSensivity = 0.25;
            this._updateCamera = false;
            this.fov = 45.0;
            this.front = new MB.Vect3(0, 0, -1);
            this.position = position;
            this.worldUp = up;
            this.yaw = yaw;
            this.pitch = pitch;
            this.right = new MB.Vect3();
            this.up = new MB.Vect3();
            this.updateCameraVectors();
        }
        Camera2.prototype.GetPos = function () {
            return this.position;
        };
        Camera2.prototype.setHome = function (v) {
            this.position = v;
            this.updateCameraVectors();
        };
        Camera2.prototype.update = function (callback) {
            this._updateCamera = false;
            var speed = 1.0;
            if (MB.Input.isKeyPressed(MB.ctes.KeyState.Left_Shift)) {
                speed = 2.5;
            }
            if (MB.Input.isKeyPressed(MB.ctes.KeyState.Z)) {
                if (this.fov > 30.0) {
                    this.fov -= 0.5;
                    this._updateCamera = true;
                }
            }
            if (MB.Input.isKeyPressed(MB.ctes.KeyState.X)) {
                if (this.fov < 90.0) {
                    this.fov += 0.5;
                    this._updateCamera = true;
                }
            }
            if (MB.Input.isKeyPressed(MB.ctes.KeyState.W)) {
                this.processKeyboard(4, speed);
                this._updateCamera = true;
            }
            if (MB.Input.isKeyPressed(MB.ctes.KeyState.S)) {
                this.processKeyboard(5, speed);
                this._updateCamera = true;
            }
            if (MB.Input.isKeyPressed(MB.ctes.KeyState.A)) {
                this.processKeyboard(2, speed);
                this._updateCamera = true;
            }
            if (MB.Input.isKeyPressed(MB.ctes.KeyState.D)) {
                this.processKeyboard(3, speed);
                this._updateCamera = true;
            }
            if (MB.Input.isKeyPressed(MB.ctes.KeyState.E)) {
                this.processKeyboard(0, speed);
                this._updateCamera = true;
            }
            if (MB.Input.isKeyPressed(MB.ctes.KeyState.Q)) {
                this.processKeyboard(1, speed);
                this._updateCamera = true;
            }
            if (MB.Input.isKeyPressed(38)) {
                this.processMouseMovement(0.0, 2.5);
                this._updateCamera = true;
            }
            if (MB.Input.isKeyPressed(40)) {
                this.processMouseMovement(0.0, -2.5);
                this._updateCamera = true;
            }
            if (MB.Input.isKeyPressed(37)) {
                this.processMouseMovement(-2.5, 0.0);
                this._updateCamera = true;
            }
            if (MB.Input.isKeyPressed(39)) {
                this.processMouseMovement(2.5, 0.0);
                this._updateCamera = true;
            }
            if (this._updateCamera && callback) {
                callback();
            }
        };
        Camera2.prototype.processKeyboard = function (direction, speed) {
            if (speed === void 0) { speed = 1.0; }
            if (this.timeElapsed > 25) {
                return;
            }
            var velocity = this.movSpeed * this.timeElapsed * speed;
            if (direction === 0) {
                this.position = MB.Vect3.scaleAndAdd(this.position, this.front, velocity);
            }
            else if (direction === 1) {
                this.position = MB.Vect3.scaleAndAdd(this.position, this.front, -velocity);
            }
            else if (direction === 2) {
                this.position = MB.Vect3.scaleAndAdd(this.position, this.right, -velocity);
            }
            else if (direction === 3) {
                this.position = MB.Vect3.scaleAndAdd(this.position, this.right, velocity);
            }
            else if (direction === 4) {
                this.position = MB.Vect3.scaleAndAdd(this.position, this.up, velocity);
            }
            else if (direction === 5) {
                this.position = MB.Vect3.scaleAndAdd(this.position, this.up, -velocity);
            }
        };
        Camera2.prototype.processMouseMovement = function (xOffset, yOffset) {
            xOffset *= this.movSpeed * 2.0 * this.timeElapsed;
            yOffset *= this.movSpeed * 2.0 * this.timeElapsed;
            this.yaw += xOffset;
            this.pitch += yOffset;
            if (this.pitch > 89.0) {
                this.pitch = 89.0;
            }
            if (this.pitch < -89.0) {
                this.pitch = -89.0;
            }
            this.updateCameraVectors();
        };
        Camera2.prototype.updateCameraVectors = function () {
            var front = new MB.Vect3(Math.cos(Math["toRadian"](this.yaw)) * Math.cos(Math["toRadian"](this.pitch)), Math.sin(Math["toRadian"](this.pitch)), Math.sin(Math["toRadian"](this.yaw)) * Math.cos(Math["toRadian"](this.pitch)));
            this.front = front.normalize();
            this.right = MB.Vect3.cross(this.front, this.worldUp).normalize();
            this.up = MB.Vect3.cross(this.right, this.front).normalize();
        };
        Camera2.prototype.GetViewMatrix = function () {
            return MB.Mat4.lookAt(this.position, MB.Vect3.add(this.position, this.front), this.up);
        };
        Camera2.prototype.GetOrthoProjectionMatrix = function (w, h) {
            var yMin = -0.0001 * Math.tan(this.fov * Math.PI / 360.0);
            var yMax = -yMin;
            var xMin = yMin + (w * 1.0) / (h * 1.0);
            var xMax = yMax + (w * 1.0) / (h * 1.0);
            return MB.Mat4.orthographic(xMin, xMax, yMin, yMax, 0.0001, 11000.0);
        };
        Camera2.prototype.GetProjectionMatrix = function (w, h) {
            return MB.Mat4.perspective(this.fov, (w * 1.0) / (h * 1.0), 0.0001, 1000.0);
        };
        return Camera2;
    }());
    MB.Camera2 = Camera2;
    ;
})(MB || (MB = {}));
;

var MB;
(function (MB) {
    var Decorators;
    (function (Decorators) {
        function sealed(constructor) {
            Object.seal(constructor);
            Object.seal(constructor.prototype);
        }
        Decorators.sealed = sealed;
        ;
        function logProperty(target, key) {
            var newKey = "__logged" + key;
            Object.defineProperty(target, newKey, {
                enumerable: false,
                configurable: false,
                writable: true,
                value: target[key]
            });
            var getter = function () {
                var val = this[newKey];
                console.log("Get: " + key + " => " + val);
                return val;
            };
            var setter = function (newVal) {
                console.log("Set: " + key + " => " + newVal);
                this[newKey] = newVal;
            };
            if (delete this[key]) {
                Object.defineProperty(target, key, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            }
        }
        Decorators.logProperty = logProperty;
    })(Decorators = MB.Decorators || (MB.Decorators = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MB;
(function (MB) {
    var Scene = (function () {
        function Scene(text, title, webglVersion) {
            if (title === void 0) { title = null; }
            if (webglVersion === void 0) { webglVersion = 2; }
            this._resume = true;
            MB.Log.info("init scene");
            if (!webglVersion) {
                webglVersion = 2;
            }
            MB.Context.webglVersion = webglVersion;
            MB.Core.getInstance();
            this._webglVersion = webglVersion;
            this.text = text;
            document.title = title || "WebGL" + webglVersion + " app";
            this.__init__(text);
        }
        ;
        Scene.prototype.webglVersion = function () {
            return this._webglVersion;
        };
        Scene.prototype.loadAssets = function () { };
        Scene.prototype.cameraUpdate = function () { };
        Scene.prototype.textCB = function (g) { };
        Scene.prototype.__init__ = function (text) {
            MB.Core.getInstance().initialize([1.0, 1.0, 1.0, 1.0]);
            this._gui = new dat.GUI();
            this.textCB(this._gui);
            var self = this;
            this._gui.add(text, "resume", true).onChange(function (v) {
                if (v === true) {
                    self.resume();
                }
                else {
                    self.pause();
                }
            });
            this._stats = new Stats();
            this._stats.setMode(0);
            document.body.appendChild(this._stats.domElement);
            this.loadAssets();
        };
        Object.defineProperty(Scene.prototype, "stats", {
            get: function () {
                return this._stats;
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.start = function () {
            var self = this;
            MB.ResourceMap.setLoadCompleteCallback(function () {
                MB.Log.info("ALL RESOURCES LOADED!!!!");
                self.initialize();
                document.getElementById("spinner").remove();
                try {
                    (function __render__(dt) {
                        requestAnimationFrame(__render__);
                        MB.Input.update();
                        self.stats.begin();
                        dt *= 0.001;
                        MB.Timer.update();
                        if (self._resume) {
                            self.update(dt);
                            self.draw(dt);
                        }
                        self.stats.end();
                    })(0.0);
                }
                catch (e) {
                    VanillaToasts.create({
                        title: "Error:",
                        text: "" + e,
                        type: "error"
                    });
                    throw e;
                }
            });
            return this;
        };
        ;
        Scene.prototype.pause = function () {
            console.log("PAUSE");
            this._resume = false;
        };
        ;
        Scene.prototype.resume = function () {
            console.log("RESUME");
            this._resume = true;
        };
        ;
        Scene.prototype.__resize__ = function () {
            var canvas = MB.Core.getInstance().canvas();
            var realToCSSPixels = window.devicePixelRatio || 1;
            var displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
            var displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);
            if (canvas.width !== displayWidth ||
                canvas.height !== displayHeight) {
                canvas.width = displayWidth;
                canvas.height = displayHeight;
                MB.Core.getInstance().changeViewport(0, 0, canvas.width, canvas.height);
                this.cameraUpdate();
            }
        };
        Scene = __decorate([
            MB.Decorators.sealed
        ], Scene);
        return Scene;
    }());
    MB.Scene = Scene;
    ;
})(MB || (MB = {}));
;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MB;
(function (MB) {
    var App = (function () {
        function App(init, text) {
            this._resume = true;
            if (!init.webglVersion) {
                init.webglVersion = 2;
            }
            this._appFunctions = init;
            console.log(this._appFunctions);
            MB.Context.webglVersion = init.webglVersion;
            MB.Core.getInstance();
            document.title = init.title || "WebGL" + init.webglVersion + " app";
            this.__init__(text);
        }
        ;
        App.prototype.webglVersion = function () {
            return this._appFunctions.webglVersion;
        };
        App.prototype.__init__ = function (text) {
            MB.Core.getInstance().initialize([1.0, 0.0, 1.0, 1.0]);
            this.gui = new dat.GUI();
            this._appFunctions.textCB(this.gui);
            var self = this;
            this.gui.add(text, "resume", true).onChange(function (v) {
                if (v === true) {
                    self.resume();
                }
                else {
                    self.pause();
                }
            });
            this.stats = new Stats();
            this.stats.setMode(0);
            this.stats.domElement.style.position = "absolute";
            this.stats.domElement.style.left = "0";
            this.stats.domElement.style.top = "0";
            document.body.appendChild(this.stats.domElement);
            this._appFunctions.loadAssets();
        };
        App.prototype.start = function () {
            var self = this;
            MB.ResourceMap.setLoadCompleteCallback(function () {
                console.log("ALL RESOURCES LOADED!!!!");
                self._appFunctions.initialize(self);
                document.getElementById("spinner").remove();
                try {
                    (function __render__(dt) {
                        requestAnimationFrame(__render__);
                        MB.Input.update();
                        self.stats.begin();
                        dt *= 0.001;
                        MB.Timer.update();
                        if (self._resume) {
                            self._appFunctions.update(self, dt);
                            self._appFunctions.draw(self, dt);
                        }
                        self.stats.end();
                    })(0.0);
                }
                catch (e) {
                    VanillaToasts.create({
                        title: "Error:",
                        text: "" + e,
                        type: "error"
                    });
                    throw e;
                }
            });
            return this;
        };
        ;
        App.prototype.pause = function () {
            console.log("PAUSE");
            this._resume = false;
        };
        ;
        App.prototype.resume = function () {
            console.log("RESUME");
            this._resume = true;
        };
        ;
        App.prototype.__resize__ = function () {
            var canvas = MB.Core.getInstance().canvas();
            var realToCSSPixels = window.devicePixelRatio || 1;
            var displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
            var displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);
            if (canvas.width !== displayWidth ||
                canvas.height !== displayHeight) {
                canvas.width = displayWidth;
                canvas.height = displayHeight;
                MB.Core.getInstance().changeViewport(0, 0, canvas.width, canvas.height);
                this.cameraUpdateCb();
            }
        };
        App = __decorate([
            MB.Decorators.sealed
        ], App);
        return App;
    }());
    MB.App = App;
    ;
})(MB || (MB = {}));

"use strict";
var MB;
(function (MB) {
    var Drawable = (function () {
        function Drawable() {
            this._vao = new MB.VertexArray();
            this._geometry = new MB.VertexBufferGeometry();
        }
        ;
        Drawable.prototype.createWireframe = function () {
            var newcells = [];
            var el0 = this._geometry.indices;
            for (var i = 0; i < el0.length; i += 3) {
                var a = el0[i + 0];
                var b = el0[i + 1];
                var c = el0[i + 2];
                if (a !== null && b !== null)
                    newcells.push(a, b);
                if (b !== null && c !== null)
                    newcells.push(b, c);
                if (a !== null && c !== null)
                    newcells.push(c, a);
            }
            this._geometry.setIndex(new Uint16Array(newcells));
        };
        Drawable.prototype.addElementArray = function (data, type) {
            if (type === void 0) { type = MB.ctes.UsageType.StaticDraw; }
            var vb = new MB.VertexBuffer(MB.ctes.BufferType.ElementArray);
            vb.bufferData(new Uint16Array(data), type);
            this._handle.push(vb);
            return vb;
        };
        ;
        Drawable.prototype.addBufferArray = function (attribLocation, data, numElems, type) {
            if (type === void 0) { type = MB.ctes.UsageType.StaticDraw; }
            var gl = MB.Core.getInstance().getGL();
            var vb = new MB.VertexBuffer(MB.ctes.BufferType.Array);
            vb.bufferData(data, type);
            vb.vertexAttribPointer(attribLocation, numElems, gl.FLOAT);
            this._handle.push(vb);
            return vb;
        };
        ;
        Drawable.prototype.render = function () {
            var gl = MB.Core.getInstance().getGL();
            this._vao.bind();
            gl.drawElements(MB.ctes.RenderType.Triangles, this._indicesLen, gl.UNSIGNED_SHORT, 0);
            this._vao.unbind();
        };
        ;
        Drawable.prototype.render2 = function () {
            var gl = MB.Core.getInstance().getGL();
            this._vao.bind();
            gl.drawElements(MB.ctes.RenderType.Lines, this._indicesLen, gl.UNSIGNED_SHORT, 0);
            this._vao.unbind();
        };
        ;
        Drawable.prototype.render3 = function () {
            var gl = MB.Core.getInstance().getGL();
            this._vao.bind();
            gl.drawElements(MB.ctes.RenderType.Points, this._indicesLen, gl.UNSIGNED_SHORT, 0);
            this._vao.unbind();
        };
        ;
        Drawable.prototype.renderElementInstance = function (numInstances) {
            var gl = MB.Core.getInstance().getGL();
            this._vao.bind();
            if (gl instanceof WebGL2RenderingContext) {
                gl.drawElementsInstanced(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0, numInstances);
            }
            else {
                var ext = MB.Extensions.get("ANGLE_instanced_arrays");
                if (ext) {
                    ext.drawElementsInstancedANGLE(gl.TRIANGLES, this._indicesLen, gl.UNSIGNED_SHORT, 0, numInstances);
                }
                else {
                    throw new Error("Instance array undefined");
                }
            }
            this._vao.unbind();
        };
        ;
        Drawable.prototype.renderArrayInstance = function (numInstances) {
            var gl = MB.Core.getInstance().getGL();
            this._vao.bind();
            if (gl instanceof WebGL2RenderingContext) {
                gl.drawArraysInstanced(gl.TRIANGLES, 0, this._indicesLen, numInstances);
            }
            else {
                var ext = MB.Extensions.get("ANGLE_instanced_arrays");
                if (ext) {
                    ext.drawArraysInstancedANGLE(gl.TRIANGLES, 0, this._indicesLen, numInstances);
                }
                else {
                    throw new Error("Instance array undefined");
                }
            }
            this._vao.unbind();
        };
        ;
        return Drawable;
    }());
    MB.Drawable = Drawable;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Polyhedron = (function (_super) {
        __extends(Polyhedron, _super);
        function Polyhedron(verts, el, radius, subdivisions) {
            _super.call(this);
            var norms = new Array();
            var tex = new Array();
            for (var i = 0, size = verts.length; i < size; i += 3) {
                var mod = Math.sqrt(verts[i] * verts[i] + verts[i + 1] * verts[i + 1] +
                    verts[i + 2] * verts[i + 2]);
                var nX = verts[i] / mod;
                var nY = verts[i + 1] / mod;
                var nZ = verts[i + 2] / mod;
                norms.push(nX, nY, nZ);
                tex.push(Math.atan2(nX, nZ), Math.acos(nY));
                verts[i] *= radius / mod;
                verts[i + 1] *= radius / mod;
                verts[i + 2] *= radius / mod;
            }
            var pointsCache = {};
            function midPoint(A, B) {
                var key = el[A] < el[B] ? el[A] + ":" + el[B] : el[B] + ":" + el[A];
                var r = pointsCache[key];
                if (r) {
                    return r;
                }
                var index = verts.length / 3;
                verts.push((verts[el[A] * 3] + verts[el[B] * 3]) * 0.5, (verts[el[A] * 3 + 1] + verts[el[B] * 3 + 1]) * 0.5, (verts[el[A] * 3 + 2] + verts[el[B] * 3 + 2]) * 0.5);
                var mod = Math.sqrt(verts[index * 3] *
                    verts[index * 3] + verts[index * 3 + 1] *
                    verts[index * 3 + 1] + verts[index * 3 + 2] * verts[index * 3 + 2]);
                var nX = verts[index * 3] / mod;
                var nY = verts[index * 3 + 1] / mod;
                var nZ = verts[index * 3 + 2] / mod;
                norms.push(nX, nY, nZ);
                tex.push((Math.atan2(nX, nZ) / Math.PI) * 0.5, (Math.acos(nY) / Math.PI));
                verts[index * 3] *= radius / mod;
                verts[index * 3 + 1] *= radius / mod;
                verts[index * 3 + 2] *= radius / mod;
                pointsCache[key] = index;
                return index;
            }
            for (var ir = 0; ir < subdivisions; ++ir) {
                var new_el = [];
                for (var i = 0, size = el.length; i < size; i += 3) {
                    var midA = midPoint(i, i + 1);
                    var midB = midPoint(i + 1, i + 2);
                    var midC = midPoint(i + 2, i);
                    new_el.push(el[i], midA, midC);
                    new_el.push(el[i + 1], midB, midA);
                    new_el.push(el[i + 2], midC, midB);
                    new_el.push(midA, midB, midC);
                }
                el = new_el;
            }
            var newcells = [];
            for (var i = 0; i < el.length; i += 3) {
                var a = el[i + 0];
                var b = el[i + 1];
                var c = el[i + 2];
                if (a !== null && b !== null)
                    newcells.push(a, b);
                if (b !== null && c !== null)
                    newcells.push(b, c);
                if (a !== null && c !== null)
                    newcells.push(c, a);
            }
            el = newcells;
            this._handle = [];
            this._vao.bind();
            this.addElementArray(new Uint16Array(el));
            this.addBufferArray(0, new Float32Array(verts), 3);
            this.addBufferArray(1, new Float32Array(norms), 3);
            this.addBufferArray(2, new Float32Array(tex), 2);
            this._indicesLen = el.length;
        }
        ;
        return Polyhedron;
    }(MB.Drawable));
    MB.Polyhedron = Polyhedron;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Cone = (function (_super) {
        __extends(Cone, _super);
        function Cone(bottomRadius, topRadius, height, radialSubDiv, heightSubDiv, createTopBase, createBottomBase) {
            if (radialSubDiv === void 0) { radialSubDiv = 3.0; }
            if (heightSubDiv === void 0) { heightSubDiv = 1.0; }
            if (createTopBase === void 0) { createTopBase = true; }
            if (createBottomBase === void 0) { createBottomBase = true; }
            _super.call(this);
            if (radialSubDiv < 3) {
                throw Error("radialSubDiv must be 3 or greater");
            }
            if (heightSubDiv < 1) {
                throw Error("heightSubDiv must be 1 or greater");
            }
            var extra = (createTopBase ? 2 : 0) + (createBottomBase ? 2 : 0);
            var nv = (radialSubDiv + 1) * (heightSubDiv + 1 + extra);
            var verts = new Array(3 * nv);
            var norms = new Array(3 * nv);
            var tex = new Array(2 * nv);
            var el = new Array(3 * radialSubDiv * (heightSubDiv + extra) * 2);
            var vertsAroundEdge = radialSubDiv + 1;
            var slantH = Math.atan2(bottomRadius - topRadius, height);
            var cSlantH = Math.cos(slantH);
            var sSlantH = Math.sin(slantH);
            var start = createTopBase ? -2 : 0;
            var end = heightSubDiv + (createBottomBase ? 2 : 0);
            var vv = 0;
            var nn = 0;
            var tt = 0;
            for (var yy = start; yy <= end; ++yy) {
                var v = yy / heightSubDiv;
                var y = height * v;
                var ringRadius = void 0;
                if (yy < 0) {
                    y = 0;
                    v = 1;
                    ringRadius = bottomRadius;
                }
                else if (yy > heightSubDiv) {
                    y = height;
                    v = 1;
                    ringRadius = topRadius;
                }
                else {
                    ringRadius = bottomRadius +
                        (topRadius - bottomRadius) * (yy / heightSubDiv);
                }
                if (yy === -2 || yy === heightSubDiv + 2) {
                    ringRadius = 0;
                    v = 0;
                }
                y -= height / 2;
                for (var ii = 0; ii < vertsAroundEdge; ++ii) {
                    var sin = Math.sin(ii * Math.PI * 2 / radialSubDiv);
                    var cos = Math.cos(ii * Math.PI * 2 / radialSubDiv);
                    verts[vv++] = sin * ringRadius;
                    verts[vv++] = y;
                    verts[vv++] = cos * ringRadius;
                    norms[nn++] = (yy < 0 || yy > heightSubDiv) ? 0 : (sin * cSlantH);
                    norms[nn++] = (yy < 0) ? -1 : (yy > heightSubDiv ? 1 : sSlantH);
                    norms[nn++] = (yy < 0 || yy > heightSubDiv) ? 0 : (cos * cSlantH);
                    tex[tt++] = (ii / radialSubDiv);
                    tex[tt++] = 1.0 - v;
                }
            }
            for (var yy = 0; yy < heightSubDiv + extra; ++yy) {
                for (var ii = 0; ii < radialSubDiv; ++ii) {
                    el.push(vertsAroundEdge * (yy + 0) + 0 + ii, vertsAroundEdge * (yy + 0) + 1 + ii, vertsAroundEdge * (yy + 1) + 1 + ii);
                    el.push(vertsAroundEdge * (yy + 0) + 0 + ii, vertsAroundEdge * (yy + 1) + 1 + ii, vertsAroundEdge * (yy + 1) + 0 + ii);
                }
            }
            this._handle = [];
            this._vao.bind();
            this.addElementArray(new Uint16Array(el));
            this.addBufferArray(0, new Float32Array(verts), 3);
            this.addBufferArray(1, new Float32Array(norms), 3);
            this.addBufferArray(2, new Float32Array(tex), 2);
            this._indicesLen = el.length;
        }
        return Cone;
    }(MB.Drawable));
    MB.Cone = Cone;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var ctes;
    (function (ctes) {
        (function (BlendingEq) {
            BlendingEq[BlendingEq["Add"] = 32774] = "Add";
            BlendingEq[BlendingEq["Substract"] = 32778] = "Substract";
            BlendingEq[BlendingEq["RevSubstract"] = 32779] = "RevSubstract";
            BlendingEq[BlendingEq["Min"] = 32775] = "Min";
            BlendingEq[BlendingEq["Max"] = 32776] = "Max";
        })(ctes.BlendingEq || (ctes.BlendingEq = {}));
        var BlendingEq = ctes.BlendingEq;
        ;
        (function (BlendingMode) {
            BlendingMode[BlendingMode["None"] = 0] = "None";
            BlendingMode[BlendingMode["Normal"] = 1] = "Normal";
            BlendingMode[BlendingMode["Additive"] = 2] = "Additive";
            BlendingMode[BlendingMode["Substractive"] = 3] = "Substractive";
            BlendingMode[BlendingMode["Multiply"] = 4] = "Multiply";
            BlendingMode[BlendingMode["Custom"] = 5] = "Custom";
        })(ctes.BlendingMode || (ctes.BlendingMode = {}));
        var BlendingMode = ctes.BlendingMode;
        ;
        (function (BlendingType) {
            BlendingType[BlendingType["Zero"] = 0] = "Zero";
            BlendingType[BlendingType["One"] = 1] = "One";
            BlendingType[BlendingType["SrcColor"] = 768] = "SrcColor";
            BlendingType[BlendingType["OneMinusSrcColor"] = 769] = "OneMinusSrcColor";
            BlendingType[BlendingType["SrcAlpha"] = 770] = "SrcAlpha";
            BlendingType[BlendingType["OneMinusSrcAlpha"] = 771] = "OneMinusSrcAlpha";
            BlendingType[BlendingType["DstAlpha"] = 772] = "DstAlpha";
            BlendingType[BlendingType["OneMinusDstAlpha"] = 773] = "OneMinusDstAlpha";
            BlendingType[BlendingType["DstColor"] = 774] = "DstColor";
            BlendingType[BlendingType["OneMinusDstColor"] = 775] = "OneMinusDstColor";
            BlendingType[BlendingType["SrcAlphaSaturate"] = 776] = "SrcAlphaSaturate";
            BlendingType[BlendingType["CteColor"] = 32769] = "CteColor";
            BlendingType[BlendingType["OneMinusCteColor"] = 32770] = "OneMinusCteColor";
            BlendingType[BlendingType["CteAlpha"] = 32771] = "CteAlpha";
            BlendingType[BlendingType["OneMinusCteAlpha"] = 32772] = "OneMinusCteAlpha";
        })(ctes.BlendingType || (ctes.BlendingType = {}));
        var BlendingType = ctes.BlendingType;
        ;
        (function (BufferType) {
            BufferType[BufferType["Array"] = 34962] = "Array";
            BufferType[BufferType["ElementArray"] = 34963] = "ElementArray";
            BufferType[BufferType["TransformFeedback"] = 35982] = "TransformFeedback";
            BufferType[BufferType["Uniform"] = 35345] = "Uniform";
            BufferType[BufferType["PixelPack"] = 35051] = "PixelPack";
            BufferType[BufferType["PixelUnpack"] = 35052] = "PixelUnpack";
            BufferType[BufferType["CopyRead"] = 36662] = "CopyRead";
            BufferType[BufferType["CopyWrite"] = 36663] = "CopyWrite";
        })(ctes.BufferType || (ctes.BufferType = {}));
        var BufferType = ctes.BufferType;
        ;
        (function (ComparisonFunc) {
            ComparisonFunc[ComparisonFunc["Never"] = 512] = "Never";
            ComparisonFunc[ComparisonFunc["Less"] = 513] = "Less";
            ComparisonFunc[ComparisonFunc["Equal"] = 514] = "Equal";
            ComparisonFunc[ComparisonFunc["LessEqual"] = 515] = "LessEqual";
            ComparisonFunc[ComparisonFunc["Greater"] = 516] = "Greater";
            ComparisonFunc[ComparisonFunc["NotEqual"] = 517] = "NotEqual";
            ComparisonFunc[ComparisonFunc["GreaterEqual"] = 518] = "GreaterEqual";
            ComparisonFunc[ComparisonFunc["Always"] = 519] = "Always";
        })(ctes.ComparisonFunc || (ctes.ComparisonFunc = {}));
        var ComparisonFunc = ctes.ComparisonFunc;
        ;
        (function (CompressedTex) {
            CompressedTex[CompressedTex["R11EAC"] = 37488] = "R11EAC";
            CompressedTex[CompressedTex["SignedR11EAC"] = 37489] = "SignedR11EAC";
            CompressedTex[CompressedTex["RG11EAC"] = 37490] = "RG11EAC";
            CompressedTex[CompressedTex["SignedRG11EAC"] = 37491] = "SignedRG11EAC";
            CompressedTex[CompressedTex["RGB8ETC2"] = 37492] = "RGB8ETC2";
            CompressedTex[CompressedTex["SRGB8ETC2"] = 37493] = "SRGB8ETC2";
            CompressedTex[CompressedTex["RGB8PunchAlphaETC2"] = 37494] = "RGB8PunchAlphaETC2";
            CompressedTex[CompressedTex["SRGB8PunchAlphaETC"] = 37495] = "SRGB8PunchAlphaETC";
            CompressedTex[CompressedTex["RGBA8ETC2EAC"] = 37496] = "RGBA8ETC2EAC";
            CompressedTex[CompressedTex["SRGBA8ETC2EAC"] = 37497] = "SRGBA8ETC2EAC";
        })(ctes.CompressedTex || (ctes.CompressedTex = {}));
        var CompressedTex = ctes.CompressedTex;
        ;
        (function (DataType) {
            DataType[DataType["UnsignedByte"] = 5121] = "UnsignedByte";
            DataType[DataType["Byte"] = 5120] = "Byte";
            DataType[DataType["Short"] = 5122] = "Short";
            DataType[DataType["UnsignedShort"] = 5123] = "UnsignedShort";
            DataType[DataType["Int"] = 5124] = "Int";
            DataType[DataType["UnsignedInt"] = 5125] = "UnsignedInt";
            DataType[DataType["Float"] = 5126] = "Float";
            DataType[DataType["HalfFloat"] = 5131] = "HalfFloat";
        })(ctes.DataType || (ctes.DataType = {}));
        var DataType = ctes.DataType;
        ;
        (function (DrawBuffer) {
            DrawBuffer[DrawBuffer["MaxDrawBuffers"] = 34852] = "MaxDrawBuffers";
            DrawBuffer[DrawBuffer["DrawBuffer0"] = 34853] = "DrawBuffer0";
            DrawBuffer[DrawBuffer["DrawBuffer1"] = 34854] = "DrawBuffer1";
            DrawBuffer[DrawBuffer["DrawBuffer2"] = 34855] = "DrawBuffer2";
            DrawBuffer[DrawBuffer["DrawBuffer3"] = 34856] = "DrawBuffer3";
            DrawBuffer[DrawBuffer["DrawBuffer4"] = 34857] = "DrawBuffer4";
            DrawBuffer[DrawBuffer["DrawBuffer5"] = 34858] = "DrawBuffer5";
            DrawBuffer[DrawBuffer["DrawBuffer6"] = 34859] = "DrawBuffer6";
            DrawBuffer[DrawBuffer["DrawBuffer7"] = 34860] = "DrawBuffer7";
            DrawBuffer[DrawBuffer["DrawBuffer8"] = 34861] = "DrawBuffer8";
            DrawBuffer[DrawBuffer["DrawBuffer9"] = 34862] = "DrawBuffer9";
            DrawBuffer[DrawBuffer["DrawBuffer10"] = 34863] = "DrawBuffer10";
            DrawBuffer[DrawBuffer["DrawBuffer11"] = 34864] = "DrawBuffer11";
            DrawBuffer[DrawBuffer["DrawBuffer12"] = 34865] = "DrawBuffer12";
            DrawBuffer[DrawBuffer["DrawBuffer13"] = 34866] = "DrawBuffer13";
            DrawBuffer[DrawBuffer["DrawBuffer14"] = 34867] = "DrawBuffer14";
            DrawBuffer[DrawBuffer["DrawBuffer15"] = 34868] = "DrawBuffer15";
            DrawBuffer[DrawBuffer["MaxColorAttch"] = 36063] = "MaxColorAttch";
            DrawBuffer[DrawBuffer["ColorAttach0"] = 36064] = "ColorAttach0";
            DrawBuffer[DrawBuffer["ColorAttach1"] = 36065] = "ColorAttach1";
            DrawBuffer[DrawBuffer["ColorAttach2"] = 36066] = "ColorAttach2";
            DrawBuffer[DrawBuffer["ColorAttach3"] = 36067] = "ColorAttach3";
            DrawBuffer[DrawBuffer["ColorAttach4"] = 36068] = "ColorAttach4";
            DrawBuffer[DrawBuffer["ColorAttach5"] = 36068] = "ColorAttach5";
            DrawBuffer[DrawBuffer["ColorAttach6"] = 36070] = "ColorAttach6";
            DrawBuffer[DrawBuffer["ColorAttach7"] = 36071] = "ColorAttach7";
            DrawBuffer[DrawBuffer["ColorAttach8"] = 36072] = "ColorAttach8";
            DrawBuffer[DrawBuffer["ColorAttach9"] = 36073] = "ColorAttach9";
            DrawBuffer[DrawBuffer["ColorAttach10"] = 36074] = "ColorAttach10";
            DrawBuffer[DrawBuffer["ColorAttach11"] = 36075] = "ColorAttach11";
            DrawBuffer[DrawBuffer["ColorAttach12"] = 36076] = "ColorAttach12";
            DrawBuffer[DrawBuffer["ColorAttach13"] = 36077] = "ColorAttach13";
            DrawBuffer[DrawBuffer["ColorAttach14"] = 36078] = "ColorAttach14";
            DrawBuffer[DrawBuffer["ColorAttach15"] = 36079] = "ColorAttach15";
        })(ctes.DrawBuffer || (ctes.DrawBuffer = {}));
        var DrawBuffer = ctes.DrawBuffer;
        ;
        (function (FaceDir) {
            FaceDir[FaceDir["Clockwise"] = 2304] = "Clockwise";
            FaceDir[FaceDir["InvClockwise"] = 2305] = "InvClockwise";
        })(ctes.FaceDir || (ctes.FaceDir = {}));
        var FaceDir = ctes.FaceDir;
        ;
        (function (FaceSide) {
            FaceSide[FaceSide["Front"] = 1028] = "Front";
            FaceSide[FaceSide["Back"] = 1029] = "Back";
            FaceSide[FaceSide["FrontAndBack"] = 1032] = "FrontAndBack";
        })(ctes.FaceSide || (ctes.FaceSide = {}));
        var FaceSide = ctes.FaceSide;
        ;
        (function (PixelType) {
            PixelType[PixelType["Byte"] = 5120] = "Byte";
            PixelType[PixelType["UByte"] = 5121] = "UByte";
            PixelType[PixelType["Short"] = 5122] = "Short";
            PixelType[PixelType["UShort"] = 5123] = "UShort";
            PixelType[PixelType["Int"] = 5124] = "Int";
            PixelType[PixelType["UInt"] = 5125] = "UInt";
            PixelType[PixelType["Float"] = 5126] = "Float";
        })(ctes.PixelType || (ctes.PixelType = {}));
        var PixelType = ctes.PixelType;
        ;
        (function (ShaderType) {
            ShaderType[ShaderType["vertex"] = 35633] = "vertex";
            ShaderType[ShaderType["fragment"] = 35632] = "fragment";
        })(ctes.ShaderType || (ctes.ShaderType = {}));
        var ShaderType = ctes.ShaderType;
        ;
        (function (ReadMode) {
            ReadMode[ReadMode["read_file"] = 0] = "read_file";
            ReadMode[ReadMode["read_script"] = 1] = "read_script";
            ReadMode[ReadMode["read_text"] = 2] = "read_text";
        })(ctes.ReadMode || (ctes.ReadMode = {}));
        var ReadMode = ctes.ReadMode;
        ;
        (function (QueryParams) {
            QueryParams[QueryParams["QueryResult"] = 34918] = "QueryResult";
            QueryParams[QueryParams["QueryResultAvailable"] = 34919] = "QueryResultAvailable";
        })(ctes.QueryParams || (ctes.QueryParams = {}));
        var QueryParams = ctes.QueryParams;
        ;
        (function (QueryTarget) {
            QueryTarget[QueryTarget["AnySamplesPassed"] = 35887] = "AnySamplesPassed";
            QueryTarget[QueryTarget["AnySamplesPassedConservative"] = 36202] = "AnySamplesPassedConservative";
            QueryTarget[QueryTarget["TransformFeedbackPrimitivesWritten"] = 35976] = "TransformFeedbackPrimitivesWritten";
        })(ctes.QueryTarget || (ctes.QueryTarget = {}));
        var QueryTarget = ctes.QueryTarget;
        ;
        (function (RenderType) {
            RenderType[RenderType["Points"] = 0] = "Points";
            RenderType[RenderType["Lines"] = 1] = "Lines";
            RenderType[RenderType["LineLoop"] = 2] = "LineLoop";
            RenderType[RenderType["LineStrip"] = 3] = "LineStrip";
            RenderType[RenderType["Triangles"] = 4] = "Triangles";
            RenderType[RenderType["TriangleStrip"] = 5] = "TriangleStrip";
            RenderType[RenderType["TriangleFan"] = 6] = "TriangleFan";
        })(ctes.RenderType || (ctes.RenderType = {}));
        var RenderType = ctes.RenderType;
        ;
        (function (SamplerParameter) {
            SamplerParameter[SamplerParameter["TextureCompareFunc"] = 34893] = "TextureCompareFunc";
            SamplerParameter[SamplerParameter["TextureCompareMode"] = 34892] = "TextureCompareMode";
            SamplerParameter[SamplerParameter["TextureMinFilter"] = 10241] = "TextureMinFilter";
            SamplerParameter[SamplerParameter["TextureMinLOD"] = 33082] = "TextureMinLOD";
            SamplerParameter[SamplerParameter["TextureMagFilter"] = 10240] = "TextureMagFilter";
            SamplerParameter[SamplerParameter["TextureMaxLOD"] = 33083] = "TextureMaxLOD";
            SamplerParameter[SamplerParameter["TextureWrapR"] = 32882] = "TextureWrapR";
            SamplerParameter[SamplerParameter["TextureWrapS"] = 10242] = "TextureWrapS";
            SamplerParameter[SamplerParameter["TextureWrapT"] = 10243] = "TextureWrapT";
        })(ctes.SamplerParameter || (ctes.SamplerParameter = {}));
        var SamplerParameter = ctes.SamplerParameter;
        ;
        (function (ShadingMode) {
            ShadingMode[ShadingMode["None"] = 0] = "None";
            ShadingMode[ShadingMode["Smooth"] = 1] = "Smooth";
            ShadingMode[ShadingMode["Flat"] = 2] = "Flat";
        })(ctes.ShadingMode || (ctes.ShadingMode = {}));
        var ShadingMode = ctes.ShadingMode;
        ;
        (function (StencilOp) {
            StencilOp[StencilOp["Keep"] = 7680] = "Keep";
            StencilOp[StencilOp["Zero"] = 0] = "Zero";
            StencilOp[StencilOp["Replace"] = 7681] = "Replace";
            StencilOp[StencilOp["Increase"] = 7682] = "Increase";
            StencilOp[StencilOp["IncreaseSaturate"] = 34055] = "IncreaseSaturate";
            StencilOp[StencilOp["Decrease"] = 7683] = "Decrease";
            StencilOp[StencilOp["DecreaseSaturate"] = 34056] = "DecreaseSaturate";
            StencilOp[StencilOp["Invert"] = 5386] = "Invert";
        })(ctes.StencilOp || (ctes.StencilOp = {}));
        var StencilOp = ctes.StencilOp;
        ;
        (function (SyncCondition) {
            SyncCondition[SyncCondition["GPUCommandsComplete"] = 37143] = "GPUCommandsComplete";
        })(ctes.SyncCondition || (ctes.SyncCondition = {}));
        var SyncCondition = ctes.SyncCondition;
        ;
        (function (SyncStatus) {
            SyncStatus[SyncStatus["Signaled"] = 37145] = "Signaled";
            SyncStatus[SyncStatus["Unsignaled"] = 37144] = "Unsignaled";
        })(ctes.SyncStatus || (ctes.SyncStatus = {}));
        var SyncStatus = ctes.SyncStatus;
        ;
        (function (SyncType) {
            SyncType[SyncType["Fence"] = 37142] = "Fence";
        })(ctes.SyncType || (ctes.SyncType = {}));
        var SyncType = ctes.SyncType;
        ;
        (function (SyncWaitResult) {
            SyncWaitResult[SyncWaitResult["ConditionSatisfied"] = 37148] = "ConditionSatisfied";
            SyncWaitResult[SyncWaitResult["AlreadySignaled"] = 37146] = "AlreadySignaled";
            SyncWaitResult[SyncWaitResult["TimeoutExpired"] = 37147] = "TimeoutExpired";
            SyncWaitResult[SyncWaitResult["WaitFailed"] = 37149] = "WaitFailed";
        })(ctes.SyncWaitResult || (ctes.SyncWaitResult = {}));
        var SyncWaitResult = ctes.SyncWaitResult;
        ;
        (function (TextureFormat) {
            TextureFormat[TextureFormat["RGB"] = 6407] = "RGB";
            TextureFormat[TextureFormat["RGBA"] = 6408] = "RGBA";
            TextureFormat[TextureFormat["RED"] = 6403] = "RED";
            TextureFormat[TextureFormat["LUMINANCE"] = 6409] = "LUMINANCE";
            TextureFormat[TextureFormat["LUMINANCEALPHA"] = 6410] = "LUMINANCEALPHA";
            TextureFormat[TextureFormat["ALPHA"] = 6406] = "ALPHA";
        })(ctes.TextureFormat || (ctes.TextureFormat = {}));
        var TextureFormat = ctes.TextureFormat;
        ;
        (function (TextureTarget) {
            TextureTarget[TextureTarget["Texture2D"] = 3553] = "Texture2D";
            TextureTarget[TextureTarget["Texture3D"] = 32879] = "Texture3D";
            TextureTarget[TextureTarget["Texture2DArray"] = 35866] = "Texture2DArray";
            TextureTarget[TextureTarget["TextureCubeMap"] = 34067] = "TextureCubeMap";
        })(ctes.TextureTarget || (ctes.TextureTarget = {}));
        var TextureTarget = ctes.TextureTarget;
        ;
        (function (TextureType) {
            TextureType[TextureType["Nearest"] = 9728] = "Nearest";
            TextureType[TextureType["Linear"] = 9729] = "Linear";
            TextureType[TextureType["NearestMMNearest"] = 9984] = "NearestMMNearest";
            TextureType[TextureType["LinearMMNearest"] = 9985] = "LinearMMNearest";
            TextureType[TextureType["NearestMMLinear"] = 9986] = "NearestMMLinear";
            TextureType[TextureType["LinearMMLinear"] = 9987] = "LinearMMLinear";
        })(ctes.TextureType || (ctes.TextureType = {}));
        var TextureType = ctes.TextureType;
        ;
        (function (TFMode) {
            TFMode[TFMode["Interleaved"] = 35980] = "Interleaved";
            TFMode[TFMode["Separate"] = 35981] = "Separate";
        })(ctes.TFMode || (ctes.TFMode = {}));
        var TFMode = ctes.TFMode;
        ;
        (function (TFPrimitive) {
            TFPrimitive[TFPrimitive["Points"] = 0] = "Points";
            TFPrimitive[TFPrimitive["Lines"] = 1] = "Lines";
            TFPrimitive[TFPrimitive["Triangles"] = 4] = "Triangles";
        })(ctes.TFPrimitive || (ctes.TFPrimitive = {}));
        var TFPrimitive = ctes.TFPrimitive;
        ;
        (function (TFTarget) {
            TFTarget[TFTarget["TransformFeedback"] = 36386] = "TransformFeedback";
        })(ctes.TFTarget || (ctes.TFTarget = {}));
        var TFTarget = ctes.TFTarget;
        ;
        (function (UsageType) {
            UsageType[UsageType["StaticDraw"] = 35044] = "StaticDraw";
            UsageType[UsageType["DynamicDraw"] = 35048] = "DynamicDraw";
            UsageType[UsageType["StreamDraw"] = 35040] = "StreamDraw";
            UsageType[UsageType["StaticRead"] = 35045] = "StaticRead";
            UsageType[UsageType["DynamicRead"] = 35049] = "DynamicRead";
            UsageType[UsageType["StreamRead"] = 35041] = "StreamRead";
            UsageType[UsageType["StaticCopy"] = 35049] = "StaticCopy";
            UsageType[UsageType["DynamicCopy"] = 35050] = "DynamicCopy";
            UsageType[UsageType["StreamCopy"] = 35042] = "StreamCopy";
        })(ctes.UsageType || (ctes.UsageType = {}));
        var UsageType = ctes.UsageType;
        ;
        (function (WrapMode) {
            WrapMode[WrapMode["Clamp2Edge"] = 33071] = "Clamp2Edge";
            WrapMode[WrapMode["Repeat"] = 10497] = "Repeat";
            WrapMode[WrapMode["MirroredRepeat"] = 33648] = "MirroredRepeat";
        })(ctes.WrapMode || (ctes.WrapMode = {}));
        var WrapMode = ctes.WrapMode;
        ;
        (function (KeyState) {
            KeyState[KeyState["Delete"] = 8] = "Delete";
            KeyState[KeyState["Tab"] = 9] = "Tab";
            KeyState[KeyState["Enter"] = 13] = "Enter";
            KeyState[KeyState["Left_Shift"] = 16] = "Left_Shift";
            KeyState[KeyState["Left_Control"] = 17] = "Left_Control";
            KeyState[KeyState["Alt"] = 18] = "Alt";
            KeyState[KeyState["Esc"] = 27] = "Esc";
            KeyState[KeyState["Space"] = 32] = "Space";
            KeyState[KeyState["Left"] = 37] = "Left";
            KeyState[KeyState["Up"] = 38] = "Up";
            KeyState[KeyState["Right"] = 39] = "Right";
            KeyState[KeyState["Down"] = 40] = "Down";
            KeyState[KeyState["Zero"] = 48] = "Zero";
            KeyState[KeyState["One"] = 49] = "One";
            KeyState[KeyState["Two"] = 50] = "Two";
            KeyState[KeyState["Three"] = 51] = "Three";
            KeyState[KeyState["Four"] = 52] = "Four";
            KeyState[KeyState["Five"] = 53] = "Five";
            KeyState[KeyState["Six"] = 54] = "Six";
            KeyState[KeyState["Seven"] = 55] = "Seven";
            KeyState[KeyState["Eight"] = 56] = "Eight";
            KeyState[KeyState["Nine"] = 57] = "Nine";
            KeyState[KeyState["A"] = 65] = "A";
            KeyState[KeyState["B"] = 66] = "B";
            KeyState[KeyState["C"] = 67] = "C";
            KeyState[KeyState["D"] = 68] = "D";
            KeyState[KeyState["E"] = 69] = "E";
            KeyState[KeyState["F"] = 70] = "F";
            KeyState[KeyState["G"] = 71] = "G";
            KeyState[KeyState["H"] = 72] = "H";
            KeyState[KeyState["I"] = 73] = "I";
            KeyState[KeyState["J"] = 74] = "J";
            KeyState[KeyState["K"] = 75] = "K";
            KeyState[KeyState["L"] = 76] = "L";
            KeyState[KeyState["M"] = 77] = "M";
            KeyState[KeyState["N"] = 78] = "N";
            KeyState[KeyState["O"] = 79] = "O";
            KeyState[KeyState["P"] = 80] = "P";
            KeyState[KeyState["Q"] = 81] = "Q";
            KeyState[KeyState["R"] = 82] = "R";
            KeyState[KeyState["S"] = 83] = "S";
            KeyState[KeyState["T"] = 84] = "T";
            KeyState[KeyState["U"] = 85] = "U";
            KeyState[KeyState["V"] = 86] = "V";
            KeyState[KeyState["W"] = 87] = "W";
            KeyState[KeyState["X"] = 88] = "X";
            KeyState[KeyState["Y"] = 89] = "Y";
            KeyState[KeyState["Z"] = 90] = "Z";
            KeyState[KeyState["Num0"] = 96] = "Num0";
            KeyState[KeyState["Num1"] = 97] = "Num1";
            KeyState[KeyState["Num2"] = 98] = "Num2";
            KeyState[KeyState["Num3"] = 99] = "Num3";
            KeyState[KeyState["Num4"] = 100] = "Num4";
            KeyState[KeyState["Num5"] = 101] = "Num5";
            KeyState[KeyState["Num6"] = 102] = "Num6";
            KeyState[KeyState["Num7"] = 103] = "Num7";
            KeyState[KeyState["Num8"] = 104] = "Num8";
            KeyState[KeyState["Num9"] = 105] = "Num9";
            KeyState[KeyState["F1"] = 112] = "F1";
            KeyState[KeyState["F2"] = 113] = "F2";
            KeyState[KeyState["F3"] = 114] = "F3";
            KeyState[KeyState["F4"] = 115] = "F4";
            KeyState[KeyState["F5"] = 116] = "F5";
            KeyState[KeyState["F6"] = 117] = "F6";
            KeyState[KeyState["F7"] = 118] = "F7";
            KeyState[KeyState["F8"] = 119] = "F8";
            KeyState[KeyState["F9"] = 120] = "F9";
            KeyState[KeyState["F10"] = 121] = "F10";
            KeyState[KeyState["F11"] = 122] = "F11";
            KeyState[KeyState["F12"] = 123] = "F12";
            KeyState[KeyState["LastKeyCode"] = 222] = "LastKeyCode";
        })(ctes.KeyState || (ctes.KeyState = {}));
        var KeyState = ctes.KeyState;
        ;
        (function (MouseButton) {
            MouseButton[MouseButton["Left"] = 0] = "Left";
            MouseButton[MouseButton["Middle"] = 1] = "Middle";
            MouseButton[MouseButton["Right"] = 2] = "Right";
        })(ctes.MouseButton || (ctes.MouseButton = {}));
        var MouseButton = ctes.MouseButton;
        ;
    })(ctes = MB.ctes || (MB.ctes = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Context = (function () {
        function Context() {
        }
        Context.getContext = function (canvasName) {
            if (Context.webglVersion === 0) {
                return;
            }
            if (!Context._gl) {
                if (!canvasName) {
                    MB.Log.info("Not canvas. Create one ...");
                    this._canvas = document.createElement("canvas");
                    this._canvas.width = 800;
                    this._canvas.height = 800;
                    document.body.appendChild(this._canvas);
                }
                else {
                    this._canvas = document.createElementNS("http://www.w3.org/1999/xhtml", canvasName);
                }
                MB.Log.info("Get context");
                Context._gl = Context._getContext(this._canvas);
                if (!Context._gl) {
                    document.write("<br><b>WebGL is not supported!</b>");
                    throw new Error("WebGL is not supported!");
                }
                MB.Log.info("WebGL2RenderingContext OK :)");
                Context._getVendors();
            }
            return Context._gl;
        };
        Context._getContext = function (canvas) {
            var contexts;
            if (Context.webglVersion === 1) {
                contexts = "webgl,experimental-webgl".split(",");
            }
            else {
                contexts = "webgl2,experimental-webgl2".split(",");
            }
            var gl;
            var ctx;
            for (var i = 0; i < contexts.length; ++i) {
                ctx = contexts[i];
                gl = canvas.getContext(contexts[i], {
                    antialias: false
                });
                if (gl) {
                    return gl;
                }
            }
            return null;
        };
        Context._getVendors = function () {
            var vendors = "ms,moz,webkit,o".split(",");
            if (!window.requestAnimationFrame) {
                var vendor = void 0;
                for (var i = 0; i < vendors.length; ++i) {
                    vendor = vendors[i];
                    window.requestAnimationFrame = window[vendor + "RequestAnimationFrame"];
                    window.cancelAnimationFrame = window[vendor + "CancelAnimationFrame"] ||
                        window[vendor + "CancelRequestAnimationFrame"];
                    if (window.requestAnimationFrame) {
                        break;
                    }
                }
            }
            if (!window.requestAnimationFrame) {
                var lastTime_1 = 0;
                window.requestAnimationFrame = function (cb) {
                    var currTime = Date.now();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime_1));
                    var id = window.setTimeout(function () {
                        cb(currTime + timeToCall);
                    }, timeToCall);
                    lastTime_1 = currTime + timeToCall;
                    return id;
                };
            }
            if (!window.cancelAnimationFrame) {
                window.cancelAnimationFrame = function (id) {
                    clearTimeout(id);
                };
            }
            ;
        };
        Context._gl = null;
        Context._canvas = null;
        Context.webglVersion = 0;
        return Context;
    }());
    MB.Context = Context;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Core = (function () {
        function Core() {
            MB.Log.info("INIT CORE");
            if (Core._instance) {
                throw new Error("Error: Instantiation failed: Use Core.getInstance() instead of new.");
            }
            this._gl = MB.Context.getContext();
            Core._instance = this;
        }
        Core.prototype.initialize = function (color) {
            if (!(this._gl instanceof WebGL2RenderingContext)) {
                [
                    "OES_element_index_uint",
                    "EXT_sRGB",
                    "EXT_blend_minmax",
                    "EXT_frag_depth",
                    "WEBGL_depth_texture",
                    "WEBKIT_WEBGL_depth_texture",
                    "EXT_shader_texture_lod",
                    "OES_standard_derivatives",
                    "OES_texture_float",
                    "OES_texture_half_float",
                    "OES_texture_half_float_linear",
                    "OES_vertex_array_object",
                    "WEBGL_draw_buffers",
                    "OES_fbo_render_mipmap",
                    "ANGLE_instanced_arrays"
                ].forEach(function (ext) {
                    MB.Extensions.get(ext);
                });
                console.log("All WebGL1 extensions enabled");
            }
            this.init();
            MB.GlobalState.initializeAll();
            MB.GlobalState.setClearColor(color[0], color[1], color[2], color[3]);
        };
        Core.prototype.clearColorAndDepth = function () {
            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
        };
        Core.prototype.changeViewport = function (x, y, w, h) {
            this._gl.viewport(x, y, w, h);
        };
        Core.prototype.canvas = function () {
            return this._gl.canvas;
        };
        Core.prototype.init = function () {
            MB.Input.initialize();
            MB.PostProcess.initialize();
            MB.GlobalState.setDepthStatus(true);
            MB.GlobalState.setDepthComparisonFunc(MB.ctes.ComparisonFunc.Less);
            MB.GlobalState.setCullingStatus(true);
            MB.GlobalState.setBlendingStatus(false);
        };
        Core.getInstance = function () {
            if (!Core._instance) {
                MB.Log.info("Creando core");
                Core._instance = new Core();
            }
            return Core._instance;
        };
        Core.prototype.getGL = function () {
            return this._gl;
        };
        Core._instance = null;
        return Core;
    }());
    MB.Core = Core;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var DOMElement = (function () {
        function DOMElement(domElem) {
            if (domElem === void 0) { domElem = document.createElement("div"); }
            this._domElem = domElem;
            this._domElem.style.overflow = "hidden";
            this._domElem.style["WebkitTransformStyle"] = "preserve-3d";
            this._domElem.style["MozTransformStyle"] = "preserve-3d";
            this._domElem.style["oTransformStyle"] = "preserve-3d";
            this._domElem.style.transformStyle = "preserve-3d";
        }
        DOMElement.prototype.render = function (camera) {
            var fov = 45.0 * 3.14 / 360.0;
            this._domElem.style["WebkitPerspective"] = fov + "px";
            this._domElem.style["MozPerspective"] = fov + "px";
            this._domElem.style["oPerspective"] = fov + "px";
            this._domElem.style.perspective = fov + "px";
        };
        return DOMElement;
    }());
    MB.DOMElement = DOMElement;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Framebuffer = (function () {
        function Framebuffer(textures, size, depth, stencil, options) {
            if (depth === void 0) { depth = false; }
            if (stencil === void 0) { stencil = false; }
            if (options === void 0) { options = {}; }
            this._valid = false;
            var numColors = textures.length;
            var gl = MB.Core.getInstance().getGL();
            if (numColors < 0) {
                throw new Error("must specify >= 0 color attachments");
            }
            else if (numColors > 1) {
                if (numColors > gl.getParameter(MB.ctes.DrawBuffer.MaxColorAttch)) {
                    throw new Error("GL context doesn\u00B4t support " + numColors + " color attachments");
                }
            }
            options = options || {};
            this._attachments = textures;
            this._size = size;
            this._handle = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);
            this._attachments.forEach(function (texture, i) {
                texture.bind();
                var target = texture.target;
                gl.framebufferTexture2D(gl.FRAMEBUFFER, MB.ctes.DrawBuffer.ColorAttach0 + i, target, texture.handler, 0);
                texture.unbind();
            });
            if (depth) {
                this._renderBuffer = new MB.RenderBufferTexture(size, gl.DEPTH_COMPONENT16, gl.DEPTH_ATTACHMENT);
            }
            if (numColors > 1) {
                var drawBuffs = [];
                for (var i = 0; i < numColors; ++i) {
                    drawBuffs.push(gl.COLOR_ATTACHMENT0 + i);
                }
                gl.drawBuffers(drawBuffs);
            }
            var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            if (status !== gl.FRAMEBUFFER_COMPLETE) {
                this.destroy();
                this.checkStatus(status);
            }
            this._valid = true;
            this.unbind();
        }
        ;
        Framebuffer.RestoreDefaultFBO = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        };
        ;
        Framebuffer.prototype.replaceTexture = function (tex, attach) {
            if (attach > this._attachments.length) {
                throw new Error("Attachment undefined");
            }
            var gl = MB.Core.getInstance().getGL();
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex.handler, 0);
        };
        ;
        Framebuffer.prototype.isValid = function () {
            var gl = MB.Core.getInstance().getGL();
            this.bind();
            this._valid = (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE);
            this.unbind();
            return this._valid;
        };
        ;
        Framebuffer.prototype.checkStatus = function (status) {
            var gl = MB.Core.getInstance().getGL();
            switch (status) {
                case gl.FRAMEBUFFER_UNSUPPORTED:
                    throw new Error("Framebuffer: Framebuffer unsupported");
                case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                    throw new Error("Framebuffer: Framebuffer incomplete attachment");
                case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                    throw new Error("Framebuffer: Framebuffer incomplete dimensions");
                case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                    throw new Error("Framebuffer: Framebuffer incomplete missing attachment");
                default:
                    throw new Error("Framebuffer: Framebuffer failed for unspecified reason");
            }
        };
        ;
        Framebuffer.prototype.bind = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._handle);
        };
        ;
        Framebuffer.prototype.onlyBindTextures = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            this._attachments.forEach(function (tex, idx) {
                tex.bind(idx);
            });
        };
        ;
        Framebuffer.prototype.unbind = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        };
        ;
        Framebuffer.prototype.rebuild = function (size) {
            if (!size.exactEquals(this._size)) {
                this._attachments.forEach(function (tex) {
                    tex.resize(size);
                });
                if (this._depth) {
                }
                if (this._renderBuffer) {
                    this._renderBuffer.resize(size);
                }
            }
        };
        ;
        Framebuffer.prototype.destroy = function () {
            var gl = MB.Core.getInstance().getGL();
            var oldBinding = gl.getParameter(gl.FRAMEBUFFER_BINDING);
            if (oldBinding === this._handle) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            }
            this._attachments.forEach(function (texture) {
                texture.destroy();
            });
            gl.deleteFramebuffer(this._handle);
            if (this._renderBuffer) {
                this._renderBuffer.destroy();
                this._renderBuffer = null;
            }
            if (this._depth) {
                this._depth.destroy();
                this._depth = null;
            }
        };
        ;
        return Framebuffer;
    }());
    MB.Framebuffer = Framebuffer;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var GlobalState = (function () {
        function GlobalState() {
        }
        GlobalState.initializeAll = function () {
            this.resetColors();
        };
        GlobalState.setMask = function (colorMask) {
            if (this._currentColorMask.isEqual(colorMask) === false) {
                var gl = MB.Core.getInstance().getGL();
                gl.colorMask(colorMask.x, colorMask.y, colorMask.z, colorMask.w);
                this._currentColorMask = colorMask;
            }
        };
        ;
        GlobalState.setClearColor = function (r, g, b, a) {
            if (a === void 0) { a = 1.0; }
            this._bgColor.r = r;
            this._bgColor.g = g;
            this._bgColor.b = b;
            this._bgColor.a = a;
            if (this._currentColorClear.isEquals(this._bgColor) === false) {
                var gl = MB.Core.getInstance().getGL();
                gl.clearColor(r, g, b, a);
                this._currentColorClear.copy(this._bgColor);
            }
        };
        ;
        GlobalState.resetColors = function () {
            this._bgColor = new MB.Color4(0.0, 0.0, 0.0, 1.0);
            this._currentColorMask = new MB.Vector4(true, true, true, true);
            this._currentColorClear = this._bgColor = new MB.Color4(0.0, 0.0, 0.0, 1);
        };
        ;
        GlobalState.getDepthComparison = function () {
            return this._currentDepthFunc;
        };
        ;
        GlobalState.depthRange = function (znear, zfar) {
            if (znear === void 0) { znear = 0.0; }
            if (zfar === void 0) { zfar = 1.00; }
            var gl = MB.Core.getInstance().getGL();
            if (znear > zfar || znear < 0.0 || zfar > 1.0) {
                console.warn("Values out of range [(znear < zfar), (znear > 0), (zfar < 1)]");
                return;
            }
            gl.depthRange(znear, zfar);
        };
        GlobalState.setDepthStatus = function (enabled) {
            if (this._depthEnabled !== enabled) {
                var gl = MB.Core.getInstance().getGL();
                if (enabled === true) {
                    gl.enable(gl.DEPTH_TEST);
                }
                else {
                    gl.disable(gl.DEPTH_TEST);
                }
                this._depthEnabled = enabled;
            }
        };
        ;
        GlobalState.isDepthEnabled = function () {
            return this._depthEnabled === true;
        };
        ;
        GlobalState.isDepthMask = function () {
            return this._currentDepthMask === true;
        };
        ;
        GlobalState.setDepthMask = function (mask) {
            if (this._currentDepthMask !== mask) {
                var gl = MB.Core.getInstance().getGL();
                gl.depthMask(mask);
                this._currentDepthMask = mask;
            }
        };
        ;
        GlobalState.setDepthComparisonFunc = function (depthFunc) {
            if (this._currentDepthFunc !== depthFunc) {
                var gl = MB.Core.getInstance().getGL();
                gl.depthFunc(depthFunc);
                this._currentDepthFunc = depthFunc;
            }
        };
        ;
        GlobalState.getCurrentDepthComparisonFunc = function () {
            return this._currentDepthFunc;
        };
        GlobalState.setDepthClear = function (depth) {
            if (this._currentDepthClear !== depth) {
                var gl = MB.Core.getInstance().getGL();
                gl.clearDepth(depth);
                this._currentDepthClear = depth;
            }
        };
        ;
        GlobalState.resetDepth = function () {
            this._depthEnabled = true;
            this._currentDepthMask = true;
            this._currentDepthFunc = MB.ctes.ComparisonFunc.LessEqual;
            this._currentDepthClear = null;
        };
        ;
        GlobalState.clearDepth = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.clear(gl.DEPTH_BUFFER_BIT);
        };
        ;
        GlobalState.setStencilTest = function (enabled) {
            if (this._stencilEnabled !== enabled) {
                var gl = MB.Core.getInstance().getGL();
                if (enabled === true) {
                    gl.enable(gl.STENCIL_TEST);
                }
                else {
                    gl.disable(gl.STENCIL_TEST);
                }
                this._stencilEnabled = enabled;
            }
        };
        ;
        GlobalState.setStencilMask = function (mask) {
            if (this._currentStencilMask !== mask) {
                var gl = MB.Core.getInstance().getGL();
                gl.stencilMask(mask);
                this._currentStencilMask = mask;
            }
        };
        ;
        GlobalState.setStencilFunc = function (compFun, ref, mask) {
            if (this._currentStencilFunc !== compFun && this._currentStencilRef !== ref
                && this._currentStencilFuncMask !== mask) {
                var gl = MB.Core.getInstance().getGL();
                gl.stencilFunc(compFun, ref, mask);
                this._currentStencilFunc = compFun;
                this._currentStencilRef = ref;
                this._currentStencilFuncMask = mask;
            }
        };
        ;
        GlobalState.setStencilOp = function (fail, zfail, zpass) {
            if (this._currentStencilFail !== fail && this._currentStencilZFail !== zfail
                && this._currentStencilZPass !== zpass) {
                var gl = MB.Core.getInstance().getGL();
                gl.stencilOp(fail, zfail, zpass);
                this._currentStencilFail = fail;
                this._currentStencilZFail = zfail;
                this._currentStencilZPass = zpass;
            }
        };
        GlobalState.getStencilMask = function (mask) {
            return this._currentStencilMask;
        };
        GlobalState.setStencilClear = function (s) {
            if (this._currentStencilClear !== s) {
                var gl = MB.Core.getInstance().getGL();
                gl.clearStencil(s);
                this._currentStencilClear = s;
            }
        };
        ;
        GlobalState.setStencilMaskFace = function (face, mask) {
            var gl = MB.Core.getInstance().getGL();
            gl.stencilMaskSeparate(face, mask);
        };
        GlobalState.getStencilFrontWriteMask = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.getParameter(gl.STENCIL_WRITEMASK);
        };
        GlobalState.getStencilBackWriteMask = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.getParameter(gl.STENCIL_BACK_WRITEMASK);
        };
        GlobalState.getStencilBits = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.getParameter(gl.STENCIL_BITS);
        };
        GlobalState.clearStencil = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.clear(gl.STENCIL_BUFFER_BIT);
        };
        GlobalState.isStencilEnabled = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.isEnabled(gl.STENCIL_TEST);
        };
        GlobalState.resetStencil = function () {
        };
        ;
        GlobalState.setCullingStatus = function (enabled) {
            if (this._cullingEnabled !== enabled) {
                var gl = MB.Core.getInstance().getGL();
                if (enabled === true) {
                    gl.enable(gl.CULL_FACE);
                }
                else {
                    gl.disable(gl.CULL_FACE);
                }
                this._cullingEnabled = enabled;
            }
        };
        ;
        GlobalState.getCullingMode = function () {
            return this._cullingFaceMode;
        };
        ;
        GlobalState.setCullingMode = function (mode) {
            if (this._cullingFaceMode !== mode) {
                var gl = MB.Core.getInstance().getGL();
                gl.cullFace(mode);
                this._cullingFaceMode = mode;
            }
        };
        GlobalState.isCullingEnabled = function () {
            return this._cullingEnabled === true;
        };
        ;
        GlobalState.resetCulling = function () {
            this._cullingEnabled = false;
            this._cullingFaceMode = MB.ctes.FaceSide.FrontAndBack;
        };
        ;
        GlobalState.setBlendingStatus = function (enabled) {
            if (this._blendingEnabled !== enabled) {
                var gl = MB.Core.getInstance().getGL();
                if (enabled === true) {
                    gl.enable(gl.BLEND);
                }
                else {
                    gl.disable(gl.BLEND);
                }
                this._blendingEnabled = enabled;
            }
        };
        ;
        GlobalState.setBlendingEquation = function (mode) {
            if (mode !== this._blendingMode) {
                var gl = MB.Core.getInstance().getGL();
                gl.blendEquation(mode);
                this._blendingMode = mode;
            }
        };
        ;
        GlobalState.blendingEquationSeparate = function (modeRGB, modeAlpha) {
            var gl = MB.Core.getInstance().getGL();
            gl.blendEquationSeparate(modeRGB, modeAlpha);
        };
        ;
        GlobalState.prototype.getBlendingEquationRGB = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.getParameter(gl.BLEND_EQUATION_RGB);
        };
        ;
        GlobalState.prototype.getBlendingEquationAlpha = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.getParameter(gl.BLEND_EQUATION_ALPHA);
        };
        ;
        GlobalState.setBlendingColor = function (red, green, blue, alpha) {
            if (red === void 0) { red = 0.0; }
            if (green === void 0) { green = 0.0; }
            if (blue === void 0) { blue = 0.0; }
            if (alpha === void 0) { alpha = 0.0; }
            var gl = MB.Core.getInstance().getGL();
            gl.blendColor(red, green, blue, alpha);
        };
        ;
        GlobalState.setBlendingFunc = function (sfactor, dfactor) {
            if (sfactor === void 0) { sfactor = MB.ctes.BlendingType.One; }
            if (dfactor === void 0) { dfactor = MB.ctes.BlendingType.Zero; }
            var gl = MB.Core.getInstance().getGL();
            gl.blendFunc(sfactor, dfactor);
        };
        ;
        GlobalState.setBlendingFuncSeparate = function (srcRGB, dstRGB, srcAlpha, dstAlpha) {
            if (srcRGB === void 0) { srcRGB = MB.ctes.BlendingType.One; }
            if (dstRGB === void 0) { dstRGB = MB.ctes.BlendingType.Zero; }
            if (srcAlpha === void 0) { srcAlpha = MB.ctes.BlendingType.One; }
            if (dstAlpha === void 0) { dstAlpha = MB.ctes.BlendingType.Zero; }
            var gl = MB.Core.getInstance().getGL();
            gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
        };
        ;
        GlobalState.isBlendingEnabled = function () {
            return this._blendingEnabled === true;
        };
        ;
        GlobalState.setScissorStatus = function (enabled) {
            if (this._scissorsEnabled !== enabled) {
                var gl = MB.Core.getInstance().getGL();
                if (enabled === true) {
                    gl.enable(gl.SCISSOR_TEST);
                }
                else {
                    gl.disable(gl.SCISSOR_TEST);
                }
                this._scissorsEnabled = enabled;
            }
        };
        ;
        GlobalState.setScissorsRectangle = function (x, y, width, height) {
            var b = new MB.Box2D(new MB.Vect2(x, y), new MB.Vect2(width, height));
            if (!this._scissorsBox.isEqual(b)) {
                var gl = MB.Core.getInstance().getGL();
                gl.scissor(b.min.x, b.min.y, b.max.x, b.max.y);
                this._scissorsBox = b;
            }
        };
        ;
        GlobalState.setScissorsRectangleBox2D = function (b) {
            if (!this._scissorsBox.isEqual(b)) {
                var gl = MB.Core.getInstance().getGL();
                gl.scissor(b.min.x, b.min.y, b.max.x, b.max.y);
                this._scissorsBox = b;
            }
        };
        ;
        GlobalState.getScissorsRectangle = function () {
            return this._scissorsBox;
        };
        ;
        GlobalState.isScissorsEnabled = function () {
            return this._scissorsEnabled === true;
        };
        GlobalState.setLineWidth = function (width) {
            if (width !== this._currentLineWidth) {
                var gl = MB.Core.getInstance().getGL();
                gl.lineWidth(width);
                this._currentLineWidth = width;
            }
        };
        GlobalState._depthEnabled = false;
        GlobalState._currentDepthMask = false;
        GlobalState._currentDepthFunc = MB.ctes.ComparisonFunc.LessEqual;
        GlobalState._currentDepthClear = null;
        GlobalState._stencilEnabled = false;
        GlobalState._currentStencilMask = 0;
        GlobalState._currentStencilFunc = null;
        GlobalState._currentStencilRef = null;
        GlobalState._currentStencilFuncMask = null;
        GlobalState._currentStencilFail = null;
        GlobalState._currentStencilZFail = null;
        GlobalState._currentStencilZPass = null;
        GlobalState._currentStencilClear = null;
        GlobalState._cullingEnabled = false;
        GlobalState._cullingFaceMode = MB.ctes.FaceSide.FrontAndBack;
        GlobalState._blendingEnabled = false;
        GlobalState._scissorsEnabled = false;
        GlobalState._scissorsBox = new MB.Box2D();
        GlobalState._currentLineWidth = 1.0;
        return GlobalState;
    }());
    MB.GlobalState = GlobalState;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Input = (function () {
        function Input() {
            if (Input._instance) {
                throw new Error("Error: Instantiation failed: Use Input.getInstance() instead of new.");
            }
            for (var i = 0; i < MB.ctes.KeyState.LastKeyCode; ++i) {
                Input._isKeyPressed[i] = false;
                Input._keyPreviusState[i] = false;
                Input._isKeyClicked[i] = false;
            }
            for (var i = 0; i < 3; ++i) {
                Input._buttonPreviousState[i] = false;
                Input._isButtonClicked[i] = false;
                Input._isButtonPressed[i] = false;
            }
            var self = Input;
            window.addEventListener("keyup", function (ev) {
                if (ev.keyCode === 40 || ev.keyCode === 38) {
                    ev.preventDefault();
                }
                self._onKeyUp(ev);
            });
            window.addEventListener("keydown", function (ev) {
                if (ev.keyCode === 40 || ev.keyCode === 38) {
                    ev.preventDefault();
                }
                self._onKeyDown(ev);
            });
            window.addEventListener("mousedown", function (ev) {
                self._onMouseDown(ev);
            });
            window.addEventListener("mousemove", function (ev) {
                self._onMouseMove(ev);
            });
            window.addEventListener("mouseup", function (ev) {
                self._onMouseUp(ev);
            });
            window.addEventListener("mousewheel", function (ev) {
                self._onMouseScroll(ev);
            });
            window.addEventListener("DOMMouseScroll", function (ev) {
                self._onMouseScroll(ev);
            });
            Input._instance = this;
        }
        ;
        Input.initialize = function () {
            Input._instance = new Input();
        };
        ;
        Input.update = function () {
            for (var i = 0; i < MB.ctes.KeyState.LastKeyCode; ++i) {
                this._isKeyClicked[i] = (!this._keyPreviusState[i]) && this._isKeyPressed[i];
                this._keyPreviusState[i] = this._isKeyPressed[i];
            }
            for (var i = 0; i < 3; ++i) {
                this._isButtonClicked[i] = (!this._buttonPreviousState[i]) && this._isButtonPressed[i];
                this._buttonPreviousState[i] = this._isButtonPressed[i];
            }
        };
        ;
        Input.isKeyPressed = function (keycode) {
            return this._isKeyPressed[keycode];
        };
        ;
        Input.isKeyClicked = function (keycode) {
            return this._isKeyClicked[keycode];
        };
        ;
        Input.isButtonPressed = function (button) {
            return this._isButtonPressed[button];
        };
        ;
        Input.isButtonClicked = function (button) {
            return this._isButtonClicked[button];
        };
        ;
        Input.getMousePosX = function () {
            return this._mousePosX;
        };
        ;
        Input.getMousePosY = function () {
            return this._mousePosY;
        };
        ;
        Input._onKeyDown = function (ev) {
            this._isKeyPressed[ev.keyCode] = true;
        };
        ;
        Input._onKeyUp = function (ev) {
            this._isKeyPressed[ev.keyCode] = false;
        };
        ;
        Input._onMouseMove = function (ev) {
            var inside = false;
            var canvas = MB.Core.getInstance().canvas();
            var bbox = canvas.getBoundingClientRect();
            var x = Math.round((ev.clientX - bbox.left) * (canvas.width / bbox.width));
            var y = Math.round((ev.clientY - bbox.top) * (canvas.width / bbox.width));
            if ((x >= 0) && (x < canvas.width) &&
                (y >= 0) && (y < canvas.height)) {
                this._mousePosX = x;
                this._mousePosY = canvas.height - 1 - y;
                inside = true;
            }
            return inside;
        };
        ;
        Input._onMouseDown = function (ev) {
            if (this._onMouseMove(ev)) {
                this._isButtonPressed[ev.button] = true;
            }
        };
        ;
        Input._onMouseUp = function (ev) {
            this._onMouseMove(ev);
            this._isButtonPressed[ev.button] = false;
        };
        ;
        Input._onMouseScroll = function (ev) {
        };
        Input._buttonPreviousState = [];
        Input._isButtonPressed = [];
        Input._isButtonClicked = [];
        Input._mousePosX = -1;
        Input._mousePosY = -1;
        Input._keyPreviusState = [];
        Input._isKeyPressed = [];
        Input._isKeyClicked = [];
        return Input;
    }());
    MB.Input = Input;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    MB.Log = function _log(logName) {
        var Log = log4javascript.getLogger(logName);
        var consoleAppender = new log4javascript.BrowserConsoleAppender();
        Log.addAppender(consoleAppender);
        Log.setLevel(log4javascript.Level.INFO);
        return Log;
    }("my_logger");
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    ;
    ;
    ;
    var Program = (function () {
        function Program() {
            this.uniformLocations = {};
            this.attribLocations = {};
            this._shaders = [];
            this._isLinked = false;
        }
        ;
        Program.prototype.addAttributesArgs = function () {
            var attrs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                attrs[_i - 0] = arguments[_i];
            }
            this.addAttributes(attrs);
        };
        ;
        Program.prototype.addAttributes = function (attrs) {
            var gl = MB.Core.getInstance().getGL();
            for (var attr in attrs) {
                attr = attrs[attr];
                var attrID = gl.getAttribLocation(this._compiledShader, attr);
                if (attrID < 0) {
                    console.error(attr + " undefined");
                    continue;
                }
                this.attribLocations[attr] = attrID;
            }
        };
        ;
        Program.prototype.addUniformsArgs = function () {
            var unifs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                unifs[_i - 0] = arguments[_i];
            }
            this.addUniforms(unifs);
        };
        ;
        Program.prototype.addUniforms = function (unifs) {
            var gl = MB.Core.getInstance().getGL();
            for (var unif in unifs) {
                unif = unifs[unif];
                var unifID = gl.getUniformLocation(this._compiledShader, unif);
                if (unifID < 0) {
                    console.error(unif + " undefined");
                    continue;
                }
                this.uniformLocations[unif] = unifID;
            }
        };
        ;
        Program.prototype.id = function () {
            return this._compiledShader;
        };
        ;
        Program.prototype.addShader = function (shader_, type, _mode) {
            var shader;
            if (type < 0) {
                throw new Error("SHADER TYPE UNDEFINED");
            }
            if (_mode === MB.ctes.ReadMode.read_file) {
                shader = this.loadAndCompileWithFile(shader_, type);
            }
            else if (_mode === MB.ctes.ReadMode.read_script) {
                shader = this.loadAndCompile(shader_, type);
            }
            else if (_mode === MB.ctes.ReadMode.read_text) {
                shader = this.loadAndCompileFromText(shader_, type);
            }
            this._shaders.push(shader);
        };
        ;
        Program.prototype._compile = function () {
            var gl = MB.Core.getInstance().getGL();
            this._compiledShader = gl.createProgram();
            for (var i = 0; i < this._shaders.length; ++i) {
                gl.attachShader(this._compiledShader, this._shaders[i]);
            }
        };
        ;
        Program.prototype._link = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.linkProgram(this._compiledShader);
            if (!gl.getProgramParameter(this._compiledShader, gl.LINK_STATUS)) {
                alert("ERROR");
                console.warn("Error in Program linking:" + gl.getProgramInfoLog(this._compiledShader));
                console.log({
                    vertex: this._vertexSource,
                    fragment: this._fragmentSource
                });
                throw "SHADER ERROR";
            }
            this._isLinked = true;
            return true;
        };
        ;
        Program.prototype.compile = function () {
            var gl = MB.Core.getInstance().getGL();
            this._compiledShader = gl.createProgram();
            for (var i = 0; i < this._shaders.length; ++i) {
                gl.attachShader(this._compiledShader, this._shaders[i]);
            }
            gl.linkProgram(this._compiledShader);
            if (!gl.getProgramParameter(this._compiledShader, gl.LINK_STATUS)) {
                alert("ERROR");
                console.warn("Error in Program linking:" + gl.getProgramInfoLog(this._compiledShader));
                console.log({
                    vertex: this._vertexSource,
                    fragment: this._fragmentSource
                });
                throw "SHADER ERROR";
            }
            this._isLinked = true;
            return true;
        };
        ;
        Program.prototype.loadAndCompileWithFile = function (filePath, shaderType) {
            var request = new XMLHttpRequest();
            request.open("GET", filePath, false);
            try {
                request.send();
            }
            catch (err) {
                alert("ERROR: " + filePath);
                console.log("ERROR: " + filePath);
                return null;
            }
            var shaderSource = request.responseText;
            if (shaderSource === null) {
                alert("WARNING: " + filePath + " failed");
                console.log(this._fragmentSource);
                throw "SHADER ERROR";
            }
            return this.compileShader(shaderSource, shaderType);
        };
        ;
        Program.prototype.loadAndCompileFromText = function (shaderSource, shaderType) {
            if (shaderSource === null) {
                alert("WARNING: " + shaderSource + " failed");
                console.log(this._fragmentSource);
                throw "SHADER ERROR";
            }
            return this.compileShader(shaderSource, shaderType);
        };
        ;
        Program.prototype.loadAndCompile = function (id, shaderType) {
            var shaderText, shaderSource;
            shaderText = document.getElementById(id);
            shaderSource = shaderText.firstChild.textContent;
            if (shaderSource === null) {
                alert("WARNING: " + id + " failed");
                console.log(this._fragmentSource);
                throw "SHADER ERROR";
            }
            return this.compileShader(shaderSource, shaderType);
        };
        ;
        Program.prototype.compileShader = function (shaderSource, shaderType) {
            var gl = MB.Core.getInstance().getGL();
            var compiledShader;
            if (shaderType === gl.VERTEX_SHADER) {
                this._vertexSource = shaderSource;
            }
            else if (shaderType === gl.FRAGMENT_SHADER) {
                this._fragmentSource = shaderSource;
            }
            compiledShader = gl.createShader(shaderType);
            gl.shaderSource(compiledShader, shaderSource);
            gl.compileShader(compiledShader);
            if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
                alert("ERROR: " + gl.getShaderInfoLog(compiledShader));
                console.log("ERROR: " + gl.getShaderInfoLog(compiledShader));
                console.log({
                    vertex: this._vertexSource,
                    fragment: this._fragmentSource
                });
                throw "SHADER ERROR";
            }
            return compiledShader;
        };
        ;
        Program.prototype.use = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.useProgram(this._compiledShader);
        };
        ;
        Program.prototype.destroy = function () {
            var _this = this;
            var gl = MB.Core.getInstance().getGL();
            this._shaders.forEach(function (shader) {
                gl.detachShader(_this.compileShader, shader);
            });
            gl.deleteShader(this._compiledShader);
        };
        ;
        Program.prototype.sendUniform1f = function (name, value) {
            var gl = MB.Core.getInstance().getGL();
            gl.uniform1f(this.uniformLocations[name], value);
        };
        ;
        Program.prototype.sendUniform1i = function (name, value) {
            var gl = MB.Core.getInstance().getGL();
            gl.uniform1i(this.uniformLocations[name], value);
        };
        ;
        Program.prototype.sendUniform1b = function (name, value) {
            var gl = MB.Core.getInstance().getGL();
            gl.uniform1i(this.uniformLocations[name], value === true ? 1 : 0);
        };
        ;
        Program.prototype.sendUniform1u = function (name, value) {
            var gl = MB.Core.getInstance().getGL();
            gl.uniform1ui(this.uniformLocations[name], value);
        };
        ;
        Program.prototype.sendUniform2f = function (name, x, y) {
            var gl = MB.Core.getInstance().getGL();
            gl.uniform2f(this.uniformLocations[name], x, y);
        };
        ;
        Program.prototype.sendUniform3f = function (name, x, y, z) {
            var gl = MB.Core.getInstance().getGL();
            gl.uniform3f(this.uniformLocations[name], x, y, z);
        };
        ;
        Program.prototype.sendUniform4f = function (name, x, y, z, w) {
            var gl = MB.Core.getInstance().getGL();
            gl.uniform4f(this.uniformLocations[name], x, y, z, w);
        };
        ;
        Program.prototype.sendUniformVec2 = function (name, value) {
            var gl = MB.Core.getInstance().getGL();
            var val;
            if (value instanceof MB.Vect2) {
                val = value.value;
            }
            else {
                val = value;
            }
            gl.uniform3fv(this.uniformLocations[name], val);
        };
        ;
        Program.prototype.sendUniformVec3 = function (name, value) {
            var gl = MB.Core.getInstance().getGL();
            var val;
            if (value instanceof MB.Vect3) {
                val = value.value;
            }
            else {
                val = value;
            }
            gl.uniform3fv(this.uniformLocations[name], val);
        };
        ;
        Program.prototype.sendUniformVec4 = function (name, value) {
            var gl = MB.Core.getInstance().getGL();
            var val;
            if (value instanceof MB.Vect4) {
                val = value.value;
            }
            else {
                val = value;
            }
            gl.uniform3fv(this.uniformLocations[name], val);
        };
        ;
        Program.prototype.sendUniformMat2 = function (name, value, transpose) {
            if (transpose === void 0) { transpose = false; }
            var gl = MB.Core.getInstance().getGL();
            var val;
            if (value instanceof MB.Mat2) {
                val = value._value;
            }
            else {
                val = value;
            }
            gl.uniformMatrix2fv(this.uniformLocations[name], transpose, val);
        };
        ;
        Program.prototype.sendUniformMat3 = function (name, value, transpose) {
            if (transpose === void 0) { transpose = false; }
            var gl = MB.Core.getInstance().getGL();
            var val;
            if (value instanceof MB.Mat3) {
                val = value._value;
            }
            else {
                val = value;
            }
            gl.uniformMatrix3fv(this.uniformLocations[name], transpose, val);
        };
        ;
        Program.prototype.sendUniformMat4 = function (name, value, transpose) {
            if (transpose === void 0) { transpose = false; }
            var gl = MB.Core.getInstance().getGL();
            var val;
            if (value instanceof MB.Mat4) {
                val = value._value;
            }
            else {
                val = value;
            }
            gl.uniformMatrix4fv(this.uniformLocations[name], transpose, val);
        };
        ;
        Program.getType = function (gl, type) {
            if (!Program.GL_TABLE) {
                var typeNames = Object.keys(Program.GL_TO_GLSL_TYPES);
                Program.GL_TABLE = {};
                for (var _i = 0, typeNames_1 = typeNames; _i < typeNames_1.length; _i++) {
                    var tn = typeNames_1[_i];
                    var cte = gl[tn];
                    if (typeof cte !== "undefined") {
                        Program.GL_TABLE[cte] = Program.GL_TO_GLSL_TYPES[tn];
                    }
                }
            }
            return Program.GL_TABLE[type];
        };
        ;
        Program.prototype.unifAndAttribs = function () {
            var ret = {
                "attributes": [],
                "uniforms": []
            };
            var gl = MB.Core.getInstance().getGL();
            console.log("UNIFORMS");
            var numUniforms = gl.getProgramParameter(this._compiledShader, gl.ACTIVE_UNIFORMS);
            var result = [];
            for (var i = 0; i < numUniforms; ++i) {
                var info = gl.getActiveUniform(this._compiledShader, i);
                console.log(info);
                var type = Program.getType(gl, info.type);
                if (info.size > 1) {
                    for (var j = 0; j < info.size; ++j) {
                        result.push({
                            name: info.name.replace("[0]", "[" + j + "]"),
                            type: type,
                            id: i
                        });
                    }
                }
                else {
                    ret.uniforms.push({
                        name: info.name,
                        type: type,
                        id: i
                    });
                }
            }
            console.log(ret.uniforms);
            console.log("ATTRIBUTES");
            var numAttributes = gl.getProgramParameter(this._compiledShader, gl.ACTIVE_ATTRIBUTES);
            result = [];
            for (var i = 0; i < numAttributes; ++i) {
                var info = gl.getActiveAttrib(this._compiledShader, i);
                if (info) {
                    ret.attributes.push({
                        name: info.name,
                        type: Program.getType(gl, info.type),
                        id: i
                    });
                }
            }
            console.log(ret.attributes);
            return ret;
        };
        ;
        Program.prototype.isLinked = function () {
            return this._isLinked;
        };
        ;
        Program.prototype.feedbackVarying = function (varyings, mode) {
            if (this._isLinked === true) {
                alert("ONLY EXEC THIS BEFORE LINK");
                return;
            }
            var gl = MB.Core.getInstance().getGL();
            if (!(gl instanceof WebGL2RenderingContext)) {
                alert("NEED WEBGL2 CONTEXT");
                return;
            }
            MB.TransformFeedback.varyings(this, varyings, mode);
        };
        ;
        Program.prototype.setFooFragment = function () {
            var gl = MB.Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                this.addShader("#version 300 es\n                    precision highp float;\n                    out vec4 fragColor;\n                    void main() {\n                        fragColor = vec4(0.0, 0.0, 0.0, 1.0);\n                    }", MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
            }
            else {
                this.addShader("\n                    precision highp float;\n                    void main() {\n                        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n                    }", MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
            }
        };
        ;
        Program.GL_TO_GLSL_TYPES = {
            "FLOAT": "float",
            "FLOAT_VEC2": "vec2",
            "FLOAT_VEC3": "vec3",
            "FLOAT_VEC4": "vec4",
            "INT": "int",
            "INT_VEC2": "ivec2",
            "INT_VEC3": "ivec3",
            "INT_VEC4": "ivec4",
            "BOOL": "bool",
            "BOOL_VEC2": "bvec2",
            "BOOL_VEC3": "bvec3",
            "BOOL_VEC4": "bvec4",
            "FLOAT_MAT2": "Mat2",
            "FLOAT_MAT3": "Mat3",
            "FLOAT_MAT4": "Mat4",
            "SAMPLER_2D": "sampler2D",
            "SAMPLER_CUBE": "samplerCube",
            "FLOAT_MAT2x3": "Mat2x3",
            "FLOAT_MAT2x4": "Mat2x4",
            "FLOAT_MAT3x2": "Mat3x2",
            "FLOAT_MAT3x4": "Mat3x4",
            "FLOAT_MAT4x2": "Mat4x2",
            "FLOAT_MAT4x3": "Mat4x3",
            "UNSIGNED_INT": "uint",
            "UNSIGNED_INT_VEC2": "uvec2",
            "UNSIGNED_INT_VEC3": "uvec3",
            "UNSIGNED_INT_VEC4": "uvec4",
            "UNSIGNED_INT_SAMPLER_2D": "usampler2D",
            "UNSIGNED_INT_SAMPLER_3D": "usampler3D",
            "UNSIGNED_INT_SAMPLER_2D_ARRAY": "usampler2DArray",
            "UNSIGNED_INT_SAMPLER_CUBE": "usamplerCube",
            "INT_SAMPLER_2D": "isampler2D",
            "INT_SAMPLER_3D": "isampler3D",
            "INT_SAMPLER_2D_ARRAY": "isampler2DArray",
            "INT_SAMPLER_CUBE": "isamplerCube",
        };
        Program.GL_TABLE = null;
        return Program;
    }());
    MB.Program = Program;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Query = (function () {
        function Query() {
            var gl = MB.Core.getInstance().getGL();
            this._handle = gl.createQuery();
        }
        ;
        Query.prototype.destroy = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.deleteQuery(this._handle);
        };
        ;
        Query.prototype.begin = function (target) {
            var gl = MB.Core.getInstance().getGL();
            gl.beginQuery(target, this._handle);
        };
        ;
        Query.prototype.end = function (target) {
            var gl = MB.Core.getInstance().getGL();
            gl.endQuery(target);
        };
        ;
        Query.prototype.useAnySamples = function (cb) {
            this.oneUse(MB.ctes.QueryTarget.AnySamplesPassed, cb);
        };
        ;
        Query.prototype.useAnySamplesConservative = function (cb) {
            this.oneUse(MB.ctes.QueryTarget.AnySamplesPassedConservative, cb);
        };
        ;
        Query.prototype.useTransfFeedbackPrimWritten = function (cb) {
            this.oneUse(MB.ctes.QueryTarget.TransformFeedbackPrimitivesWritten, cb);
        };
        ;
        Query.prototype.oneUse = function (target, cb) {
            this.begin(target);
            cb();
            this.end(target);
        };
        ;
        Query.prototype.getParameter = function (param) {
            var gl = MB.Core.getInstance().getGL();
            return gl.getQueryParameter(this._handle, param);
        };
        ;
        Query.prototype.isResultAvailable = function () {
            return this.getParameter(MB.ctes.QueryParams.QueryResultAvailable);
        };
        ;
        Query.prototype.getResult = function () {
            return this.getParameter(MB.ctes.QueryParams.QueryResult);
        };
        ;
        return Query;
    }());
    MB.Query = Query;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    ;
    var Sampler = (function () {
        function Sampler() {
            var gl = MB.Core.getInstance().getGL();
            this._handle = gl.createSampler();
        }
        ;
        Sampler.prototype.setParams = function (params) {
            var gl = MB.Core.getInstance().getGL();
            if (params.minFilter) {
                this.parameteri(gl.TEXTURE_MIN_FILTER, params.minFilter);
            }
            if (params.magFilter) {
                this.parameteri(gl.TEXTURE_MAG_FILTER, params.magFilter);
            }
            if (params.wrapS) {
                this.parameteri(gl.TEXTURE_WRAP_S, params.wrapS);
            }
            if (params.wrapT) {
                this.parameteri(gl.TEXTURE_WRAP_T, params.wrapT);
            }
            if (params.wrapR) {
                this.parameteri(gl.TEXTURE_WRAP_R, params.wrapR);
            }
            if (params.minLOD) {
                this.parameterf(gl.TEXTURE_MIN_LOD, params.minLOD);
            }
            if (params.maxLOD) {
                this.parameterf(gl.TEXTURE_MAX_LOD, params.maxLOD);
            }
            if (params.compareFunc) {
                this.parameteri(gl.TEXTURE_COMPARE_FUNC, params.compareFunc);
            }
            if (params.compareMode) {
                this.parameteri(gl.TEXTURE_COMPARE_MODE, params.compareMode);
            }
        };
        ;
        Sampler.prototype.bind = function (unit) {
            var gl = MB.Core.getInstance().getGL();
            gl.bindSampler(unit, this._handle);
        };
        ;
        Sampler.prototype.unbind = function (unit) {
            var gl = MB.Core.getInstance().getGL();
            gl.bindSampler(unit, null);
        };
        ;
        Sampler.prototype.parameteri = function (name, param) {
            var gl = MB.Core.getInstance().getGL();
            gl.samplerParameteri(this._handle, name, param);
        };
        ;
        Sampler.prototype.parameterf = function (name, param) {
            var gl = MB.Core.getInstance().getGL();
            gl.samplerParameterf(this._handle, name, param);
        };
        ;
        Sampler.prototype.getParameter = function (name) {
            var gl = MB.Core.getInstance().getGL();
            return gl.getSamplerParameter(this._handle, name);
        };
        ;
        Sampler.prototype.destroy = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.deleteSampler(this._handle);
        };
        ;
        Sampler.prototype.isValid = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.isSampler(this._handle);
        };
        ;
        return Sampler;
    }());
    MB.Sampler = Sampler;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Sync = (function () {
        function Sync(condition) {
            if (condition === void 0) { condition = MB.ctes.SyncCondition.GPUCommandsComplete; }
            var gl = MB.Core.getInstance().getGL();
            this._handle = gl.fenceSync(condition, 0);
        }
        ;
        Sync.prototype.clientWait = function (timeout) {
            var gl = MB.Core.getInstance().getGL();
            return gl.clientWaitSync(this._handle, 0, timeout);
        };
        ;
        Sync.prototype.destroy = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.deleteSync(this._handle);
        };
        ;
        Sync.prototype.isValid = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.isSync(this._handle);
        };
        ;
        Sync.prototype.wait = function (timeout) {
            if (timeout === void 0) { timeout = -1; }
            var gl = MB.Core.getInstance().getGL();
            gl.waitSync(this._handle, 0, timeout);
        };
        ;
        Sync.prototype.status = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.getParameter(gl.SYNC_STATUS);
        };
        ;
        Sync.prototype.condition = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.getParameter(gl.SYNC_CONDITION);
        };
        ;
        Sync.prototype.type = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.getParameter(gl.OBJECT_TYPE);
        };
        ;
        Sync.prototype.isSignaled = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.getParameter(gl.SYNC_STATUS) === MB.ctes.SyncStatus.Signaled;
        };
        ;
        Object.defineProperty(Sync.prototype, "signaled", {
            get: function () {
                var gl = MB.Core.getInstance().getGL();
                return gl.getParameter(gl.SYNC_STATUS);
            },
            enumerable: true,
            configurable: true
        });
        ;
        return Sync;
    }());
    MB.Sync = Sync;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var TransformFeedback = (function () {
        function TransformFeedback() {
            var gl = MB.Core.getInstance().getGL();
            this._handle = gl.createTransformFeedback();
        }
        ;
        TransformFeedback.prototype.destroy = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.deleteTransformFeedback(this._handle);
            this._handle = null;
        };
        ;
        TransformFeedback.prototype.bind = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.bindTransformFeedback(MB.ctes.TFTarget.TransformFeedback, this._handle);
        };
        ;
        TransformFeedback.prototype.unbind = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.bindTransformFeedback(MB.ctes.TFTarget.TransformFeedback, null);
        };
        ;
        TransformFeedback.prototype.begin = function (mode) {
            var gl = MB.Core.getInstance().getGL();
            gl.beginTransformFeedback(mode);
        };
        ;
        TransformFeedback.prototype.beginPoints = function () {
            this.begin(MB.ctes.TFPrimitive.Points);
        };
        ;
        TransformFeedback.prototype.beginLines = function () {
            this.begin(MB.ctes.TFPrimitive.Lines);
        };
        ;
        TransformFeedback.prototype.beginTriangles = function () {
            this.begin(MB.ctes.TFPrimitive.Triangles);
        };
        ;
        TransformFeedback.prototype.end = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.endTransformFeedback();
        };
        ;
        TransformFeedback.prototype.pause = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.pauseTransformFeedback();
        };
        ;
        TransformFeedback.prototype.resume = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.resumeTransformFeedback();
        };
        ;
        TransformFeedback.varyings = function (program, varyings, bufferMode) {
            var gl = MB.Core.getInstance().getGL();
            gl.transformFeedbackVaryings(program.id(), varyings, bufferMode);
        };
        ;
        TransformFeedback.prototype.getVarying = function (program, idx) {
            var gl = MB.Core.getInstance().getGL();
            var info = gl.getTransformFeedbackVarying(program.id(), idx);
            var info2 = {
                name: info.name,
                type: MB.Program.getType(gl, info["type"])
            };
            return info2;
        };
        ;
        TransformFeedback.prototype.isValid = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.isTransformFeedback(this._handle);
        };
        ;
        return TransformFeedback;
    }());
    MB.TransformFeedback = TransformFeedback;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Utils;
    (function (Utils) {
        function Uint8Concat(first, second) {
            var firstLength = first.length, result = new Uint8Array(firstLength + second.length);
            result.set(first);
            result.set(second, firstLength);
            return result;
        }
        Utils.Uint8Concat = Uint8Concat;
        ;
        function Uint16Concat(first, second) {
            var firstLength = first.length, result = new Uint16Array(firstLength + second.length);
            result.set(first);
            result.set(second, firstLength);
            return result;
        }
        Utils.Uint16Concat = Uint16Concat;
        ;
        function Uint32Concat(first, second) {
            var firstLength = first.length, result = new Uint32Array(firstLength + second.length);
            result.set(first);
            result.set(second, firstLength);
            return result;
        }
        Utils.Uint32Concat = Uint32Concat;
        ;
        function Int8Concat(first, second) {
            var firstLength = first.length, result = new Int8Array(firstLength + second.length);
            result.set(first);
            result.set(second, firstLength);
            return result;
        }
        Utils.Int8Concat = Int8Concat;
        ;
        function Int16Concat(first, second) {
            var firstLength = first.length, result = new Int16Array(firstLength + second.length);
            result.set(first);
            result.set(second, firstLength);
            return result;
        }
        Utils.Int16Concat = Int16Concat;
        ;
        function Int32Concat(first, second) {
            var firstLength = first.length, result = new Int32Array(firstLength + second.length);
            result.set(first);
            result.set(second, firstLength);
            return result;
        }
        Utils.Int32Concat = Int32Concat;
        ;
        function Float32Concat(first, second) {
            var firstLength = first.length, result = new Float32Array(firstLength + second.length);
            result.set(first);
            result.set(second, firstLength);
            return result;
        }
        Utils.Float32Concat = Float32Concat;
        ;
        function Float64Concat(first, second) {
            var firstLength = first.length, result = new Float64Array(firstLength + second.length);
            result.set(first);
            result.set(second, firstLength);
            return result;
        }
        Utils.Float64Concat = Float64Concat;
        ;
        function downloadCanvasImage(canvas, name) {
            if (name === void 0) { name = "file.png"; }
            var a = document.createElement("a");
            a.href = canvas.toDataURL();
            a["download"] = name;
            a.click();
        }
        Utils.downloadCanvasImage = downloadCanvasImage;
        ;
    })(Utils = MB.Utils || (MB.Utils = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var VertexArray = (function () {
        function VertexArray(vao) {
            if (vao !== undefined) {
                this._handle = vao;
            }
            else {
                var gl = MB.Core.getInstance().getGL();
                if (gl instanceof WebGL2RenderingContext) {
                    this._handle = gl.createVertexArray();
                }
                else {
                    var ext = MB.Extensions.get("OES_vertex_array_object");
                    if (ext) {
                        this._handle = ext.createVertexArrayOES();
                    }
                }
            }
            this.bind();
        }
        VertexArray.wrap = function (vao) {
            return new VertexArray(vao);
        };
        VertexArray.prototype.bind = function () {
            var gl = MB.Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                gl.bindVertexArray(this._handle);
                return;
            }
            var ext = MB.Extensions.get("OES_vertex_array_object");
            if (ext) {
                ext.bindVertexArrayOES(this._handle);
            }
        };
        VertexArray.prototype.unbind = function () {
            var gl = MB.Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                gl.bindVertexArray(null);
                return;
            }
            var ext = MB.Extensions.get("OES_vertex_array_object");
            if (ext) {
                ext.bindVertexArrayOES(null);
            }
        };
        VertexArray.prototype.destroy = function () {
            var gl = MB.Core.getInstance().getGL();
            this.bind();
            if (gl instanceof WebGL2RenderingContext) {
                gl.deleteVertexArray(this._handle);
                return;
            }
            var ext = MB.Extensions.get("OES_vertex_array_object");
            if (ext) {
                ext.deleteVertexArrayOES(this._handle);
            }
        };
        VertexArray.isSupported = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl instanceof WebGL2RenderingContext ||
                MB.Extensions.get("OES_vertex_array_object");
        };
        return VertexArray;
    }());
    MB.VertexArray = VertexArray;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var VertexBuffer = (function () {
        function VertexBuffer(type) {
            if (type === void 0) { type = MB.ctes.BufferType.Array; }
            this._type = MB.ctes.BufferType.Array;
            var gl = MB.Core.getInstance().getGL();
            this._buffer = gl.createBuffer();
            this._type = type;
            this.bind();
        }
        VertexBuffer.prototype.bind = function (type) {
            if (type !== undefined) {
                this._type = type;
            }
            var gl = MB.Core.getInstance().getGL();
            gl.bindBuffer(this._type, this._buffer);
        };
        VertexBuffer.prototype.unbind = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.bindBuffer(this._type, null);
        };
        VertexBuffer.prototype.getBufferType = function () {
            return this._type;
        };
        VertexBuffer.prototype.getBuffer = function () {
            return this._buffer;
        };
        VertexBuffer.prototype.destroy = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.bindBuffer(this._type, 0);
            if (!this._buffer) {
                gl.deleteBuffer(this._buffer);
            }
            this._buffer = null;
        };
        VertexBuffer.prototype.bufferData = function (data, usage) {
            if (usage === void 0) { usage = MB.ctes.UsageType.StaticDraw; }
            this.bind();
            var gl = MB.Core.getInstance().getGL();
            gl.bufferData(this._type, data, usage);
        };
        ;
        VertexBuffer.prototype.attribDivisor = function (position, length, divisor, stride) {
            if (stride === void 0) { stride = 0; }
            this.bind();
            var gl = MB.Core.getInstance().getGL();
            gl.enableVertexAttribArray(position);
            gl.vertexAttribPointer(position, length, gl.FLOAT, false, length * Float32Array.BYTES_PER_ELEMENT, 0);
            gl.vertexAttribDivisor(position, divisor);
        };
        VertexBuffer.prototype.vertexAttribPointer = function (attribLocation, numElems, type, normalized, offset) {
            if (normalized === void 0) { normalized = false; }
            if (offset === void 0) { offset = 0; }
            this.bind();
            var gl = MB.Core.getInstance().getGL();
            gl.enableVertexAttribArray(attribLocation);
            gl.vertexAttribPointer(attribLocation, numElems, type, normalized, numElems * Float32Array.BYTES_PER_ELEMENT, offset);
        };
        ;
        VertexBuffer.prototype.copySub = function (readTarget, writeTarget, readOffset, writeOffset, size) {
            var gl = MB.Core.getInstance().getGL();
            gl.copyBufferSubData(readTarget, writeTarget, readOffset, writeOffset, size);
        };
        ;
        VertexBuffer.prototype.bindBufferBase = function (target, index) {
            if (index === void 0) { index = 0; }
            var gl = MB.Core.getInstance().getGL();
            gl.bindBufferBase(target, index, this._buffer);
        };
        return VertexBuffer;
    }());
    MB.VertexBuffer = VertexBuffer;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var VertexUBO = (function () {
        function VertexUBO(prog, name, blockBindIdx) {
            var gl = MB.Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                this._handle = gl.createBuffer();
                var index = gl.getUniformBlockIndex(prog, name);
                if (index === 4294967295) {
                    throw new Error("UBO undefined");
                }
                gl.uniformBlockBinding(prog, index, blockBindIdx);
                this._index = blockBindIdx;
            }
        }
        ;
        VertexUBO.prototype.bind = function () {
            var gl = MB.Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                gl.bindBuffer(gl.UNIFORM_BUFFER, this._handle);
                return;
            }
        };
        ;
        VertexUBO.prototype.bindBB = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.bindBufferBase(gl.UNIFORM_BUFFER, this._index, this._handle);
        };
        ;
        VertexUBO.prototype.update = function (data) {
            var gl = MB.Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                gl.bindBuffer(gl.UNIFORM_BUFFER, this._handle);
                gl.bufferData(gl.UNIFORM_BUFFER, data, gl.STATIC_DRAW);
                gl.bindBuffer(gl.UNIFORM_BUFFER, null);
                gl.bindBufferBase(gl.UNIFORM_BUFFER, this._index, this._handle);
            }
        };
        ;
        VertexUBO.prototype.unbind = function () {
            var gl = MB.Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                gl.bindBuffer(gl.UNIFORM_BUFFER, null);
                return;
            }
        };
        ;
        VertexUBO.prototype.destroy = function () {
            this.bind();
            var gl = MB.Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                gl.deleteBuffer(this._handle);
                return;
            }
        };
        ;
        VertexUBO.isSupported = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl instanceof WebGL2RenderingContext;
        };
        ;
        return VertexUBO;
    }());
    MB.VertexUBO = VertexUBO;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Axis = (function (_super) {
        __extends(Axis, _super);
        function Axis(dim) {
            if (dim === void 0) { dim = 10; }
            _super.call(this);
            this.indices = [0, 1, 2, 3, 4, 5];
            this.colors = [
                1, 1, 0, 1,
                1, 1, 0, 1,
                0, 1, 0, 1,
                0, 1, 0, 1,
                0, 0, 1, 1,
                0, 0, 1, 1
            ];
            if (dim < 1) {
                throw new Error("Dim > 1 pls");
            }
            var vertices = this._createVertices(dim);
            this._handle = [];
            this._vao.bind();
            this.addElementArray(new Uint16Array(this.indices));
            this.addBufferArray(0, new Float32Array(vertices), 3);
            this._indicesLen = this.indices.length;
            MB.ProgramManager.addWithFun("axisShader", function () {
                var prog = new MB.Program();
                prog.addShader("#version 300 es\n                    precision highp float;\n\n                    layout(location = 0) in vec3 position;\n                    layout(location = 1) in vec3 color;\n\n                    uniform mat4 projection;\n                    uniform mat4 view;\n                    uniform mat4 model;\n\n                    void main() {\n                        gl_Position = projection * view * model * vec4(position, 1.0);\n                        ourColor = color;\n                    }\n                ", MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);
                prog.addShader("#version 300 es\n                    precision highp float;\n\n                    in vec3 ourColor;\n                    out vec4 fragColor;\n\n                    void main() {\n                        fragColor = vec4(ourColor, 1.0);\n                    }\n                ", MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
                prog.compile();
                prog.addUniforms(["projection", "view", "model"]);
                return prog;
            });
        }
        ;
        Axis.prototype._createVertices = function (dim) {
            return [
                -dim, 0.0, 0.0,
                dim, 0.0, 0.0,
                0.0, -dim / 2, 0.0,
                0.0, dim / 2, 0.0,
                0.0, 0.0, -dim,
                0.0, 0.0, dim
            ];
        };
        ;
        Axis.prototype.render = function () {
            var gl = MB.Core.getInstance().getGL();
            this._vao.bind();
            gl.drawElements(gl.LINES, this._indicesLen, gl.UNSIGNED_SHORT, 0);
            this._vao.unbind();
        };
        ;
        return Axis;
    }(MB.Drawable));
    MB.Axis = Axis;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    ;
    var Billboard = (function () {
        function Billboard() {
        }
        Billboard.initialize = function () {
            if (!Billboard.mesh || !Billboard.program) {
                Billboard.mesh = new MB.CustomModel({
                    indices: [0, 1, 2, 2, 3, 0],
                    vertices: [
                        -0.5, 0.5, 0.0,
                        -0.5, -0.5, 0.0,
                        0.5, -0.5, 0.0,
                        0.5, 0.5, 0.0],
                    texCoords: [
                        0.0, 0.0,
                        0.0, 1.0,
                        1.0, 1.0,
                        1.0, 0.0
                    ]
                });
                Billboard.program = new MB.Program();
                Billboard.program.addShader("#version 300 es\n                precision highp float;\n                in vec3 position;\n                in vec2 uv;\n\n                uniform vec3 pos;\n                uniform mat4 projection;\n                uniform mat4 view;\n                uniform mat4 model;\n\n                uniform vec2 lo;\n                uniform vec2 hi;\n                uniform vec2 size;\n\n                out vec2 tc;\n                out vec2 tt;\n                void main() {\n                    tt = uv * size;\n\n                    vec4 pos = vec4(uv.x * size.x, uv.y * size.y, 0.0, 0.0)\n                        + view * model * vec4(pos, 1.0);\n                    gl_Position = projection * pos;\n                    tc = (0.5 * vec2(1.0+uv.x,1.0-uv.y) - lo) * (hi - lo);\n                }", MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);
                Billboard.program.addShader("#version 300 es\n                precision highp float;\n\n                uniform sampler2D tex;\n\n                in vec2 tc;\n                in vec2 tt;\n                out vec4 fragColor;\n\n                void main() {\n                    if (length(tt - 0.5) > 0.5) discard;\n                    else fragColor = texture(tex, tc);\n                }", MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
                Billboard.program.compile();
                Billboard.program.addUniforms([
                    "pos", "projection", "model", "view", "lo", "hi", "size", "tex"
                ]);
            }
        };
        Billboard.bind = function () {
            if (!Billboard.program) {
                Billboard.initialize();
            }
            Billboard.program.use();
        };
        Billboard.draw = function (position, opts) {
            if (position === void 0) { position = new Float32Array([0, 0, 0]); }
            var tex = opts.texture;
            var hi = opts.hi || [1, 1];
            var lo = opts.lo || [0, 0];
            var width = opts.width || 1.0;
            var height = opts.height || 1.0;
            var model = opts.model || mat4.identity(mat4.create());
            var view = opts.view || mat4.identity(mat4.create());
            var projection = opts.projection || mat4.identity(mat4.create());
            if (!Billboard.program) {
                Billboard.initialize();
            }
            Billboard.program.sendUniform2f("hi", hi[0], hi[1]);
            Billboard.program.sendUniform2f("lo", lo[0], lo[1]);
            Billboard.program.sendUniform2f("size", width, height);
            Billboard.program.sendUniformMat4("model", model);
            Billboard.program.sendUniformMat4("view", view);
            Billboard.program.sendUniformMat4("projection", projection);
            Billboard.program.sendUniformVec3("pos", position);
            tex.bind(0);
            Billboard.program.sendUniform1i("tex", 0);
            Billboard.mesh.render();
        };
        Billboard.unbind = function () {
        };
        Billboard.mesh = null;
        Billboard.program = null;
        return Billboard;
    }());
    MB.Billboard = Billboard;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Capabilities;
    (function (Capabilities) {
        var _capabilities = {};
        function getMaxAnisotropy() {
            if (!_capabilities["anisotropy"]) {
                var gl = MB.Core.getInstance().getGL();
                var ext = MB.Extensions.get("EXT_texture_filter_anisotropic");
                _capabilities["anisotropy"] = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT) || 0;
            }
            return _capabilities["anisotropy"];
        }
        Capabilities.getMaxAnisotropy = getMaxAnisotropy;
        ;
        function getMaxTextures() {
            if (!_capabilities["maxTextures"]) {
                var gl = MB.Core.getInstance().getGL();
                _capabilities["maxTextures"] = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
            }
            return _capabilities["maxTextures"];
        }
        Capabilities.getMaxTextures = getMaxTextures;
        ;
        function getMaxVertexTextures() {
            if (!_capabilities["maxVertexTextures"]) {
                var gl = MB.Core.getInstance().getGL();
                _capabilities["maxVertexTextures"] = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
            }
            return _capabilities["maxVertexTextures"];
        }
        Capabilities.getMaxVertexTextures = getMaxVertexTextures;
        ;
        function getMaxTextureSize() {
            if (!_capabilities["maxTextureSize"]) {
                var gl = MB.Core.getInstance().getGL();
                _capabilities["maxTextureSize"] = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            }
            return _capabilities["maxTextureSize"];
        }
        Capabilities.getMaxTextureSize = getMaxTextureSize;
        ;
        function getMaxCubemapSize() {
            if (!_capabilities["maxCubemapSize"]) {
                var gl = MB.Core.getInstance().getGL();
                _capabilities["maxCubemapSize"] = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
            }
            return _capabilities["maxCubemapSize"];
        }
        Capabilities.getMaxCubemapSize = getMaxCubemapSize;
        function getMaxPrecision() {
            var gl = MB.Core.getInstance().getGL();
            if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision > 0 &&
                gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision > 0) {
                return "highp";
            }
            else if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision > 0 &&
                gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision > 0) {
                return "mediump";
            }
            return "lowp";
        }
        Capabilities.getMaxPrecision = getMaxPrecision;
        ;
        function getMaxDrawBuffers() {
            if (!_capabilities["maxDrawBuffers"]) {
                var gl = MB.Core.getInstance().getGL();
                _capabilities["maxDrawBuffers"] = gl.getParameter(gl.MAX_DRAW_BUFFERS);
            }
            return _capabilities["maxDrawBuffers"];
        }
        Capabilities.getMaxDrawBuffers = getMaxDrawBuffers;
        ;
        function getMaxColorAttachments() {
            if (!_capabilities["maxColorAttachments"]) {
                var gl = MB.Core.getInstance().getGL();
                _capabilities["maxColorAttachments"] = gl.getParameter(gl.MAX_COLOR_ATTACHMENTS);
            }
            return _capabilities["maxColorAttachments"];
        }
        Capabilities.getMaxColorAttachments = getMaxColorAttachments;
        ;
    })(Capabilities = MB.Capabilities || (MB.Capabilities = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Clock = (function () {
        function Clock(_autostart) {
            if (_autostart === void 0) { _autostart = true; }
            this._autostart = _autostart;
            this._startTime = 0.0;
            this._oldTime = 0.0;
            this._elapsed = 0.0;
            this._running = false;
            if (this._autostart) {
                this.start();
            }
        }
        ;
        Clock.prototype.start = function () {
            this._autostart = true;
            this._startTime = (performance || Date).now();
            this._oldTime = this._startTime;
            this._running = true;
        };
        ;
        Clock.prototype.stop = function () {
            this.elapsedTime;
            this._running = false;
        };
        ;
        Object.defineProperty(Clock.prototype, "elapsedTime", {
            get: function () {
                this.delta;
                return this._elapsed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Clock.prototype, "delta", {
            get: function () {
                var diff = 0;
                if (this._autostart && !this._running) {
                    this.start();
                }
                if (this._running) {
                    var newTime = (performance || Date).now();
                    diff = (newTime - this._oldTime) / 1000;
                    this._oldTime = newTime;
                    this._elapsed += diff;
                }
                return diff;
            },
            enumerable: true,
            configurable: true
        });
        return Clock;
    }());
    MB.Clock = Clock;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Color3 = (function () {
        function Color3(r, g, b) {
            this._color = new MB.Vect3();
            this.r = r;
            this.g = g;
            this.b = b;
        }
        ;
        Color3.prototype.isEquals = function (c) {
            return this._color.exactEquals(c._color);
        };
        ;
        Color3.prototype.clone = function () {
            return new Color3(this.r, this.g, this.b);
        };
        ;
        Color3.prototype.copy = function (c) {
            this.r = c.r;
            this.g = c.g;
            this.b = c.b;
            return this;
        };
        ;
        Object.defineProperty(Color3.prototype, "r", {
            get: function () {
                return this._color.x;
            },
            set: function (r) {
                this._color.x = r;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color3.prototype, "g", {
            get: function () {
                return this._color.y;
            },
            set: function (g) {
                this._color.y = g;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color3.prototype, "b", {
            get: function () {
                return this._color.z;
            },
            set: function (b) {
                this._color.z = b;
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        ;
        ;
        Color3.prototype.setRGB = function (r, g, b) {
            this.r = r;
            this.g = g;
            this.b = b;
            return this;
        };
        ;
        Color3.lerp = function (minColor, maxColor, alpha) {
            var r = minColor.r + (maxColor.r - minColor.r) * alpha;
            var g = minColor.g + (maxColor.g - minColor.g) * alpha;
            var b = minColor.b + (maxColor.b - minColor.b) * alpha;
            return new Color3(r, g, b);
        };
        ;
        Color3.createFromHex = function (hex) {
            return new Color3((hex >> 16 & 255) / 255, (hex >> 8 & 255) / 255, (hex & 255) / 255);
        };
        ;
        Color3.getRandomColor = function () {
            var r = MB.RandomGenerator.random();
            var g = MB.RandomGenerator.random();
            var b = MB.RandomGenerator.random();
            return new Color3(r, g, b);
        };
        ;
        Color3.prototype.gammaToLinear = function (gammaFactor) {
            if (gammaFactor === void 0) { gammaFactor = 2.2; }
            this.r = Math.pow(this.r, gammaFactor);
            this.g = Math.pow(this.g, gammaFactor);
            this.b = Math.pow(this.b, gammaFactor);
            return this;
        };
        ;
        Color3.prototype.linearToGamma = function (gammaFactor) {
            if (gammaFactor === void 0) { gammaFactor = 2.2; }
            var invGamma = (gammaFactor > 0) ? (1.0 / gammaFactor) : 1.0;
            this.r = Math.pow(this.r, invGamma);
            this.g = Math.pow(this.g, invGamma);
            this.b = Math.pow(this.b, invGamma);
            return this;
        };
        ;
        Color3.prototype.getHexadecimal = function () {
            return (this.r * 255) << 16
                ^ (this.g * 255) << 8
                ^ (this.b * 255) << 0;
        };
        Color3.prototype.toHSL = function () {
            var max = Math.max(this.r, this.g, this.b), min = Math.min(this.r, this.g, this.b);
            var h, s, l = (max + min) / 2;
            if (max === min) {
                h = s = 0;
            }
            else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case this.r:
                        h = (this.g - this.b) / d +
                            (this.g < this.b ? 6 : 0);
                        break;
                    case this.g:
                        h = (this.b - this.r) / d + 2;
                        break;
                    case this.b:
                        h = (this.r - this.g) / d + 4;
                        break;
                }
                h /= 6;
            }
            return new Color3(h, s, l);
        };
        ;
        Color3.fromColor4 = function (color) {
            return new Color3(color.r, color.g, color.b);
        };
        ;
        Color3.Aqua = Color3.createFromHex(0x00FFFF);
        Color3.Beige = Color3.createFromHex(0xF5F5DC);
        Color3.Black = Color3.createFromHex(0x000000);
        Color3.Blue = Color3.createFromHex(0x0000FF);
        Color3.Brown = Color3.createFromHex(0xA52A2A);
        Color3.Cyan = Color3.createFromHex(0x00FFFF);
        Color3.Gold = Color3.createFromHex(0xFFD700);
        Color3.Indigo = Color3.createFromHex(0x4B0082);
        Color3.Lavender = Color3.createFromHex(0xE6E6FA);
        Color3.Orange = Color3.createFromHex(0xFFA500);
        Color3.Pink = Color3.createFromHex(0xFFC0CB);
        Color3.Purple = Color3.createFromHex(0x800080);
        Color3.Red = Color3.createFromHex(0xFF0000);
        Color3.Yellow = Color3.createFromHex(0xFFFF00);
        Color3.White = Color3.createFromHex(0xFFFFFF);
        return Color3;
    }());
    MB.Color3 = Color3;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Color4 = (function () {
        function Color4(r, g, b, a) {
            this._color = new MB.Vect4(0.0, 0.0, 0.0, 1.0);
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        ;
        Color4.prototype.isEquals = function (c) {
            return this._color.exactEquals(c._color);
        };
        ;
        Color4.prototype.clone = function () {
            return new Color4(this.r, this.g, this.b, this.a);
        };
        ;
        Color4.prototype.copy = function (c) {
            this.r = c.r;
            this.g = c.g;
            this.b = c.b;
            this.a = c.a;
            return this;
        };
        ;
        Object.defineProperty(Color4.prototype, "r", {
            get: function () {
                return this._color.x;
            },
            set: function (r) {
                this._color.x = r;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color4.prototype, "g", {
            get: function () {
                return this._color.y;
            },
            set: function (g) {
                this._color.y = g;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color4.prototype, "b", {
            get: function () {
                return this._color.z;
            },
            set: function (b) {
                this._color.z = b;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color4.prototype, "a", {
            get: function () {
                return this._color.w;
            },
            set: function (a) {
                this._color.w = a;
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        ;
        ;
        ;
        Color4.lerp = function (minColor, maxColor, alpha) {
            var r = minColor.r + (maxColor.r - minColor.r) * alpha;
            var g = minColor.g + (maxColor.g - minColor.g) * alpha;
            var b = minColor.b + (maxColor.b - minColor.b) * alpha;
            var a = minColor.a + (maxColor.a - minColor.a) * alpha;
            return new Color4(r, g, b, a);
        };
        ;
        Color4.prototype.setRGBA = function (r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
            return this;
        };
        ;
        Color4.prototype.toHSL = function () {
            var max = Math.max(this.r, this.g, this.b), min = Math.min(this.r, this.g, this.b);
            var h, s, l = (max + min) / 2;
            if (max === min) {
                h = s = 0;
            }
            else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case this.r:
                        h = (this.g - this.b) / d +
                            (this.g < this.b ? 6 : 0);
                        break;
                    case this.g:
                        h = (this.b - this.r) / d + 2;
                        break;
                    case this.b:
                        h = (this.r - this.g) / d + 4;
                        break;
                }
                h /= 6;
            }
            return new Color4(h, s, l, this.a);
        };
        ;
        Color4.fromColor3 = function (color) {
            return new Color4(color.r, color.g, color.b, 1.0);
        };
        ;
        return Color4;
    }());
    MB.Color4 = Color4;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Easing;
    (function (Easing) {
        var PI_2 = Math.PI / 2.0;
        var sine;
        (function (sine) {
            function easeIn(t) {
                return Math.sin(PI_2 * t);
            }
            sine.easeIn = easeIn;
            ;
            function easeOut(t) {
                return 1.0 + Math.sin(PI_2 * (--t));
            }
            sine.easeOut = easeOut;
            ;
            function easeInOut(t) {
                return 0.5 * (1.0 + Math.sin(Math.PI * (t - 0.5)));
            }
            sine.easeInOut = easeInOut;
            ;
        })(sine = Easing.sine || (Easing.sine = {}));
        ;
        var quad;
        (function (quad) {
            function easeIn(t) {
                return t * t;
            }
            quad.easeIn = easeIn;
            ;
            function easeOut(t) {
                return t * (2.0 - t);
            }
            quad.easeOut = easeOut;
            ;
            function easeInOut(t) {
                return t < 0.5 ? 2.0 * t * t : t * (4.0 - 2.0 * t) - 1;
            }
            quad.easeInOut = easeInOut;
            ;
        })(quad = Easing.quad || (Easing.quad = {}));
        ;
        var cubic;
        (function (cubic) {
            function easeIn(t) {
                return t * t * t;
            }
            cubic.easeIn = easeIn;
            ;
            function easeOut(t) {
                return 1 + (--t) * t * t;
            }
            cubic.easeOut = easeOut;
            ;
            function easeInOut(t) {
                return t < 0.5 ? 4.0 * t * t * t : 1.0 + (--t) *
                    (2.0 * (--t)) * (2.0 * t);
            }
            cubic.easeInOut = easeInOut;
            ;
        })(cubic = Easing.cubic || (Easing.cubic = {}));
        ;
        var quart;
        (function (quart) {
            function easeIn(t) {
                t *= t;
                return t * t;
            }
            quart.easeIn = easeIn;
            ;
            function easeOut(t) {
                t = (--t) * t;
                return 1.0 - t * t;
            }
            quart.easeOut = easeOut;
            ;
            function easeInOut(t) {
                if (t < 0.5) {
                    t *= t;
                    return 8.0 * t * t;
                }
                else {
                    t = (--t) * t;
                    return 1.0 - 8.0 * t * t;
                }
            }
            quart.easeInOut = easeInOut;
            ;
        })(quart = Easing.quart || (Easing.quart = {}));
        ;
        var quint;
        (function (quint) {
            function easeIn(t) {
                var t2 = t * t;
                return t * t2 * t2;
            }
            quint.easeIn = easeIn;
            ;
            function easeOut(t) {
                var t2 = (--t) * t;
                return 1.0 + t * t2 * t2;
            }
            quint.easeOut = easeOut;
            ;
            function easeInOut(t) {
                var t2;
                if (t < 0.5) {
                    t2 = t * t;
                    return 16.0 * t * t2 * t2;
                }
                else {
                    t2 = (--t) * t;
                    return 1 + 16 * t * t2 * t2;
                }
            }
            quint.easeInOut = easeInOut;
            ;
        })(quint = Easing.quint || (Easing.quint = {}));
        ;
        var expo;
        (function (expo) {
            function easeIn(t) {
                return (Math.pow(2.0, 8.0 * t) - 1.0) / 255.0;
            }
            expo.easeIn = easeIn;
            ;
            function easeOut(t) {
                return 1 - Math.pow(2.0, -8.0 * t);
            }
            expo.easeOut = easeOut;
            ;
            function easeInOut(t) {
                if (t < 0.5) {
                    return (Math.pow(2.0, 16.0 * t) - 1.0) / 510.0;
                }
                else {
                    return 1.0 - 0.5 * Math.pow(2.0, -16.0 * (t - 0.5));
                }
            }
            expo.easeInOut = easeInOut;
            ;
        })(expo = Easing.expo || (Easing.expo = {}));
        ;
        var circ;
        (function (circ) {
            function easeIn(t) {
                return 1.0 - Math.sqrt(1.0 - t);
            }
            circ.easeIn = easeIn;
            ;
            function easeOut(t) {
                return Math.sqrt(t);
            }
            circ.easeOut = easeOut;
            ;
            function easeInOut(t) {
                if (t < 0.5) {
                    return (1.0 - Math.sqrt(1.0 - 2.0 * t)) * 0.5;
                }
                else {
                    return (1.0 + Math.sqrt(2.0 * t - 1.0)) * 0.5;
                }
            }
            circ.easeInOut = easeInOut;
            ;
        })(circ = Easing.circ || (Easing.circ = {}));
        ;
        var back;
        (function (back) {
            function easeIn(t) {
                return t * t * (2.70158 * t - 1.70158);
            }
            back.easeIn = easeIn;
            ;
            function easeOut(t) {
                return 1.0 + (--t) * t * (2.70158 * t + 1.70158);
            }
            back.easeOut = easeOut;
            ;
            function easeInOut(t) {
                if (t < 0.5) {
                    return t * t * (7.0 * t - 2.5) * 2.0;
                }
                else {
                    return 1.0 + (--t) * t * 2.0 * (7.0 * t + 2.5);
                }
            }
            back.easeInOut = easeInOut;
            ;
        })(back = Easing.back || (Easing.back = {}));
        ;
        var elastic;
        (function (elastic) {
            function easeIn(t) {
                var t2 = t * t;
                return t2 * t2 * Math.sin(t * Math.PI * 4.5);
            }
            elastic.easeIn = easeIn;
            ;
            function easeOut(t) {
                var t2 = (t - 1.0) * (t - 1.0);
                return 1.0 - t2 * t2 * Math.cos(t * Math.PI * 4.5);
            }
            elastic.easeOut = easeOut;
            ;
            function easeInOut(t) {
                var t2;
                if (t < 0.45) {
                    t2 = t * t;
                    return 8.0 * t2 * t2 * Math.sin(t * Math.PI * 9.0);
                }
                else if (t < 0.55) {
                    return 0.5 + 0.75 * Math.sin(t * Math.PI * 4.0);
                }
                else {
                    t2 = (t - 1.0) * (t - 1.0);
                    return 1.0 - 8.0 * t2 * t2 * Math.sin(t * Math.PI * 9.0);
                }
            }
            elastic.easeInOut = easeInOut;
            ;
        })(elastic = Easing.elastic || (Easing.elastic = {}));
        ;
        var bounce;
        (function (bounce) {
            function easeIn(t) {
                return Math.pow(2.0, 6.0 * (t - 1.0)) * Math.abs(Math.sin(t * Math.PI * 3.5));
            }
            bounce.easeIn = easeIn;
            ;
            function easeOut(t) {
                return 1.0 - Math.pow(2.0, -6.0 * t) * Math.abs(Math.cos(t * Math.PI * 3.5));
            }
            bounce.easeOut = easeOut;
            ;
            function easeInOut(t) {
                if (t < 0.5) {
                    return 8.0 * Math.pow(2.0, 8.0 * (t - 1.0)) * Math.abs(Math.sin(t * Math.PI * 7.0));
                }
                else {
                    return 1.0 - 8.0 * Math.pow(2.0, -8.0 * t) * Math.abs(Math.sin(t * Math.PI * 7.0));
                }
            }
            bounce.easeInOut = easeInOut;
            ;
        })(bounce = Easing.bounce || (Easing.bounce = {}));
        ;
    })(Easing = MB.Easing || (MB.Easing = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Encodings;
    (function (Encodings) {
        function RGBByte2Float(srcArr, srcOff, dstArr, dstOff) {
            var e = srcArr[srcOff + 3];
            var scale = Math.pow(2.0, e - 128.0) / 255.0;
            dstArr[dstOff + 0] = srcArr[srcOff + 0] * scale;
            dstArr[dstOff + 1] = srcArr[srcOff + 1] * scale;
            dstArr[dstOff + 2] = srcArr[srcOff + 2] * scale;
        }
        Encodings.RGBByte2Float = RGBByte2Float;
        ;
        function RGBByte2Half(srcArr, srcOff, dstArr, dstOff) {
            var e = srcArr[srcOff + 3];
            var scale = Math.pow(2.0, e - 128.0) / 255.0;
            dstArr[dstOff + 0] = toHalf(srcArr[srcOff + 0] * scale);
            dstArr[dstOff + 1] = toHalf(srcArr[srcOff + 1] * scale);
            dstArr[dstOff + 2] = toHalf(srcArr[srcOff + 2] * scale);
        }
        Encodings.RGBByte2Half = RGBByte2Half;
        ;
        var floatView = new Float32Array(1);
        var int32View = new Int32Array(floatView.buffer);
        function toHalf(val) {
            floatView[0] = val;
            var x = int32View[0];
            var bits = (x >> 16) & 0x8000;
            var m = (x >> 12) & 0x07ff;
            var e = (x >> 23) & 0xff;
            if (e < 103) {
                return bits;
            }
            if (e > 142) {
                bits |= 0x7c00;
                bits |= ((e === 255) ? 0 : 1) && (x & 0x007fffff);
                return bits;
            }
            if (e < 113) {
                m |= 0x0800;
                bits |= (m >> (114 - e)) + ((m >> (113 - e)) & 1);
                return bits;
            }
            bits |= ((e - 112) << 10) | (m >> 1);
            bits += m & 1;
            return bits;
        }
    })(Encodings = MB.Encodings || (MB.Encodings = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Extensions = (function () {
        function Extensions() {
        }
        Extensions.get = function (name) {
            if (name in this._extensions) {
                return this._extensions[name];
            }
            var gl = MB.Core.getInstance().getGL();
            var ext = gl.getExtension(name) || gl.getExtension("WEBKIT_" + name) || gl.getExtension("MOZ_" + name);
            if (ext === null) {
                console.warn(name + " extension not supported.");
                return;
            }
            this._extensions[name] = ext;
            return ext;
        };
        Extensions._extensions = {};
        return Extensions;
    }());
    MB.Extensions = Extensions;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var GBuffer = (function () {
        function GBuffer(size) {
            var gl = MB.Core.getInstance().getGL();
            var configTex = {
                internalFormat: MB.ctes.TextureFormat.RGB,
                format: MB.ctes.TextureFormat.RGB,
                type: gl.FLOAT,
                minFilter: MB.ctes.TextureType.Nearest,
                magFilter: MB.ctes.TextureType.Nearest
            };
            this.Framebuffer = new MB.Framebuffer([
                new MB.SimpleTexture2D(size, configTex),
                new MB.SimpleTexture2D(size, configTex),
                new MB.SimpleTexture2D(size, configTex)
            ], size, true, true, {});
            console.log("done");
        }
        ;
        GBuffer.prototype.bindForReading = function () {
            this.Framebuffer.onlyBindTextures();
        };
        ;
        GBuffer.prototype.bindForWriting = function () {
            this.Framebuffer.bind();
        };
        ;
        GBuffer.prototype.destroy = function () {
            if (this.Framebuffer) {
                this.Framebuffer.destroy();
            }
        };
        ;
        GBuffer.prototype.rebuild = function (size) {
            this.Framebuffer.rebuild(size);
        };
        ;
        return GBuffer;
    }());
    MB.GBuffer = GBuffer;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Geometry;
    (function (Geometry) {
        function triangleCentroid(v1, v2, v3) {
            var dim = v1.length;
            var res = new Float32Array(dim);
            for (var i = 0; i < dim; ++i) {
                var t0 = v1[i];
                var t1 = v2[i];
                var t2 = v3[i];
                res[i] = (t0 + t1 + t2) / 3;
            }
            return res;
        }
        Geometry.triangleCentroid = triangleCentroid;
        ;
        function triangleIncenter(v1, v2, v3) {
            var dim = v1.length;
            function sub(tmp, a, b) {
                for (var i = 0; i < tmp.length; ++i) {
                    tmp[i] = a[i] - b[i];
                }
                return tmp;
            }
            ;
            function length(vec) {
                var res = 0;
                for (var n = 0; n < vec.length; ++n) {
                    res += vec[n] * vec[n];
                }
                return Math.sqrt(res);
            }
            ;
            var tmp = new Float32Array(dim);
            var d1 = length(sub(tmp, v3, v2));
            var d2 = length(sub(tmp, v1, v3));
            var d3 = length(sub(tmp, v2, v1));
            var p = d1 + d2 + d3;
            for (var i = 0; i < dim; ++i) {
                tmp[i] = (v1[i] * d1 + v2[i] * d2 + v3[i] * d3) / p;
            }
            return tmp;
        }
        Geometry.triangleIncenter = triangleIncenter;
        ;
        function getConvexHull(points) {
            points.sort(function (a, b) {
                return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
            });
            function cross(o, a, b) {
                return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
            }
            var lower = [];
            for (var i = 0; i < points.length; ++i) {
                while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
                    lower.pop();
                }
                lower.push(points[i]);
            }
            var upper = [];
            for (var i = points.length - 1; i >= 0; --i) {
                while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
                    upper.pop();
                }
                upper.push(points[i]);
            }
            upper.pop();
            lower.pop();
            return lower.concat(upper);
        }
        Geometry.getConvexHull = getConvexHull;
        ;
        function convexHull1D(points) {
            var lo = 0;
            var hi = 0;
            for (var i = 0; i < points.length; ++i) {
                if (points[i] < points[lo]) {
                    lo = i;
                }
                if (points[i] > points[hi]) {
                    hi = i;
                }
            }
            if (lo < hi) {
                return [lo, hi];
            }
            else if (lo > hi) {
                return [hi, lo];
            }
            else {
                return [lo];
            }
        }
        Geometry.convexHull1D = convexHull1D;
        ;
        function removeOrphanVertices(positions, indices) {
            var newPositions = [];
            var indexLookUp = {};
            var newIndices = indices.map(function (indice) {
                return indice.map((function (index) {
                    if (indexLookUp[index] === undefined) {
                        indexLookUp[index] = newPositions.length;
                        newPositions.push(positions[index]);
                    }
                    return indexLookUp[index];
                }));
            });
            return {
                indices: newIndices,
                positions: newPositions
            };
        }
        Geometry.removeOrphanVertices = removeOrphanVertices;
        ;
        function triangulateQuadFace(faces) {
            var triangles = [];
            faces.forEach(function (face) {
                triangles.push([face[0], face[1], face[2]]);
                for (var j = 2; j < face.length - 1; ++j) {
                    triangles.push([face[0], face[j], face[j + 1]]);
                }
            });
            return triangles;
        }
        Geometry.triangulateQuadFace = triangulateQuadFace;
        ;
        function removeDegerateIndices(indices) {
            function equ(a, b) {
                return a === b;
            }
            ;
            return indices.filter(function (indice) {
                for (var i = 0; i < indice.length; ++i) {
                    for (var j = 0; j < indice.length; ++j) {
                        if (i !== j && equ(indice[i], indice[j])) {
                            return false;
                        }
                    }
                }
                return true;
            });
        }
        Geometry.removeDegerateIndices = removeDegerateIndices;
        ;
        function removeDegerateIndicesWithVertices(indices, vertices) {
            function equ(a, b) {
                if (a.length !== b.length) {
                    return false;
                }
                for (var i = 0; i < a.length; ++i) {
                    if (a[i] !== b[i]) {
                        return false;
                    }
                }
                return true;
            }
            ;
            return indices.filter(function (indice) {
                var indice2 = indice.map(function (idx) {
                    return vertices[idx];
                });
                for (var i = 0; i < indice2.length; i++) {
                    for (var j = 0; j < indice2.length; j++) {
                        if (i !== j && equ(indice2[i], indice2[j])) {
                            return false;
                        }
                    }
                }
                return true;
            });
        }
        Geometry.removeDegerateIndicesWithVertices = removeDegerateIndicesWithVertices;
        ;
    })(Geometry = MB.Geometry || (MB.Geometry = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Noise;
    (function (Noise) {
        var fractal;
        (function (fractal) {
            function noise(x, y, z, octaves, noiseCallback) {
                var t = 0, f = 1, n = 0;
                for (var i = 0; i < octaves; ++i) {
                    n += noiseCallback(x * f, y * f, z * f) / f;
                    t += 1 / f;
                    f *= 2;
                }
                return n / t;
            }
            fractal.noise = noise;
        })(fractal = Noise.fractal || (Noise.fractal = {}));
        ;
        var worley;
        (function (worley) {
            var _seed = 3000;
            function setSeed(seed) {
                _seed = seed;
            }
            worley.setSeed = setSeed;
            ;
            function xorshift(seed) {
                var x = seed ^ (seed >> 12);
                x = x ^ (x << 25);
                x = x ^ (x >> 27);
                return x * 2;
            }
            function hash(i, j, k) {
                return (((((2166136261 ^ i) * 16777619) ^ j) * 16777619) ^ k) * 16777619 & 0xffffffff;
            }
            ;
            function d(p1, p2) {
                return [p1.x - p2.x, p1.y - p2.y, p1.z - p2.z];
            }
            ;
            function EuclideanDistance(p1, p2) {
                return d(p1, p2).reduce(function (sum, x) { return sum + (x * x); }, 0);
            }
            ;
            function ManhattanDistance(p1, p2) {
                return d(p1, p2).reduce(function (sum, x) { return sum + Math.abs(x); }, 0);
            }
            ;
            function probLookup(value) {
                value = value & 0xffffffff;
                if (value < 393325350)
                    return 1;
                if (value < 1022645910)
                    return 2;
                if (value < 1861739990)
                    return 3;
                if (value < 2700834071)
                    return 4;
                if (value < 3372109335)
                    return 5;
                if (value < 3819626178)
                    return 6;
                if (value < 4075350088)
                    return 7;
                if (value < 4203212043)
                    return 8;
                return 9;
            }
            ;
            function insert(arr, value) {
                var temp;
                for (var i = arr.length - 1; i >= 0; i--) {
                    if (value > arr[i])
                        break;
                    temp = arr[i];
                    arr[i] = value;
                    if (i + 1 < arr.length)
                        arr[i + 1] = temp;
                }
            }
            ;
            function noise(Input, distanceFunc) {
                var lastRandom, numberFeaturePoints, randomDiff = { x: 0, y: 0, z: 0 }, featurePoint = { x: 0, y: 0, z: 0 };
                var CubeX, CubeY, CubeZ;
                var distanceArray = [9999999, 9999999, 9999999];
                for (var i = -1; i < 2; ++i)
                    for (var j = -1; j < 2; ++j)
                        for (var k = -1; k < 2; ++k) {
                            CubeX = Math.floor(Input.x) + i;
                            CubeY = Math.floor(Input.y) + j;
                            CubeZ = Math.floor(Input.z) + k;
                            lastRandom = xorshift(hash((CubeX + _seed) & 0xffffffff, (CubeY) & 0xffffffff, (CubeZ) & 0xffffffff));
                            numberFeaturePoints = probLookup(lastRandom);
                            for (var l = 0; l < numberFeaturePoints; ++l) {
                                lastRandom = xorshift(lastRandom);
                                randomDiff.x = lastRandom / 0x100000000;
                                lastRandom = xorshift(lastRandom);
                                randomDiff.y = lastRandom / 0x100000000;
                                lastRandom = xorshift(lastRandom);
                                randomDiff.z = lastRandom / 0x100000000;
                                featurePoint
                                    = { x: randomDiff.x + CubeX, y: randomDiff.y + CubeY, z: randomDiff.z + CubeZ };
                                insert(distanceArray, distanceFunc(Input, featurePoint));
                            }
                        }
                return distanceArray.map(function (x) { return x < 0 ? 0 : x > 1 ? 1 : x; });
            }
            ;
            function Euclidean(x, y, z) {
                return noise({
                    x: x,
                    y: y,
                    z: z }, EuclideanDistance);
            }
            worley.Euclidean = Euclidean;
            ;
            function Manhattan(x, y, z) {
                return noise({
                    x: x,
                    y: y,
                    z: z }, ManhattanDistance);
            }
            worley.Manhattan = Manhattan;
            ;
        })(worley = Noise.worley || (Noise.worley = {}));
        ;
        var perlin;
        (function (perlin) {
            var _seed = 3000;
            var permutation = [
                151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
                140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148,
                247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32,
                57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
                74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122,
                60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54,
                65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169,
                200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64,
                52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,
                207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213,
                119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
                129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104,
                218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
                81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
                184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
                222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
            ];
            var p = permutation.concat(permutation);
            var seedValue = _seed ? xorshift(_seed) : 0;
            function setSeed(seed) {
                seedValue = seed ? xorshift(seed) : 0;
            }
            perlin.setSeed = setSeed;
            ;
            function xorshift(seed) {
                var x = seed ^ (seed >> 12);
                x = x ^ (x << 25);
                x = x ^ (x >> 27);
                return x * 2;
            }
            ;
            function lerp(t, a, b) { return a + t * (b - a); }
            ;
            function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
            ;
            function grad(hash, x, y, z) {
                var h = hash & 15, u = h < 8 ? x : y, v = h < 4 ? y : h === 12 || h === 14 ? x : z;
                return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
            }
            ;
            function noise(x, y, z) {
                x += seedValue;
                y += seedValue;
                z += seedValue;
                var X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
                x -= Math.floor(x);
                y -= Math.floor(y);
                z -= Math.floor(z);
                var u = fade(x), v = fade(y), w = fade(z);
                var A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;
                return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)), lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))), lerp(v, lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)), lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1))));
            }
            perlin.noise = noise;
        })(perlin = Noise.perlin || (Noise.perlin = {}));
        ;
        var simplex;
        (function (simplex) {
            var i, j, k;
            var _seed = 3000;
            var A = [0, 0, 0];
            var u, v, w;
            var T = [0x15, 0x38, 0x32, 0x2c, 0x0d, 0x13, 0x07, 0x2a];
            var seedValue = _seed ? xorshift(_seed) : 0;
            function setSeed(seed) {
                seedValue = seed ? xorshift(seed) : 0;
            }
            simplex.setSeed = setSeed;
            ;
            function xorshift(seed) {
                var x = seed ^ (seed >> 12);
                x = x ^ (x << 25);
                x = x ^ (x >> 27);
                return x * 2;
            }
            ;
            function b2func(N, B) { return N >> B & 1; }
            ;
            function b4func(i, j, k, B) { return T[b2func(i, B) << 2 | b2func(j, B) << 1 | b2func(k, B)]; }
            function K(a) {
                var s = (A[0] + A[1] + A[2]) / 6.;
                var x = u - A[0] + s, y = v - A[1] + s, z = w - A[2] + s;
                var t = .6 - x * x - y * y - z * z;
                var h = shuffle(i + A[0], j + A[1], k + A[2]);
                A[a]++;
                if (t < 0)
                    return 0;
                var b5 = h >> 5 & 1, b4 = h >> 4 & 1, b3 = h >> 3 & 1, b2 = h >> 2 & 1, b = h & 3;
                var p = b === 1 ? x : b === 2 ? y : z, q = b === 1 ? y : b === 2 ? z : x, r = b === 1 ? z : b === 2 ? x : y;
                p = (b5 === b3 ? -p : p);
                q = (b5 === b4 ? -q : q);
                r = (b5 !== (b4 ^ b3) ? -r : r);
                t *= t;
                return 8 * t * t * (p + (b === 0 ? q + r : b2 === 0 ? q : r));
            }
            ;
            function shuffle(i, j, k) {
                return b4func(i, j, k, 0) + b4func(j, k, i, 1) + b4func(k, i, j, 2) + b4func(i, j, k, 3) +
                    b4func(j, k, i, 4) + b4func(k, i, j, 5) + b4func(i, j, k, 6) + b4func(j, k, i, 7);
            }
            ;
            function noise(x, y, z) {
                x += seedValue;
                y += seedValue;
                z += seedValue;
                var s = (x + y + z) / 3;
                i = Math.floor(x + s);
                j = Math.floor(y + s);
                k = Math.floor(z + s);
                s = (i + j + k) / 6.;
                u = x - i + s;
                v = y - j + s;
                w = z - k + s;
                A[0] = A[1] = A[2] = 0;
                var hi = u >= w ? u >= v ? 0 : 1 : v >= w ? 1 : 2;
                var lo = u < w ? u < v ? 0 : 1 : v < w ? 1 : 2;
                return K(hi) + K(3 - hi - lo) + K(lo) + K(0);
            }
            simplex.noise = noise;
            ;
        })(simplex = Noise.simplex || (Noise.simplex = {}));
        ;
    })(Noise = MB.Noise || (MB.Noise = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var PingPong = (function () {
        function PingPong(size) {
            var gl = MB.Core.getInstance().getGL();
            this._flag = true;
            this._size = size;
            this._tex1 = this._tex2 =
                new MB.SimpleTexture2D(size, {
                    internalFormat: MB.ctes.TextureFormat.RGBA,
                    format: MB.ctes.TextureFormat.RGBA,
                    type: gl.FLOAT,
                    minFilter: MB.ctes.TextureType.Nearest,
                    magFilter: MB.ctes.TextureType.Nearest
                });
            this._fbo = new MB.Framebuffer([this._tex1], size);
        }
        ;
        PingPong.prototype.pingpong = function () {
            if (this._flag) {
                this._tex1.bind();
                this._fbo.replaceTexture(this._tex1, 0);
            }
            else {
                this._tex2.bind();
                this._fbo.replaceTexture(this._tex2, 0);
            }
            this._flag = !this._flag;
        };
        ;
        PingPong.prototype.resize = function (size) {
            if (!this._size.exactEquals(size)) {
                this._fbo.rebuild(size);
                if (this._flag) {
                    this._tex2.resize(size);
                }
                else {
                    this._tex1.resize(size);
                }
            }
        };
        return PingPong;
    }());
    MB.PingPong = PingPong;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var PointCloud = (function () {
        function PointCloud() {
            this._points = [];
            this._size = 0;
            var range = 50;
            for (var i = 0; i < 500; ++i) {
                var particle = new MB.Vect3(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
                this._points.push(particle.x, particle.y, particle.z);
            }
            this._size = 500;
        }
        ;
        PointCloud.prototype.addBufferArray = function (attribLocation, data, numElems, type) {
            if (type === void 0) { type = MB.ctes.UsageType.StaticDraw; }
            var gl = MB.Core.getInstance().getGL();
            var vb = new MB.VertexBuffer(MB.ctes.BufferType.Array);
            vb.bufferData(data, type);
            vb.vertexAttribPointer(attribLocation, numElems, gl.FLOAT);
            return vb;
        };
        ;
        PointCloud.prototype.addPoint = function (point) {
        };
        ;
        PointCloud.prototype.render = function () {
            if (!this._vb) {
                this._vb = this.addBufferArray(0, new Float32Array(this._points), 3);
            }
            var buffer = this._vb.getBuffer();
            var gl = MB.Core.getInstance().getGL();
            gl.enableVertexAttribArray(0);
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.drawArrays(gl.POINTS, 0, this._size);
            this._vb.unbind();
        };
        ;
        return PointCloud;
    }());
    MB.PointCloud = PointCloud;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var PostProcess = (function () {
        function PostProcess() {
        }
        PostProcess.initialize = function () {
            if (!PostProcess._planeVAO) {
                var gl = MB.Core.getInstance().getGL();
                var positions = [
                    -1.0, -1.0,
                    1.0, -1.0,
                    -1.0, 1.0,
                    1.0, 1.0
                ];
                PostProcess._planeVAO = new MB.VertexArray();
                this._planeVertexVBO = new MB.VertexBuffer(MB.ctes.BufferType.Array);
                this._planeVertexVBO.bufferData(new Float32Array(positions), MB.ctes.UsageType.StaticDraw);
                this._planeVertexVBO.vertexAttribPointer(0, 2, gl.FLOAT);
                PostProcess._planeVAO.unbind();
            }
        };
        PostProcess.bind = function () {
            PostProcess._planeVAO.bind();
        };
        PostProcess.render = function () {
            var gl = MB.Core.getInstance().getGL();
            PostProcess._planeVAO.bind();
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            PostProcess._planeVAO.unbind();
        };
        PostProcess._planeVAO = null;
        PostProcess._planeVertexVBO = null;
        return PostProcess;
    }());
    MB.PostProcess = PostProcess;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var RandomGenerator;
    (function (RandomGenerator) {
        var seed = new Date().getTime();
        var N = 624;
        var M = 397;
        var MATRIX_A = 0x9908b0df;
        var UPPER_MASK = 0x80000000;
        var LOWER_MASK = 0x7fffffff;
        var mt = new Array(N);
        var mti = N + 1;
        setSeed(seed);
        function setSeed(seed) {
            mt[0] = seed >>> 0;
            for (mti = 1; mti < N; ++mti) {
                var s = mt[mti - 1] ^ (mt[mti - 1] >>> 30);
                mt[mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
                    (s & 0x0000ffff) * 1812433253) + mti;
                mt[mti] >>>= 0;
            }
        }
        RandomGenerator.setSeed = setSeed;
        ;
        function randomInt() {
            var y;
            var mag01 = new Array(0x0, MATRIX_A);
            if (mti >= N) {
                var kk = void 0;
                if (mti === N + 1)
                    this.init_seed(5489);
                for (kk = 0; kk < N - M; ++kk) {
                    y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
                    mt[kk] = mt[kk + M] ^ (y >>> 1) ^ mag01[y & 0x1];
                }
                for (; kk < N - 1; ++kk) {
                    y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
                    mt[kk] = mt[kk + (M - N)] ^ (y >>> 1) ^ mag01[y & 0x1];
                }
                y = (mt[N - 1] & UPPER_MASK) | (mt[0] & LOWER_MASK);
                mt[N - 1] = mt[M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];
                mti = 0;
            }
            y = mt[mti++];
            y ^= (y >>> 11);
            y ^= (y << 7) & 0x9d2c5680;
            y ^= (y << 15) & 0xefc60000;
            y ^= (y >>> 18);
            return y >>> 0;
        }
        RandomGenerator.randomInt = randomInt;
        ;
        function randomInt31() {
            return (randomInt() >>> 1);
        }
        RandomGenerator.randomInt31 = randomInt31;
        ;
        function randomIncl() {
            return randomInt() * (1.0 / 4294967295.0);
        }
        RandomGenerator.randomIncl = randomIncl;
        function random() {
            return randomInt() * (1.0 / 4294967296.0);
        }
        RandomGenerator.random = random;
        ;
        function randomExcl() {
            return (randomInt() + 0.5) * (1.0 / 4294967296.0);
        }
        RandomGenerator.randomExcl = randomExcl;
        ;
        function randomLong() {
            var a = randomInt() >>> 5, b = randomInt() >>> 6;
            return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
        }
        RandomGenerator.randomLong = randomLong;
        ;
    })(RandomGenerator = MB.RandomGenerator || (MB.RandomGenerator = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Ray = (function () {
        function Ray(origin, direction) {
            if (origin === void 0) { origin = new MB.Vect3(); }
            if (direction === void 0) { direction = new MB.Vect3(); }
            this._origin = origin;
            this._direction = direction;
        }
        ;
        Object.defineProperty(Ray.prototype, "origin", {
            get: function () {
                return this._origin;
            },
            set: function (origin) {
                this._origin = origin;
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        Object.defineProperty(Ray.prototype, "direction", {
            get: function () {
                return this._direction;
            },
            set: function (direction) {
                this._direction = direction;
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        Ray.prototype.at = function (t) {
            return new MB.Vect3(this._origin.x + t * this._direction.x, this._origin.y + t * this._direction.y, this._origin.z + t * this._direction.z);
        };
        ;
        Ray.prototype.lookAt = function (v) {
            this._direction = MB.Vect3.sub(v, this._origin).normalize();
        };
        ;
        return Ray;
    }());
    MB.Ray = Ray;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Skybox = (function () {
        function Skybox(dir, isWebGL2) {
            if (isWebGL2 === void 0) { isWebGL2 = true; }
            var faces = [];
            faces.push(dir + "/right.jpg");
            faces.push(dir + "/left.jpg");
            faces.push(dir + "/top.jpg");
            faces.push(dir + "/bottom.jpg");
            faces.push(dir + "/back.jpg");
            faces.push(dir + "/front.jpg");
            var gl = MB.Core.getInstance().getGL();
            this._prog = new MB.Program();
            var vs;
            if (isWebGL2) {
                vs = "#version 300 es\n                precision highp float;\n                layout (location = 0) in vec3 position;\n                out vec3 TexCoords;\n                uniform mat4 projection;\n                uniform mat4 view;\n                void main() {\n                    vec4 pos = projection * view * vec4(position, 1.0);\n                    gl_Position = pos.xyww;\n                    TexCoords = position;\n                }";
            }
            else {
                vs = "precision highp float;\n                attribute vec3 position;\n                varying vec3 TexCoords;\n                uniform mat4 projection;\n                uniform mat4 view;\n                void main() {\n                    vec4 pos = projection * view * vec4(position, 1.0);\n                    gl_Position = pos.xyww;\n                    TexCoords = position;\n                }";
            }
            this._prog.addShader(vs, MB.ctes.ShaderType.vertex, MB.ctes.ReadMode.read_text);
            var fg;
            if (isWebGL2) {
                fg = "#version 300 es\n                precision highp float;\n                in vec3 TexCoords;\n                out vec4 color;\n                uniform samplerCube skybox;\n                void main() {\n                    color = texture(skybox, TexCoords);\n                }";
            }
            else {
                fg = "precision highp float;\n                varying vec3 TexCoords;\n                uniform samplerCube skybox;\n                void main() {\n                    gl_FragColor = textureCube(skybox, TexCoords);\n                }";
            }
            this._prog.addShader(fg, MB.ctes.ShaderType.fragment, MB.ctes.ReadMode.read_text);
            this._prog.compile();
            this._prog.addUniforms(["view", "projection"]);
            var skyboxVertices = new Float32Array([
                -1.0, 1.0, -1.0,
                -1.0, -1.0, -1.0,
                1.0, -1.0, -1.0,
                1.0, -1.0, -1.0,
                1.0, 1.0, -1.0,
                -1.0, 1.0, -1.0,
                -1.0, -1.0, 1.0,
                -1.0, -1.0, -1.0,
                -1.0, 1.0, -1.0,
                -1.0, 1.0, -1.0,
                -1.0, 1.0, 1.0,
                -1.0, -1.0, 1.0,
                1.0, -1.0, -1.0,
                1.0, -1.0, 1.0,
                1.0, 1.0, 1.0,
                1.0, 1.0, 1.0,
                1.0, 1.0, -1.0,
                1.0, -1.0, -1.0,
                -1.0, -1.0, 1.0,
                -1.0, 1.0, 1.0,
                1.0, 1.0, 1.0,
                1.0, 1.0, 1.0,
                1.0, -1.0, 1.0,
                -1.0, -1.0, 1.0,
                -1.0, 1.0, -1.0,
                1.0, 1.0, -1.0,
                1.0, 1.0, 1.0,
                1.0, 1.0, 1.0,
                -1.0, 1.0, 1.0,
                -1.0, 1.0, -1.0,
                -1.0, -1.0, -1.0,
                -1.0, -1.0, 1.0,
                1.0, -1.0, -1.0,
                1.0, -1.0, -1.0,
                -1.0, -1.0, 1.0,
                1.0, -1.0, 1.0
            ]);
            this._VertexArray = new MB.VertexArray();
            this._VertexArray.bind();
            this._VertexBuffer = new MB.VertexBuffer(MB.ctes.BufferType.Array);
            this._VertexBuffer.bind();
            this._VertexBuffer.bufferData(skyboxVertices, MB.ctes.UsageType.StaticDraw);
            this._VertexBuffer.vertexAttribPointer(0, 3, gl.FLOAT, false, 0);
            this._loadCubemap(faces);
            this._VertexArray.unbind();
        }
        Object.defineProperty(Skybox.prototype, "texture", {
            get: function () {
                return this._cubeMapTexture;
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        Skybox.prototype.render = function (view, projection) {
            var gl = MB.Core.getInstance().getGL();
            var currDepthComp = MB.GlobalState.getCurrentDepthComparisonFunc();
            MB.GlobalState.setDepthComparisonFunc(MB.ctes.ComparisonFunc.LessEqual);
            this._prog.use();
            var auxView = view.toMat3().toMat4();
            this._prog.sendUniformMat4("view", auxView._value);
            this._prog.sendUniformMat4("projection", projection._value);
            this._cubeMapTexture.bind(0);
            this._VertexArray.bind();
            gl.drawArrays(gl.TRIANGLES, 0, 36);
            this._VertexArray.unbind();
            MB.GlobalState.setDepthComparisonFunc(currDepthComp);
        };
        Skybox.prototype.destroy = function () {
            this._cubeMapTexture.destroy();
        };
        Skybox.prototype._loadCubemap = function (faces) {
            this._cubeMapTexture = new MB.CubeMapTexture();
            this._cubeMapTexture.bind();
            for (var i = 0; i < 6; ++i) {
                var img = MB.ResourceMap.retrieveAsset(faces[i]);
                this._cubeMapTexture.addImage(i, img);
            }
            this._cubeMapTexture.finishTex();
            this._cubeMapTexture.unbind();
        };
        return Skybox;
    }());
    MB.Skybox = Skybox;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var SourceFrags;
    (function (SourceFrags) {
        function parse(str) {
            var regex = /#import +<([\w\d.]+)>/g;
            function replace(match, include) {
                var replace = SourceFrags[include];
                if (replace === undefined) {
                    throw new Error("Can not resolve #import <" + include + ">");
                }
                return parse(replace);
            }
            return str.replace(regex, replace);
        }
        SourceFrags.parse = parse;
    })(SourceFrags = MB.SourceFrags || (MB.SourceFrags = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Sprite = (function () {
        function Sprite() {
            this._geometry = new MB.VertexBufferGeometry();
            this._geometry.addAttr("position", new MB.BufferAttribute(new Float32Array([
                -0.5, -0.5, 0.0,
                0.5, -0.5, 0.0,
                0.5, 0.5, 0.0,
                -0.5, 0.5, 0.0
            ]), 3));
            this._geometry.addAttr("uv", new MB.BufferAttribute(new Float32Array([
                0, 0,
                1, 0,
                1, 1,
                0, 1
            ]), 2));
            this._geometry.setIndex(new Uint16Array([
                0, 1, 2,
                0, 2, 3
            ]));
        }
        Sprite.prototype.setPosition = function (pos) {
        };
        return Sprite;
    }());
    MB.Sprite = Sprite;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Timer;
    (function (Timer) {
        var _lastTime = Date.now();
        var _currentTime, _deltaTime;
        function update() {
            _currentTime = Date.now();
            _deltaTime = _currentTime - _lastTime;
            _lastTime = _currentTime;
        }
        Timer.update = update;
        ;
        function deltaTime() {
            return _deltaTime;
        }
        Timer.deltaTime = deltaTime;
        ;
    })(Timer = MB.Timer || (MB.Timer = {}));
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var BufferAttribute = (function () {
        function BufferAttribute(arr, size) {
            this._arr = arr;
            this._size = size;
        }
        Object.defineProperty(BufferAttribute.prototype, "array", {
            get: function () {
                return this._arr;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(BufferAttribute.prototype, "size", {
            get: function () {
                return this._size;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(BufferAttribute.prototype, "count", {
            get: function () {
                return this._arr.length / this._size;
            },
            enumerable: true,
            configurable: true
        });
        ;
        BufferAttribute.prototype.getX = function (index) {
            if (this.size < 1)
                throw new Error("X value is not defined");
            return this.array[index * this._size];
        };
        ;
        BufferAttribute.prototype.getY = function (index) {
            if (this.size < 2)
                throw new Error("Y value is not defined");
            return this.array[index * this._size + 1];
        };
        ;
        BufferAttribute.prototype.getZ = function (index) {
            if (this.size < 3)
                throw new Error("Z value is not defined");
            return this.array[index * this._size + 2];
        };
        ;
        BufferAttribute.prototype.getW = function (index) {
            if (this.size < 4)
                throw new Error("W value is not defined");
            return this.array[index * this._size + 3];
        };
        ;
        BufferAttribute.prototype.getXY = function (index) {
            if (this.size < 2)
                throw new Error("Y value is not defined");
            index *= this._size;
            return [
                this.array[index],
                this.array[index + 1]
            ];
        };
        ;
        BufferAttribute.prototype.getXYZ = function (index) {
            if (this.size < 3)
                throw new Error("Z value is not defined");
            index *= this._size;
            return [
                this.array[index],
                this.array[index + 1],
                this.array[index + 2]
            ];
        };
        ;
        BufferAttribute.prototype.getXYZW = function (index) {
            if (this.size < 3)
                throw new Error("Z value is not defined");
            index *= this._size;
            return [
                this.array[index],
                this.array[index + 1],
                this.array[index + 2],
                this.array[index + 3]
            ];
        };
        ;
        BufferAttribute.prototype.setX = function (index, value) {
            if (this.size < 1)
                throw new Error("X value is not defined");
            this.array[index * this._size] = value;
        };
        ;
        BufferAttribute.prototype.setY = function (index, value) {
            if (this.size < 2)
                throw new Error("Y value is not defined");
            this.array[index * this._size + 1] = value;
        };
        ;
        BufferAttribute.prototype.setZ = function (index, value) {
            if (this.size < 3)
                throw new Error("Z value is not defined");
            this.array[index * this._size + 2] = value;
        };
        ;
        BufferAttribute.prototype.setW = function (index, value) {
            if (this.size < 4)
                throw new Error("W value is not defined");
            this.array[index * this._size + 3] = value;
        };
        ;
        BufferAttribute.prototype.setXY = function (index, xValue, yValue) {
            if (this.size < 2)
                throw new Error("Y value is not defined");
            index *= this._size;
            this.array[index] = xValue;
            this.array[index + 1] = yValue;
        };
        ;
        BufferAttribute.prototype.setXYZ = function (index, xValue, yValue, zValue) {
            if (this.size < 3)
                throw new Error("Z value is not defined");
            this.array[index] = xValue;
            this.array[index + 1] = yValue;
            this.array[index + 2] = zValue;
        };
        ;
        BufferAttribute.prototype.setXYZW = function (index, xValue, yValue, zValue, wValue) {
            if (this.size < 4)
                throw new Error("W value is not defined");
            this.array[index] = xValue;
            this.array[index + 1] = yValue;
            this.array[index + 2] = zValue;
            this.array[index + 3] = wValue;
        };
        ;
        return BufferAttribute;
    }());
    MB.BufferAttribute = BufferAttribute;
    ;
    var InstancedBufferAttribute = (function (_super) {
        __extends(InstancedBufferAttribute, _super);
        function InstancedBufferAttribute(arr, size, meshPerAttr) {
            if (meshPerAttr === void 0) { meshPerAttr = 1; }
            _super.call(this, arr, size);
            this._meshPerAttr = meshPerAttr;
        }
        Object.defineProperty(InstancedBufferAttribute.prototype, "meshPerAttr", {
            get: function () { return this._meshPerAttr; },
            enumerable: true,
            configurable: true
        });
        ;
        return InstancedBufferAttribute;
    }(BufferAttribute));
    MB.InstancedBufferAttribute = InstancedBufferAttribute;
    ;
    var InstancedInterleavedBuffer = (function (_super) {
        __extends(InstancedInterleavedBuffer, _super);
        function InstancedInterleavedBuffer(arr, stride, meshPerAttr) {
            if (meshPerAttr === void 0) { meshPerAttr = 1; }
            _super.call(this, arr, stride);
            this._meshPerAttr = meshPerAttr;
        }
        Object.defineProperty(InstancedInterleavedBuffer.prototype, "meshPerAttr", {
            get: function () { return this._meshPerAttr; },
            enumerable: true,
            configurable: true
        });
        ;
        return InstancedInterleavedBuffer;
    }(BufferAttribute));
    MB.InstancedInterleavedBuffer = InstancedInterleavedBuffer;
    ;
    var VertexBufferGeometry = (function () {
        function VertexBufferGeometry() {
            this._indices = null;
            this._attrs = {};
        }
        VertexBufferGeometry.prototype.addAttr = function (type, attribute) {
            this._attrs[type] = attribute;
        };
        ;
        VertexBufferGeometry.prototype.getAttr = function (name) {
            return this._attrs[name];
        };
        ;
        VertexBufferGeometry.prototype.removeAttr = function (type) {
            delete this._attrs[type];
        };
        ;
        VertexBufferGeometry.prototype.setIndex = function (indices) {
            this._indices = indices;
        };
        ;
        Object.defineProperty(VertexBufferGeometry.prototype, "indices", {
            get: function () { return this._indices; },
            enumerable: true,
            configurable: true
        });
        ;
        VertexBufferGeometry.prototype.normalizeNormals = function () {
            if (this._attrs["normals"]) {
                var normals = this._attrs["normals"].array;
                var x = void 0, y = void 0, z = void 0, n = void 0;
                for (var i = 0; i < normals.length; i += 3) {
                    x = normals[i];
                    y = normals[i + 1];
                    z = normals[i + 2];
                    n = 1.0 / Math.sqrt(x * x + y * y + z * z);
                    normals[i] *= n;
                    normals[i + 1] *= n;
                    normals[i + 2] *= n;
                }
            }
        };
        ;
        VertexBufferGeometry.prototype.toNotIndexed = function () {
            if (!this._indices) {
                return;
            }
            var geom2 = new VertexBufferGeometry();
            for (var attrName in this._attrs) {
                var attribute = this._attrs[attrName];
                var itemSize = attribute.size;
                var arr = new Float32Array(this._indices.length * itemSize);
                var index = 0, index2 = 0;
                for (var i = 0, idxSize = this._indices.length; i < idxSize; ++i) {
                    index = this._indices[i] * itemSize;
                    for (var j = 0; j < itemSize; ++j) {
                        arr[index2++] = attribute[index++];
                    }
                }
                geom2.addAttr(attrName, new BufferAttribute(arr, itemSize));
            }
            return geom2;
        };
        ;
        VertexBufferGeometry.prototype.merge = function (geom2, offset) {
            if (offset === void 0) { offset = 0; }
            for (var name_1 in this._attrs) {
                if (!geom2._attrs[name_1])
                    continue;
                var attr1 = this._attrs[name_1];
                var attr2 = geom2._attrs[name_1];
                var attrSize = attr1.size;
                for (var i = 0, j = attrSize * offset; i < attr2.array.length; ++i, ++j) {
                    attr1.array[j] = attr2.array[i];
                }
            }
            return this;
        };
        ;
        VertexBufferGeometry.prototype.computingBoundingBox = function () {
            var box;
            if (!this._attrs["positions"]) {
                box = new MB.Box3D();
            }
            else {
                box = MB.Box3D.createFromArray(this._attrs["positions"].array);
            }
            return box;
        };
        return VertexBufferGeometry;
    }());
    MB.VertexBufferGeometry = VertexBufferGeometry;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Light = (function () {
        function Light() {
            this._intensity = 1.0;
            this._color = new MB.Color3(1.0, 1.0, 1.0);
            this._specColor = new MB.Color3(1.0, 1.0, 1.0);
            this._enable = true;
            this._attenuation = new MB.Vect3(1.0, 0.014, 0.0007);
        }
        Light.prototype.setConstantAtt = function (value) {
            this._attenuation.x = value;
        };
        Light.prototype.setLinearAtt = function (value) {
            this._attenuation.y = value;
        };
        Light.prototype.setQuadraticAtt = function (value) {
            this._attenuation.z = value;
        };
        Object.defineProperty(Light.prototype, "attenuation", {
            get: function () { return this._attenuation; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Light.prototype, "intensity", {
            get: function () { return this._intensity; },
            set: function (intensity) { this._intensity = intensity; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Light.prototype, "color", {
            get: function () { return this._color; },
            set: function (color) { this._color = color; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Light.prototype, "specularColor", {
            get: function () { return this._specColor; },
            set: function (color) { this._specColor = color; },
            enumerable: true,
            configurable: true
        });
        return Light;
    }());
    MB.Light = Light;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var AmbientLight = (function (_super) {
        __extends(AmbientLight, _super);
        function AmbientLight() {
            _super.call(this);
        }
        return AmbientLight;
    }(MB.Light));
    MB.AmbientLight = AmbientLight;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var DirectionalLight = (function (_super) {
        __extends(DirectionalLight, _super);
        function DirectionalLight(direction) {
            if (direction === void 0) { direction = new MB.Vect3(0.0, 0.0, 0.0); }
            _super.call(this);
            this._direction = direction;
        }
        Object.defineProperty(DirectionalLight.prototype, "direction", {
            get: function () { return this._direction; },
            set: function (direction) { this._direction = direction; },
            enumerable: true,
            configurable: true
        });
        return DirectionalLight;
    }(MB.Light));
    MB.DirectionalLight = DirectionalLight;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var HemisphericLight = (function (_super) {
        __extends(HemisphericLight, _super);
        function HemisphericLight(direction) {
            if (direction === void 0) { direction = new MB.Vect3(0.0, 0.0, 0.0); }
            _super.call(this);
            this._direction = direction;
            this._groundColor = new MB.Color3(0.0, 0.0, 0.0);
        }
        Object.defineProperty(HemisphericLight.prototype, "direction", {
            get: function () { return this._direction; },
            set: function (direction) { this._direction = direction; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HemisphericLight.prototype, "groundColor", {
            get: function () { return this._groundColor; },
            set: function (color) { this._groundColor = color; },
            enumerable: true,
            configurable: true
        });
        return HemisphericLight;
    }(MB.Light));
    MB.HemisphericLight = HemisphericLight;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var PointLight = (function (_super) {
        __extends(PointLight, _super);
        function PointLight(position) {
            if (position === void 0) { position = new MB.Vect3(0.0, 0.0, 0.0); }
            _super.call(this);
            this._position = position;
        }
        Object.defineProperty(PointLight.prototype, "position", {
            get: function () { return this._position; },
            set: function (position) { this._position = position; },
            enumerable: true,
            configurable: true
        });
        PointLight.prototype.addTransform = function (x, y, z) {
            if (x === void 0) { x = 0.0; }
            if (y === void 0) { y = 0.0; }
            if (z === void 0) { z = 0.0; }
            this._position.x += x;
            this._position.y += y;
            this._position.z += z;
        };
        return PointLight;
    }(MB.Light));
    MB.PointLight = PointLight;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var SpotLight = (function (_super) {
        __extends(SpotLight, _super);
        function SpotLight(position, direction, cuttoff) {
            if (position === void 0) { position = new MB.Vect3(0.0, 0.0, 0.0); }
            if (direction === void 0) { direction = new MB.Vect3(0.0, 0.0, 0.0); }
            if (cuttoff === void 0) { cuttoff = 1.0; }
            _super.call(this);
            this._direction = direction;
            this._position = position;
            this._cutOff = cuttoff;
        }
        Object.defineProperty(SpotLight.prototype, "cutoff", {
            get: function () { return this._cutOff; },
            set: function (v) { this._cutOff = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpotLight.prototype, "position", {
            get: function () { return this._position; },
            set: function (position) { this._position = position; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpotLight.prototype, "direction", {
            get: function () { return this._direction; },
            set: function (direction) { this._direction = direction; },
            enumerable: true,
            configurable: true
        });
        return SpotLight;
    }(MB.Light));
    MB.SpotLight = SpotLight;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Capsule = (function (_super) {
        __extends(Capsule, _super);
        function Capsule(radius, height, subHeight, numSegm) {
            if (radius === void 0) { radius = 0.5; }
            if (height === void 0) { height = radius * 2; }
            if (subHeight === void 0) { subHeight = 12; }
            if (numSegm === void 0) { numSegm = 12; }
            _super.call(this);
            var verts = [];
            var norms = [];
            var texCoords = [];
            var cells = [];
            function calcNewRing(segments, r, y, dy) {
                var segIncr = 1.0 / (segments - 1);
                for (var s = 0; s < segments; ++s) {
                    var val = (Math.PI * 2) * s * segIncr;
                    var x = Math.cos(val) * r;
                    var z = Math.sin(val) * r;
                    verts.push(radius * x, radius * y + height * dy, radius * z);
                    norms.push(x, y, z);
                    texCoords.push(1.0 - (s * segIncr), 0.5 - ((radius * y + height * dy) / (2.0 * radius + height)));
                }
            }
            var ringsBody = subHeight + 1;
            var ringsTotal = subHeight + ringsBody;
            var bodyIncr = 1.0 / (ringsBody - 1);
            var ringIncr = 1.0 / (subHeight - 1);
            for (var r = 0; r < subHeight / 2; ++r) {
                calcNewRing(numSegm, Math.sin(Math.PI * r * ringIncr), Math.sin(Math.PI * (r * ringIncr - 0.5)), -0.5);
            }
            for (var r = 0; r < ringsBody; ++r) {
                calcNewRing(numSegm, 1.0, 0.0, r * bodyIncr - 0.5);
            }
            for (var r = subHeight / 2; r < subHeight; ++r) {
                calcNewRing(numSegm, Math.sin(Math.PI * r * ringIncr), Math.sin(Math.PI * (r * ringIncr - 0.5)), +0.5);
            }
            for (var r = 0; r < ringsTotal - 1; ++r) {
                for (var s = 0; s < numSegm - 1; ++s) {
                    cells.push((r * numSegm + (s + 1)), (r * numSegm + (s + 0)), ((r + 1) * numSegm + (s + 1)));
                    cells.push(((r + 1) * numSegm + (s + 0)), ((r + 1) * numSegm + (s + 1)), (r * numSegm + s));
                }
            }
            this._handle = [];
            this._vao.bind();
            this.addElementArray(new Uint16Array(cells));
            this.addBufferArray(0, new Float32Array(verts), 3);
            this.addBufferArray(1, new Float32Array(norms), 3);
            this.addBufferArray(2, new Float32Array(texCoords), 2);
            this._indicesLen = cells.length;
        }
        return Capsule;
    }(MB.Drawable));
    MB.Capsule = Capsule;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Cube = (function (_super) {
        __extends(Cube, _super);
        function Cube(side) {
            if (side === void 0) { side = 1.0; }
            _super.call(this);
            var side2 = side / 2.0;
            this._geometry.addAttr("vertices", new MB.BufferAttribute(new Float32Array([
                -side2, -side2, side2,
                side2, -side2, side2,
                side2, side2, side2,
                -side2, side2, side2,
                side2, -side2, side2,
                side2, -side2, -side2,
                side2, side2, -side2,
                side2, side2, side2,
                -side2, -side2, -side2,
                -side2, side2, -side2,
                side2, side2, -side2,
                side2, -side2, -side2,
                -side2, -side2, side2,
                -side2, side2, side2,
                -side2, side2, -side2,
                -side2, -side2, -side2,
                -side2, -side2, side2,
                -side2, -side2, -side2,
                side2, -side2, -side2,
                side2, -side2, side2,
                -side2, side2, side2,
                side2, side2, side2,
                side2, side2, -side2,
                -side2, side2, -side2
            ]), 3));
            this._geometry.addAttr("normals", new MB.BufferAttribute(new Float32Array([
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0
            ]), 3));
            this._geometry.addAttr("texCoords", new MB.BufferAttribute(new Float32Array([
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0
            ]), 2));
            this._geometry.setIndex(new Uint16Array([
                0, 1, 2, 0, 2, 3,
                4, 5, 6, 4, 6, 7,
                8, 9, 10, 8, 10, 11,
                12, 13, 14, 12, 14, 15,
                16, 17, 18, 16, 18, 19,
                20, 21, 22, 20, 22, 23
            ]));
            this._handle = [];
            this._vao.bind();
            this.addElementArray(this._geometry.indices);
            this.addBufferArray(0, this._geometry.getAttr("vertices").array, 3);
            this.addBufferArray(1, this._geometry.getAttr("normals").array, 3);
            this.addBufferArray(2, this._geometry.getAttr("texCoords").array, 2);
            this._indicesLen = this._geometry.indices.length;
        }
        return Cube;
    }(MB.Drawable));
    MB.Cube = Cube;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Cuboctahedron = (function (_super) {
        __extends(Cuboctahedron, _super);
        function Cuboctahedron(radius, subdivisions) {
            if (radius === void 0) { radius = 1.0; }
            if (subdivisions === void 0) { subdivisions = 1; }
            subdivisions = Math.floor(subdivisions);
            if (subdivisions > 10) {
                MB.Log.warn("Please, don´t use more than 8 subdivisions");
                return;
            }
            var verts = [
                -radius, -radius, radius,
                radius, -radius, radius,
                radius, radius, radius,
                -radius, radius, radius,
                radius, -radius, radius,
                radius, -radius, -radius,
                radius, radius, -radius,
                radius, radius, radius,
                -radius, -radius, -radius,
                -radius, radius, -radius,
                radius, radius, -radius,
                radius, -radius, -radius,
                -radius, -radius, radius,
                -radius, radius, radius,
                -radius, radius, -radius,
                -radius, -radius, -radius,
                -radius, -radius, radius,
                -radius, -radius, -radius,
                radius, -radius, -radius,
                radius, -radius, radius,
                -radius, radius, radius,
                radius, radius, radius,
                radius, radius, -radius,
                -radius, radius, -radius
            ];
            var el = [
                0, 1, 2, 0, 2, 3,
                4, 5, 6, 4, 6, 7,
                8, 9, 10, 8, 10, 11,
                12, 13, 14, 12, 14, 15,
                16, 17, 18, 16, 18, 19,
                20, 21, 22, 20, 22, 23
            ];
            console.log(subdivisions);
            _super.call(this, verts, el, radius, subdivisions);
        }
        ;
        return Cuboctahedron;
    }(MB.Polyhedron));
    MB.Cuboctahedron = Cuboctahedron;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    ;
    var CustomModel = (function (_super) {
        __extends(CustomModel, _super);
        function CustomModel(model) {
            _super.call(this);
            this._handle = [];
            this._vao.bind();
            var i = 0;
            if (model.indices && model.indices.length) {
                this.addElementArray(new Uint16Array(model.indices));
            }
            else {
                throw new Error("Indices undefined");
            }
            if (model.vertices && model.vertices.length && model.vertices.length % 3 === 0) {
                this.addBufferArray(i++, new Float32Array(model.vertices), 3);
                console.log("vertices");
                console.log(model.vertices);
            }
            else {
                throw new Error("Vertices undefined");
            }
            if (model.regenerateNormals === false || !model.regenerateNormals) {
                if (model.normals && model.normals.length && model.normals.length % 3 === 0) {
                    this.addBufferArray(i++, new Float32Array(model.normals), 3);
                    console.log("normals");
                    console.log(model.normals);
                }
            }
            else if (model.regenerateNormals === true) {
                this.recalculateNormals();
            }
            if (model.texCoords && model.texCoords.length && model.texCoords.length % 2 === 0) {
                this.addBufferArray(i++, new Float32Array(model.texCoords), 2);
            }
            if (model.generateTangents === true) {
                this.addBufferArray(i++, new Float32Array([]), 3);
            }
            this._indicesLen = model.indices.length;
            this.vertices = model.vertices;
            this.faces = model.indices;
        }
        ;
        CustomModel.prototype.recalculateNormals = function () {
        };
        ;
        return CustomModel;
    }(MB.Drawable));
    MB.CustomModel = CustomModel;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Cylinder = (function (_super) {
        __extends(Cylinder, _super);
        function Cylinder(radius, height, radialSubDiv, heightSubDiv, createTopBase, createBottomBase) {
            if (radialSubDiv === void 0) { radialSubDiv = 15.0; }
            if (heightSubDiv === void 0) { heightSubDiv = 1.0; }
            if (createTopBase === void 0) { createTopBase = true; }
            if (createBottomBase === void 0) { createBottomBase = true; }
            if (radialSubDiv < 15) {
                throw Error("radialSubDiv must be 15 or greater");
            }
            _super.call(this, radius, radius, height, radialSubDiv, heightSubDiv, createTopBase, createBottomBase);
        }
        return Cylinder;
    }(MB.Cone));
    MB.Cylinder = Cylinder;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Disc = (function (_super) {
        __extends(Disc, _super);
        function Disc(radius, divisions, stacks, innerRadius, stackInc) {
            if (stacks === void 0) { stacks = 1.0; }
            if (innerRadius === void 0) { innerRadius = 0.0; }
            _super.call(this);
            if (divisions < 3) {
                throw Error("divisions must be 3 or greater");
            }
            divisions = Math["trunc"](divisions);
            stacks = Math["trunc"](stacks);
            var nv = 0;
            var verts = new Array(3 * nv);
            var norms = new Array(3 * nv);
            var tex = new Array(2 * nv);
            var el = new Array(3 * stacks * divisions * 2);
            var idx = 0;
            var radiusSpan = radius - innerRadius;
            var pointsPerStack = divisions + 1;
            var vv = 0;
            var nn = 0;
            var tt = 0;
            var ii = 0;
            for (var stack = 0; stack <= stacks; ++stack) {
                var stackRadius = innerRadius + radiusSpan * Math.pow(stack / stacks, stackInc);
                for (var i = 0; i <= divisions; ++i) {
                    var theta = 2.0 * Math.PI * i / divisions;
                    verts[vv++] = stackRadius * Math.cos(theta);
                    verts[vv++] = 0;
                    verts[vv++] = stackRadius * Math.sin(theta);
                    norms[nn++] = 0;
                    norms[nn++] = 1;
                    norms[nn++] = 0;
                    tex[tt++] = 1 - (i / divisions);
                    tex[tt++] = stack / stacks;
                    if (stack > 0 && i !== divisions) {
                        var a = idx + (i + 1);
                        var b = idx + i;
                        var c = idx + i - pointsPerStack;
                        var d = idx + (i + 1) - pointsPerStack;
                        el[ii++] = a;
                        el[ii++] = b;
                        el[ii++] = c;
                        el[ii++] = a;
                        el[ii++] = c;
                        el[ii++] = d;
                    }
                }
                idx += divisions + 1;
            }
            this._handle = [];
            this._vao.bind();
            this.addElementArray(new Uint16Array(el));
            this.addBufferArray(0, new Float32Array(verts), 3);
            this.addBufferArray(1, new Float32Array(norms), 3);
            this.addBufferArray(2, new Float32Array(tex), 2);
            this._indicesLen = el.length;
        }
        return Disc;
    }(MB.Drawable));
    MB.Disc = Disc;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Dodecahedron = (function (_super) {
        __extends(Dodecahedron, _super);
        function Dodecahedron(radius, subdivisions) {
            var t = (1 + Math.sqrt(5)) / 2;
            var r = 1 / t;
            var verts = [
                -1, -1, -1, -1, -1, 1,
                -1, 1, -1, -1, 1, 1,
                1, -1, -1, 1, -1, 1,
                1, 1, -1, 1, 1, 1,
                0, -r, -t, 0, -r, t,
                0, r, -t, 0, r, t,
                -r, -t, 0, -r, t, 0,
                r, -t, 0, r, t, 0,
                -t, 0, -r, t, 0, -r,
                -t, 0, r, t, 0, r
            ];
            var el = [
                3, 11, 7, 3, 7, 15, 3, 15, 13,
                7, 19, 17, 7, 17, 6, 7, 6, 15,
                17, 4, 8, 17, 8, 10, 17, 10, 6,
                8, 0, 16, 8, 16, 2, 8, 2, 10,
                0, 12, 1, 0, 1, 18, 0, 18, 16,
                6, 10, 2, 6, 2, 13, 6, 13, 15,
                2, 16, 18, 2, 18, 3, 2, 3, 13,
                18, 1, 9, 18, 9, 11, 18, 11, 3,
                4, 14, 12, 4, 12, 0, 4, 0, 8,
                11, 9, 5, 11, 5, 19, 11, 19, 7,
                19, 5, 14, 19, 14, 4, 19, 4, 17,
                1, 12, 14, 1, 14, 5, 1, 5, 9
            ];
            _super.call(this, verts, el, radius, subdivisions);
        }
        ;
        return Dodecahedron;
    }(MB.Polyhedron));
    MB.Dodecahedron = Dodecahedron;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Floor = (function (_super) {
        __extends(Floor, _super);
        function Floor(dim, e) {
            if (dim === void 0) { dim = 80; }
            if (e === void 0) { e = 2; }
            _super.call(this);
            var lines = 2 * dim / e;
            var inc = 2 * dim / lines;
            var verts = [];
            var el = [];
            for (var l = 0; l <= lines; ++l) {
                verts[6 * l] = -dim;
                verts[6 * l + 1] = 0;
                verts[6 * l + 2] = -dim + (l * inc);
                verts[6 * l + 3] = dim;
                verts[6 * l + 4] = 0;
                verts[6 * l + 5] = -dim + (l * inc);
                verts[6 * (lines + 1) + 6 * l] = -dim + (l * inc);
                verts[6 * (lines + 1) + 6 * l + 1] = 0;
                verts[6 * (lines + 1) + 6 * l + 2] = -dim;
                verts[6 * (lines + 1) + 6 * l + 3] = -dim + (l * inc);
                verts[6 * (lines + 1) + 6 * l + 4] = 0;
                verts[6 * (lines + 1) + 6 * l + 5] = dim;
                el[2 * l] = 2 * l;
                el[2 * l + 1] = 2 * l + 1;
                el[2 * (lines + 1) + 2 * l] = 2 * (lines + 1) + 2 * l;
                el[2 * (lines + 1) + 2 * l + 1] = 2 * (lines + 1) + 2 * l + 1;
            }
            this._handle = [];
            this._vao.bind();
            this.addElementArray(new Uint16Array(el));
            this.addBufferArray(0, new Float32Array(verts), 3);
            this._indicesLen = el.length;
        }
        ;
        return Floor;
    }(MB.Drawable));
    MB.Floor = Floor;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Icosahedron = (function (_super) {
        __extends(Icosahedron, _super);
        function Icosahedron(radius, subdivisions) {
            if (radius === void 0) { radius = 1.0; }
            if (subdivisions === void 0) { subdivisions = 1; }
            subdivisions = Math.floor(subdivisions);
            if (subdivisions > 10) {
                MB.Log.warn("Please, don´t use more than 8 subdivisions");
                return;
            }
            var t = (1 + Math.sqrt(5)) / 2;
            var verts = [
                -1, t, 0,
                1, t, 0,
                -1, -t, 0,
                1, -t, 0,
                0, -1, t,
                0, 1, t,
                0, -1, -t,
                0, 1, -t,
                t, 0, -1,
                t, 0, 1,
                -t, 0, -1,
                -t, 0, 1
            ];
            var el = [
                0, 11, 5,
                0, 5, 1,
                0, 1, 7,
                0, 7, 10,
                0, 10, 11,
                1, 5, 9,
                5, 11, 4,
                11, 10, 2,
                10, 7, 6,
                7, 1, 8,
                3, 9, 4,
                3, 4, 2,
                3, 2, 6,
                3, 6, 8,
                3, 8, 9,
                4, 9, 5,
                2, 4, 11,
                6, 2, 10,
                8, 6, 7,
                9, 8, 1
            ];
            console.log(subdivisions);
            _super.call(this, verts, el, radius, subdivisions);
        }
        ;
        return Icosahedron;
    }(MB.Polyhedron));
    MB.Icosahedron = Icosahedron;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Lathe = (function (_super) {
        __extends(Lathe, _super);
        function Lathe(points, segments, phiInit, phiRadius) {
            if (phiInit === void 0) { phiInit = 0; }
            if (phiRadius === void 0) { phiRadius = 2 * Math.PI; }
            _super.call(this);
            var vertices = [];
            var normals = [];
            var indices = [];
            segments = Math.floor(segments);
            var inverseSegments = 1.0 / segments;
            var UV = 0;
            var buffUV = new MB.BufferAttribute(new Float32Array((segments + 1) * points.length * 2), 2);
            var i, j, base, a, b, c, d, size;
            for (i = 0; i <= segments; ++i) {
                var phi = phiInit + i * inverseSegments * phiRadius;
                var sin = Math.sin(phi);
                var cos = Math.cos(phi);
                for (j = 0, size = points.length - 1; j <= size; ++j) {
                    vertices.push(new MB.Vect3(points[j].x * sin, points[j].y, points[j].x * cos));
                    buffUV.setXY(UV++, i / segments, j / (points.length - 1));
                }
            }
            for (i = 0; i < segments; ++i) {
                for (j = 0; j < (points.length - 1); ++j) {
                    base = j + i * points.length;
                    a = base;
                    b = base + points.length;
                    c = base + points.length + 1;
                    d = base + 1;
                    indices.push(new MB.Vect3(a, b, d));
                    indices.push(new MB.Vect3(b, c, d));
                }
            }
            for (i = 0; i < vertices.length; ++i) {
                normals.push(new MB.Vect3());
            }
            for (i = 0; i < indices.length; ++i) {
                var ia = vertices[indices[i].x];
                var ib = vertices[indices[i].y];
                var ic = vertices[indices[i].z];
                var e1 = MB.Vect3.sub(ia, ib);
                var e2 = MB.Vect3.sub(ic, ib);
                var no = MB.Vect3.cross(e1, e2);
                normals[indices[i].x] = normals[indices[i].x].add(no);
                normals[indices[i].y] = normals[indices[i].y].add(no);
                normals[indices[i].z] = normals[indices[i].z].add(no);
            }
            for (i = 0; i < normals.length; ++i) {
                normals[i] = normals[i].normalize();
            }
            var vertices2 = [];
            for (i = 0; i < vertices.length; ++i) {
                vertices2.push(vertices[i].x, vertices[i].y, vertices[i].z);
            }
            vertices = vertices2;
            var normals2 = [];
            for (i = 0; i < normals.length; ++i) {
                normals2.push(normals[i].x, normals[i].y, normals[i].z);
            }
            normals = normals2;
            var indices2 = [];
            for (i = 0; i < indices.length; ++i) {
                indices2.push(indices[i].x, indices[i].y, indices[i].z);
            }
            indices = indices2;
            if (phiRadius === Math.PI * 2) {
                var n1 = new MB.Vect3();
                var n2 = new MB.Vect3();
                var n = new MB.Vect3();
                base = segments * points.length * 3;
                for (i = 0, j = 0, size = points.length; i < size; ++i, j += 3) {
                    n1.x = normals[j];
                    n1.y = normals[j + 1];
                    n1.z = normals[j + 2];
                    n2.x = normals[base + j];
                    n2.y = normals[base + j + 1];
                    n2.z = normals[base + j + 2];
                    n = MB.Vect3.add(n, MB.Vect3.add(n1, n2)).normalize();
                    normals[j] = normals[base + j] = n.x;
                    normals[j + 1] = normals[base + j + 1] = n.y;
                    normals[j + 2] = normals[base + j + 2] = n.z;
                }
            }
            this._handle = [];
            this._vao.bind();
            this.addElementArray(new Uint16Array(indices));
            this.addBufferArray(0, new Float32Array(vertices), 3);
            this.addBufferArray(1, new Float32Array(normals), 3);
            this.addBufferArray(2, buffUV.array, 2);
            this._indicesLen = indices.length;
        }
        ;
        return Lathe;
    }(MB.Drawable));
    MB.Lathe = Lathe;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Mesh = (function (_super) {
        __extends(Mesh, _super);
        function Mesh(fileRoute) {
            _super.call(this);
            this.loadJSON(fileRoute);
        }
        Mesh.prototype.createVAO = function (model, el) {
            this._handle = [];
            this._vao.bind();
            if (model.meshes[0].vertices) {
                var verts = model.meshes[0].vertices;
                this.addBufferArray(0, new Float32Array(verts), 3);
            }
            if (model.meshes[0].normals) {
                var norms = model.meshes[0].normals;
                this.addBufferArray(1, new Float32Array(norms), 3);
            }
            if (model.meshes[0].texturecoords) {
                var tc = model.meshes[0].texturecoords[0];
                this.addBufferArray(2, new Float32Array(tc), 2);
            }
            this.addElementArray(new Uint16Array(el));
            this._vao.unbind();
            this._indicesLen = el.length;
        };
        Mesh.prototype.loadJSON = function (url) {
            var request = new XMLHttpRequest();
            request.open("GET", url, false);
            var self = this;
            request.onload = function () {
                if (request.status < 200 || request.status > 299) {
                    console.log("Error: HTTP Status " + request.status + " on resource " + url);
                    return {};
                }
                else {
                    var modelObj = JSON.parse(request.responseText);
                    self.createVAO(modelObj, [].concat.apply([], modelObj.meshes[0].faces));
                }
            };
            request.send();
        };
        return Mesh;
    }(MB.Drawable));
    MB.Mesh = Mesh;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Octahedron = (function (_super) {
        __extends(Octahedron, _super);
        function Octahedron(radius, subdivisions) {
            var a = 1 / (2 * Math.sqrt(2));
            var b = 1 / 2;
            var verts = [
                a, 0, 0,
                -a, 0, 0,
                0, b, 0,
                0, -b, 0,
                0, 0, a,
                0, 0, -a];
            var el = [
                0, 2, 4,
                0, 4, 3,
                0, 3, 5,
                0, 5, 2,
                1, 2, 5,
                1, 5, 3,
                1, 3, 4,
                1, 4, 2
            ];
            _super.call(this, verts, el, radius, subdivisions);
        }
        ;
        return Octahedron;
    }(MB.Polyhedron));
    MB.Octahedron = Octahedron;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var ParametricGeom = (function (_super) {
        __extends(ParametricGeom, _super);
        function ParametricGeom(func, slices, stacks) {
            var vertices = [];
            var normals = [];
            var indices = [];
            var uvs = [];
            _super.call(this);
            var evalVect3;
            var u, v;
            var count = slices + 1;
            for (var i = 0; i <= stacks; ++i) {
                v = i / stacks;
                for (var j = 0; j <= slices; ++j) {
                    u = j / slices;
                    evalVect3 = func(u, v);
                    vertices.push(new MB.Vect3(evalVect3.x, evalVect3.y, evalVect3.z));
                }
            }
            var pA, pB, pC, pD;
            var uva, uvb, uvc, uvd;
            for (var i = 0; i < stacks; ++i) {
                for (var j = 0; j < slices; ++j) {
                    pA = i * count + j;
                    pB = i * count + j + 1;
                    pC = (i + 1) * count + j + 1;
                    pD = (i + 1) * count + j;
                    uva = new Array([j / slices, i / stacks]);
                    uvb = new Array([(j + 1) / slices, i / stacks]);
                    uvc = new Array([(j + 1) / slices, (i + 1) / stacks]);
                    uvd = new Array([j / slices, (i + 1) / stacks]);
                    indices.push(new MB.Vect3(pA, pB, pD));
                    uvs.push(new MB.Vect2(uva[0], uva[1]));
                    uvs.push(new MB.Vect2(uvb[0], uvb[1]));
                    uvs.push(new MB.Vect2(uvd[0], uvd[1]));
                    indices.push(new MB.Vect3(pB, pC, pD));
                    uvs.push(new MB.Vect2(uvb[0], uvb[1]));
                    uvs.push(new MB.Vect2(uvc[0], uvc[1]));
                    uvs.push(new MB.Vect2(uvd[0], uvd[1]));
                }
            }
            for (var i = 0; i < vertices.length; ++i) {
                normals.push(new MB.Vect3());
            }
            for (var i = 0; i < indices.length; ++i) {
                var ia = vertices[indices[i].x];
                var ib = vertices[indices[i].y];
                var ic = vertices[indices[i].z];
                var e1 = MB.Vect3.sub(ia, ib);
                var e2 = MB.Vect3.sub(ic, ib);
                var no = MB.Vect3.cross(e1, e2);
                normals[indices[i].x] = normals[indices[i].x].add(no);
                normals[indices[i].y] = normals[indices[i].y].add(no);
                normals[indices[i].z] = normals[indices[i].z].add(no);
            }
            for (var i = 0; i < normals.length; ++i) {
                normals[i] = normals[i].normalize();
            }
            var vertices2 = [];
            for (var i = 0; i < vertices.length; ++i) {
                vertices2.push(vertices[i].x, vertices[i].y, vertices[i].z);
            }
            vertices = vertices2;
            var normals2 = [];
            for (var i = 0; i < normals.length; ++i) {
                normals2.push(normals[i].x, normals[i].y, normals[i].z);
            }
            normals = normals2;
            var indices2 = [];
            for (var i = 0; i < indices.length; ++i) {
                indices2.push(indices[i].x, indices[i].y, indices[i].z);
            }
            indices = indices2;
            var uvs2 = [];
            for (var i = 0; i < uvs.length; ++i) {
                uvs2.push(uvs[i].x, uvs[i].y);
            }
            uvs = uvs2;
            this._handle = [];
            this._vao.bind();
            this.addElementArray(new Uint16Array(indices));
            this.addBufferArray(0, new Float32Array(vertices), 3);
            this.addBufferArray(1, new Float32Array(normals), 3);
            this.addBufferArray(2, new Float32Array(uvs), 2);
            this._indicesLen = indices.length;
        }
        ;
        return ParametricGeom;
    }(MB.Drawable));
    MB.ParametricGeom = ParametricGeom;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Plane = (function (_super) {
        __extends(Plane, _super);
        function Plane(xsize, zsize, xdivs, zdivs, smax, tmax) {
            if (smax === void 0) { smax = 1.0; }
            if (tmax === void 0) { tmax = 1.0; }
            _super.call(this);
            var verts = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
            var norms = new Array(3.0 * (xdivs + 1.0) * (zdivs + 1.0));
            var tex = new Array(2.0 * (xdivs + 1.0) * (zdivs + 1.0));
            var el = new Array(6 * xdivs * zdivs);
            var x2 = xsize / 2.0;
            var z2 = zsize / 2.0;
            var iFactor = zsize / zdivs;
            var jFactor = xsize / xdivs;
            var texi = smax / zdivs;
            var texj = tmax / xdivs;
            var x, z;
            var vidx = 0, tidx = 0;
            for (var i = 0; i <= zdivs; ++i) {
                z = iFactor * i - z2;
                for (var j = 0; j <= xdivs; ++j) {
                    x = jFactor * j - x2;
                    verts[vidx] = x;
                    verts[vidx + 1] = 0.0;
                    verts[vidx + 2] = z;
                    norms[vidx] = 0.0;
                    norms[vidx + 1] = 1.0;
                    norms[vidx + 2] = 0.0;
                    vidx += 3;
                    tex[tidx] = j * texi;
                    tex[tidx + 1] = i * texj;
                    tidx += 2;
                }
            }
            var rowStart, nextRowStart;
            var idx = 0;
            for (var i = 0; i < zdivs; ++i) {
                rowStart = i * (xdivs + 1);
                nextRowStart = (i + 1) * (xdivs + 1);
                for (var j = 0; j < xdivs; ++j) {
                    el[idx] = rowStart + j;
                    el[idx + 1] = nextRowStart + j;
                    el[idx + 2] = nextRowStart + j + 1;
                    el[idx + 3] = rowStart + j;
                    el[idx + 4] = nextRowStart + j + 1;
                    el[idx + 5] = rowStart + j + 1;
                    idx += 6;
                }
            }
            this._handle = [];
            this._vao.bind();
            this.addElementArray(new Uint16Array(el));
            this.addBufferArray(0, new Float32Array(verts), 3);
            this.addBufferArray(1, new Float32Array(norms), 3);
            this.addBufferArray(2, new Float32Array(tex), 2);
            this._indicesLen = el.length;
        }
        ;
        return Plane;
    }(MB.Drawable));
    MB.Plane = Plane;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Prism = (function (_super) {
        __extends(Prism, _super);
        function Prism(radius, height, sides, heightSubDiv, topCap, bottomCap) {
            if (heightSubDiv === void 0) { heightSubDiv = 1.0; }
            if (topCap === void 0) { topCap = true; }
            if (bottomCap === void 0) { bottomCap = true; }
            _super.call(this, radius, radius, height, sides, heightSubDiv, topCap, bottomCap);
        }
        ;
        return Prism;
    }(MB.Cone));
    MB.Prism = Prism;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Sphere = (function (_super) {
        __extends(Sphere, _super);
        function Sphere(radius, slices, stacks) {
            _super.call(this);
            slices = Math["trunc"](slices);
            stacks = Math["trunc"](stacks);
            var nv = (slices + 1) * (stacks + 1);
            var elements = (slices * 2 * (stacks - 1)) * 3;
            var verts = new Array(3 * nv);
            var norms = new Array(3 * nv);
            var tex = new Array(2 * nv);
            var el = new Array(elements);
            var theta, phi;
            var thetaFac = Math.PI * 2.0 / slices;
            var phiFac = Math.PI / stacks;
            var nx, ny, nz, s, t;
            var idx = 0, tIdx = 0;
            for (var i = 0; i <= slices; ++i) {
                theta = i * thetaFac;
                s = i / slices;
                for (var j = 0; j <= stacks; ++j) {
                    phi = j * phiFac;
                    t = j / stacks;
                    nx = Math.sin(phi) * Math.cos(theta);
                    ny = Math.sin(phi) * Math.sin(theta);
                    nz = Math.cos(phi);
                    verts[idx] = radius * nx;
                    verts[idx + 1] = radius * ny;
                    verts[idx + 2] = radius * nz;
                    norms[idx] = nx;
                    norms[idx + 1] = ny;
                    norms[idx + 2] = nz;
                    idx += 3;
                    tex[tIdx] = s;
                    tex[tIdx + 1] = t;
                    tIdx += 2;
                }
            }
            idx = 0;
            for (var i = 0; i < slices; ++i) {
                var stackStart = i * (stacks + 1);
                var nextStackStart = (i + 1) * (stacks + 1);
                for (var j = 0; j < stacks; ++j) {
                    if (j === 0) {
                        el[idx] = stackStart;
                        el[idx + 1] = stackStart + 1;
                        el[idx + 2] = nextStackStart + 1;
                        idx += 3;
                    }
                    else if (j === stacks - 1) {
                        el[idx] = stackStart + j;
                        el[idx + 1] = stackStart + j + 1;
                        el[idx + 2] = nextStackStart + j;
                        idx += 3;
                    }
                    else {
                        el[idx] = stackStart + j;
                        el[idx + 1] = stackStart + j + 1;
                        el[idx + 2] = nextStackStart + j + 1;
                        el[idx + 3] = nextStackStart + j;
                        el[idx + 4] = stackStart + j;
                        el[idx + 5] = nextStackStart + j + 1;
                        idx += 6;
                    }
                }
            }
            this._handle = [];
            this._vao.bind();
            this.addElementArray(new Uint16Array(el));
            this.addBufferArray(0, new Float32Array(verts), 3);
            this.addBufferArray(1, new Float32Array(norms), 3);
            this.addBufferArray(2, new Float32Array(tex), 2);
            this._indicesLen = el.length;
        }
        ;
        return Sphere;
    }(MB.Drawable));
    MB.Sphere = Sphere;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Tetrahedron = (function (_super) {
        __extends(Tetrahedron, _super);
        function Tetrahedron(radius, subdivisions) {
            var verts = [
                1, 1, 1,
                -1, -1, 1,
                -1, 1, -1,
                1, -1, -1
            ];
            var el = [
                2, 1, 0,
                0, 3, 2,
                1, 3, 0,
                2, 3, 1
            ];
            _super.call(this, verts, el, radius, subdivisions);
        }
        ;
        return Tetrahedron;
    }(MB.Polyhedron));
    MB.Tetrahedron = Tetrahedron;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Torus = (function (_super) {
        __extends(Torus, _super);
        function Torus(outerRadius, innerRadius, sides, rings) {
            if (outerRadius === void 0) { outerRadius = 1.0; }
            if (innerRadius === void 0) { innerRadius = 0.5; }
            if (sides === void 0) { sides = 4; }
            if (rings === void 0) { rings = 10; }
            _super.call(this);
            var faces = sides * rings;
            var nVerts = sides * (rings + 1);
            var verts = new Array(3 * nVerts);
            var norms = new Array(3 * nVerts);
            var tex = new Array(2 * nVerts);
            var el = new Array(6 * faces);
            var ringFactor = (Math.PI * 2.0) / rings;
            var sideFactor = (Math.PI * 2.0) / sides;
            var idx = 0, tidx = 0;
            for (var ring = 0; ring <= rings; ring++) {
                var u = ring * ringFactor;
                var cu = Math.cos(u);
                var su = Math.sin(u);
                for (var side = 0; side < sides; side++) {
                    var v = side * sideFactor;
                    var cv = Math.cos(v);
                    var sv = Math.sin(v);
                    var r = (outerRadius + innerRadius * cv);
                    verts[idx] = r * cu;
                    verts[idx + 1] = r * su;
                    verts[idx + 2] = innerRadius * sv;
                    norms[idx] = cv * cu * r;
                    norms[idx + 1] = cv * su * r;
                    norms[idx + 2] = sv * r;
                    tex[tidx] = u / (Math.PI * 2.0);
                    tex[tidx + 1] = v / (Math.PI * 2.0);
                    tidx += 2;
                    var len = Math.sqrt(norms[idx] * norms[idx] +
                        norms[idx + 1] * norms[idx + 1] +
                        norms[idx + 2] * norms[idx + 2]);
                    norms[idx] /= len;
                    norms[idx + 1] /= len;
                    norms[idx + 2] /= len;
                    idx += 3;
                }
            }
            idx = 0;
            for (var ring = 0; ring < rings; ring++) {
                var ringStart = ring * sides;
                var nextRingStart = (ring + 1) * sides;
                for (var side = 0; side < sides; side++) {
                    var nextSide = (side + 1) % sides;
                    el[idx] = (ringStart + side);
                    el[idx + 1] = (nextRingStart + side);
                    el[idx + 2] = (nextRingStart + nextSide);
                    el[idx + 3] = ringStart + side;
                    el[idx + 4] = nextRingStart + nextSide;
                    el[idx + 5] = (ringStart + nextSide);
                    idx += 6;
                }
            }
            this._handle = [];
            this._vao.bind();
            this.addElementArray(new Uint16Array(el));
            this.addBufferArray(0, new Float32Array(verts), 3);
            this.addBufferArray(1, new Float32Array(norms), 3);
            this.addBufferArray(2, new Float32Array(tex), 2);
            this._indicesLen = el.length;
        }
        ;
        return Torus;
    }(MB.Drawable));
    MB.Torus = Torus;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Loaders;
    (function (Loaders) {
        function VertexBufferGeometryLoader(src) {
        }
        Loaders.VertexBufferGeometryLoader = VertexBufferGeometryLoader;
        ;
        function _getAlias(src, alias) {
            if (alias === void 0) { alias = ""; }
            return (alias.length < 1) ? src : alias;
        }
        Loaders._getAlias = _getAlias;
        ;
        function unloadVideo(videoSrc) {
            MB.ResourceMap.unloadAsset(videoSrc);
        }
        Loaders.unloadVideo = unloadVideo;
        ;
        function unloadImage(imageSrc) {
            MB.ResourceMap.unloadAsset(imageSrc);
        }
        Loaders.unloadImage = unloadImage;
        ;
        function unloadAudio(clipName) {
            MB.ResourceMap.unloadAsset(clipName);
        }
        Loaders.unloadAudio = unloadAudio;
        ;
        function RGBEParser(buffer) {
            var RGBE_RETURN_FAILURE = -1;
            var rgbe_read_error = 1;
            var rgbe_write_error = 2;
            var rgbe_format_error = 3;
            var rgbe_memory_error = 4;
            function rgbe_error(rgbe_error_code, msg) {
                if (msg === void 0) { msg = ""; }
                switch (rgbe_error_code) {
                    case rgbe_read_error:
                        console.error("RGBEParser Read Error: " + msg);
                        break;
                    case rgbe_write_error:
                        console.error("RGBEParser Write Error: " + msg);
                        break;
                    case rgbe_format_error:
                        console.error("RGBEParser Bad File Format: " + msg);
                        break;
                    default:
                    case rgbe_memory_error: console.error("RGBEParser: Error: " + msg);
                }
                return RGBE_RETURN_FAILURE;
            }
            ;
            var RGBE_VALID_PROGRAMTYPE = 1;
            var RGBE_VALID_FORMAT = 2;
            var RGBE_VALID_DIMENSIONS = 4;
            var NEWLINE = "\n";
            function _fgets(buffer, lineLimit, consume) {
                lineLimit = !lineLimit ? 1024 : lineLimit;
                var p = buffer.pos, i = -1, len = 0, s = "", chunkSize = 128, chunk = String.fromCharCode.apply(null, new Uint16Array(buffer.subarray(p, p + chunkSize)));
                while ((0 > (i = chunk.indexOf(NEWLINE))) && (len < lineLimit) && (p < buffer.byteLength)) {
                    s += chunk;
                    len += chunk.length;
                    p += chunkSize;
                    chunk += String.fromCharCode.apply(null, new Uint16Array(buffer.subarray(p, p + chunkSize)));
                }
                if (i > -1) {
                    if (false !== consume)
                        buffer.pos += len + i + 1;
                    return s + chunk.slice(0, i);
                }
                return false;
            }
            ;
            function RGBE_ReadHeader(buffer) {
                var line, match, magic_token_re = /^#\?(\S+)$/, gamma_re = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, exposure_re = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, format_re = /^\s*FORMAT=(\S+)\s*$/, dimensions_re = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, header = {
                    valid: 0,
                    string: "",
                    comments: "",
                    programtype: "RGBE",
                    format: "",
                    gamma: 1.0,
                    exposure: 1.0,
                    width: 0, height: 0
                };
                if (buffer["pos"] >= buffer.byteLength || !(line = _fgets(buffer))) {
                    return rgbe_error(rgbe_read_error, "no header found");
                }
                if (!(match = line.match(magic_token_re))) {
                    return rgbe_error(rgbe_format_error, "bad initial token");
                }
                header.valid |= RGBE_VALID_PROGRAMTYPE;
                header.programtype = match[1];
                header.string += line + "\n";
                while (true) {
                    line = _fgets(buffer);
                    if (false === line)
                        break;
                    header.string += line + "\n";
                    if ("#" === line.charAt(0)) {
                        header.comments += line + "\n";
                        continue;
                    }
                    if (match = line.match(gamma_re)) {
                        header.gamma = parseFloat(match[1]);
                    }
                    if (match = line.match(exposure_re)) {
                        header.exposure = parseFloat(match[1]);
                    }
                    if (match = line.match(format_re)) {
                        header.valid |= RGBE_VALID_FORMAT;
                        header.format = match[1];
                    }
                    if (match = line.match(dimensions_re)) {
                        header.valid |= RGBE_VALID_DIMENSIONS;
                        header.height = parseInt(match[1], 10);
                        header.width = parseInt(match[2], 10);
                    }
                    if ((header.valid & RGBE_VALID_FORMAT) && (header.valid & RGBE_VALID_DIMENSIONS))
                        break;
                }
                if (!(header.valid & RGBE_VALID_FORMAT)) {
                    return rgbe_error(rgbe_format_error, "missing format specifier");
                }
                if (!(header.valid & RGBE_VALID_DIMENSIONS)) {
                    return rgbe_error(rgbe_format_error, "missing image size specifier");
                }
                return header;
            }
            ;
            function RGBE_ReadPixels_RLE(buffer, w, h) {
                var data_rgba, offset, pos, count, byteValue, scanline_buffer, ptr, ptr_end, i, l, off, isEncodedRun, scanline_width = w, num_scanlines = h, rgbeStart;
                if (((scanline_width < 8) || (scanline_width > 0x7fff)) ||
                    ((2 !== buffer[0]) || (2 !== buffer[1]) || (buffer[2] & 0x80))) {
                    return new Uint8Array(buffer);
                }
                if (scanline_width !== ((buffer[2] << 8) | buffer[3])) {
                    rgbe_error(rgbe_format_error, "wrong scanline width");
                    throw new Error("ERROR");
                }
                data_rgba = new Uint8Array(4 * w * h);
                if (!data_rgba || !data_rgba.length) {
                    rgbe_error(rgbe_memory_error, "unable to allocate buffer space");
                    throw new Error("ERROR");
                }
                offset = 0;
                pos = 0;
                ptr_end = 4 * scanline_width;
                rgbeStart = new Uint8Array(4);
                scanline_buffer = new Uint8Array(ptr_end);
                while ((num_scanlines > 0) && (pos < buffer.byteLength)) {
                    if (pos + 4 > buffer.byteLength) {
                        rgbe_error(rgbe_read_error);
                        throw new Error("ERROR");
                    }
                    rgbeStart[0] = buffer[pos++];
                    rgbeStart[1] = buffer[pos++];
                    rgbeStart[2] = buffer[pos++];
                    rgbeStart[3] = buffer[pos++];
                    if ((2 !== rgbeStart[0]) || (2 !== rgbeStart[1]) ||
                        (((rgbeStart[2] << 8) | rgbeStart[3]) !== scanline_width)) {
                        rgbe_error(rgbe_format_error, "bad rgbe scanline format");
                        throw new Error("ERROR");
                    }
                    ptr = 0;
                    while ((ptr < ptr_end) && (pos < buffer.byteLength)) {
                        count = buffer[pos++];
                        isEncodedRun = count > 128;
                        if (isEncodedRun)
                            count -= 128;
                        if ((0 === count) || (ptr + count > ptr_end)) {
                            rgbe_error(rgbe_format_error, "bad scanline data");
                            throw new Error("ERROR");
                        }
                        if (isEncodedRun) {
                            byteValue = buffer[pos++];
                            for (i = 0; i < count; ++i) {
                                scanline_buffer[ptr++] = byteValue;
                            }
                        }
                        else {
                            scanline_buffer.set(buffer.subarray(pos, pos + count), ptr);
                            ptr += count;
                            pos += count;
                        }
                    }
                    l = scanline_width;
                    for (i = 0; i < l; ++i) {
                        off = 0;
                        data_rgba[offset] = scanline_buffer[i + off];
                        off += scanline_width;
                        data_rgba[offset + 1] = scanline_buffer[i + off];
                        off += scanline_width;
                        data_rgba[offset + 2] = scanline_buffer[i + off];
                        off += scanline_width;
                        data_rgba[offset + 3] = scanline_buffer[i + off];
                        offset += 4;
                    }
                    num_scanlines--;
                }
                return data_rgba;
            }
            ;
            var byteArray = new Uint8Array(buffer);
            byteArray["pos"] = 0;
            var rgbe_header_info = RGBE_ReadHeader(byteArray);
            console.log(rgbe_header_info);
            if (RGBE_RETURN_FAILURE !== rgbe_header_info) {
                var w = rgbe_header_info.width, h = rgbe_header_info.height, image_rgba_data = RGBE_ReadPixels_RLE(byteArray.subarray(byteArray["pos"]), w, h);
                return {
                    width: w, height: h,
                    data: image_rgba_data,
                    header: rgbe_header_info.string,
                    gamma: rgbe_header_info.gamma,
                    exposure: rgbe_header_info.exposure
                };
            }
            return null;
        }
        ;
        function loadHDRImage(imageSrc, alias) {
            if (alias === void 0) { alias = ""; }
            alias = _getAlias(imageSrc, alias);
            if (!MB.ResourceMap.isAssetLoaded(alias)) {
                MB.ResourceMap.asyncLoadRequested(alias);
                var request_1 = new XMLHttpRequest();
                request_1.open("GET", imageSrc, true);
                request_1.responseType = "arraybuffer";
                request_1.onload = function () {
                    var texData = RGBEParser(request_1.response);
                    MB.ResourceMap.asyncLoadCompleted(alias, texData);
                }.bind(this);
                request_1.send();
            }
            else {
                MB.ResourceMap.incAssetRefCount(alias);
            }
        }
        Loaders.loadHDRImage = loadHDRImage;
        function unloadHDRImage(imageSrc) {
            MB.ResourceMap.unloadAsset(imageSrc);
        }
        Loaders.unloadHDRImage = unloadHDRImage;
        ;
    })(Loaders = MB.Loaders || (MB.Loaders = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var ObjLoader;
    (function (ObjLoader) {
        function loadFile(filename) {
            var req = new XMLHttpRequest();
            req.open("GET", filename, false);
            if (req.overrideMimeType) {
                req.overrideMimeType("text/plain");
            }
            try {
                req.send(null);
            }
            catch (e) {
                console.log("Error reading file " + filename);
            }
            return req.responseText;
        }
        function splitLineToFloats(line) {
            var values = new Array();
            var split = line.split(" ");
            split.forEach(function (value) {
                if (!isNaN(value)) {
                    values.push(parseFloat(value));
                }
            });
            return values;
        }
        function splitFace(line) {
            var values = [];
            var split = line.split(" ");
            for (var i = 0; i < split.length; ++i) {
                var splitFace_1 = split[i].split("/");
                splitFace_1.forEach(function (value) {
                    if (!isNaN(value)) {
                        values.push(value);
                    }
                });
            }
            return values;
        }
        function loadObj(filename) {
            var verts = [], normals = [], textures = [], idxCache = {}, idx = 0;
            var model = {
                vertices: [],
                normals: [],
                indices: [],
                texCoords: []
            };
            var lines = loadFile(filename).split("\n");
            lines.forEach(function (line) {
                var elems = line.split(/\s+/);
                elems.shift();
                var type = line.substr(0, 2).trim();
                if (type === "v") {
                    var values = splitLineToFloats(line);
                    verts.push(values[0], values[1], values[2]);
                }
                else if (type === "vn") {
                    var values = splitLineToFloats(line);
                    normals.push(values[0], values[1], values[2]);
                }
                else if (type === "vt") {
                    var values = splitLineToFloats(line);
                    textures.push(values[0], values[1]);
                }
                else if (type === "f") {
                    var quad = false;
                    for (var j = 0, size = elems.length; j < size; ++j) {
                        if (j === 3 && !quad) {
                            j = 2;
                            quad = true;
                        }
                        if (elems[j] in idxCache) {
                            model.indices.push(idxCache[elems[j]]);
                        }
                        else {
                            var vertex = splitFace(elems[j]);
                            var v = (vertex[0] - 1) * 3;
                            model.vertices.push(verts[v]);
                            model.vertices.push(verts[v + 1]);
                            model.vertices.push(verts[v + 2]);
                            if (textures.length) {
                                var tc = (vertex[1] - 1) * 2;
                                model.texCoords.push(textures[tc]);
                                model.texCoords.push(textures[tc + 1]);
                            }
                            var n = (vertex[2] - 1) * 3;
                            model.normals.push(normals[n]);
                            model.normals.push(normals[n + 1]);
                            model.normals.push(normals[n + 2]);
                            idxCache[elems[j]] = idx;
                            model.indices.push(idx);
                            ++idx;
                        }
                        if (j === 3 && quad) {
                            model.indices.push(idxCache[elems[0]]);
                        }
                    }
                }
            });
            return {
                vertices: model.vertices,
                normals: model.normals,
                texCoords: model.texCoords,
                indices: model.indices,
            };
        }
        ObjLoader.loadObj = loadObj;
    })(ObjLoader = MB.ObjLoader || (MB.ObjLoader = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    ;
    ;
    var ProgramManager = (function () {
        function ProgramManager() {
        }
        ProgramManager.get = function (name) {
            var prog = this._progDictionary[name];
            if (!prog) {
                throw new Error("MB.Program " + name + " undefined");
            }
            return prog;
        };
        ProgramManager.getCB = function (name, cb) {
            var prog = this.get(name);
            if (!prog) {
                throw new Error("MB.Program " + name + " undefined");
            }
            cb(prog);
        };
        ProgramManager.addWithFun = function (name, fn) {
            this.add(name, fn());
        };
        ProgramManager.add = function (name, prog) {
            if (!prog) {
                throw new Error("MB.Program " + name + " undefined");
            }
            this._progDictionary[name] = prog;
        };
        ProgramManager.destroy = function () {
            for (var key in this._progDictionary) {
                this._progDictionary[key].destroy();
            }
            this._progDictionary = {};
        };
        ProgramManager._progDictionary = {};
        return ProgramManager;
    }());
    MB.ProgramManager = ProgramManager;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var ResourceMap;
    (function (ResourceMap) {
        var MapEntry = (function () {
            function MapEntry(resName) {
                this._asset = resName;
                this._refCount = 1;
            }
            ;
            MapEntry.prototype.getAsset = function () {
                return this._asset;
            };
            ;
            MapEntry.prototype.setAsset = function (name) {
                this._asset = name;
            };
            ;
            MapEntry.prototype.count = function () {
                return this._refCount;
            };
            ;
            MapEntry.prototype.incCount = function () {
                this._refCount++;
            };
            ;
            MapEntry.prototype.decCount = function () {
                this._refCount--;
            };
            ;
            return MapEntry;
        }());
        ResourceMap.MapEntry = MapEntry;
        ;
        var _numOutstandingLoads = 0;
        var _loadCompleteCallback = null;
        ResourceMap._ResourceMap = {};
        function asyncLoadRequested(resName) {
            ResourceMap._ResourceMap[resName] = new MapEntry(resName);
            ++_numOutstandingLoads;
        }
        ResourceMap.asyncLoadRequested = asyncLoadRequested;
        ;
        function asyncLoadFailed(resName) {
            VanillaToasts.create({
                title: resName + " completed",
                text: "",
                type: "error",
                timeout: 2500
            });
            --_numOutstandingLoads;
            _checkForAllLoadCompleted();
        }
        ResourceMap.asyncLoadFailed = asyncLoadFailed;
        function asyncLoadCompleted(resName, loadedAsset) {
            if (!isAssetLoaded(resName)) {
                VanillaToasts.create({
                    title: "asyncLoadCompleted: [" + resName + "] not in map!",
                    text: "",
                    type: "error",
                    timeout: 2500
                });
            }
            VanillaToasts.create({
                title: resName + " completed",
                text: "",
                type: "success",
                timeout: 1500
            });
            ResourceMap._ResourceMap[resName].setAsset(loadedAsset);
            --_numOutstandingLoads;
            _checkForAllLoadCompleted();
        }
        ResourceMap.asyncLoadCompleted = asyncLoadCompleted;
        ;
        function _checkForAllLoadCompleted() {
            if ((_numOutstandingLoads === 0) && (_loadCompleteCallback !== null)) {
                var funToCall = _loadCompleteCallback;
                _loadCompleteCallback = null;
                funToCall();
            }
        }
        ;
        function setLoadCompleteCallback(fn) {
            _loadCompleteCallback = fn;
            _checkForAllLoadCompleted();
        }
        ResourceMap.setLoadCompleteCallback = setLoadCompleteCallback;
        ;
        function retrieveAsset(resName) {
            var r = null;
            if (resName in ResourceMap._ResourceMap) {
                r = ResourceMap._ResourceMap[resName].getAsset();
            }
            else {
                alert("retrieveAsset: [" + resName + "] not in map!");
            }
            return r;
        }
        ResourceMap.retrieveAsset = retrieveAsset;
        ;
        function isAssetLoaded(resName) {
            return (resName in ResourceMap._ResourceMap);
        }
        ResourceMap.isAssetLoaded = isAssetLoaded;
        ;
        function incAssetRefCount(resName) {
            ResourceMap._ResourceMap[resName].incCount();
        }
        ResourceMap.incAssetRefCount = incAssetRefCount;
        ;
        function unloadAsset(resName) {
            var c = 0;
            if (resName in ResourceMap._ResourceMap) {
                ResourceMap._ResourceMap[resName].decCount();
                c = ResourceMap._ResourceMap[resName].count();
                if (c === 0) {
                    delete ResourceMap._ResourceMap[resName];
                }
            }
            return c;
        }
        ResourceMap.unloadAsset = unloadAsset;
        ;
    })(ResourceMap = MB.ResourceMap || (MB.ResourceMap = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Loaders;
    (function (Loaders) {
        function loadAudio(clipName, alias) {
            if (alias === void 0) { alias = ""; }
            alias = Loaders._getAlias(clipName, alias);
            if (!(MB.ResourceMap.isAssetLoaded(alias))) {
                MB.ResourceMap.asyncLoadRequested(alias);
                var request_1 = new XMLHttpRequest();
                request_1.open("GET", clipName, true);
                request_1.responseType = "arraybuffer";
                request_1.onload = function () {
                    this._audioContext.decodeAudioData(request_1.response, function (buffer) {
                        MB.ResourceMap.asyncLoadCompleted(alias, buffer);
                    });
                }.bind(this);
                request_1.send();
            }
        }
        Loaders.loadAudio = loadAudio;
        ;
    })(Loaders = MB.Loaders || (MB.Loaders = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Loaders;
    (function (Loaders) {
        function loadCubeMap(directorySrc) {
            [
                "/back.jpg", "/bottom.jpg", "/front.jpg",
                "/left.jpg", "/right.jpg", "/top.jpg"
            ].map(function (imageSrc) {
                Loaders.loadImage(directorySrc + imageSrc, "");
            });
        }
        Loaders.loadCubeMap = loadCubeMap;
        ;
    })(Loaders = MB.Loaders || (MB.Loaders = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Loaders;
    (function (Loaders) {
        function loadFont(fontSrc, alias) {
            if (alias === void 0) { alias = ""; }
            alias = Loaders._getAlias(fontSrc, alias);
            if (!(MB.ResourceMap.isAssetLoaded(alias))) {
                MB.ResourceMap.asyncLoadRequested(alias);
                var request_1 = new XMLHttpRequest();
                request_1.open("GET", fontSrc, true);
                request_1.responseType = "arraybuffer";
                request_1.onload = function () {
                    MB.ResourceMap.asyncLoadCompleted(alias, JSON.parse(request_1.response));
                }.bind(this);
                request_1.send();
            }
        }
        Loaders.loadFont = loadFont;
        ;
        function unloadFont(fontSrc) {
            MB.ResourceMap.unloadAsset(fontSrc);
        }
        Loaders.unloadFont = unloadFont;
        ;
    })(Loaders = MB.Loaders || (MB.Loaders = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Loaders;
    (function (Loaders) {
        function loadImage(imageSrc, alias) {
            if (alias === void 0) { alias = ""; }
            alias = Loaders._getAlias(imageSrc, alias);
            if (!MB.ResourceMap.isAssetLoaded(alias)) {
                var img_1 = new Image();
                MB.ResourceMap.asyncLoadRequested(alias);
                img_1.onload = function () {
                    MB.ResourceMap.asyncLoadCompleted(alias, img_1);
                };
                img_1.onerror = function (err) {
                    MB.ResourceMap.asyncLoadFailed(alias);
                };
                img_1.src = imageSrc;
            }
            else {
                MB.ResourceMap.incAssetRefCount(alias);
            }
        }
        Loaders.loadImage = loadImage;
        ;
    })(Loaders = MB.Loaders || (MB.Loaders = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Loaders;
    (function (Loaders) {
        function loadVideo(videoSrc, alias) {
            if (alias === void 0) { alias = ""; }
            alias = Loaders._getAlias(videoSrc, alias);
            if (!MB.ResourceMap.isAssetLoaded(alias)) {
                MB.ResourceMap.asyncLoadRequested(alias);
                var video_1 = document.createElement(alias);
                video_1.src = videoSrc;
                video_1.addEventListener("loadeddata", function () {
                    MB.ResourceMap.asyncLoadCompleted(alias, video_1);
                }, false);
            }
        }
        Loaders.loadVideo = loadVideo;
        ;
    })(Loaders = MB.Loaders || (MB.Loaders = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Loaders;
    (function (Loaders) {
        function loadWebCam() {
            var alias = "webcam";
            if (!MB.ResourceMap.isAssetLoaded(alias)) {
                MB.ResourceMap.asyncLoadRequested(alias);
                var video_1 = document.createElement("video");
                video_1.autoplay = true;
                video_1.muted = true;
                video_1.loop = true;
                if (navigator["webkitGetUserMedia"]) {
                    navigator["webkitGetUserMedia"]({ video: true }, function (stream) {
                        video_1.src = URL.createObjectURL(stream);
                        video_1.addEventListener("loadeddata", function () {
                            MB.ResourceMap.asyncLoadCompleted(alias, video_1);
                        }, false);
                    }.bind(this), function (err) {
                        alert("You got no WebRTC webcam ...");
                    });
                }
                else if (navigator["mozGetUserMedia"]) {
                    navigator["mozGetUserMedia"]({ video: true }, function (stream) {
                        video_1.src = URL.createObjectURL(stream);
                        video_1.addEventListener("loadeddata", function () {
                            MB.ResourceMap.asyncLoadCompleted(alias, video_1);
                        }, false);
                    }.bind(this), function (error) {
                        alert("You got no WebRTC webcam ...");
                    });
                }
                else {
                    console.assert(false);
                }
            }
        }
        Loaders.loadWebCam = loadWebCam;
        ;
    })(Loaders = MB.Loaders || (MB.Loaders = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Loaders;
    (function (Loaders) {
        function xhrLoader(url, sync, responseType, onLoad, onError) {
            if (sync === void 0) { sync = true; }
            if (responseType === void 0) { responseType = "arraybuffer"; }
            if (onError === void 0) { onError = function () { }; }
            var request = new XMLHttpRequest();
            request.open("GET", url, sync);
            request.responseType = responseType;
            request.onload = onLoad;
            request.onerror = onError;
            request.send();
        }
        Loaders.xhrLoader = xhrLoader;
        ;
    })(Loaders = MB.Loaders || (MB.Loaders = {}));
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    ;
    var Texture = (function () {
        function Texture(target) {
            this._anisotropy_ = 1;
            this._internalformat_ = MB.ctes.TextureFormat.RGBA;
            this._format_ = MB.ctes.TextureFormat.RGBA;
            this._wrapS_ = MB.ctes.WrapMode.Clamp2Edge;
            this._wrapT_ = MB.ctes.WrapMode.Clamp2Edge;
            this._wrapR_ = MB.ctes.WrapMode.Clamp2Edge;
            this._minFilter_ = MB.ctes.TextureType.Linear;
            this._magFilter_ = MB.ctes.TextureType.Linear;
            this._flipY_ = true;
            this._generateMipMaps_ = false;
            this._premultiplyAlpha_ = false;
            this._unpackAlignment_ = 4;
            this._level_ = 0;
            this._compressed_ = false;
            this._target_ = target;
        }
        Texture.prototype.minFilter = function (filter) {
            this.bind();
            var gl = MB.Core.getInstance().getGL();
            gl.texParameteri(this._target_, gl.TEXTURE_MIN_FILTER, filter);
            this._minFilter_ = filter;
        };
        ;
        Texture.prototype.magFilter = function (filter) {
            this.bind();
            var gl = MB.Core.getInstance().getGL();
            gl.texParameteri(this._target_, gl.TEXTURE_MAG_FILTER, filter);
            this._magFilter_ = filter;
        };
        ;
        Texture.prototype.wrap = function (modes) {
            if (modes.length < 2) {
                throw new Error("Must specify wrapS, wrapT modes");
            }
            var gl = MB.Core.getInstance().getGL();
            this.bind();
            gl.texParameteri(this._target_, gl.TEXTURE_WRAP_S, modes[0]);
            gl.texParameteri(this._target_, gl.TEXTURE_WRAP_T, modes[1]);
            if (modes.length > 2) {
                gl.texParameteri(this._target_, gl.TEXTURE_WRAP_R, modes[2]);
                this._wrapR_ = modes[2];
            }
            this._wrapS_ = modes[0];
            this._wrapT_ = modes[1];
        };
        Texture.prototype.generateMipMap = function () {
            var gl = MB.Core.getInstance().getGL();
            this.bind();
            this._generateMipMaps_ = true;
            gl.generateMipmap(this._target_);
        };
        Texture.prototype.setAnisotropic = function (level) {
            if (level === void 0) { level = 0; }
            var gl = MB.Core.getInstance().getGL();
            level = Math.floor(level);
            var max_anisotropy = MB.Capabilities.getMaxAnisotropy();
            if (max_anisotropy < level) {
                this._anisotropy_ = level;
                gl.texParameterf(this._target_, 0x84FE, level);
            }
        };
        ;
        Texture.prototype.bind = function (slot) {
            var gl = MB.Core.getInstance().getGL();
            if (typeof slot === "number") {
                gl.activeTexture(gl.TEXTURE0 + slot);
            }
            gl.bindTexture(this._target_, this._handle_);
        };
        Texture.prototype.unbind = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.bindTexture(this._target_, null);
        };
        Texture.prototype.destroy = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.deleteTexture(this._handle_);
            this._handle_ = null;
        };
        Texture.prototype.preventNPOT = function () {
        };
        Object.defineProperty(Texture.prototype, "target", {
            get: function () { return this._target_; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "handler", {
            get: function () {
                return this._handle_;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Texture.prototype.resize = function (size) {
        };
        Texture.prototype.setLOD = function (minLOD, maxLOD) {
            var gl = MB.Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                this._minLOD_ = minLOD;
                this._maxLOD_ = maxLOD;
                gl.texParameterf(this._target_, gl.TEXTURE_MIN_LOD, this._minLOD_);
                gl.texParameterf(this._target_, gl.TEXTURE_MAX_LOD, this._maxLOD_);
            }
            else {
                console.log("TEXTURE LOD isn´t supported");
            }
        };
        Texture.prototype.getWidth = function () { return -1; };
        Texture.prototype.getHeight = function () { return -1; };
        Texture.prototype.getDepth = function () { return -1; };
        return Texture;
    }());
    MB.Texture = Texture;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var CanvasTexture = (function (_super) {
        __extends(CanvasTexture, _super);
        function CanvasTexture(domCanvas, options, onSuccess) {
            if (options === void 0) { options = {}; }
            if (onSuccess === void 0) { onSuccess = null; }
            _super.call(this, MB.ctes.TextureTarget.Texture2D);
            var gl = MB.Core.getInstance().getGL();
            this._handle_ = gl.createTexture();
            this._flipY_ = options.flipY === true;
            this._domCanvas = domCanvas;
            this._internalformat_ = options.internalFormat || MB.ctes.TextureFormat.RGBA;
            this._format_ = options.format || gl.RGBA;
            this._type_ = options.type || gl.UNSIGNED_BYTE;
            this._level_ = options.level || 0;
            this._compressed_ = Boolean(options.compressed || false);
            this.bind();
            gl.texImage2D(this._target_, this._level_, this._internalformat_, this._format_, this._type_, this._domCanvas);
            this.minFilter(options.minFilter || MB.ctes.TextureType.Nearest);
            this.magFilter(options.minFilter || MB.ctes.TextureType.Nearest);
            this.wrap([
                options.wrapS || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapT || MB.ctes.WrapMode.Clamp2Edge
            ]);
            if (this._flipY_) {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY_ === true ? 1 : 0);
            }
            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            if (onSuccess) {
                onSuccess();
            }
        }
        ;
        CanvasTexture.prototype.update = function () {
            this.bind();
            var gl = MB.Core.getInstance().getGL();
            gl.texImage2D(this._target_, this._level_, this._internalformat_, this._format_, this._type_, this._domCanvas);
            this.unbind();
        };
        ;
        return CanvasTexture;
    }(MB.Texture));
    MB.CanvasTexture = CanvasTexture;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var CubeMapTexture = (function (_super) {
        __extends(CubeMapTexture, _super);
        function CubeMapTexture(options) {
            if (options === void 0) { options = {}; }
            var gl = MB.Core.getInstance().getGL();
            _super.call(this, MB.ctes.TextureTarget.TextureCubeMap);
            this.finished = false;
            this._handle_ = gl.createTexture();
        }
        CubeMapTexture.prototype.addImage = function (i, data) {
            var gl = MB.Core.getInstance().getGL();
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, data);
        };
        CubeMapTexture.prototype.finishTex = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.texParameteri(this._target_, gl.TEXTURE_MAG_FILTER, MB.ctes.TextureType.Linear);
            gl.texParameteri(this._target_, gl.TEXTURE_MIN_FILTER, MB.ctes.TextureType.Linear);
            gl.texParameteri(this._target_, gl.TEXTURE_WRAP_S, MB.ctes.WrapMode.Clamp2Edge);
            gl.texParameteri(this._target_, gl.TEXTURE_WRAP_T, MB.ctes.WrapMode.Clamp2Edge);
            if (gl.TEXTURE_WRAP_R) {
                gl.texParameteri(this._target_, gl.TEXTURE_WRAP_R, MB.ctes.WrapMode.Clamp2Edge);
            }
            this.finished = true;
        };
        return CubeMapTexture;
    }(MB.Texture));
    MB.CubeMapTexture = CubeMapTexture;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var DepthTexture = (function (_super) {
        __extends(DepthTexture, _super);
        function DepthTexture(onSuccess) {
            if (onSuccess === void 0) { onSuccess = null; }
            _super.call(this, MB.ctes.TextureTarget.Texture2D);
            var gl = MB.Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                this._internalformat_ = gl.DEPTH_COMPONENT32F;
            }
            else {
                this._internalformat_ = gl.DEPTH_COMPONENT16;
            }
        }
        ;
        return DepthTexture;
    }(MB.Texture));
    MB.DepthTexture = DepthTexture;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var RenderBufferMultisampleTexture = (function () {
        function RenderBufferMultisampleTexture(size, format, attachment, samples) {
            if (samples === void 0) { samples = 4; }
            var gl = MB.Core.getInstance().getGL();
            this._handle = gl.createRenderbuffer();
            this._size = size;
            this._format = format;
            this._samples = samples;
            gl.bindRenderbuffer(gl.RENDERBUFFER, this._handle);
            gl.renderbufferStorageMultisample(gl.RENDERBUFFER, samples, this._format, size.x, size.y);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, this._handle);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        }
        ;
        RenderBufferMultisampleTexture.prototype.bind = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this._handle);
        };
        ;
        RenderBufferMultisampleTexture.prototype.unbind = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        };
        RenderBufferMultisampleTexture.prototype.destroy = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.deleteTexture(this._handle);
        };
        ;
        RenderBufferMultisampleTexture.prototype.resize = function (size) {
            if (!size.exactEquals(this._size)) {
                var gl = MB.Core.getInstance().getGL();
                gl.bindRenderbuffer(gl.RENDERBUFFER, this._handle);
                gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this._format, size.x, size.y, this._samples);
            }
        };
        return RenderBufferMultisampleTexture;
    }());
    MB.RenderBufferMultisampleTexture = RenderBufferMultisampleTexture;
    ;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var RenderBufferTexture = (function () {
        function RenderBufferTexture(size, format, attachment) {
            var gl = MB.Core.getInstance().getGL();
            this._handle = gl.createRenderbuffer();
            this._size = size;
            this._format = format;
            gl.bindRenderbuffer(gl.RENDERBUFFER, this._handle);
            gl.renderbufferStorage(gl.RENDERBUFFER, this._format, size.x, size.y);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, this._handle);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        }
        ;
        RenderBufferTexture.prototype.bind = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this._handle);
        };
        ;
        RenderBufferTexture.prototype.unbind = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        };
        RenderBufferTexture.prototype.destroy = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.deleteTexture(this._handle);
        };
        ;
        RenderBufferTexture.prototype.resize = function (size) {
            if (!size.exactEquals(this._size)) {
                var gl = MB.Core.getInstance().getGL();
                gl.bindRenderbuffer(gl.RENDERBUFFER, this._handle);
                gl.renderbufferStorage(gl.RENDERBUFFER, this._format, size.x, size.y);
            }
        };
        return RenderBufferTexture;
    }());
    MB.RenderBufferTexture = RenderBufferTexture;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var SimpleTexture2D = (function (_super) {
        __extends(SimpleTexture2D, _super);
        function SimpleTexture2D(size, options, onSuccess) {
            if (options === void 0) { options = {}; }
            if (onSuccess === void 0) { onSuccess = null; }
            _super.call(this, MB.ctes.TextureTarget.Texture2D);
            this._size = size;
            var gl = MB.Core.getInstance().getGL();
            this._handle_ = gl.createTexture();
            this._flipY_ = options.flipY === true;
            this._internalformat_ = options.internalFormat || MB.ctes.TextureFormat.RGBA;
            this._format_ = options.format || gl.RGBA;
            this._type_ = options.type || gl.UNSIGNED_BYTE;
            this._level_ = options.level || 0;
            this._compressed_ = Boolean(options.compressed || false);
            this._offsets_ = options.offsets;
            this.bind();
            if (this._offsets_ && this._offsets_.length === 2) {
                if (this._compressed_) {
                    gl.compressedTexSubImage2D(this._target_, this._level_, this._offsets_[0], this._offsets_[1], this.getWidth(), this.getHeight(), this._format_, null);
                }
                else {
                    gl.texSubImage2D(this._target_, this._level_, this._offsets_[0], this._offsets_[1], this.getWidth(), this.getHeight(), this._format_, this._type_, null);
                }
            }
            else {
                if (this._compressed_) {
                    gl.compressedTexImage2D(this._target_, this._level_, this._format_, this.getWidth(), this.getHeight(), 0, null);
                }
                else {
                    gl.texImage2D(this._target_, this._level_, this._internalformat_, this.getWidth(), this.getHeight(), 0, this._format_, this._type_, null);
                }
            }
            this.minFilter(options.minFilter || MB.ctes.TextureType.Nearest);
            this.magFilter(options.minFilter || MB.ctes.TextureType.Nearest);
            this.wrap([
                options.wrapS || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapT || MB.ctes.WrapMode.Clamp2Edge
            ]);
            if (this._flipY_) {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY_ === true ? 1 : 0);
            }
            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            if (onSuccess) {
                onSuccess();
            }
        }
        SimpleTexture2D.prototype.getWidth = function () {
            return this._size.x;
        };
        SimpleTexture2D.prototype.getHeight = function () {
            return this._size.y;
        };
        SimpleTexture2D.prototype.setInmutable = function (size) {
            if (size === void 0) { size = this._size; }
            this.bind();
            var gl = MB.Core.getInstance().getGL();
            gl.texStorage2D(this.target, 1, gl.RGB8, size.x, size.y);
            this.unbind();
        };
        SimpleTexture2D.prototype.resize = function (size) {
            if (!size.exactEquals(this._size)) {
                var gl = MB.Core.getInstance().getGL();
                gl.bindTexture(this.target, this._handle_);
                gl.texImage2D(this._target_, this._level_, this._internalformat_, size.x, size.y, 0, this._format_, this._type_, null);
            }
        };
        return SimpleTexture2D;
    }(MB.Texture));
    MB.SimpleTexture2D = SimpleTexture2D;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var SimpleTexture3D = (function (_super) {
        __extends(SimpleTexture3D, _super);
        function SimpleTexture3D(data, size, options, onSuccess) {
            if (options === void 0) { options = {}; }
            if (onSuccess === void 0) { onSuccess = null; }
            var gl = MB.Core.getInstance().getGL();
            if (!(gl instanceof WebGL2RenderingContext)) {
                throw new Error("Must provide a WebGL2 context ...");
            }
            _super.call(this, MB.ctes.TextureTarget.Texture3D);
            this._flipY_ = Boolean(options.flipY || false);
            this._handle_ = gl.createTexture();
            this._internalformat_ = options.internalFormat || MB.ctes.TextureFormat.RGBA;
            this._format_ = options.format || MB.ctes.TextureFormat.RGBA;
            this._type_ = options.type || gl.UNSIGNED_BYTE;
            this._level_ = options.level || 0;
            this._compressed_ = Boolean(options.compressed || false);
            this._offsets_ = options.offsets;
            this.bind();
            if (this._offsets_ && this._offsets_.length === 3) {
                if (this._compressed_) {
                    gl.compressedTexSubImage3D(this._target_, this._level_, this._offsets_[0], this._offsets_[1], this._offsets_[2], size.x, size.y, size.z, this._format_, data);
                }
                else {
                    gl.texSubImage3D(this._target_, this._level_, this._offsets_[0], this._offsets_[1], this._offsets_[2], size.x, size.y, size.z, this._format_, this._type_, data);
                }
            }
            else {
                if (this._compressed_) {
                    gl.compressedTexImage3D(this._target_, this._level_, this._format_, size.x, size.y, size.z, 0, data);
                }
                else {
                    gl.texImage3D(this._target_, this._level_, this._internalformat_, size.x, size.y, size.z, 0, this._format_, this._type_, data);
                }
            }
            this.minFilter(options.minFilter || MB.ctes.TextureType.Nearest);
            this.magFilter(options.minFilter || MB.ctes.TextureType.Nearest);
            this.wrap([
                options.wrapS || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapT || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapR || MB.ctes.WrapMode.Clamp2Edge
            ]);
            if (this._flipY_) {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY_ === true ? 1 : 0);
            }
            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            if (onSuccess) {
                onSuccess();
            }
        }
        ;
        return SimpleTexture3D;
    }(MB.Texture));
    MB.SimpleTexture3D = SimpleTexture3D;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Texture2D = (function (_super) {
        __extends(Texture2D, _super);
        function Texture2D(data, options, onSuccess) {
            if (options === void 0) { options = {}; }
            if (onSuccess === void 0) { onSuccess = null; }
            _super.call(this, MB.ctes.TextureTarget.Texture2D);
            var gl = MB.Core.getInstance().getGL();
            this._flipY_ = Boolean(options.flipY || false);
            this._handle_ = gl.createTexture();
            this._internalformat_ = options.internalFormat || MB.ctes.TextureFormat.RGBA;
            this._format_ = options.format || MB.ctes.TextureFormat.RGBA;
            this._type_ = options.type || gl.UNSIGNED_BYTE;
            this._level_ = options.level || 0;
            this.bind();
            gl.texImage2D(this._target_, this._level_, this._internalformat_, this._format_, this._type_, data);
            this.minFilter(options.minFilter || MB.ctes.TextureType.Nearest);
            this.magFilter(options.minFilter || MB.ctes.TextureType.Nearest);
            this.wrap([
                options.wrapS || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapT || MB.ctes.WrapMode.Clamp2Edge
            ]);
            if (this._flipY_) {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY_ === true ? 1 : 0);
            }
            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            if (onSuccess) {
                onSuccess();
            }
        }
        return Texture2D;
    }(MB.Texture));
    MB.Texture2D = Texture2D;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Texture2DArray = (function (_super) {
        __extends(Texture2DArray, _super);
        function Texture2DArray(images, options, onSuccess) {
            var _this = this;
            if (options === void 0) { options = {}; }
            if (onSuccess === void 0) { onSuccess = null; }
            var gl = MB.Core.getInstance().getGL();
            if (!(gl instanceof WebGL2RenderingContext)) {
                throw new Error("Must provide a WebGL2 context ...");
            }
            _super.call(this, MB.ctes.TextureTarget.Texture2DArray);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._layer_ = 0;
            this._flipY_ = Boolean(options.flipY || false);
            this._handle_ = gl.createTexture();
            this._internalformat_ = options.internalFormat || MB.ctes.TextureFormat.RGBA;
            this._format_ = options.format || MB.ctes.TextureFormat.RGBA;
            this._type_ = options.type || gl.UNSIGNED_BYTE;
            this._level_ = options.level || 0;
            this._compressed_ = Boolean(options.compressed || false);
            this.bind();
            gl.texParameteri(this._target_, gl.TEXTURE_BASE_LEVEL, 0);
            gl.texParameteri(this._target_, gl.TEXTURE_MAX_LEVEL, 0);
            this._numTex_ = images.length;
            gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, gl.RGB8, this._numTex_, this._numTex_, 16, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
            images.forEach(function (image, i) {
                gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0, 0, 0, i, _this._numTex_, _this._numTex_, 1, gl.RGB, gl.UNSIGNED_BYTE, image);
            });
            this.minFilter(options.minFilter || MB.ctes.TextureType.Nearest);
            this.magFilter(options.minFilter || MB.ctes.TextureType.Nearest);
            this.wrap([
                options.wrapS || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapT || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapR || MB.ctes.WrapMode.Clamp2Edge
            ]);
            if (this._flipY_) {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY_ === true ? 1 : 0);
            }
            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
            if (onSuccess) {
                onSuccess();
            }
        }
        ;
        Object.defineProperty(Texture2DArray.prototype, "layer", {
            get: function () { return this._layer_; },
            set: function (layer) {
                this._layer_ = layer;
                if (this._numTex_ >= this._layer_) {
                    this._layer_ = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        Texture2DArray.prototype.incLayer = function () {
            this._layer_++;
            if (this._numTex_ <= this._layer_) {
                this._layer_ = 0;
            }
        };
        return Texture2DArray;
    }(MB.Texture));
    MB.Texture2DArray = Texture2DArray;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var Texture3D = (function (_super) {
        __extends(Texture3D, _super);
        function Texture3D(data, size, options, onSuccess) {
            if (options === void 0) { options = {}; }
            if (onSuccess === void 0) { onSuccess = null; }
            var gl = MB.Core.getInstance().getGL();
            if (!(gl instanceof WebGL2RenderingContext)) {
                throw new Error("Must provide a WebGL2 context ...");
            }
            _super.call(this, MB.ctes.TextureTarget.Texture3D);
            this._flipY_ = Boolean(options.flipY || false);
            this._handle_ = gl.createTexture();
            this._internalformat_ = options.internalFormat || MB.ctes.TextureFormat.RGBA;
            this._format_ = options.format || MB.ctes.TextureFormat.RGBA;
            this._type_ = options.type || gl.UNSIGNED_BYTE;
            this._level_ = options.level || 0;
            this._compressed_ = Boolean(options.compressed || false);
            this.bind();
            if (this._compressed_) {
                gl.compressedTexImage3D(this._target_, this._level_, this._format_, size.x, size.y, size.z, 0, data);
            }
            else {
                gl.texImage3D(this._target_, this._level_, this._internalformat_, size.x, size.y, size.z, 0, this._format_, this._type_, data);
            }
            this.minFilter(options.minFilter || MB.ctes.TextureType.Nearest);
            this.magFilter(options.minFilter || MB.ctes.TextureType.Nearest);
            this.wrap([
                options.wrapS || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapT || MB.ctes.WrapMode.Clamp2Edge,
                options.wrapR || MB.ctes.WrapMode.Clamp2Edge
            ]);
            if (this._flipY_) {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY_ === true ? 1 : 0);
            }
            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            if (onSuccess) {
                onSuccess();
            }
        }
        ;
        return Texture3D;
    }(MB.Texture));
    MB.Texture3D = Texture3D;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var VideoTexture = (function (_super) {
        __extends(VideoTexture, _super);
        function VideoTexture(video, loop, frameTime, onSuccess) {
            if (loop === void 0) { loop = true; }
            if (frameTime === void 0) { frameTime = 15; }
            if (onSuccess === void 0) { onSuccess = null; }
            _super.call(this, MB.ctes.TextureTarget.Texture2D);
            var gl = MB.Core.getInstance().getGL();
            this._video = video;
            this._video.muted = true;
            this._video.loop = loop;
            this._flipY_ = Boolean(true);
            this._handle_ = gl.createTexture();
            this._internalformat_ = MB.ctes.TextureFormat.RGBA;
            this._format_ = MB.ctes.TextureFormat.RGBA;
            this._type_ = gl.UNSIGNED_BYTE;
            this._level_ = 0;
            this.bind();
            this.update();
            this.minFilter(MB.ctes.TextureType.LinearMMNearest);
            this.magFilter(MB.ctes.TextureType.Linear);
            if (this._flipY_) {
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY_ === true ? 1 : 0);
            }
            this.unbind();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
            if (onSuccess) {
                onSuccess();
            }
            this._video.play();
            setInterval(function () {
                this.update();
            }.bind(this), frameTime);
        }
        ;
        VideoTexture.prototype.update = function () {
            if (this._video.readyState !== this._video.HAVE_ENOUGH_DATA)
                return;
            this.bind();
            var gl = MB.Core.getInstance().getGL();
            gl.texImage2D(this._target_, this._level_, this._internalformat_, this._format_, this._type_, this._video);
            gl.generateMipmap(gl.TEXTURE_2D);
            this.unbind();
        };
        ;
        VideoTexture.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._video.pause();
        };
        return VideoTexture;
    }(MB.Texture));
    MB.VideoTexture = VideoTexture;
    ;
})(MB || (MB = {}));
;

"use strict";






var MB;
(function (MB) {
    var WebcamTexture = (function (_super) {
        __extends(WebcamTexture, _super);
        function WebcamTexture(size, onSuccess) {
            if (size === void 0) { size = MB.Vect2.createFromScalar(320); }
            if (onSuccess === void 0) { onSuccess = null; }
            _super.call(this, MB.ResourceMap.retrieveAsset("webcam"));
            this._video.width = size.x;
            this._video.height = size.y;
        }
        ;
        return WebcamTexture;
    }(MB.VideoTexture));
    ;
})(MB || (MB = {}));
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vbmtleUJydXNoLnRzIiwicG9seWZpbGxzLnRzIiwib3RoZXJzL0V4Y2VwdGlvbnMudHMiLCJtYXRocy9Cb3gyRC50cyIsIm1hdGhzL0JveDNELnRzIiwibWF0aHMvQ3VydmVzLnRzIiwibWF0aHMvTWF0Mi50cyIsIm1hdGhzL01hdDMudHMiLCJtYXRocy9NYXQ0LnRzIiwibWF0aHMvTWF0aGYudHMiLCJtYXRocy9QYXRoLnRzIiwibWF0aHMvUXVhdC50cyIsIm1hdGhzL1NwbGluZS50cyIsIm1hdGhzL1ZlY3QyLnRzIiwibWF0aHMvVmVjdDMudHMiLCJtYXRocy9WZWN0NC50cyIsIm1hdGhzL1ZlY3RvcjIudHMiLCJtYXRocy9WZWN0b3IzLnRzIiwibWF0aHMvVmVjdG9yNC50cyIsIkNhbWVyYTIudHMiLCJEZWNvcmF0b3JzLnRzIiwiU2NlbmUudHMiLCJBcHAudHMiLCJtb2RlbHMvRHJhd2FibGUudHMiLCJtb2RlbHMvUG9seWhlZHJvbi50cyIsIm1vZGVscy9Db25lLnRzIiwiY29uc3RhbnRzL0NvbnN0YW50cy50cyIsImNvcmUvQ29udGV4dC50cyIsImNvcmUvQ29yZS50cyIsImNvcmUvRE9NRWxlbWVudC50cyIsImNvcmUvRnJhbWVidWZmZXIudHMiLCJjb3JlL0dsb2JhbFN0YXRlLnRzIiwiY29yZS9JbnB1dC50cyIsImNvcmUvTG9nLnRzIiwiY29yZS9Qcm9ncmFtLnRzIiwiY29yZS9RdWVyeS50cyIsImNvcmUvU2FtcGxlci50cyIsImNvcmUvU3luYy50cyIsImNvcmUvVHJhbnNmb3JtRmVlZGJhY2sudHMiLCJjb3JlL1V0aWxzLnRzIiwiY29yZS9WZXJ0ZXhBcnJheS50cyIsImNvcmUvVmVydGV4QnVmZmVyLnRzIiwiY29yZS9WZXJ0ZXhVQk8udHMiLCJleHRyYXMvQXhpcy50cyIsImV4dHJhcy9CaWxsYm9hcmQudHMiLCJleHRyYXMvQ2FwYWJpbGl0aWVzLnRzIiwiZXh0cmFzL0Nsb2NrLnRzIiwiZXh0cmFzL0NvbG9yMy50cyIsImV4dHJhcy9Db2xvcjQudHMiLCJleHRyYXMvRWFzaW5nLnRzIiwiZXh0cmFzL0VuY29kaW5ncy50cyIsImV4dHJhcy9FeHRlbnNpb25zLnRzIiwiZXh0cmFzL0dCdWZmZXIudHMiLCJleHRyYXMvR2VvbWV0cnkudHMiLCJleHRyYXMvTm9pc2UudHMiLCJleHRyYXMvUGluZ1BvbmcudHMiLCJleHRyYXMvUG9pbnRDbG91ZC50cyIsImV4dHJhcy9Qb3N0UHJvY2Vzcy50cyIsImV4dHJhcy9SYW5kb21HZW5lcmF0b3IudHMiLCJleHRyYXMvUmF5LnRzIiwiZXh0cmFzL1NreWJveC50cyIsImV4dHJhcy9Tb3VyY2VGcmFncy50cyIsImV4dHJhcy9TcHJpdGUudHMiLCJleHRyYXMvVGltZXIudHMiLCJleHRyYXMvVmVydGV4QnVmZmVyR2VvbWV0cnkudHMiLCJsaWdodHMvTGlnaHQudHMiLCJsaWdodHMvQW1iaWVudExpZ2h0LnRzIiwibGlnaHRzL0RpcmVjdGlvbmFsTGlnaHQudHMiLCJsaWdodHMvSGVtaXNwaGVyaWNMaWdodC50cyIsImxpZ2h0cy9Qb2ludExpZ2h0LnRzIiwibGlnaHRzL1Nwb3RMaWdodC50cyIsIm1vZGVscy9DYXBzdWxlLnRzIiwibW9kZWxzL0N1YmUudHMiLCJtb2RlbHMvQ3Vib2N0YWhlZHJvbi50cyIsIm1vZGVscy9DdXN0b21Nb2RlbC50cyIsIm1vZGVscy9DeWxpbmRlci50cyIsIm1vZGVscy9EaXNjLnRzIiwibW9kZWxzL0RvZGVjYWhlZHJvbi50cyIsIm1vZGVscy9GbG9vci50cyIsIm1vZGVscy9JY29zYWhlZHJvbi50cyIsIm1vZGVscy9MYXRoZS50cyIsIm1vZGVscy9NZXNoLnRzIiwibW9kZWxzL09jdGFoZWRyb24udHMiLCJtb2RlbHMvUGFyYW1ldHJpY0dlb20udHMiLCJtb2RlbHMvUGxhbmUudHMiLCJtb2RlbHMvUHJpc20udHMiLCJtb2RlbHMvU3BoZXJlLnRzIiwibW9kZWxzL1RldHJhaGVkcm9uLnRzIiwibW9kZWxzL1RvcnVzLnRzIiwicmVzb3VyY2VzL0xvYWRlcnMudHMiLCJyZXNvdXJjZXMvT2JqTG9hZGVyLnRzIiwicmVzb3VyY2VzL1Byb2dyYW1NYW5hZ2VyLnRzIiwicmVzb3VyY2VzL1Jlc291cmNlTWFwLnRzIiwicmVzb3VyY2VzL2xvYWRlcnMvTG9hZEF1ZGlvLnRzIiwicmVzb3VyY2VzL2xvYWRlcnMvTG9hZEN1YmVNYXAudHMiLCJyZXNvdXJjZXMvbG9hZGVycy9Mb2FkRm9udC50cyIsInJlc291cmNlcy9sb2FkZXJzL0xvYWRJbWFnZS50cyIsInJlc291cmNlcy9sb2FkZXJzL0xvYWRWaWRlby50cyIsInJlc291cmNlcy9sb2FkZXJzL0xvYWRXZWJDYW0udHMiLCJyZXNvdXJjZXMvbG9hZGVycy9YSFJMb2FkZXIudHMiLCJ0ZXh0dXJlcy9UZXh0dXJlLnRzIiwidGV4dHVyZXMvQ2FudmFzVGV4dHVyZS50cyIsInRleHR1cmVzL0N1YmVtYXBUZXh0dXJlLnRzIiwidGV4dHVyZXMvRGVwdGhUZXh0dXJlLnRzIiwidGV4dHVyZXMvUmVuZGVyQnVmZmVyTXVsdGlzYW1wbGVUZXh0dXJlLnRzIiwidGV4dHVyZXMvUmVuZGVyQnVmZmVyVGV4dHVyZS50cyIsInRleHR1cmVzL1NpbXBsZVRleHR1cmUyRC50cyIsInRleHR1cmVzL1NpbXBsZVRleHR1cmUzRC50cyIsInRleHR1cmVzL1RleHR1cmUyRC50cyIsInRleHR1cmVzL1RleHR1cmUyREFycmF5LnRzIiwidGV4dHVyZXMvVGV4dHVyZTNELnRzIiwidGV4dHVyZXMvVmlkZW9UZXh0dXJlLnRzIiwidGV4dHVyZXMvV2ViY2FtVGV4dHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtQkEsWUFBWSxDQUFDO0FBRWIsSUFBVSxFQUFFLENBRVg7QUFGRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ0csVUFBTyxHQUFXLE9BQU8sQ0FBQztBQUMzQyxDQUFDLEVBRlMsRUFBRSxLQUFGLEVBQUUsUUFFWDtBQUFBLENBQUM7O0FDSkYsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFNB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WUFDUixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUN0QixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDcEIsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ3BCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXpCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDOztRQUNELHVCQUFRLEdBQVI7WUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLENB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QUFDOztRQUNELG1CQUFJLEdBQUosVUFBSyxDQUFPO1lBQ1IsSUFDSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDaEUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ2hFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXJFLElBQ0ksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ2hFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUNoRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVyRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUVuRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUVuRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUVuRCxNQUFNLENBQUMsSUFBSSxDQUFD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Q0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFdEUsSUFDSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUN6RSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUN6RSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFD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LENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ3RGLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUN4RixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFHL0YsSUFBSSxFQUFFLEdBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUUzRCxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUUzRCxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDekUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztnQkFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUU1RCxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztnQkFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUU1RCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUMsQ0FBQztZQTVLRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNULElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ25DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUM7b0JBQzNCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ1YsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDVixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUNWLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsQ0FBQztRQUNMLENBQUM7O1FBTU0sb0JBQUssR0FBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQztnQkFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUNsRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzthQUNyRSxDQUFDLENBQUM7UUFDUCxDQUFDOztRQU1hLFdBQU0sR0FBcEIsVUFBcUIsTUFBeUI7WUFDMUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVCLENBQUM7O1FBTU0sd0JBQVMsR0FBaEIsVUFBaUIsSUFBaUI7WUFBakIsb0JBQWlCLEdBQWpCLFdBQWlCO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDaEUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQzFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTFCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBRXRCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQzs7UUFPTSxzQkFBTyxHQUFkLFVBQWUsSUFBaUI7WUFBakIsb0JBQWlCLEdBQWpCLFdBQWlCO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFFdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDekYsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ3pGLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUMxRixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFFOUYsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDM0IsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDM0IsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDM0IsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDM0IsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDM0IsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDM0IsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDM0IsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDM0IsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDM0IsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDM0IsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDM0IsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFHM0IsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBRTVFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDUCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFDRCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUVoQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFFNUQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDOztRQUNNLDBCQUFXLEdBQWxCO1lBQ0ksSUFDSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDdEYsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ3RGLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUN4RixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUUvRixJQUNJLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQzdCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQzdCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQzdCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQzdCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQzdCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQzdCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQzdCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQzdCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQzdCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQzdCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQzdCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFHbEMsTUFBTSxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsS0FB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QyxHQUFHLENBQUMsQ0FBQyxFQUN0QyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDUCxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQ2xCLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFDbEIsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUNsQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFDYixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFDYixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUVsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUFDLENBQUM7WUFFNUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDZCxDQUFDLElBQUksR0FBRyxDQUFDO1lBQ1QsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUNULENBQUMsSUFBSSxHQUFHLENBQUM7WUFFVCxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVWLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZGLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZGLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBR3pGLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBR3RFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBRXBELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQzs7UUFtR00sWUFBTyxHQUFkLFVBQWUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1lBQzNFLElBQ0ksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUNaLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDWixFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFakIsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBZ0IsR0FBRyxFQUFvQixHQUFHLEVBQVEsR0FBRztnQkFDeEQsR0FBRyxFQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBb0IsR0FBRyxFQUFRLEdBQUc7Z0JBQ2pFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQU8sQ0FBQyxHQUFHO2dCQUN4RCxHQUFHLEVBQWdCLEdBQUcsRUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQVEsR0FBRzthQUN2RSxDQUFDLENBQUM7UUFDUCxDQUFDOztRQUNNLGdCQUFXLEdBQWxCLFVBQW1CLElBQVksRUFBRSxNQUFjLEVBQUUsSUFBWSxFQUFFLEdBQVc7WUFDdEUsSUFDSSxHQUFHLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQzdDLEtBQUssR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO1lBRXpCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdELENBQUM7O1FBQ00saUJBQVksR0FBbkIsVUFBb0IsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1lBQ2hGLElBQ0ksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUNaLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDWixFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFakIsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDO2dCQUNQLEdBQUcsR0FBRyxFQUFFLEVBQWdCLEdBQUcsRUFBZ0IsR0FBRyxFQUFVLEdBQUc7Z0JBQ3RELEdBQUcsRUFBVyxHQUFHLEdBQUcsRUFBRSxFQUFnQixHQUFHLEVBQVUsR0FBRztnQkFDdEQsR0FBRyxFQUFnQixHQUFHLEVBQVUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFVLEdBQUc7Z0JBQ2hFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFVLEdBQUc7YUFDbkUsQ0FBQyxDQUFDO1FBQ1AsQ0FBQzs7UUFFTSxXQUFNLEdBQWIsVUFBYyxHQUFVLEVBQUUsTUFBYSxFQUFFLEVBQVM7WUFDOUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pCLENBQUM7WUFFRCxJQUFNLENBQUMsR0FBRyxRQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUU3QyxJQUFNLENBQUMsR0FBRyxRQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN6QyxJQUFNLENBQUMsR0FBRyxRQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUV4QyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUM7Z0JBQ0csQ0FBQyxDQUFDLENBQUMsRUFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBTSxDQUFDO2dCQUNsRCxDQUFDLENBQUMsQ0FBQyxFQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFNLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxDQUFDLEVBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQU0sQ0FBQztnQkFDakUsQ0FBQyxRQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQU0sQ0FBQzthQUNwRSxDQUFDLENBQUM7UUFDUCxDQUFDOztRQUNNLFlBQU8sR0FBZCxVQUFlLEVBQVEsRUFBRSxFQUFRLEVBQUUsTUFBbUI7WUFBbkIsc0JBQW1CLEdBQW5CLGFBQW1CO1lBQ2xELElBQ0ksR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQzlFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUM5RSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFDaEYsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFdkYsSUFDSSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDOUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQzlFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUNoRixHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUV2RixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO29CQUNmLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUU3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFFN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBRTdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO2lCQUNoRCxDQUFDLENBQUM7WUFDUCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ2YsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBRTdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUU3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFFN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFH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QyxDQUFDLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDL0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFN0QsSUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUU3RCxJQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQy9ELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRTdELE1BQU0sQ0FBQyxJQUFJLFFBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFqQmUsa0JBQVksZUFpQjNCLENBQUE7UUFBQSxDQUFDO1FBVUYsbUJBQTBCLEVBQVMsRUFBRSxFQUFTLEVBQUUsRUFBUyxFQUFFLEVBQVMsRUFBRSxDQUFTO1lBQzNFLElBQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVsQixJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzlDLElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDdkMsSUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEMsSUFBTSxLQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUV0QixJQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUNoRixJQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUNoRixJQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUVoRixNQUFNLENBQUMsSUFBSSxRQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxD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RSxDQUFTO1lBQ2pELElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRTFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUM7O1FBUWEsV0FBSyxHQUFuQixVQUFvQixLQUFZLEVBQUUsR0FBVSxFQUFFLEdBQVU7WUFDcEQsSUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFFLElBQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMxRSxJQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdB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LEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDN0IsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFDMUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFDbkQsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUVqRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUNoQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ2hDLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDcEMsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUNwQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZCLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUN6QyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztnQkFDakMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztnQkFDckMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztnQkFFckMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBR0QsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxZQUFZLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDdkMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQ2pELElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUM5QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztnQkFDRCxFQUFFLEdBQUcsTUFBTSxDQUFDO1lBQ2hCLENBQUM7WUFNRCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxD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QUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDOUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3RCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3RCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyRCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyRCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyRCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkQsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJ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QUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7Z0JBQ3JFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUc7Z0JBQ3ZFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7Z0JBQ3hFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQ3ZFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUc7Z0JBQ3BFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUc7Z0JBQ3hFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7Z0JBQ3ZFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ3ZFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7Z0JBQ3pFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7Z0JBQzNFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcs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QUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RDLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFUCxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQUEsQ0FBQztZQUNGLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxF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SyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUdyQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDWCxJQUFJLEVBQUUsU0FBQSxDQUFDO2dCQUVQLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXpCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztvQkFDNUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQztvQkFDdEQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDckQsQ0FBQztnQkFDRCxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7b0JBQ3RCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7b0JBQ3RELEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxH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LEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztnQkFDZCxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztnQkFDZCxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztnQkFFZCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztnQkFDZCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztnQkFDZCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztnQkFDZCxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztnQkFFZCxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRztnQkFDZCxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRztnQkFDZCxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRztnQkFDZCxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRztnQkFFZCxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7Z0JBQ2IsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO2dCQUNiLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztnQkFDYixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7YUFDaEIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksWUFBWSxDQUFDO2dCQUV4RSxHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFFUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFFUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFFUixHQUFHLEVBQUUs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RyxFQUFFLENBQUM7WUFDZixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFFWixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUM5QixLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO2dCQUNwQixLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUVwQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckIsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBRXBDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7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Z0JBRVQsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFHLENBQUM7Z0JBQ1QsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDO2dCQUNULENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ1QsQ0FBQyxFQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRVQsQ0FBQyxFQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ1QsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDO2dCQUNWLENBQUMsQ0FBQyxFQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ1YsQ0FBQyxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUM7YUFDYixDQUFDO1lBQ0YsSUFBSSxFQUFFLEdBQUc7Z0JBQ0osQ0FBQyxFQUFFLEVBQUUsRUFBRyxDQUFDO2dCQUNULENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQztnQkFDVCxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUM7Z0JBQ1QsQ0FBQyxFQUFHLENBQUMsRUFBRSxFQUFFO2dCQUNULENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtnQkFDVCxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUM7Z0JBQ1QsQ0FBQyxFQUFFLEVBQUUsRUFBRyxDQUFDO2dCQUNWLEVBQUUsRUFBRSxFQUFFLEVBQUcsQ0FBQztnQkFDVixFQUFFLEVBQUcsQ0FBQyxFQUFHLENBQUM7Z0JBQ1QsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDO2dCQUNULENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQztnQkFDVCxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUM7Z0JBQ1QsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDO2dCQUNULENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQztnQkFDVCxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUM7Z0JBQ1QsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDO2dCQUNULENBQUMsRUFBRyxDQUFDLEVBQUUsRUFBRTtnQkFDVCxDQUFDLEVBQUcsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1QsQ0FBQyxFQUFHLENBQUMsRUFB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QyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDdEQsR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUVoRCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXZDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsQ0FBQztZQUNMLENBQUM7WUFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDdkMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDdEMsSUFBTSxFQUFFLEdBQWEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsSUFBTSxFQUFFLEdBQWEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsSUFBTSxFQUFFLEdBQWEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFNUMsSUFBTSxFQUFFLEdBQWEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQyxJQUFNLEVBQUUsR0FBYSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzFDLElBQU0sRUFBRSxHQUFhLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFNUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxD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R0FBRyxNQUFNLENBQUMsQ0FBQztZQUNoQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFJOUIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUN6QyxJQUFJLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3pDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLElBQUksS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxVQUFVLENBQUM7Z0JBQzFCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxVQUFVLENBQUM7b0JBQzFCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDekMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ3BCLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDeEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxXQUFXLEdBQUcsRUFBRSxDQUFDO29CQUNsQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3pCLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzdCLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBQ2hDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxJQUFJLENBQUMsQ0FBQztvQkFFVixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO3dCQUN6QixLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3dCQUMvQixLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQztvQkFDbEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7b0JBQ3RCLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO29CQUN0QixHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUNiLENBQUM7WUFDTCxDQUFDO1lBRUQsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNSLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ3RDLElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQzdCLElBQUksYUFBYSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDdkMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztvQkFDdEMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUVsQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQzdCLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQ3JDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLENBQUM7b0JBQ3pDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDL0IsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxhQUFhLEdBQUcsUUFBUSxDQUFDO29CQUN2QyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFDO29CQUNyQyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUNiLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVqQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFakQsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2pDLENBQUM7O1FBQ0wsWUFBQztJQUFELENBakZBLEFBaUZDLENBakYwQixXQUFRLEdBaUZsQztJQWpGWSxRQUFLLFFBaUZqQixDQUFBO0lBQUEsQ0FBQztBQUNOLENBQUMsRUF2RlMsRUFBRSxLQUFGLEVBQUUsUUF1Rlg7QUFBQSxDQUFDOztBQ3pGRixZQUFZLENBQUM7QUFFYixJQUFVLEVBQUUsQ0FpWFg7QUFqWEQsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNWLElBQWlCLE9BQU8sQ0ErV3ZCO0lBL1dELFdBQWlCLE9BQU8sRUFBQyxDQUFDO1FBS3RCLG9DQUEyQyxHQUFXO1FBRXRELENBQUM7UUFGZSxrQ0FBMEIsNkJBRXpDLENBQUE7UUFBQSxDQUFDO1FBT0YsbUJBQTBCLEdBQVcsRUFBRSxLQUFrQjtZQUFsQixxQkFBa0IsR0FBbEIsVUFBa0I7WUFDckQsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQzVDLENBQUM7UUFGZSxpQkFBUyxZQUV4QixDQUFBO1FBQUEsQ0FBQztRQUtGLHFCQUE0QixRQUFnQjtZQUN4QyxjQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFGZSxtQkFBVyxjQUUxQixDQUFBO1FBQUEsQ0FBQztRQUtGLHFCQUE0QixRQUFnQjtZQUN4QyxjQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFGZSxtQkFBVyxjQUUxQixDQUFBO1FBQUEsQ0FBQztRQUtGLHFCQUE0QixRQUFnQjtZQUN4QyxjQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFGZSxtQkFBVyxjQUUxQixDQUFBO1FBQUEsQ0FBQztRQUVGLG9CQUFvQixNQUFtQjtZQUluQyxJQUFNLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRy9CLElBQU0sZUFBZSxHQUFPLENBQUMsQ0FBQztZQUM5QixJQUFNLGdCQUFnQixHQUFNLENBQUMsQ0FBQztZQUM5QixJQUFNLGlCQUFpQixHQUFLLENBQUMsQ0FBQztZQUM5QixJQUFNLGlCQUFpQixHQUFLLENBQUMsQ0FBQztZQUM5QixvQkFBcUIsZUFBZSxFQUFFLEdBQWdCO2dCQUFoQixtQkFBZ0IsR0FBaEIsUUFBZ0I7Z0JBQ2xELE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLEtBQUssZUFBZTt3QkFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUEwQixHQUFLLENBQUMsQ0FBQzt3QkFDakUsS0FBSyxDQUFDO29CQUNWLEtBQUssZ0JBQWdCO3dCQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTJCLEdBQUssQ0FBQyxDQUFDO3dCQUNuRSxLQUFLLENBQUM7b0JBQ1YsS0FBSyxpQkFBaUI7d0JBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBK0IsR0FBSyxDQUFDLENBQUM7d0JBQ3hFLEtBQUssQ0FBQztvQkFDVixRQUFRO29CQUNSLEtBQUssaUJBQWlCLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBc0IsR0FBSyxDQUFDLENBQUM7Z0JBQ3ZFLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLG1CQUFtQixDQUFDO1lBRS9CLENBQUM7WUFBQSxDQUFDO1lBV0YsSUFBTSxzQkFBc0IsR0FBVyxDQUFDLENBQUM7WUFDekMsSUFBTSxpQkFBaUIsR0FBVyxDQUFDLENBQUM7WUFDcEMsSUFBTSxxQkFBcUIsR0FBVyxDQUFDLENBQUM7WUFFeEMsSUFBTSxPQUFPLEdBQVcsSUFBSSxDQUFDO1lBRTdCLGdCQUFnQixNQUFNLEVBQUUsU0FBVSxFQUFFLE9BQVE7Z0JBQ3hDLFNBQVMsR0FBRyxDQUFFLFNBQVMsR0FBRyxJQUFJLEdBQUcsU0FBUyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUNkLENBQUMsR0FBRyxDQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsU0FBUyxHQUFHLEdBQUcsRUFDekMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUM5RjtnQkFDRCxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO29CQUV4RixDQUFDLElBQUksS0FBSyxDQUFDO29CQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDO29CQUNoQyxDQUFDLElBQUksU0FBUyxDQUFDO29CQUNmLEtBQUssSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFakcsQ0FBQztnQkFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNULEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUM7d0JBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakQsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFakMsQ0FBQztnQkFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUM7WUFBQSxDQUFDO1lBRUYseUJBQXlCLE1BQWtCO2dCQUN2QyxJQUFJLElBQUksRUFBRSxLQUFhLEVBRW5CLGNBQWMsR0FBRyxZQUFZLEVBQzdCLFFBQVEsR0FBRyxtQ0FBbUMsRUFDOUMsV0FBVyxHQUFHLHNDQUFzQyxFQUNwRCxTQUFTLEdBQUcsc0JBQXNCLEVBQ2xDLGFBQWEsR0FBRyxtQ0FBbUMsRUFHbkQsTUFBTSxHQUFHO29CQUNMLEtBQUssRUFBRSxDQUFDO29CQUNSLE1BQU0sRUFBRSxFQUFFO29CQUNWLFFBQVEsRUFBRSxFQUFFO29CQUNaLFdBQVcsRUFBRSxNQUFNO29CQUVuQixNQUFNLEVBQUUsRUFBRTtvQkFDVixLQUFLLEVBQUUsR0FBRztvQkFFVixRQUFRLEVBQUUsR0FBRztvQkFFYixLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDO2lCQUN0QixDQUFDO2dCQUVOLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqRSxNQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2dCQUMxRCxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2dCQUM5RCxDQUFDO2dCQUNELE1BQU0sQ0FBQyxLQUFLLElBQUksc0JBQXNCLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBRTdCLE9BQU8sSUFBSSxFQUFFLENBQUM7b0JBQ1YsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDdEIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQzt3QkFBQyxLQUFLLENBQUM7b0JBQzFCLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFN0IsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7d0JBQy9CLFFBQVEsQ0FBQztvQkFDYixDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsTUFBTSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxNQUFNLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hDLE1BQU0sQ0FBQyxLQUFLLElBQUksaUJBQWlCLENBQUM7d0JBQ2xDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEMsTUFBTSxDQUFDLEtBQUssSUFBSSxxQkFBcUIsQ0FBQzt3QkFDdEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUN2QyxNQUFNLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzFDLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDLENBQUM7d0JBQUMsS0FBSyxDQUFDO2dCQUM1RixDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxNQUFNLENBQUMsVUFBVSxDQUFDLGlCQUFpQixFQUFFLDBCQUEwQixDQUFDLENBQUM7Z0JBQ3JFLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsOEJBQThCLENBQUMsQ0FBQztnQkFDekUsQ0FBQztnQkFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2xCLENBQUM7WUFBQSxDQUFDO1lBRUYsNkJBQTZCLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDckMsSUFBSSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUN4QyxlQUFlLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQ3RELGNBQWMsR0FBRyxDQUFDLEVBQUUsYUFBYSxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUM7Z0JBRXJELEVBQUUsQ0FBQyxDQUVDLENBQUMsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLENBQUM7b0JBRW5ELENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQ25FLENBQUMsQ0FBQyxDQUFDO29CQUVHLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztnQkFFRCxFQUFFLENBQUMsQ0FBQyxjQUFjLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BELFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO29CQUN0RCxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM3QixDQUFDO2dCQUVELFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUV0QyxFQUFFLENBQUMsQ0FBQyxDQUFFLFNBQVMsSUFBSSxDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztvQkFDakUsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0IsQ0FBQztnQkFFRCxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUM7Z0JBQ2xELFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsZUFBZSxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUcxQyxPQUFPLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO29CQUN0RCxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7d0JBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzdCLENBQUM7b0JBRUQsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUM3QixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQzdCLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDN0IsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUc3QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVELFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO3dCQUMxRCxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM3QixDQUFDO29CQUlELEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBQ1IsT0FBTyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQzt3QkFDbEQsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUN0QixZQUFZLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQzt3QkFDM0IsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDOzRCQUFDLEtBQUssSUFBSSxHQUFHLENBQUM7d0JBRS9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzNDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDOzRCQUNuRCxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUM3QixDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7NEJBRWYsU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDOzRCQUMxQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQ0FDekIsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDOzRCQUN2QyxDQUFDO3dCQUVMLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBRUosZUFBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQzVELEdBQUcsSUFBSSxLQUFLLENBQUM7NEJBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQzt3QkFDL0IsQ0FBQztvQkFDTCxDQUFDO29CQUdELENBQUMsR0FBRyxjQUFjLENBQUM7b0JBQ25CLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO3dCQUNyQixHQUFHLEdBQUcsQ0FBQyxDQUFDO3dCQUNSLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3dCQUM3QyxHQUFHLElBQUksY0FBYyxDQUFDO3dCQUN0QixTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7d0JBQ2pELEdBQUcsSUFBSSxjQUFjLENBQUM7d0JBQ3RCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzt3QkFDakQsR0FBRyxJQUFJLGNBQWMsQ0FBQzt3QkFDdEIsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3dCQUNqRCxNQUFNLElBQUksQ0FBQyxDQUFDO29CQUNoQixDQUFDO29CQUNELGFBQWEsRUFBRyxDQUFDO2dCQUNyQixDQUFDO2dCQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDckIsQ0FBQztZQUFBLENBQUM7WUFFRixJQUFJLFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FDRTtZQUV4QyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLElBQUksZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWxELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUU5QixFQUFFLENBQUMsQ0FBQyxtQkFBbUIsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQU0sQ0FBQyxHQUFHLGdCQUFnQixDQUFDLEtBQUssRUFDNUIsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFDM0IsZUFBZSxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUVsRixNQUFNLENBQUM7b0JBQ0gsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQztvQkFDbkIsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNO29CQUMvQixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsS0FBSztvQkFDN0IsUUFBUSxFQUFFLGdCQUFnQixDQUFDLFFBQVE7aUJBR3RDLENBQUM7WUFFVixDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQUEsQ0FBQztRQU1GLHNCQUE2QixRQUFnQixFQUFFLEtBQWtCO1lBQWxCLHFCQUFrQixHQUFsQixVQUFrQjtZQUU3RCxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxjQUFXLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXRDLElBQUksU0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7Z0JBQ25DLFNBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFHcEMsU0FBTyxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUM7Z0JBRXJDLFNBQU8sQ0FBQyxNQUFNLEdBQUc7b0JBQ2IsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLFNBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFFM0MsY0FBVyxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztnQkF5Q25ELENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2IsU0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25CLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixjQUFXLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsQ0FBQztRQUNMLENBQUM7UUE3RGUsb0JBQVksZUE2RDNCLENBQUE7UUFLRCx3QkFBK0IsUUFBZ0I7WUFDM0MsY0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBRmUsc0JBQWMsaUJBRTdCLENBQUE7UUFBQSxDQUFDO0lBQ04sQ0FBQyxFQS9XZ0IsT0FBTyxHQUFQLFVBQU8sS0FBUCxVQUFPLFFBK1d2QjtJQUFBLENBQUM7QUFDTixDQUFDLEVBalhTLEVBQUUsS0FBRixFQUFFLFFBaVhYO0FBQUEsQ0FBQzs7QUNuWEYsWUFBWSxDQUFDO0FBRWIsSUFBVSxFQUFFLENBOEhYO0FBOUhELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDVixJQUFpQixTQUFTLENBNEh6QjtJQTVIRCxXQUFpQixTQUFTLEVBQUMsQ0FBQztRQUN4QixrQkFBa0IsUUFBZ0I7WUFDOUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDdkIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7WUFDRCxJQUFJLENBQUM7Z0JBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixDQUFFO1lBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUFzQixRQUFVLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFDNUIsQ0FBQztRQUNELDJCQUEyQixJQUFZO1lBQ25DLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7WUFFekIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBVTtnQkFDckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDRCxtQkFBbUIsSUFBWTtZQUMzQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDaEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDcEMsSUFBSSxXQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDcEMsV0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQVU7b0JBQ3pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDckIsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDRCxpQkFBd0IsUUFBZ0I7WUFDcEMsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUNWLE9BQU8sR0FBRyxFQUFFLEVBQ1osUUFBUSxHQUFHLEVBQUUsRUFDYixRQUFRLEdBQUcsRUFBRSxFQUNiLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFFWixJQUFJLEtBQUssR0FBRztnQkFDUixRQUFRLEVBQUUsRUFBRTtnQkFDWixPQUFPLEVBQUUsRUFBRTtnQkFDWCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxTQUFTLEVBQUUsRUFBRTthQUNoQixDQUFDO1lBRUYsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUzQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBWTtnQkFDdkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUIsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUVkLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUc1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDZixJQUFJLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVoRCxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxNQUFNLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbEQsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksTUFBTSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFeEMsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLElBQUksSUFBSSxHQUFZLEtBQUssQ0FBQztvQkFDMUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFFakQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBRW5CLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ04sSUFBSSxHQUFHLElBQUksQ0FBQzt3QkFDaEIsQ0FBQzt3QkFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNDLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ0osSUFBSSxNQUFNLEdBQWtCLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFaEQsSUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUM5QixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDOUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNsQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBRWxDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dDQUNsQixJQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQy9CLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dDQUNuQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzNDLENBQUM7NEJBRUQsSUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUM5QixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDL0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNuQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBR25DLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7NEJBQ3pCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUV4QixFQUFFLEdBQUcsQ0FBQzt3QkFDVixDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFFbEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNDLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUM7Z0JBQ0gsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO2dCQUN4QixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87Z0JBQ3RCLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUztnQkFDMUIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2FBQ3pCLENBQUM7UUFDTixDQUFDO1FBcEZlLGlCQUFPLFVBb0Z0QixDQUFBO0lBQ0wsQ0FBQyxFQTVIZ0IsU0FBUyxHQUFULFlBQVMsS0FBVCxZQUFTLFFBNEh6QjtJQUFBLENBQUM7QUFDTixDQUFDLEVBOUhTLEVBQUUsS0FBRixFQUFFLFFBOEhYO0FBQUEsQ0FBQzs7QUNoSUYsWUFBWSxDQUFDO0FBRWIsSUFBVSxFQUFFLENBdUVYO0FBdkVELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFHVCxDQUFDO0lBR0QsQ0FBQztJQU1GO1FBQUE7UUEwREEsQ0FBQztRQWhEaUIsa0JBQUcsR0FBakIsVUFBa0IsSUFBWTtZQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFjLElBQUksZUFBWSxDQUFDLENBQUM7WUFDcEQsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQU1hLG9CQUFLLEdBQW5CLFVBQW9CLElBQVksRUFBRSxFQUFzQjtZQUNwRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFjLElBQUksZUFBWSxDQUFDLENBQUM7WUFDcEQsQ0FBQztZQUNELEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNiLENBQUM7UUFPYSx5QkFBVSxHQUF4QixVQUF5QixJQUFZLEVBQUUsRUFBbUI7WUFDdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBTWEsa0JBQUcsR0FBakIsVUFBa0IsSUFBWSxFQUFFLElBQWdCO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFjLElBQUksZUFBWSxDQUFDLENBQUM7WUFDcEQsQ0FBQztZQUNELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLENBQUM7UUFJYSxzQkFBTyxHQUFyQjtZQUNJLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hDLENBQUM7WUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUM5QixDQUFDO1FBckRNLDhCQUFlLEdBQXFDLEVBQUUsQ0FBQztRQXNEbEUscUJBQUM7SUFBRCxDQTFEQSxBQTBEQyxJQUFBO0lBMURZLGlCQUFjLGlCQTBEMUIsQ0FBQTtJQUFBLENBQUM7QUFDTixDQUFDLEVBdkVTLEVBQUUsS0FBRixFQUFFLFFBdUVYO0FBQUEsQ0FBQzs7QUN6RUYsWUFBWSxDQUFDO0FBSWIsSUFBVSxFQUFFLENBMktYO0FBM0tELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDVixJQUFpQixXQUFXLENBeUszQjtJQXpLRCxXQUFpQixXQUFXLEVBQUMsQ0FBQztRQUMxQjtZQU9JLGtCQUFZLE9BQWU7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO2dCQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUN2QixDQUFDOztZQUtNLDJCQUFRLEdBQWY7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQzs7WUFLTSwyQkFBUSxHQUFmLFVBQWdCLElBQVk7Z0JBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLENBQUM7O1lBS00sd0JBQUssR0FBWjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQixDQUFDOztZQUlNLDJCQUFRLEdBQWY7Z0JBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3JCLENBQUM7O1lBSU0sMkJBQVEsR0FBZjtnQkFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDckIsQ0FBQzs7WUFDTCxlQUFDO1FBQUQsQ0E1Q0EsQUE0Q0MsSUFBQTtRQTVDWSxvQkFBUSxXQTRDcEIsQ0FBQTtRQUFBLENBQUM7UUFLRixJQUFJLG9CQUFvQixHQUFXLENBQUMsQ0FBQztRQUtyQyxJQUFJLHFCQUFxQixHQUFhLElBQUksQ0FBQztRQUtoQyx3QkFBWSxHQUFtQyxFQUFFLENBQUM7UUFLN0QsNEJBQW1DLE9BQWU7WUFDOUMsd0JBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxFQUFFLG9CQUFvQixDQUFDO1FBQzNCLENBQUM7UUFIZSw4QkFBa0IscUJBR2pDLENBQUE7UUFBQSxDQUFDO1FBS0YseUJBQWdDLE9BQWU7WUFDM0MsYUFBYSxDQUFDLE1BQU0sQ0FBQztnQkFDakIsS0FBSyxFQUFLLE9BQU8sZUFBWTtnQkFDN0IsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsT0FBTyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxvQkFBb0IsQ0FBQztZQUN2Qix5QkFBeUIsRUFBRSxDQUFDO1FBQ2hDLENBQUM7UUFUZSwyQkFBZSxrQkFTOUIsQ0FBQTtRQU1ELDRCQUFtQyxPQUFlLEVBQUUsV0FBZ0I7WUFDaEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixhQUFhLENBQUMsTUFBTSxDQUFDO29CQUNqQixLQUFLLEVBQUUsMEJBQXdCLE9BQU8sa0JBQWU7b0JBQ3JELElBQUksRUFBRSxFQUFFO29CQUNSLElBQUksRUFBRSxPQUFPO29CQUNiLE9BQU8sRUFBRSxJQUFJO2lCQUNoQixDQUFDLENBQUM7WUFDUCxDQUFDO1lBQ0QsYUFBYSxDQUFDLE1BQU0sQ0FBQztnQkFDakIsS0FBSyxFQUFLLE9BQU8sZUFBWTtnQkFDN0IsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1lBQ0gsd0JBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUMsRUFBRSxvQkFBb0IsQ0FBQztZQUN2Qix5QkFBeUIsRUFBRSxDQUFDO1FBQ2hDLENBQUM7UUFsQmUsOEJBQWtCLHFCQWtCakMsQ0FBQTtRQUFBLENBQUM7UUFJRjtZQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25FLElBQUksU0FBUyxHQUFHLHFCQUFxQixDQUFDO2dCQUN0QyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7Z0JBQzdCLFNBQVMsRUFBRSxDQUFDO1lBQ2hCLENBQUM7UUFDTCxDQUFDO1FBQUEsQ0FBQztRQU1GLGlDQUF3QyxFQUFFO1lBQ3RDLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztZQUMzQix5QkFBeUIsRUFBRSxDQUFDO1FBQ2hDLENBQUM7UUFIZSxtQ0FBdUIsMEJBR3RDLENBQUE7UUFBQSxDQUFDO1FBTUYsdUJBQThCLE9BQWU7WUFDekMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2IsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLHdCQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixDQUFDLEdBQUcsd0JBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osS0FBSyxDQUFDLHFCQUFtQixPQUFPLGtCQUFlLENBQUMsQ0FBQztZQUNyRCxDQUFDO1lBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNiLENBQUM7UUFSZSx5QkFBYSxnQkFRNUIsQ0FBQTtRQUFBLENBQUM7UUFNRix1QkFBOEIsT0FBZTtZQUN6QyxNQUFNLENBQUMsQ0FBQyxPQUFPLElBQUksd0JBQVksQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFGZSx5QkFBYSxnQkFFNUIsQ0FBQTtRQUFBLENBQUM7UUFJRiwwQkFBa0MsT0FBZTtZQUM3Qyx3QkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFGZSw0QkFBZ0IsbUJBRS9CLENBQUE7UUFBQSxDQUFDO1FBS0YscUJBQTZCLE9BQWU7WUFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLHdCQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUMxQix3QkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNqQyxDQUFDLEdBQUcsd0JBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1YsT0FBTyx3QkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDYixDQUFDO1FBVmUsdUJBQVcsY0FVMUIsQ0FBQTtRQUFBLENBQUM7SUFDTixDQUFDLEVBektnQixXQUFXLEdBQVgsY0FBVyxLQUFYLGNBQVcsUUF5SzNCO0lBQUEsQ0FBQztBQUNOLENBQUMsRUEzS1MsRUFBRSxLQUFGLEVBQUUsUUEyS1g7QUFBQSxDQUFDOztBQy9LRixZQUFZLENBQUM7QUFFYixJQUFVLEVBQUUsQ0FnQ1g7QUFoQ0QsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNWLElBQWlCLE9BQU8sQ0E4QnZCO0lBOUJELFdBQWlCLE9BQU8sRUFBQyxDQUFDO1FBTXRCLG1CQUEwQixRQUFnQixFQUFFLEtBQWtCO1lBQWxCLHFCQUFrQixHQUFsQixVQUFrQjtZQUMxRCxLQUFLLEdBQUcsaUJBQVMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXRDLGNBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFHdEMsSUFBSSxTQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztnQkFDbkMsU0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUdwQyxTQUFPLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQztnQkFFckMsU0FBTyxDQUFDLE1BQU0sR0FBRztvQkFFYixJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxTQUFPLENBQUMsUUFBUSxFQUMvQyxVQUFVLE1BQU07d0JBQ1osY0FBVyxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDbEQsQ0FBQyxDQUNOLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDYixTQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsQ0FBQztRQUNMLENBQUM7UUF2QmUsaUJBQVMsWUF1QnhCLENBQUE7UUFBQSxDQUFDO0lBQ04sQ0FBQyxFQTlCZ0IsT0FBTyxHQUFQLFVBQU8sS0FBUCxVQUFPLFFBOEJ2QjtJQUFBLENBQUM7QUFDTixDQUFDLEVBaENTLEVBQUUsS0FBRixFQUFFLFFBZ0NYO0FBQUEsQ0FBQzs7QUNsQ0YsWUFBWSxDQUFDO0FBRWIsSUFBVSxFQUFFLENBZVg7QUFmRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ1YsSUFBaUIsT0FBTyxDQWF2QjtJQWJELFdBQWlCLE9BQU8sRUFBQyxDQUFDO1FBS3RCLHFCQUE0QixZQUFvQjtZQUM1QztnQkFDSSxXQUFXLEVBQUUsYUFBYSxFQUFFLFlBQVk7Z0JBQ3hDLFdBQVcsRUFBRSxZQUFZLEVBQUUsVUFBVTthQUN4QyxDQUFDLEdBQUcsQ0FBQyxVQUFTLFFBQWdCO2dCQUMzQixpQkFBUyxDQUFDLFlBQVksR0FBRyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBUGUsbUJBQVcsY0FPMUIsQ0FBQTtRQUFBLENBQUM7SUFDTixDQUFDLEVBYmdCLE9BQU8sR0FBUCxVQUFPLEtBQVAsVUFBTyxRQWF2QjtJQUFBLENBQUM7QUFDTixDQUFDLEVBZlMsRUFBRSxLQUFGLEVBQUUsUUFlWDtBQUFBLENBQUM7O0FDakJGLFlBQVksQ0FBQztBQUViLElBQVUsRUFBRSxDQW1DWDtBQW5DRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ1YsSUFBaUIsT0FBTyxDQWlDdkI7SUFqQ0QsV0FBaUIsT0FBTyxFQUFDLENBQUM7UUFNdEIsa0JBQXlCLE9BQWUsRUFBRSxLQUFrQjtZQUFsQixxQkFBa0IsR0FBbEIsVUFBa0I7WUFDeEQsS0FBSyxHQUFHLGlCQUFTLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV0QyxjQUFXLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBR3RDLElBQUksU0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7Z0JBQ25DLFNBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFHbkMsU0FBTyxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUM7Z0JBRXJDLFNBQU8sQ0FBQyxNQUFNLEdBQUc7b0JBRWIsY0FBVyxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNiLFNBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQixDQUFDO1FBQ0wsQ0FBQztRQW5CZSxnQkFBUSxXQW1CdkIsQ0FBQTtRQUFBLENBQUM7UUFLRixvQkFBMkIsT0FBZTtZQUN0QyxjQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFGZSxrQkFBVSxhQUV6QixDQUFBO1FBQUEsQ0FBQztJQUNOLENBQUMsRUFqQ2dCLE9BQU8sR0FBUCxVQUFPLEtBQVAsVUFBTyxRQWlDdkI7SUFBQSxDQUFDO0FBQ04sQ0FBQyxFQW5DUyxFQUFFLEtBQUYsRUFBRSxRQW1DWDtBQUFBLENBQUM7O0FDckNGLFlBQVksQ0FBQztBQUViLElBQVUsRUFBRSxDQTBCWDtBQTFCRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ1YsSUFBaUIsT0FBTyxDQXdCdkI7SUF4QkQsV0FBaUIsT0FBTyxFQUFDLENBQUM7UUFNdEIsbUJBQTBCLFFBQWdCLEVBQUUsS0FBa0I7WUFBbEIscUJBQWtCLEdBQWxCLFVBQWtCO1lBQzFELEtBQUssR0FBRyxpQkFBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLEtBQUcsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO2dCQUN0QixjQUFXLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RDLEtBQUcsQ0FBQyxNQUFNLEdBQUc7b0JBRUwsY0FBVyxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxLQUFHLENBQUMsQ0FBQztnQkFFbkQsQ0FBQyxDQUFDO2dCQUNGLEtBQUcsQ0FBQyxPQUFPLEdBQUcsVUFBUyxHQUFHO29CQUN0QixjQUFXLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QyxDQUFDLENBQUM7Z0JBQ0YsS0FBRyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7WUFDdkIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLGNBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QyxDQUFDO1FBQ0wsQ0FBQztRQWpCZSxpQkFBUyxZQWlCeEIsQ0FBQTtRQUFBLENBQUM7SUFDTixDQUFDLEVBeEJnQixPQUFPLEdBQVAsVUFBTyxLQUFQLFVBQU8sUUF3QnZCO0lBQUEsQ0FBQztBQUNOLENBQUMsRUExQlMsRUFBRSxLQUFGLEVBQUUsUUEwQlg7QUFBQSxDQUFDOztBQzVCRixZQUFZLENBQUM7QUFFYixJQUFVLEVBQUUsQ0FrQ1g7QUFsQ0QsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNWLElBQWlCLE9BQU8sQ0FnQ3ZCO0lBaENELFdBQWlCLE9BQU8sRUFBQyxDQUFDO1FBTXRCLG1CQUEwQixRQUFnQixFQUFFLEtBQWtCO1lBQWxCLHFCQUFrQixHQUFsQixVQUFrQjtZQUMxRCxLQUFLLEdBQUcsaUJBQVMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFcEMsY0FBVyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUlsQyxJQUFJLE9BQUssR0FBd0MsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0UsT0FBSyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7Z0JBQ3JCLE9BQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7b0JBRWpDLGNBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsT0FBSyxDQUFDLENBQUM7Z0JBQ2pELENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVsQixDQUFDO1FBVUwsQ0FBQztRQXpCZSxpQkFBUyxZQXlCeEIsQ0FBQTtRQUFBLENBQUM7SUFDTixDQUFDLEVBaENnQixPQUFPLEdBQVAsVUFBTyxLQUFQLFVBQU8sUUFnQ3ZCO0lBQUEsQ0FBQztBQUNOLENBQUMsRUFsQ1MsRUFBRSxLQUFGLEVBQUUsUUFrQ1g7QUFBQSxDQUFDOztBQ3BDRixZQUFZLENBQUM7QUFFYixJQUFVLEVBQUUsQ0EyQ1g7QUEzQ0QsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNWLElBQWlCLE9BQU8sQ0F5Q3ZCO0lBekNELFdBQWlCLE9BQU8sRUFBQyxDQUFDO1FBSXRCO1lBQ0ksSUFBTSxLQUFLLEdBQVcsUUFBUSxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXBDLGNBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFdEMsSUFBSSxPQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUMsT0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBRXRCLE9BQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixPQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFFbEIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsRUFBRSxVQUFTLE1BQU07d0JBQzFELE9BQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDeEMsT0FBSyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRTs0QkFFakMsY0FBVyxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxPQUFLLENBQUMsQ0FBQzt3QkFDakQsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBUyxHQUFHO3dCQUN0QixLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztvQkFDMUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsRUFBRSxVQUFTLE1BQU07d0JBQ3ZELE9BQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDeEMsT0FBSyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRTs0QkFFakMsY0FBVyxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxPQUFLLENBQUMsQ0FBQzt3QkFDakQsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBUyxLQUFLO3dCQUN4QixLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztvQkFDMUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFwQ2Usa0JBQVUsYUFvQ3pCLENBQUE7UUFBQSxDQUFDO0lBQ04sQ0FBQyxFQXpDZ0IsT0FBTyxHQUFQLFVBQU8sS0FBUCxVQUFPLFFBeUN2QjtJQUFBLENBQUM7QUFDTixDQUFDLEVBM0NTLEVBQUUsS0FBRixFQUFFLFFBMkNYO0FBQUEsQ0FBQzs7QUM3Q0YsWUFBWSxDQUFDO0FBRWIsSUFBVSxFQUFFLENBd0JYO0FBeEJELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDVixJQUFpQixPQUFPLENBc0J2QjtJQXRCRCxXQUFpQixPQUFPLEVBQUMsQ0FBQztRQVN0QixtQkFBMEIsR0FBVyxFQUFFLElBQW9CLEVBQ3ZELFlBQW9DLEVBQUUsTUFBTSxFQUFFLE9BQXdCO1lBRG5DLG9CQUFvQixHQUFwQixXQUFvQjtZQUN2RCw0QkFBb0MsR0FBcEMsNEJBQW9DO1lBQVUsdUJBQXdCLEdBQXhCLFVBQVUsY0FBYSxDQUFDO1lBQ3RFLElBQUksT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7WUFFbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRS9CLE9BQU8sQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1lBRXBDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3hCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBRTFCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixDQUFDO1FBWmUsaUJBQVMsWUFZeEIsQ0FBQTtRQUFBLENBQUM7SUFDTixDQUFDLEVBdEJnQixPQUFPLEdBQVAsVUFBTyxLQUFQLFVBQU8sUUFzQnZCO0lBQUEsQ0FBQztBQUNOLENBQUMsRUF4QlMsRUFBRSxLQUFGLEVBQUUsUUF3Qlg7QUFBQSxDQUFDOztBQzFCRixZQUFZLENBQUM7QUFFYixJQUFVLEVBQUUsQ0FtTFg7QUFuTEQsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQXNCVCxDQUFDO0lBSUY7UUEwSEksaUJBQVksTUFBNkI7WUF4SC9CLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1lBQ3pCLHFCQUFnQixHQUEwQixFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDckUsYUFBUSxHQUEwQixFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFFN0QsWUFBTyxHQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7WUFDeEQsWUFBTyxHQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7WUFDeEQsWUFBTyxHQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7WUFFeEQsZ0JBQVcsR0FBd0IsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQzlELGdCQUFXLEdBQXdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUc5RCxZQUFPLEdBQVksSUFBSSxDQUFDO1lBQ3hCLHNCQUFpQixHQUFZLEtBQUssQ0FBQztZQUNuQyx1QkFBa0IsR0FBWSxLQUFLLENBQUM7WUFFcEMsc0JBQWlCLEdBQVcsQ0FBQyxDQUFDO1lBSzlCLFlBQU8sR0FBVyxDQUFDLENBQUM7WUFDcEIsaUJBQVksR0FBWSxLQUFLLENBQUM7WUFtR3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQzNCLENBQUM7UUF6Rk0sMkJBQVMsR0FBaEIsVUFBaUIsTUFBMkI7WUFDeEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBTSxFQUFFLEdBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUM5QixDQUFDOztRQUtNLDJCQUFTLEdBQWhCLFVBQWlCLE1BQTJCO1lBQ3hDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLElBQU0sRUFBRSxHQUEyQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pFLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDOUIsQ0FBQzs7UUFDTSxzQkFBSSxHQUFYLFVBQVksS0FBb0I7WUFDNUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDdkQsQ0FBQztZQUNELElBQU0sRUFBRSxHQUEyQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUM7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBSU0sZ0NBQWMsR0FBckI7WUFDSSxJQUFNLEVBQUUsR0FBMkIsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBRTlCLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFLTSxnQ0FBYyxHQUFyQixVQUFzQixLQUFpQjtZQUFqQixxQkFBaUIsR0FBakIsU0FBaUI7WUFDbkMsSUFBTSxFQUFFLEdBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakUsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFMUIsSUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzFELEVBQUUsQ0FBQyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBb0MsS0FBSyxDQUFDLENBQUM7WUFDckYsQ0FBQztRQUNMLENBQUM7O1FBQ00sc0JBQUksR0FBWCxVQUFZLElBQWE7WUFDckIsSUFBTSxFQUFFLEdBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakUsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3pDLENBQUM7WUFDRCxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFDTSx3QkFBTSxHQUFiO1lBQ0ksSUFBTSxFQUFFLEdBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFJTSx5QkFBTyxHQUFkO1lBQ0ksSUFBTSxFQUFFLEdBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQztRQUNNLDZCQUFXLEdBQWxCO1FBU0EsQ0FBQztRQU9ELHNCQUFJLDJCQUFNO2lCQUFWLGNBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7O1dBQUE7UUFHOUMsc0JBQUksNEJBQU87aUJBQVg7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDekIsQ0FBQzs7O1dBQUE7O1FBRU0sd0JBQU0sR0FBYixVQUFjLElBQWM7UUFFNUIsQ0FBQztRQUVNLHdCQUFNLEdBQWIsVUFBYyxNQUFjLEVBQUUsTUFBYztZQUN4QyxJQUFNLEVBQUUsR0FBMkIsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqRSxFQUFFLENBQUMsQ0FBQyxFQUFFLFlBQVksc0JBQXNCLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7Z0JBQ3ZCLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbkUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDL0MsQ0FBQztRQUNMLENBQUM7UUFHTSwwQkFBUSxHQUFmLGNBQTRCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsMkJBQVMsR0FBaEIsY0FBNkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQywwQkFBUSxHQUFmLGNBQTRCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsY0FBQztJQUFELENBeEpBLEFBd0pDLElBQUE7SUF4SnFCLFVBQU8sVUF3SjVCLENBQUE7SUFBQSxDQUFDO0FBQ04sQ0FBQyxFQW5MUyxFQUFFLEtBQUYsRUFBRSxRQW1MWDtBQUFBLENBQUM7O0FDckxGLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBVSxFQUFFLENBb0ZYO0FBcEZELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFPVjtRQUFtQyxpQ0FBTztRQVl0Qyx1QkFBWSxTQUE0QixFQUFFLE9BQXdCLEVBQUUsU0FBNEI7WUFBdEQsdUJBQXdCLEdBQXhCLFlBQXdCO1lBQUUseUJBQTRCLEdBQTVCLGdCQUE0QjtZQUM1RixrQkFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUt2QyxJQUFNLEVBQUUsR0FBMkIsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqRSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBRTVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUM3RSxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQztZQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLENBQUM7WUFFekQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRVosRUFBRSxDQUFDLFVBQVUsQ0FDVCxJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLGdCQUFnQixFQUNyQixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FDbkIsQ0FBQztZQUVELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVU7Z0JBQzVDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVTthQUMvQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDZixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUUsQ0FBQztZQUVELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osU0FBUyxFQUFFLENBQUM7WUFDaEIsQ0FBQztRQUNMLENBQUM7O1FBS00sOEJBQU0sR0FBYjtZQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLElBQU0sRUFBRSxHQUEyQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pFLEVBQUUsQ0FBQyxVQUFVLENBQ1QsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxnQkFBZ0IsRUFDckIsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxVQUFVLENBQ25CLENBQUM7WUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQzs7UUFDTCxvQkFBQztJQUFELENBNUVBLEFBNEVDLENBNUVrQyxVQUFPLEdBNEV6QztJQTVFWSxnQkFBYSxnQkE0RXpCLENBQUE7SUFBQSxDQUFDO0FBQ04sQ0FBQyxFQXBGUyxFQUFFLEtBQUYsRUFBRSxRQW9GWDtBQUFBLENBQUM7O0FDdEZGLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBVSxFQUFFLENBc0NYO0FBdENELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDVjtRQUFvQyxrQ0FBTztRQVF2Qyx3QkFBWSxPQUF3QjtZQUF4Qix1QkFBd0IsR0FBeEIsWUFBd0I7WUFDaEMsSUFBTSxFQUFFLEdBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakUsa0JBQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFJdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUNNLGlDQUFRLEdBQWYsVUFBZ0IsQ0FBUyxFQUFFLElBQUk7WUFDM0IsSUFBTSxFQUFFLEdBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsMkJBQTJCLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFDL0MsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUNNLGtDQUFTLEdBQWhCO1lBQ0ksSUFBTSxFQUFFLEdBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRixFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25GLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hGLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRWhGLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNwRixDQUFDO1lBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FwQ0EsQUFvQ0MsQ0FwQ21DLFVBQU8sR0FvQzFDO0lBcENZLGlCQUFjLGlCQW9DMUIsQ0FBQTtJQUFBLENBQUM7QUFDTixDQUFDLEVBdENTLEVBQUUsS0FBRixFQUFFLFFBc0NYO0FBQUEsQ0FBQzs7QUN4Q0YsWUFBWSxDQUFDOzs7Ozs7QUFFYixJQUFVLEVBQUUsQ0FtQlg7QUFuQkQsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUlWO1FBQWtDLGdDQUFPO1FBS3JDLHNCQUFZLFNBQTRCO1lBQTVCLHlCQUE0QixHQUE1QixnQkFBNEI7WUFDcEMsa0JBQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkMsSUFBTSxFQUFFLEdBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakUsRUFBRSxDQUFDLENBQUMsRUFBRSxZQUFZLHNCQUFzQixDQUFDLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztZQUNsRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztZQUNqRCxDQUFDO1FBQ0wsQ0FBQzs7UUFDTCxtQkFBQztJQUFELENBZEEsQUFjQyxDQWRpQyxVQUFPLEdBY3hDO0lBZFksZUFBWSxlQWN4QixDQUFBO0lBQUEsQ0FBQztBQUNOLENBQUMsRUFuQlMsRUFBRSxLQUFGLEVBQUUsUUFtQlg7QUFBQSxDQUFDOztBQ3JCRixZQUFZLENBQUM7QUFFYixJQUFVLEVBQUUsQ0FxQ1g7QUFyQ0QsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNWO1FBS0ksd0NBQVksSUFBYyxFQUFFLE1BQWMsRUFBRSxVQUFrQixFQUFFLE9BQW1CO1lBQW5CLHVCQUFtQixHQUFuQixXQUFtQjtZQUMvRSxJQUFNLEVBQUUsR0FBMkIsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuRCxFQUFFLENBQUMsOEJBQThCLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRixFQUFFLENBQUMsdUJBQXVCLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEYsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQzs7UUFDTSw2Q0FBSSxHQUFYO1lBQ0ksSUFBTSxFQUFFLEdBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELENBQUM7O1FBQ00sK0NBQU0sR0FBYjtZQUNJLElBQU0sRUFBRSxHQUEyQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDTSxnREFBTyxHQUFkO1lBQ0ksSUFBTSxFQUFFLEdBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkMsQ0FBQzs7UUFDTSwrQ0FBTSxHQUFiLFVBQWMsSUFBYztZQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBTSxFQUFFLEdBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2pFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbkQsRUFBRSxDQUFDLDhCQUE4QixDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BHLENBQUM7UUFDTCxDQUFDO1FBQ0wscUNBQUM7SUFBRCxDQW5DQSxBQW1DQyxJQUFBO0lBbkNZLGlDQUE4QixpQ0FtQzFDLENBQUE7SUFBQSxDQUFDO0FBQ04sQ0FBQyxFQXJDUyxFQUFFLEtBQUYsRUFBRSxRQXFDWDtBQUFBLENBQUM7O0FDdkNGLFlBQVksQ0FBQztBQUViLElBQVUsRUFBRSxDQW1DWDtBQW5DRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ1Y7UUFJSSw2QkFBWSxJQUFjLEVBQUUsTUFBYyxFQUFFLFVBQWtCO1lBQzFELElBQU0sRUFBRSxHQUEyQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdEIsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEUsRUFBRSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RGLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUM7O1FBQ00sa0NBQUksR0FBWDtZQUNJLElBQU0sRUFBRSxHQUEyQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxDQUFDOztRQUNNLG9DQUFNLEdBQWI7WUFDSSxJQUFNLEVBQUUsR0FBMkIsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ00scUNBQU8sR0FBZDtZQUNJLElBQU0sRUFBRSxHQUEyQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pFLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLENBQUM7O1FBQ00sb0NBQU0sR0FBYixVQUFjLElBQWM7WUFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQU0sRUFBRSxHQUEyQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNqRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25ELEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUUsQ0FBQztRQUNMLENBQUM7UUFDTCwwQkFBQztJQUFELENBakNBLEFBaUNDLElBQUE7SUFqQ1ksc0JBQW1CLHNCQWlDL0IsQ0FBQTtJQUFBLENBQUM7QUFDTixDQUFDLEVBbkNTLEVBQUUsS0FBRixFQUFFLFFBbUNYO0FBQUEsQ0FBQzs7QUNyQ0YsWUFBWSxDQUFDOzs7Ozs7QUFFYixJQUFVLEVBQUUsQ0FpSlg7QUFqSkQsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNWO1FBQXFDLG1DQUFPO1FBZ0J4Qyx5QkFBWSxJQUFjLEVBQUUsT0FBd0IsRUFBRSxTQUE0QjtZQUF0RCx1QkFBd0IsR0FBeEIsWUFBd0I7WUFBRSx5QkFBNEIsR0FBNUIsZ0JBQTRCO1lBQzlFLGtCQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRWxCLElBQU0sRUFBRSxHQUEyQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pFLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBSW5DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7WUFFdEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQzdFLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFFakMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRVosRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDcEIsRUFBRSxDQUFDLHVCQUF1QixDQUN0QixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFDakIsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNmLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQ1IsQ0FBQztnQkFDTCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEVBQUUsQ0FBQyxhQUFhLENBQ1osSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFDZixJQUFJLENBQUMsU0FBUyxFQUFFLEVBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQ1IsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUNwQixFQUFFLENBQUMsb0JBQW9CLENBQ25CLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFDZixJQUFJLENBQUMsU0FBUyxFQUFFLEVBQ2hCLENBQUMsRUFDRCxJQUFJLENBQ1IsQ0FBQztnQkFDTCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEVBQUUsQ0FBQyxVQUFVLENBQ1QsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxnQkFBZ0IsRUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNmLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFDaEIsQ0FBQyxFQUNELElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQ1IsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQWNELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVU7Z0JBQzVDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVTthQUMvQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDZixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUUsQ0FBQztZQUVELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osU0FBUyxFQUFFLENBQUM7WUFDaEIsQ0FBQztRQUNMLENBQUM7UUFsSE0sa0NBQVEsR0FBZjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQ00sbUNBQVMsR0FBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQStHTSxzQ0FBWSxHQUFuQixVQUFvQixJQUEyQjtZQUEzQixvQkFBMkIsR0FBM0IsT0FBaUIsSUFBSSxDQUFDLEtBQUs7WUFDM0MsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBTSxFQUFFLEdBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakUsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRU0sZ0NBQU0sR0FBYixVQUFjLElBQWM7WUFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQU0sRUFBRSxHQUEyQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNqRSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQyxFQUFFLENBQUMsVUFBVSxDQUNULElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsZ0JBQWdCLEVBQ3JCLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixDQUFDLEVBQ0QsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FDUixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFDTCxzQkFBQztJQUFELENBL0lBLEFBK0lDLENBL0lvQyxVQUFPLEdBK0kzQztJQS9JWSxrQkFBZSxrQkErSTNCLENBQUE7SUFBQSxDQUFDO0FBQ04sQ0FBQyxFQWpKUyxFQUFFLEtBQUYsRUFBRSxRQWlKWDtBQUFBLENBQUM7O0FDbkpGLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBVSxFQUFFLENBbUpYO0FBbkpELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFJVjtRQUFxQyxtQ0FBTztRQVN4Qyx5QkFBYSxJQUFJLEVBQUUsSUFBYyxFQUFFLE9BQXdCLEVBQUUsU0FBNEI7WUFBdEQsdUJBQXdCLEdBQXhCLFlBQXdCO1lBQUUseUJBQTRCLEdBQTVCLGdCQUE0QjtZQUNyRixJQUFNLEVBQUUsR0FBMkIsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7WUFDekQsQ0FBQztZQUNELGtCQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQzdFLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDN0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztZQUVsQyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUdqQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFzQ1osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDcEIsRUFBRSxDQUFDLHVCQUF1QixDQUN0QixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFDakIsSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQ1IsQ0FBQztnQkFDTCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEVBQUUsQ0FBQyxhQUFhLENBQ1osSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQ1IsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUNwQixFQUFFLENBQUMsb0JBQW9CLENBQ25CLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxFQUNOLENBQUMsRUFDRCxJQUFJLENBQ1IsQ0FBQztnQkFDTCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEVBQUUsQ0FBQyxVQUFVLENBQ1QsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxnQkFBZ0IsRUFDckIsSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sQ0FBQyxFQUNELElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQ1IsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQUVELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVU7Z0JBQzVDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVTtnQkFDNUMsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVO2FBQy9DLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxRSxDQUFDO1lBRUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDWixTQUFTLEVBQUUsQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQzs7UUFDTCxzQkFBQztJQUFELENBOUlBLEFBOElDLENBOUlvQyxVQUFPLEdBOEkzQztJQTlJWSxrQkFBZSxrQkE4STNCLENBQUE7SUFBQSxDQUFDO0FBQ04sQ0FBQyxFQW5KUyxFQUFFLEtBQUYsRUFBRSxRQW1KWDtBQUFBLENBQUM7O0FDckpGLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBVSxFQUFFLENBcURYO0FBckRELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDVjtRQUErQiw2QkFBTztRQU9sQyxtQkFBWSxJQUFTLEVBQUUsT0FBd0IsRUFBRSxTQUE0QjtZQUF0RCx1QkFBd0IsR0FBeEIsWUFBd0I7WUFBRSx5QkFBNEIsR0FBNUIsZ0JBQTRCO1lBQ3pFLGtCQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXZDLElBQU0sRUFBRSxHQUEyQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBSWpFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQzdFLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDN0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztZQUVsQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFWixFQUFFLENBQUMsVUFBVSxDQUNULElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsZ0JBQWdCLEVBQ3JCLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQ1IsQ0FBQztZQUVELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVU7Z0JBQzVDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVTthQUMvQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDZixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUUsQ0FBQztZQUVELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osU0FBUyxFQUFFLENBQUM7WUFDaEIsQ0FBQztRQUNMLENBQUM7UUFDTCxnQkFBQztJQUFELENBbkRBLEFBbURDLENBbkQ4QixVQUFPLEdBbURyQztJQW5EWSxZQUFTLFlBbURyQixDQUFBO0lBQUEsQ0FBQztBQUNOLENBQUMsRUFyRFMsRUFBRSxLQUFGLEVBQUUsUUFxRFg7QUFBQSxDQUFDOztBQ3ZERixZQUFZLENBQUM7Ozs7OztBQUViLElBQVUsRUFBRSxDQWdHWDtBQWhHRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBVVY7UUFBb0Msa0NBQU87UUFTdkMsd0JBQVksTUFBa0IsRUFBRSxPQUF3QixFQUFFLFNBQTRCO1lBVDFGLGlCQXFGQztZQTVFbUMsdUJBQXdCLEdBQXhCLFlBQXdCO1lBQUUseUJBQTRCLEdBQTVCLGdCQUE0QjtZQUNsRixJQUFNLEVBQUUsR0FBMkIsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7WUFDekQsQ0FBQztZQUNELGtCQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBRWpCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQzdFLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDN0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztZQUVsQyxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxDQUFDO1lBR3pELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUdaLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUV6RCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFFOUIsRUFBRSxDQUFDLFVBQVUsQ0FDVCxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQy9CLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUNuQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUNsQyxDQUFDO1lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQVUsRUFBRSxDQUFTO2dCQUNqQyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQ25DLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUNQLEtBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQy9CLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUdILElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVU7Z0JBQzVDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVTtnQkFDNUMsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVO2FBQy9DLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxRSxDQUFDO1lBRUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDWixTQUFTLEVBQUUsQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQzs7UUFDRCxzQkFBSSxpQ0FBSztpQkFBVCxjQUFzQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7aUJBQzVDLFVBQVUsS0FBYTtnQkFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixDQUFDO1lBQ0wsQ0FBQzs7O1dBTjJDOzs7UUFPckMsaUNBQVEsR0FBZjtZQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7UUFDTCxDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQXJGQSxBQXFGQyxDQXJGbUMsVUFBTyxHQXFGMUM7SUFyRlksaUJBQWMsaUJBcUYxQixDQUFBO0lBQUEsQ0FBQztBQUNOLENBQUMsRUFoR1MsRUFBRSxLQUFGLEVBQUUsUUFnR1g7QUFBQSxDQUFDOztBQ2xHRixZQUFZLENBQUM7Ozs7OztBQUViLElBQVUsRUFBRSxDQWdGWDtBQWhGRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBSVY7UUFBK0IsNkJBQU87UUFRbEMsbUJBQWEsSUFBSSxFQUFFLElBQWMsRUFBRSxPQUF3QixFQUFFLFNBQTRCO1lBQXRELHVCQUF3QixHQUF4QixZQUF3QjtZQUFFLHlCQUE0QixHQUE1QixnQkFBNEI7WUFDckYsSUFBTSxFQUFFLEdBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1lBQ3pELENBQUM7WUFDRCxrQkFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRW5DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUM3RSxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQzdELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7WUFFbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQ0FBQztZQUd6RCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFHWixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsRUFBRSxDQUFDLG9CQUFvQixDQUNuQixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixDQUFDLEVBQ0QsSUFBSSxDQUNSLENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osRUFBRSxDQUFDLFVBQVUsQ0FDVCxJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLGdCQUFnQixFQUNyQixJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixDQUFDLEVBQ0QsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FDUixDQUFDO1lBQ0wsQ0FBQztZQUdELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVU7Z0JBQzVDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVTtnQkFDNUMsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVO2FBQy9DLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxRSxDQUFDO1lBRUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDWixTQUFTLEVBQUUsQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQzs7UUFDTCxnQkFBQztJQUFELENBM0VBLEFBMkVDLENBM0U4QixVQUFPLEdBMkVyQztJQTNFWSxZQUFTLFlBMkVyQixDQUFBO0lBQUEsQ0FBQztBQUNOLENBQUMsRUFoRlMsRUFBRSxLQUFGLEVBQUUsUUFnRlg7QUFBQSxDQUFDOztBQ2xGRixZQUFZLENBQUM7Ozs7OztBQUViLElBQVUsRUFBRSxDQWlGWDtBQWpGRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBS1Y7UUFBa0MsZ0NBQU87UUFTckMsc0JBQVksS0FBdUIsRUFBRSxJQUFvQixFQUNyRCxTQUFzQixFQUFFLFNBQTRCO1lBRG5CLG9CQUFvQixHQUFwQixXQUFvQjtZQUNyRCx5QkFBc0IsR0FBdEIsY0FBc0I7WUFBRSx5QkFBNEIsR0FBNUIsZ0JBQTRCO1lBRXBELGtCQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXZDLElBQU0sRUFBRSxHQUEyQixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWpFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFFeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUNuRCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFFakIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRVosSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRWQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBSTNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNmLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxRSxDQUFDO1lBRUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFMUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDWixTQUFTLEVBQUUsQ0FBQztZQUNoQixDQUFDO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVuQixXQUFXLENBQUM7Z0JBQ1IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0IsQ0FBQzs7UUFDTSw2QkFBTSxHQUFiO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFHcEUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBTSxFQUFFLEdBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakUsRUFBRSxDQUFDLFVBQVUsQ0FDVCxJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLGdCQUFnQixFQUNyQixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FDZixDQUFDO1lBQ0QsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7O1FBQ00sOEJBQU8sR0FBZDtZQUNJLGdCQUFLLENBQUMsT0FBTyxXQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQTNFQSxBQTJFQyxDQTNFaUMsVUFBTyxHQTJFeEM7SUEzRVksZUFBWSxlQTJFeEIsQ0FBQTtJQUFBLENBQUM7QUFDTixDQUFDLEVBakZTLEVBQUUsS0FBRixFQUFFLFFBaUZYO0FBQUEsQ0FBQzs7QUNuRkYsWUFBWSxDQUFDOzs7Ozs7QUFFYixJQUFVLEVBQUUsQ0FrQlg7QUFsQkQsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUtWO1FBQTRCLGlDQUFZO1FBTXBDLHVCQUFZLElBQStDLEVBQUUsU0FBNEI7WUFBN0Usb0JBQStDLEdBQS9DLE9BQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDO1lBQUUseUJBQTRCLEdBQTVCLGdCQUE0QjtZQUNyRixrQkFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBRTlDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoQyxDQUFDOztRQUNMLG9CQUFDO0lBQUQsQ0FaQSxBQVlDLENBWjJCLGVBQVksR0FZdkM7SUFBQSxDQUFDO0FBQ04sQ0FBQyxFQWxCUyxFQUFFLEtBQUYsRUFBRSxRQWtCWDtBQUFBLENBQUMiLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIENvcHlyaWdodCAoQykgMjAxNiBbTW9ua2V5QnJ1c2guanNdXG4vLy9cbi8vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXNcbi8vLyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmVcbi8vLyB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksXG4vLy8gbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xuLy8vIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nXG4vLy8gY29uZGl0aW9uczpcbi8vL1xuLy8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vLy9cbi8vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuLy8vIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlNcbi8vLyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG4vLy8gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cblwidXNlIHN0cmljdFwiO1xuXG5uYW1lc3BhY2UgTUIge1xuICAgIGV4cG9ydCBjb25zdCBWRVJTSU9OOiBzdHJpbmcgPSBcIjEuOS4wXCI7XG59O1xuIiwiLy8vIENvcHlyaWdodCAoQykgMjAxNiBbTW9ua2V5QnJ1c2guanNdXG4vLy9cbi8vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXNcbi8vLyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmVcbi8vLyB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksXG4vLy8gbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xuLy8vIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nXG4vLy8gY29uZGl0aW9uczpcbi8vL1xuLy8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vLy9cbi8vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuLy8vIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlNcbi8vLyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG4vLy8gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmlmIChOdW1iZXJbXCJlcHNpbG9uXCJdID09PSB1bmRlZmluZWQpIHtcbiAgICBOdW1iZXJbXCJlcHNpbG9uXCJdID0gMC4wMDAxO1xufVxuaWYgKE51bWJlcltcInNtYWxsRXBzaWxvblwiXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgTnVtYmVyW1wic21hbGxFcHNpbG9uXCJdID0gMC4wMDAwMDAxO1xufVxuaWYgKE51bWJlcltcImRlZmF1bHRJT1JcIl0gPT09IHVuZGVmaW5lZCkge1xuICAgIE51bWJlcltcImRlZmF1bHRJT1JcIl0gPSAxLjAwMDI3Nztcbn1cblxuaWYgKE1hdGhbXCJkZWdyZWVcIl0gPT09IHVuZGVmaW5lZCkge1xuICAgIE1hdGhbXCJkZWdyZWVcIl0gPSBNYXRoLlBJIC8gMTgwLjA7XG59O1xuaWYgKE1hdGhbXCJ0b1JhZGlhblwiXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgTWF0aFtcInRvUmFkaWFuXCJdID0gZnVuY3Rpb24oYSkge1xuICAgICAgICByZXR1cm4gYSAqIE1hdGhbXCJkZWdyZWVcIl07XG4gICAgfTtcbn07XG5pZiAoTWF0aFtcInRydW5jXCJdID09PSB1bmRlZmluZWQpIHtcbiAgICBNYXRoW1widHJ1bmNcIl0gPSBmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiB4IC0geCAlIDE7XG4gICAgfTtcbn07XG4vKlxuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xufTtcbk5vZGVMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBIVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaSA9IHRoaXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKHRoaXNbaV0gJiYgdGhpc1tpXS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzW2ldLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuQXJyYXkucHJvdG90eXBlLmluZGV4T2YgfHwgKEFycmF5LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24oZCwgZSkge1xuICAgIHZhciBhO1xuICAgIGlmIChudWxsID09IHRoaXMpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widGhpc1wiIGlzIG51bGwgb3Igbm90IGRlZmluZWQnKTtcbiAgICB2YXIgYyA9IE9iamVjdCh0aGlzKSxcbiAgICAgICAgYiA9IGMubGVuZ3RoID4+PiAwO1xuICAgIGlmICgwID09PSBiKSByZXR1cm4gLTE7XG4gICAgYSA9ICtlIHx8IDA7XG4gICAgSW5maW5pdHkgPT09IE1hdGguYWJzKGEpICYmIChhID0gMCk7XG4gICAgaWYgKGEgPj0gYikgcmV0dXJuIC0xO1xuICAgIGZvciAoYSA9IE1hdGgubWF4KDAgPD0gYSA/IGEgOiBiIC0gTWF0aC5hYnMoYSksIDApOyBhIDwgYjspIHtcbiAgICAgICAgaWYgKGEgaW4gYyAmJiBjW2FdID09PSBkKSByZXR1cm4gYTtcbiAgICAgICAgYSsrXG4gICAgfVxuICAgIHJldHVybiAtMVxufSk7XG5cbmlmICghQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXggPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LnByb3RvdHlwZS5maW5kSW5kZXggY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdCA9IE9iamVjdCh0aGlzKTtcbiAgICAgICAgdmFyIGxlbmd0aCA9IGxpc3QubGVuZ3RoID4+PiAwO1xuICAgICAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgdmFyIHZhbHVlO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgbGlzdCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcbn1cbiovXG4vKkFycmF5LnByb3RvdHlwZS5yZW1vdmVCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUucmVtb3ZlQnlJbmRleCBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgICB9XG4gICAgaWYgKGluZGV4ICsgMSA+IHRoaXMubGVuZ3RoIHx8IGluZGV4IDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcnJheSBsaW1pdCBpbmRleFwiKTtcbiAgICB9XG4gICAgLy90aGlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHRoaXM7XG59OyovXG4iLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCwiLy8vIENvcHlyaWdodCAoQykgMjAxNiBbTW9ua2V5QnJ1c2guanNdXG4vLy9cbi8vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXNcbi8vLyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmVcbi8vLyB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksXG4vLy8gbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xuLy8vIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nXG4vLy8gY29uZGl0aW9uczpcbi8vL1xuLy8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vLy9cbi8vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuLy8vIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlNcbi8vLyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcbi8vLyBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG4vLy8gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cblwidXNlIHN0cmljdFwiO1xuXG5uYW1lc3BhY2UgTUIge1xuICAgIGV4cG9ydCBjbGFzcyBDYW1lcmEyIHtcbiAgICAgICAgLy8gQ2FtZXJhIGF0dHJzXG4gICAgICAgIHByb3RlY3RlZCBwb3NpdGlvbjogTUIuVmVjdDM7XG4gICAgICAgIHByb3RlY3RlZCBmcm9udDogTUIuVmVjdDM7XG4gICAgICAgIHByb3RlY3RlZCB1cDogTUIuVmVjdDM7XG4gICAgICAgIHByb3RlY3RlZCByaWdodDogTUIuVmVjdDM7XG4gICAgICAgIHByb3RlY3RlZCB3b3JsZFVwOiBNQi5WZWN0MztcblxuICAgICAgICAvLyBFdWxlciBhbmdsZXNcbiAgICAgICAgcHJvdGVjdGVkIHlhdzogbnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgcGl0Y2g6IG51bWJlcjtcblxuICAgICAgICAvLyBDYW1lcmEgb3B0aW9uc1xuICAgICAgICBwcm90ZWN0ZWQgbW92U3BlZWQ6IG51bWJlciA9IDAuMDU7XG4gICAgICAgIHByb3RlY3RlZCBtb3VzZVNlbnNpdml0eTogbnVtYmVyID0gMC4yNTtcbiAgICAgICAgcHJvdGVjdGVkIF91cGRhdGVDYW1lcmE6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgcHVibGljIHRpbWVFbGFwc2VkOiBudW1iZXI7XG5cbiAgICAgICAgcHVibGljIEdldFBvcygpOiBNQi5WZWN0MyB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXRIb21lKHY6IE1CLlZlY3QzKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gdjtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FtZXJhVmVjdG9ycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3RydWN0b3IocG9zaXRpb246IE1CLlZlY3QzID0gbmV3IE1CLlZlY3QzKDAsIDAsIDApLFxuICAgICAgICAgICAgdXA6IE1CLlZlY3QzID0gbmV3IE1CLlZlY3QzKDAsIDEsIDApLCB5YXc6IG51bWJlciA9IC05MC4wLCBwaXRjaDogbnVtYmVyID0gMC4wKSB7XG4gICAgICAgICAgICB0aGlzLmZyb250ID0gbmV3IE1CLlZlY3QzKDAsIDAsIC0xKTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgICAgIHRoaXMud29ybGRVcCA9IHVwO1xuICAgICAgICAgICAgdGhpcy55YXcgPSB5YXc7XG4gICAgICAgICAgICB0aGlzLnBpdGNoID0gcGl0Y2g7XG5cbiAgICAgICAgICAgIHRoaXMucmlnaHQgPSBuZXcgTUIuVmVjdDMoKTtcbiAgICAgICAgICAgIHRoaXMudXAgPSBuZXcgTUIuVmVjdDMoKTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYW1lcmFWZWN0b3JzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHVwZGF0ZShjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbWVyYSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBsZXQgc3BlZWQgPSAxLjA7XG5cbiAgICAgICAgICAgIGlmIChNQi5JbnB1dC5pc0tleVByZXNzZWQoTUIuY3Rlcy5LZXlTdGF0ZS5MZWZ0X1NoaWZ0KSkge1xuICAgICAgICAgICAgICAgIHNwZWVkID0gMi41O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoTUIuSW5wdXQuaXNLZXlQcmVzc2VkKE1CLmN0ZXMuS2V5U3RhdGUuWikpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3YgPiAzMC4wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm92IC09IDAuNTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2FtZXJhID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTUIuSW5wdXQuaXNLZXlQcmVzc2VkKE1CLmN0ZXMuS2V5U3RhdGUuWCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3YgPCA5MC4wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm92ICs9IDAuNTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2FtZXJhID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChNQi5JbnB1dC5pc0tleVByZXNzZWQoTUIuY3Rlcy5LZXlTdGF0ZS5XKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0tleWJvYXJkKDQsIHNwZWVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDYW1lcmEgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE1CLklucHV0LmlzS2V5UHJlc3NlZChNQi5jdGVzLktleVN0YXRlLlMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzS2V5Ym9hcmQoNSwgc3BlZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbWVyYSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTUIuSW5wdXQuaXNLZXlQcmVzc2VkKE1CLmN0ZXMuS2V5U3RhdGUuQSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NLZXlib2FyZCgyLCBzcGVlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2FtZXJhID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChNQi5JbnB1dC5pc0tleVByZXNzZWQoTUIuY3Rlcy5LZXlTdGF0ZS5EKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0tleWJvYXJkKDMsIHNwZWVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDYW1lcmEgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE1CLklucHV0LmlzS2V5UHJlc3NlZChNQi5jdGVzLktleVN0YXRlLkUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzS2V5Ym9hcmQoMCwgc3BlZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbWVyYSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTUIuSW5wdXQuaXNLZXlQcmVzc2VkKE1CLmN0ZXMuS2V5U3RhdGUuUSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NLZXlib2FyZCgxLCBzcGVlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2FtZXJhID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChNQi5JbnB1dC5pc0tleVByZXNzZWQoMzgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTW91c2VNb3ZlbWVudCgwLjAsIDIuNSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2FtZXJhID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChNQi5JbnB1dC5pc0tleVByZXNzZWQoNDApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTW91c2VNb3ZlbWVudCgwLjAsIC0yLjUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbWVyYSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTUIuSW5wdXQuaXNLZXlQcmVzc2VkKDM3KSkge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMucHJvY2Vzc01vdXNlTW92ZW1lbnQoMi41LCAwLjApO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc01vdXNlTW92ZW1lbnQoLTIuNSwgMC4wKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDYW1lcmEgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE1CLklucHV0LmlzS2V5UHJlc3NlZCgzOSkpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnByb2Nlc3NNb3VzZU1vdmVtZW50KC0yLjUsIDAuMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTW91c2VNb3ZlbWVudCgyLjUsIDAuMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2FtZXJhID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl91cGRhdGVDYW1lcmEgJiYgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHByb2Nlc3NLZXlib2FyZChkaXJlY3Rpb246IG51bWJlciwgc3BlZWQ6IG51bWJlciA9IDEuMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZUVsYXBzZWQgPiAyNSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHZlbG9jaXR5ID0gdGhpcy5tb3ZTcGVlZCAqIHRoaXMudGltZUVsYXBzZWQgKiBzcGVlZDtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRpcmVjdGlvbik7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IE1CLlZlY3QzLnNjYWxlQW5kQWRkKHRoaXMucG9zaXRpb24sIHRoaXMuZnJvbnQsIHZlbG9jaXR5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IE1CLlZlY3QzLnNjYWxlQW5kQWRkKHRoaXMucG9zaXRpb24sIHRoaXMuZnJvbnQsIC12ZWxvY2l0eSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSBNQi5WZWN0My5zY2FsZUFuZEFkZCh0aGlzLnBvc2l0aW9uLCB0aGlzLnJpZ2h0LCAtdmVsb2NpdHkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IDMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gTUIuVmVjdDMuc2NhbGVBbmRBZGQodGhpcy5wb3NpdGlvbiwgdGhpcy5yaWdodCwgdmVsb2NpdHkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IDQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gTUIuVmVjdDMuc2NhbGVBbmRBZGQodGhpcy5wb3NpdGlvbiwgdGhpcy51cCwgdmVsb2NpdHkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IDUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gTUIuVmVjdDMuc2NhbGVBbmRBZGQodGhpcy5wb3NpdGlvbiwgdGhpcy51cCwgLXZlbG9jaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBwcm9jZXNzTW91c2VNb3ZlbWVudCh4T2Zmc2V0OiBudW1iZXIsIHlPZmZzZXQ6IG51bWJlcikge1xuICAgICAgICAgICAgeE9mZnNldCAqPSB0aGlzLm1vdlNwZWVkICogMi4wICogdGhpcy50aW1lRWxhcHNlZDtcbiAgICAgICAgICAgIHlPZmZzZXQgKj0gdGhpcy5tb3ZTcGVlZCAqIDIuMCAqIHRoaXMudGltZUVsYXBzZWQ7XG5cbiAgICAgICAgICAgIHRoaXMueWF3ICs9IHhPZmZzZXQ7XG4gICAgICAgICAgICB0aGlzLnBpdGNoICs9IHlPZmZzZXQ7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBpdGNoID4gODkuMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGl0Y2ggPSA4OS4wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMucGl0Y2ggPCAtODkuMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGl0Y2ggPSAtODkuMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FtZXJhVmVjdG9ycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHVwZGF0ZUNhbWVyYVZlY3RvcnMoKSB7XG4gICAgICAgICAgICBjb25zdCBmcm9udDogTUIuVmVjdDMgPSBuZXcgTUIuVmVjdDMoXG4gICAgICAgICAgICAgICAgTWF0aC5jb3MoTWF0aFtcInRvUmFkaWFuXCJdKHRoaXMueWF3KSkgKiBNYXRoLmNvcyhNYXRoW1widG9SYWRpYW5cIl0odGhpcy5waXRjaCkpLFxuICAgICAgICAgICAgICAgIE1hdGguc2luKE1hdGhbXCJ0b1JhZGlhblwiXSh0aGlzLnBpdGNoKSksXG4gICAgICAgICAgICAgICAgTWF0aC5zaW4oTWF0aFtcInRvUmFkaWFuXCJdKHRoaXMueWF3KSkgKiBNYXRoLmNvcyhNYXRoW1widG9SYWRpYW5cIl0odGhpcy5waXRjaCkpXG4gICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmZyb250ID0gZnJvbnQubm9ybWFsaXplKCk7XG5cbiAgICAgICAgICAgIC8vIFJlY2FsY3VsYXRlIHJpZ2h0IGFuZCB1cCB2ZWN0b3JcbiAgICAgICAgICAgIHRoaXMucmlnaHQgPSBNQi5WZWN0My5jcm9zcyh0aGlzLmZyb250LCB0aGlzLndvcmxkVXApLm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgdGhpcy51cCA9IE1CLlZlY3QzLmNyb3NzKHRoaXMucmlnaHQsIHRoaXMuZnJvbnQpLm5vcm1hbGl6ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIEdldFZpZXdNYXRyaXgoKTogTUIuTWF0NCB7XG4gICAgICAgICAgICByZXR1cm4gTUIuTWF0NC5sb29rQXQoXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbixcbiAgICAgICAgICAgICAgICBNQi5WZWN0My5hZGQoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvbnRcbiAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGhpcy51cFxuICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBHZXRPcnRob1Byb2plY3Rpb25NYXRyaXgodzogbnVtYmVyLCBoOiBudW1iZXIpOiBNQi5NYXQ0IHtcbiAgICAgICAgICAgIGNvbnN0IHlNaW4gPSAtMC4wMDAxICogTWF0aC50YW4odGhpcy5mb3YgKiBNYXRoLlBJIC8gMzYwLjApO1xuICAgICAgICAgICAgY29uc3QgeU1heCA9IC15TWluO1xuICAgICAgICAgICAgY29uc3QgeE1pbiA9IHlNaW4gKyAodyAqIDEuMCkgLyAoaCAqIDEuMCk7XG4gICAgICAgICAgICBjb25zdCB4TWF4ID0geU1heCArICh3ICogMS4wKSAvIChoICogMS4wKTtcbiAgICAgICAgICAgIHJldHVybiBNQi5NYXQ0Lm9ydGhvZ3JhcGhpYyh4TWluLCB4TWF4LCB5TWluLCB5TWF4LCAwLjAwMDEsIDExMDAwLjApO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBHZXRQcm9qZWN0aW9uTWF0cml4KHc6IG51bWJlciwgaDogbnVtYmVyKTogTUIuTWF0NCB7XG4gICAgICAgICAgICByZXR1cm4gTUIuTWF0NC5wZXJzcGVjdGl2ZSh0aGlzLmZvdiwgKHcgKiAxLjApIC8gKGggKiAxLjApLCAwLjAwMDEsIDEwMDAuMCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZm92OiBudW1iZXIgPSA0NS4wO1xuICAgIH07XG59O1xuIiwibmFtZXNwYWNlIE1CIHtcclxuICAgIGV4cG9ydCBuYW1lc3BhY2UgRGVjb3JhdG9ycyB7XHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIHNlYWxlZChjb25zdHJ1Y3RvcjogRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgT2JqZWN0LnNlYWwoY29uc3RydWN0b3IpO1xyXG4gICAgICAgICAgICBPYmplY3Quc2VhbChjb25zdHJ1Y3Rvci5wcm90b3R5cGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIGxvZ1Byb3BlcnR5KHRhcmdldDogYW55LCBrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgbmV3S2V5ID0gYF9fbG9nZ2VkJHtrZXl9YDtcclxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgbmV3S2V5LCB7XHJcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0YXJnZXRba2V5XVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gcHJvcGVydHkgZ2V0dGVyXHJcbiAgICAgICAgICAgIGxldCBnZXR0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gdGhpc1tuZXdLZXldO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEdldDogJHtrZXl9ID0+ICR7dmFsfWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIHByb3BlcnR5IHNldHRlclxyXG4gICAgICAgICAgICBsZXQgc2V0dGVyID0gZnVuY3Rpb24gKG5ld1ZhbDogYW55KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgU2V0OiAke2tleX0gPT4gJHtuZXdWYWx9YCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzW25ld0tleV0gPSBuZXdWYWw7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBEZWxldGUgcHJvcGVydHkuXHJcbiAgICAgICAgICAgIGlmIChkZWxldGUgdGhpc1trZXldKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIG5ldyBwcm9wZXJ0eSB3aXRoIGdldHRlciBhbmQgc2V0dGVyXHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXQ6IGdldHRlcixcclxuICAgICAgICAgICAgICAgICAgICBzZXQ6IHNldHRlcixcclxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG4iLCIvLy8gQ29weXJpZ2h0IChDKSAyMDE2IFtNb25rZXlCcnVzaC5qc11cbi8vL1xuLy8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpc1xuLy8vIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZVxuLy8vIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSxcbi8vLyBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvXG4vLy8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmdcbi8vLyBjb25kaXRpb25zOlxuLy8vXG4vLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vL1xuLy8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG4vLy8gRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SU1xuLy8vIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbi8vLyBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuXCJ1c2Ugc3RyaWN0XCI7XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9kYXQtZ3VpLmQudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3Mvc3RhdHMuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy92YW5pbGxhLXRvYXN0cy92YW5pbGxhLXRvYXN0cy5kLnRzXCIgLz5cblxubmFtZXNwYWNlIE1CIHtcbiAgICBARGVjb3JhdG9ycy5zZWFsZWRcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgU2NlbmUge1xuXG4gICAgICAgIHByb3RlY3RlZCBfc3RhdHM6IFN0YXRzO1xuICAgICAgICBwcm90ZWN0ZWQgX2d1aTogZGF0LkdVSTtcbiAgICAgICAgcHJvdGVjdGVkIF93ZWJnbFZlcnNpb247XG5cbiAgICAgICAgcHJvdGVjdGVkIHRleHQ6IGFueTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih0ZXh0OiBhbnksIHRpdGxlOiBzdHJpbmcgPSBudWxsLCB3ZWJnbFZlcnNpb246IG51bWJlciA9IDIpIHtcbiAgICAgICAgICAgIE1CLkxvZy5pbmZvKFwiaW5pdCBzY2VuZVwiKTtcbiAgICAgICAgICAgIGlmICghd2ViZ2xWZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgd2ViZ2xWZXJzaW9uID0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE1CLkNvbnRleHQud2ViZ2xWZXJzaW9uID0gd2ViZ2xWZXJzaW9uO1xuICAgICAgICAgICAgTUIuQ29yZS5nZXRJbnN0YW5jZSgpO1xuXG4gICAgICAgICAgICB0aGlzLl93ZWJnbFZlcnNpb24gPSB3ZWJnbFZlcnNpb247XG4gICAgICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuXG4gICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlIHx8IGBXZWJHTCR7d2ViZ2xWZXJzaW9ufSBhcHBgO1xuXG4gICAgICAgICAgICB0aGlzLl9faW5pdF9fKHRleHQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHB1YmxpYyB3ZWJnbFZlcnNpb24oKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWJnbFZlcnNpb247XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGxvYWRBc3NldHMoKSAge31cbiAgICAgICAgcHVibGljIGNhbWVyYVVwZGF0ZSgpIHt9XG4gICAgICAgIHB1YmxpYyB0ZXh0Q0IoZzogZGF0LkdVSSkge31cblxuICAgICAgICBhYnN0cmFjdCBpbml0aWFsaXplKCk7XG4gICAgICAgIGFic3RyYWN0IHVwZGF0ZShkdDogbnVtYmVyKTtcbiAgICAgICAgYWJzdHJhY3QgZHJhdyhkdD86IG51bWJlcik7XG5cbiAgICAgICAgcHJpdmF0ZSBfX2luaXRfXyh0ZXh0KSB7XG4gICAgICAgICAgICBNQi5Db3JlLmdldEluc3RhbmNlKCkuaW5pdGlhbGl6ZShbMS4wLCAxLjAsIDEuMCwgMS4wXSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2d1aSA9IG5ldyBkYXQuR1VJKCk7XG5cbiAgICAgICAgICAgIHRoaXMudGV4dENCKHRoaXMuX2d1aSk7XG5cbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuX2d1aS5hZGQodGV4dCwgXCJyZXN1bWVcIiwgdHJ1ZSkub25DaGFuZ2UoZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgIGlmICh2ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgc2VsZi5yZXN1bWUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3N0YXRzID0gbmV3IFN0YXRzKCk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0cy5zZXRNb2RlKDApO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9zdGF0cy5kb21FbGVtZW50KTtcblxuICAgICAgICAgICAgdGhpcy5sb2FkQXNzZXRzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgc3RhdHMoKTogU3RhdHMge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXJ0KCkge1xuICAgICAgICAgICAgbGV0IHNlbGY6IFNjZW5lID0gdGhpcztcbiAgICAgICAgICAgIE1CLlJlc291cmNlTWFwLnNldExvYWRDb21wbGV0ZUNhbGxiYWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIE1CLkxvZy5pbmZvKFwiQUxMIFJFU09VUkNFUyBMT0FERUQhISEhXCIpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5pbml0aWFsaXplKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgbG9hZGVyIGNzczMgd2luZG93XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcGlubmVyXCIpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gTUIuQ29yZS5nZXRJbnN0YW5jZSgpLmNhbnZhcygpLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIC8vICAgICB2YXIgZWw6IGFueSA9IE1CLkNvcmUuZ2V0SW5zdGFuY2UoKS5jYW52YXMoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKGVsLndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBlbC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbigpO1xuICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgLy8gICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgZWwubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIF9fcmVuZGVyX18oZHQ/OiBudW1iZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfX3JlbmRlcl9fKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGR0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1CLklucHV0LnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRzLmJlZ2luKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdCAqPSAwLjAwMTsgLy8gY29udmVydCB0byBzZWNvbmRzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIE1CLlRpbWVyLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWxmLl9fcmVzaXplX18oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX3Jlc3VtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlKGR0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRyYXcoZHQpOyAgICAvLyBEcmF3IHVzZXIgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0cy5lbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSkoMC4wKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIFZhbmlsbGFUb2FzdHMuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yOlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYCR7ZX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJlcnJvclwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgcHVibGljIHBhdXNlKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQQVVTRVwiKTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc3VtZSA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICBwdWJsaWMgcmVzdW1lKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSRVNVTUVcIik7XG4gICAgICAgICAgICB0aGlzLl9yZXN1bWUgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHByb3RlY3RlZCBfcmVzdW1lOiBib29sZWFuID0gdHJ1ZTtcblxuICAgICAgICBwcm90ZWN0ZWQgX19yZXNpemVfXygpIHtcbiAgICAgICAgICAgIGxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gTUIuQ29yZS5nZXRJbnN0YW5jZSgpLmNhbnZhcygpO1xuICAgICAgICAgICAgbGV0IHJlYWxUb0NTU1BpeGVscyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5cbiAgICAgICAgICAgIC8vIExvb2t1cCB0aGUgc2l6ZSB0aGUgYnJvd3NlciBpcyBkaXNwbGF5aW5nIHRoZSBjYW52YXMgaW4gQ1NTIHBpeGVsc1xuICAgICAgICAgICAgLy8gYW5kIGNvbXB1dGUgYSBzaXplIG5lZWRlZCB0byBtYWtlIG91ciBkcmF3aW5nYnVmZmVyIG1hdGNoIGl0IGluXG4gICAgICAgICAgICAvLyBkZXZpY2UgcGl4ZWxzLlxuICAgICAgICAgICAgbGV0IGRpc3BsYXlXaWR0aCAgPSBNYXRoLmZsb29yKGNhbnZhcy5jbGllbnRXaWR0aCAgKiByZWFsVG9DU1NQaXhlbHMpO1xuICAgICAgICAgICAgbGV0IGRpc3BsYXlIZWlnaHQgPSBNYXRoLmZsb29yKGNhbnZhcy5jbGllbnRIZWlnaHQgKiByZWFsVG9DU1NQaXhlbHMpO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgY2FudmFzIGlzIG5vdCB0aGUgc2FtZSBzaXplLlxuICAgICAgICAgICAgaWYgKGNhbnZhcy53aWR0aCAgIT09IGRpc3BsYXlXaWR0aCB8fFxuICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgIT09IGRpc3BsYXlIZWlnaHQpIHtcblxuICAgICAgICAgICAgICAgIC8vIE1ha2UgdGhlIGNhbnZhcyB0aGUgc2FtZSBzaXplXG4gICAgICAgICAgICAgICAgY2FudmFzLndpZHRoICA9IGRpc3BsYXlXaWR0aDtcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gZGlzcGxheUhlaWdodDtcblxuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgdmlld3BvcnQgdG8gbWF0Y2hcbiAgICAgICAgICAgICAgICBNQi5Db3JlLmdldEluc3RhbmNlKCkuY2hhbmdlVmlld3BvcnQoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2FtZXJhVXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiIsIi8vLyBDb3B5cmlnaHQgKEMpIDIwMTYgW01vbmtleUJydXNoLmpzXVxuLy8vXG4vLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzXG4vLy8gc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlXG4vLy8gd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LFxuLy8vIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cbi8vLyBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xuLy8vIGNvbmRpdGlvbnM6XG4vLy9cbi8vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy8vXG4vLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbi8vLyBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTXG4vLy8gT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxuLy8vIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5cInVzZSBzdHJpY3RcIjtcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL3ZhbmlsbGEtdG9hc3RzL3ZhbmlsbGEtdG9hc3RzLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgTUIge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFwcCB7XG4gICAgICAgIHRpdGxlPzogc3RyaW5nO1xuICAgICAgICB3ZWJnbFZlcnNpb24/OiBudW1iZXI7XG4gICAgICAgIGxvYWRBc3NldHM6ICgpID0+IHZvaWQ7XG4gICAgICAgIGluaXRpYWxpemU6IChhcHBfOiBBcHApID0+IHZvaWQ7XG4gICAgICAgIHVwZGF0ZTogKGFwcF86IEFwcCwgZHQ6IG51bWJlcikgPT4gdm9pZDtcbiAgICAgICAgZHJhdzogKGFwcF86IEFwcCwgZHQ/OiBudW1iZXIpID0+IHZvaWQ7XG4gICAgICAgIGNhbWVyYVVwZGF0ZTogKCkgPT4gdm9pZDtcbiAgICAgICAgdGV4dENCOiAoZ3VpOiBkYXQuR1VJKSA9PiB2b2lkO1xuICAgIH1cblxuICAgIEBEZWNvcmF0b3JzLnNlYWxlZFxuICAgIGV4cG9ydCBjbGFzcyBBcHAge1xuXG4gICAgICAgIHByb3RlY3RlZCBzdGF0czogU3RhdHM7XG4gICAgICAgIHByb3RlY3RlZCBndWk6IGRhdC5HVUk7XG5cbiAgICAgICAgcHJvdGVjdGVkIGNhbWVyYVVwZGF0ZUNiO1xuICAgICAgICBjb25zdHJ1Y3Rvcihpbml0OiBJQXBwLCB0ZXh0OiBhbnkpIHtcbiAgICAgICAgICAgIGlmICghaW5pdC53ZWJnbFZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICBpbml0LndlYmdsVmVyc2lvbiA9IDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hcHBGdW5jdGlvbnMgPSBpbml0O1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5fYXBwRnVuY3Rpb25zKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKE1CLkNvbnRleHQud2ViZ2xWZXJzaW9uKTtcbiAgICAgICAgICAgIE1CLkNvbnRleHQud2ViZ2xWZXJzaW9uID0gaW5pdC53ZWJnbFZlcnNpb247XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhNQi5Db250ZXh0LndlYmdsVmVyc2lvbik7XG4gICAgICAgICAgICBNQi5Db3JlLmdldEluc3RhbmNlKCk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gaW5pdC50aXRsZSB8fCBgV2ViR0wke2luaXQud2ViZ2xWZXJzaW9ufSBhcHBgO1xuXG4gICAgICAgICAgICB0aGlzLl9faW5pdF9fKHRleHQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHB1YmxpYyB3ZWJnbFZlcnNpb24oKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBGdW5jdGlvbnMud2ViZ2xWZXJzaW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfX2luaXRfXyh0ZXh0KSB7XG4gICAgICAgICAgICBNQi5Db3JlLmdldEluc3RhbmNlKCkuaW5pdGlhbGl6ZShbMS4wLCAwLjAsIDEuMCwgMS4wXSk7XG5cbiAgICAgICAgICAgIHRoaXMuZ3VpID0gbmV3IGRhdC5HVUkoKTtcblxuICAgICAgICAgICAgdGhpcy5fYXBwRnVuY3Rpb25zLnRleHRDQih0aGlzLmd1aSk7XG5cbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuZ3VpLmFkZCh0ZXh0LCBcInJlc3VtZVwiLCB0cnVlKS5vbkNoYW5nZShmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgICAgaWYgKHYgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICBzZWxmLnJlc3VtZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0cygpO1xuICAgICAgICAgICAgdGhpcy5zdGF0cy5zZXRNb2RlKDApO1xuICAgICAgICAgICAgdGhpcy5zdGF0cy5kb21FbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICAgICAgdGhpcy5zdGF0cy5kb21FbGVtZW50LnN0eWxlLmxlZnQgPSBcIjBcIjtcbiAgICAgICAgICAgIHRoaXMuc3RhdHMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSBcIjBcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5zdGF0cy5kb21FbGVtZW50KTtcblxuICAgICAgICAgICAgdGhpcy5fYXBwRnVuY3Rpb25zLmxvYWRBc3NldHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGFydCgpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIE1CLlJlc291cmNlTWFwLnNldExvYWRDb21wbGV0ZUNhbGxiYWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQUxMIFJFU09VUkNFUyBMT0FERUQhISEhXCIpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5fYXBwRnVuY3Rpb25zLmluaXRpYWxpemUoc2VsZik7XG5cbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgbG9hZGVyIGNzczMgd2luZG93XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcGlubmVyXCIpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgLypNQi5Db3JlLmdldEluc3RhbmNlKCkuY2FudmFzKCkuYWRkRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbDogYW55ID0gTUIuQ29yZS5nZXRJbnN0YW5jZSgpLmNhbnZhcygpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTsqL1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIF9fcmVuZGVyX18oZHQ/OiBudW1iZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfX3JlbmRlcl9fKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGR0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1CLklucHV0LnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRzLmJlZ2luKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdCAqPSAwLjAwMTsgLy8gY29udmVydCB0byBzZWNvbmRzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIE1CLlRpbWVyLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWxmLl9fcmVzaXplX18oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX3Jlc3VtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2FwcEZ1bmN0aW9ucy51cGRhdGUoc2VsZiwgZHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2FwcEZ1bmN0aW9ucy5kcmF3KHNlbGYsIGR0KTsgICAgLy8gRHJhdyB1c2VyIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdHMuZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pKDAuMCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBWYW5pbGxhVG9hc3RzLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvcjpcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGAke2V9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZXJyb3JcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIHB1YmxpYyBwYXVzZSgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUEFVU0VcIik7XG4gICAgICAgICAgICB0aGlzLl9yZXN1bWUgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgcHVibGljIHJlc3VtZSgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVTVU1FXCIpO1xuICAgICAgICAgICAgdGhpcy5fcmVzdW1lID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBwcm90ZWN0ZWQgX3Jlc3VtZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAgICAgcHJvdGVjdGVkIF9fcmVzaXplX18oKSB7XG4gICAgICAgICAgICBsZXQgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IE1CLkNvcmUuZ2V0SW5zdGFuY2UoKS5jYW52YXMoKTtcbiAgICAgICAgICAgIGxldCByZWFsVG9DU1NQaXhlbHMgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgICAgICAgICAvLyBMb29rdXAgdGhlIHNpemUgdGhlIGJyb3dzZXIgaXMgZGlzcGxheWluZyB0aGUgY2FudmFzIGluIENTUyBwaXhlbHNcbiAgICAgICAgICAgIC8vIGFuZCBjb21wdXRlIGEgc2l6ZSBuZWVkZWQgdG8gbWFrZSBvdXIgZHJhd2luZ2J1ZmZlciBtYXRjaCBpdCBpblxuICAgICAgICAgICAgLy8gZGV2aWNlIHBpeGVscy5cbiAgICAgICAgICAgIGxldCBkaXNwbGF5V2lkdGggID0gTWF0aC5mbG9vcihjYW52YXMuY2xpZW50V2lkdGggICogcmVhbFRvQ1NTUGl4ZWxzKTtcbiAgICAgICAgICAgIGxldCBkaXNwbGF5SGVpZ2h0ID0gTWF0aC5mbG9vcihjYW52YXMuY2xpZW50SGVpZ2h0ICogcmVhbFRvQ1NTUGl4ZWxzKTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNhbnZhcyBpcyBub3QgdGhlIHNhbWUgc2l6ZS5cbiAgICAgICAgICAgIGlmIChjYW52YXMud2lkdGggICE9PSBkaXNwbGF5V2lkdGggfHxcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ICE9PSBkaXNwbGF5SGVpZ2h0KSB7XG5cbiAgICAgICAgICAgICAgICAvLyBNYWtlIHRoZSBjYW52YXMgdGhlIHNhbWUgc2l6ZVxuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCAgPSBkaXNwbGF5V2lkdGg7XG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IGRpc3BsYXlIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHZpZXdwb3J0IHRvIG1hdGNoXG4gICAgICAgICAgICAgICAgTUIuQ29yZS5nZXRJbnN0YW5jZSgpLmNoYW5nZVZpZXdwb3J0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNhbWVyYVVwZGF0ZUNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgX2FwcEZ1bmN0aW9uczogSUFwcDtcbiAgICB9O1xufVxuIixudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbF0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
