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
    var Node = (function () {
        function Node(obj, next, prev) {
            if (obj === void 0) { obj = null; }
            if (next === void 0) { next = null; }
            if (prev === void 0) { prev = null; }
            this.obj = obj;
            this.next = next;
            this.prev = prev;
        }
        return Node;
    }());
    MB.Node = Node;
    ;
    var List = (function () {
        function List() {
            this.root = new Node();
            this.root.next = this.root;
            this.root.prev = this.root;
        }
        ;
        List.prototype.first = function () {
            return this.root.next;
        };
        List.prototype.last = function () {
            return this.root.prev;
        };
        List.prototype.pop = function () {
            var ret = this.last().obj;
            this.remove(this.last());
            return ret;
        };
        List.prototype.isEmpty = function () {
            return this.root.next === this.root;
        };
        List.prototype.insertNodeBefore = function (node, ref) {
            if (ref === void 0) { ref = this.root.next; }
            node.next = ref;
            node.prev = ref.prev;
            node.prev.next = node;
            ref.prev = node;
        };
        List.prototype.insertBefore = function (node, ref) {
            if (ref === void 0) { ref = this.root.next; }
            this.insertNodeBefore(new Node(node), ref);
        };
        List.prototype.remove = function (ref) {
            if (ref === this.root)
                return;
            ref.next.prev = ref.prev;
            ref.prev.next = ref.next;
            return ref;
        };
        return List;
    }());
    MB.List = List;
    ;
})(MB || (MB = {}));
;

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
    (function (RotSeq) {
        RotSeq[RotSeq["zyx"] = 0] = "zyx";
        RotSeq[RotSeq["zyz"] = 1] = "zyz";
        RotSeq[RotSeq["zxy"] = 2] = "zxy";
        RotSeq[RotSeq["zxz"] = 3] = "zxz";
        RotSeq[RotSeq["yxz"] = 4] = "yxz";
        RotSeq[RotSeq["yxy"] = 5] = "yxy";
        RotSeq[RotSeq["yzx"] = 6] = "yzx";
        RotSeq[RotSeq["yzy"] = 7] = "yzy";
        RotSeq[RotSeq["xyz"] = 8] = "xyz";
        RotSeq[RotSeq["xyx"] = 9] = "xyx";
        RotSeq[RotSeq["xzy"] = 10] = "xzy";
        RotSeq[RotSeq["xzx"] = 11] = "xzx";
    })(MB.RotSeq || (MB.RotSeq = {}));
    var RotSeq = MB.RotSeq;
    ;
    var EulerAngle = (function () {
        function EulerAngle() {
        }
        EulerAngle._twoaxisrot = function (r11, r12, r21, r31, r32) {
            var res = new MB.Vect3();
            res.x = Math.atan2(r11, r12);
            res.y = Math.acos(r21);
            res.z = Math.atan2(r31, r32);
            return res;
        };
        EulerAngle._threeaxisrot = function (r11, r12, r21, r31, r32) {
            var res = new MB.Vect3();
            res.x = Math.atan2(r31, r32);
            res.y = Math.asin(r21);
            res.z = Math.atan2(r11, r12);
            return res;
        };
        EulerAngle.fromQuaternion = function (q, order) {
            if (order === void 0) { order = RotSeq.xyz; }
            switch (order) {
                case RotSeq.zyx:
                    return this._threeaxisrot(2 * (q.x * q.y + q.w * q.z), q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z, -2 * (q.x * q.z - q.w * q.y), 2 * (q.y * q.z + q.w * q.x), q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z);
                case RotSeq.zyz:
                    return this._twoaxisrot(2 * (q.y * q.z - q.w * q.x), 2 * (q.x * q.z + q.w * q.y), q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z, 2 * (q.y * q.z + q.w * q.x), -2 * (q.x * q.z - q.w * q.y));
                case RotSeq.zxy:
                    return this._threeaxisrot(-2 * (q.x * q.y - q.w * q.z), q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z, 2 * (q.y * q.z + q.w * q.x), -2 * (q.x * q.z - q.w * q.y), q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z);
                case RotSeq.zxz:
                    return this._twoaxisrot(2 * (q.x * q.z + q.w * q.y), -2 * (q.y * q.z - q.w * q.x), q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z, 2 * (q.x * q.z - q.w * q.y), 2 * (q.y * q.z + q.w * q.x));
                case RotSeq.yxz:
                    return this._threeaxisrot(2 * (q.x * q.z + q.w * q.y), q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z, -2 * (q.y * q.z - q.w * q.x), 2 * (q.x * q.y + q.w * q.z), q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z);
                case RotSeq.yxy:
                    return this._twoaxisrot(2 * (q.x * q.y - q.w * q.z), 2 * (q.y * q.z + q.w * q.x), q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z, 2 * (q.x * q.y + q.w * q.z), -2 * (q.y * q.z - q.w * q.x));
                case RotSeq.yzx:
                    return this._threeaxisrot(-2 * (q.x * q.z - q.w * q.y), q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z, 2 * (q.x * q.y + q.w * q.z), -2 * (q.y * q.z - q.w * q.x), q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z);
                case RotSeq.yzy:
                    return this._twoaxisrot(2 * (q.y * q.z + q.w * q.x), -2 * (q.x * q.y - q.w * q.z), q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z, 2 * (q.y * q.z - q.w * q.x), 2 * (q.x * q.y + q.w * q.z));
                case RotSeq.xyz:
                    return this._threeaxisrot(-2 * (q.y * q.z - q.w * q.x), q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z, 2 * (q.x * q.z + q.w * q.y), -2 * (q.x * q.y - q.w * q.z), q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z);
                case RotSeq.xyx:
                    return this._twoaxisrot(2 * (q.x * q.y + q.w * q.z), -2 * (q.x * q.z - q.w * q.y), q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z, 2 * (q.x * q.y - q.w * q.z), 2 * (q.x * q.z + q.w * q.y));
                case RotSeq.xzy:
                    return this._threeaxisrot(2 * (q.y * q.z + q.w * q.x), q.w * q.w - q.x * q.x + q.y * q.y - q.z * q.z, -2 * (q.x * q.y - q.w * q.z), 2 * (q.x * q.z + q.w * q.y), q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z);
                case RotSeq.xzx:
                    return this._twoaxisrot(2 * (q.x * q.z - q.w * q.y), 2 * (q.x * q.y + q.w * q.z), q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z, 2 * (q.x * q.z + q.w * q.y), -2 * (q.x * q.y - q.w * q.z));
                default:
                    throw new Error("Unknown rotation sequence");
            }
        };
        return EulerAngle;
    }());
    MB.EulerAngle = EulerAngle;
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
    var Sphere2D = (function () {
        function Sphere2D(center, radius) {
            this._center = center;
            this._radius = radius;
        }
        Sphere2D.prototype.containtsPoint = function (p) {
            var x = this._center.x - p.x;
            var y = this._center.y - p.y;
            var dist = Math.sqrt((x * x) + (y * y));
            return (Math.abs(this._radius - dist) > 0.001);
        };
        Sphere2D.prototype.intersectsSphere = function (s) {
            var x = this._center.x - s._center.x;
            var y = this._center.y - s._center.y;
            var dist = Math.sqrt((x * x) + (y * y));
            return (this._radius + s._radius > dist);
        };
        return Sphere2D;
    }());
    MB.Sphere2D = Sphere2D;
})(MB || (MB = {}));
;

"use strict";
var MB;
(function (MB) {
    var Sphere3D = (function () {
        function Sphere3D(center, radius) {
            this._center = center;
            this._radius = radius;
        }
        Sphere3D.prototype.containtsPoint = function (p) {
            var x = this._center.x - p.x;
            var y = this._center.y - p.y;
            var z = this._center.z - p.z;
            var dist = Math.sqrt((x * x) + (y * y) + (z * z));
            return (Math.abs(this._radius - dist) > 0.001);
        };
        Sphere3D.prototype.intersectsSphere = function (s) {
            var x = this._center.x - s._center.x;
            var y = this._center.y - s._center.y;
            var z = this._center.z - s._center.z;
            var dist = Math.sqrt((x * x) + (y * y) + (z * z));
            return (this._radius + s._radius > dist);
        };
        return Sphere3D;
    }());
    MB.Sphere3D = Sphere3D;
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
            return MB.Mathf.degToRad(angle);
            ;
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
        Vector4.prototype.copy = function (v) {
            this._x = v._x;
            this._y = v._y;
            this._z = v._z;
            this._w = v._w;
            return this;
        };
        Vector4.prototype.clone = function () {
            return new Vector4(this.x, this.y, this.z, this.w);
        };
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
                MB.GlobalState.setViewport(new MB.Vector4(0, 0, canvas.width, canvas.height));
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
                MB.GlobalState.setViewport(new MB.Vector4(0, 0, canvas.width, canvas.height));
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            MB.GlobalState.initializeAll();
            MB.GlobalState.color.setClearColor(new MB.Color4(0.0, 0.0, 0.0, 1.0));
            this.init();
        };
        Core.prototype.clearColorAndDepth = function () {
            MB.GlobalState.clearBuffers();
        };
        Core.prototype.canvas = function () {
            return this._gl.canvas;
        };
        Core.prototype.init = function () {
            MB.Input.initialize();
            MB.PostProcess.initialize();
            MB.GlobalState.depth.setStatus(true);
            MB.GlobalState.depth.setFunc(MB.ctes.ComparisonFunc.Less);
            MB.GlobalState.culling.setStatus(true);
            MB.GlobalState.blending.setStatus(false);
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
    var CullingState = (function () {
        function CullingState() {
            this._currentFrontFace = null;
            this._cullingEnabled = false;
            this._cullingFaceMode = MB.ctes.FaceSide.FrontAndBack;
        }
        CullingState.prototype.setStatus = function (enabled) {
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
        CullingState.prototype.setFlipSided = function (flipSided) {
            if (this._currentFrontFace !== flipSided) {
                var gl = MB.Core.getInstance().getGL();
                gl.frontFace(flipSided);
                this._currentFrontFace = flipSided;
            }
        };
        ;
        CullingState.prototype.getMode = function () {
            return this._cullingFaceMode;
        };
        ;
        CullingState.prototype.setMode = function (mode) {
            if (this._cullingFaceMode !== mode) {
                var gl = MB.Core.getInstance().getGL();
                gl.cullFace(mode);
                this._cullingFaceMode = mode;
            }
        };
        CullingState.prototype.isEnabled = function () {
            return this._cullingEnabled === true;
        };
        ;
        CullingState.prototype.resetCulling = function () {
            this._cullingEnabled = false;
            this._cullingFaceMode = MB.ctes.FaceSide.FrontAndBack;
        };
        ;
        return CullingState;
    }());
    ;
    var DepthState = (function () {
        function DepthState() {
            this._depthEnabled = false;
            this._currentDepthMask = false;
            this._currentDepthFunc = MB.ctes.ComparisonFunc.LessEqual;
            this._currentDepthClear = null;
            this._znear = 0.0;
            this._zfar = 1.0;
        }
        DepthState.prototype.isEnabled = function () {
            return this._depthEnabled === true;
        };
        ;
        DepthState.prototype.isMask = function () {
            return this._currentDepthMask === true;
        };
        ;
        DepthState.prototype.getCurrentComparisonFunc = function () {
            return this._currentDepthFunc;
        };
        ;
        DepthState.prototype.setFunc = function (depthFunc) {
            if (this._currentDepthFunc !== depthFunc) {
                var gl = MB.Core.getInstance().getGL();
                gl.depthFunc(depthFunc);
                this._currentDepthFunc = depthFunc;
            }
        };
        ;
        DepthState.prototype.setStatus = function (enabled) {
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
        DepthState.prototype.setMask = function (mask) {
            if (this._currentDepthMask !== mask) {
                var gl = MB.Core.getInstance().getGL();
                gl.depthMask(mask);
                this._currentDepthMask = mask;
            }
        };
        ;
        DepthState.prototype.setClear = function (depth) {
            if (this._currentDepthClear !== depth) {
                var gl = MB.Core.getInstance().getGL();
                gl.clearDepth(depth);
                this._currentDepthClear = depth;
            }
        };
        ;
        DepthState.prototype.clearBuffer = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.clear(gl.DEPTH_BUFFER_BIT);
        };
        ;
        DepthState.prototype.reset = function () {
            this._depthEnabled = true;
            this._currentDepthMask = true;
            this._currentDepthFunc = MB.ctes.ComparisonFunc.LessEqual;
            this._currentDepthClear = null;
        };
        ;
        DepthState.prototype.depthRange = function (znear, zfar) {
            if (znear === void 0) { znear = 0.0; }
            if (zfar === void 0) { zfar = 1.0; }
            if (!(znear === this._znear && zfar === this._zfar)) {
                var gl = MB.Core.getInstance().getGL();
                if (znear > zfar || znear < 0.0 || zfar > 1.0) {
                    console.warn("Values out of range [(znear < zfar), (znear > 0), (zfar < 1)]");
                    return;
                }
                gl.depthRange(znear, zfar);
                this._znear = znear;
                this._zfar = zfar;
            }
        };
        ;
        return DepthState;
    }());
    ;
    var ColorState = (function () {
        function ColorState() {
            this._currentColorClear = new MB.Color4(0.0, 0.0, 0.0, 1.0);
        }
        ColorState.prototype.setMask = function (colorMask) {
            if (!this._currentColorMask || this._currentColorMask.isEqual(colorMask) === false) {
                var gl = MB.Core.getInstance().getGL();
                gl.colorMask(colorMask.x, colorMask.y, colorMask.z, colorMask.w);
                this._currentColorMask = colorMask.clone();
            }
        };
        ;
        ColorState.prototype.setClearColor = function (bgColor) {
            console.log(bgColor);
            if (!this._currentColorClear || this._currentColorClear.isEquals(bgColor) === false) {
                var gl = MB.Core.getInstance().getGL();
                gl.clearColor(bgColor.r, bgColor.g, bgColor.b, bgColor.a);
                this._currentColorClear = bgColor.clone();
            }
        };
        ColorState.prototype.reset = function () {
            this._currentColorMask = null;
            this.setMask(new MB.Vector4(true, true, true, true));
            this._currentColorClear = null;
            this.setClearColor(new MB.Color4(0.0, 0.0, 0.0, 1.0));
        };
        ;
        ColorState.prototype.clearBuffer = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.clear(gl.COLOR_BUFFER_BIT);
        };
        return ColorState;
    }());
    ;
    var ScissorsState = (function () {
        function ScissorsState() {
            this._scissorsEnabled = false;
            this._scissorsBox = new MB.Box2D();
        }
        Object.defineProperty(ScissorsState.prototype, "status", {
            set: function (enabled) {
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
            },
            enumerable: true,
            configurable: true
        });
        ;
        ScissorsState.prototype.setRectangle = function (x, y, width, height) {
            var b = new MB.Box2D(new MB.Vect2(x, y), new MB.Vect2(width, height));
            if (!this._scissorsBox.isEqual(b)) {
                var gl = MB.Core.getInstance().getGL();
                gl.scissor(b.min.x, b.min.y, b.max.x, b.max.y);
                this._scissorsBox = b;
            }
        };
        ;
        ScissorsState.prototype.setRectangleBox2D = function (b) {
            if (!this._scissorsBox.isEqual(b)) {
                var gl = MB.Core.getInstance().getGL();
                gl.scissor(b.min.x, b.min.y, b.max.x, b.max.y);
                this._scissorsBox = b;
            }
        };
        ;
        ScissorsState.prototype.getRectangle = function () {
            return this._scissorsBox;
        };
        ;
        ScissorsState.prototype.isEnabled = function () {
            return this._scissorsEnabled === true;
        };
        return ScissorsState;
    }());
    ;
    var StencilState = (function () {
        function StencilState() {
            this._stencilEnabled = false;
            this._currentStencilMask = 0;
            this._currentStencilFunc = null;
            this._currentStencilRef = null;
            this._currentStencilFuncMask = null;
            this._currentStencilFail = null;
            this._currentStencilZFail = null;
            this._currentStencilZPass = null;
            this._currentStencilClear = null;
        }
        StencilState.prototype.setTest = function (enabled) {
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
        StencilState.prototype.setMaskValue = function (mask) {
            if (this._currentStencilMask !== mask) {
                var gl = MB.Core.getInstance().getGL();
                gl.stencilMask(mask);
                this._currentStencilMask = mask;
            }
        };
        ;
        StencilState.prototype.setFunc = function (compFun, ref, mask) {
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
        StencilState.prototype.setOp = function (fail, zfail, zpass) {
            if (this._currentStencilFail !== fail && this._currentStencilZFail !== zfail
                && this._currentStencilZPass !== zpass) {
                var gl = MB.Core.getInstance().getGL();
                gl.stencilOp(fail, zfail, zpass);
                this._currentStencilFail = fail;
                this._currentStencilZFail = zfail;
                this._currentStencilZPass = zpass;
            }
        };
        StencilState.prototype.getMasValue = function (mask) {
            return this._currentStencilMask;
        };
        StencilState.prototype.setClearValue = function (s) {
            if (this._currentStencilClear !== s) {
                var gl = MB.Core.getInstance().getGL();
                gl.clearStencil(s);
                this._currentStencilClear = s;
            }
        };
        ;
        StencilState.prototype.setMaskFace = function (face, mask) {
            var gl = MB.Core.getInstance().getGL();
            gl.stencilMaskSeparate(face, mask);
        };
        StencilState.prototype.getFrontWriteMask = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.getParameter(gl.STENCIL_WRITEMASK);
        };
        StencilState.prototype.getBackWriteMask = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.getParameter(gl.STENCIL_BACK_WRITEMASK);
        };
        StencilState.prototype.getBits = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.getParameter(gl.STENCIL_BITS);
        };
        StencilState.prototype.clearBuffer = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.clear(gl.STENCIL_BUFFER_BIT);
        };
        StencilState.prototype.isEnabled = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.isEnabled(gl.STENCIL_TEST);
        };
        StencilState.prototype.reset = function () {
        };
        ;
        return StencilState;
    }());
    ;
    var BlendingState = (function () {
        function BlendingState() {
            this._blendingEnabled = false;
        }
        BlendingState.prototype.setStatus = function (enabled) {
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
        BlendingState.prototype.setEquation = function (mode) {
            if (mode !== this._blendingMode) {
                var gl = MB.Core.getInstance().getGL();
                gl.blendEquation(mode);
                this._blendingMode = mode;
            }
        };
        ;
        BlendingState.prototype.equationSeparate = function (modeRGB, modeAlpha) {
            var gl = MB.Core.getInstance().getGL();
            gl.blendEquationSeparate(modeRGB, modeAlpha);
        };
        ;
        BlendingState.prototype.getquationRGB = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.getParameter(gl.BLEND_EQUATION_RGB);
        };
        ;
        BlendingState.prototype.getEquationAlpha = function () {
            var gl = MB.Core.getInstance().getGL();
            return gl.getParameter(gl.BLEND_EQUATION_ALPHA);
        };
        ;
        BlendingState.prototype.setColor = function (red, green, blue, alpha) {
            if (red === void 0) { red = 0.0; }
            if (green === void 0) { green = 0.0; }
            if (blue === void 0) { blue = 0.0; }
            if (alpha === void 0) { alpha = 0.0; }
            var gl = MB.Core.getInstance().getGL();
            gl.blendColor(red, green, blue, alpha);
        };
        ;
        BlendingState.prototype.setFunc = function (sfactor, dfactor) {
            if (sfactor === void 0) { sfactor = MB.ctes.BlendingType.One; }
            if (dfactor === void 0) { dfactor = MB.ctes.BlendingType.Zero; }
            var gl = MB.Core.getInstance().getGL();
            gl.blendFunc(sfactor, dfactor);
        };
        ;
        BlendingState.prototype.setFuncSeparate = function (srcRGB, dstRGB, srcAlpha, dstAlpha) {
            if (srcRGB === void 0) { srcRGB = MB.ctes.BlendingType.One; }
            if (dstRGB === void 0) { dstRGB = MB.ctes.BlendingType.Zero; }
            if (srcAlpha === void 0) { srcAlpha = MB.ctes.BlendingType.One; }
            if (dstAlpha === void 0) { dstAlpha = MB.ctes.BlendingType.Zero; }
            var gl = MB.Core.getInstance().getGL();
            gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
        };
        ;
        BlendingState.prototype.isEnabled = function () {
            return this._blendingEnabled === true;
        };
        ;
        return BlendingState;
    }());
    ;
    var GlobalState = (function () {
        function GlobalState() {
        }
        GlobalState.initializeAll = function () {
            this.depth = new DepthState();
            this.culling = new CullingState();
            this.color = new ColorState();
            this.color.reset();
            this.stencil = new StencilState();
            this.blending = new BlendingState();
        };
        ;
        GlobalState.setLineWidth = function (width) {
            if (width !== this._currentLineWidth) {
                var gl = MB.Core.getInstance().getGL();
                gl.lineWidth(width);
                this._currentLineWidth = width;
            }
        };
        ;
        GlobalState.setViewport = function (viewport) {
            if (this._viewport.isEqual(viewport) === false) {
                var gl = MB.Core.getInstance().getGL();
                gl.viewport(viewport.x, viewport.y, viewport.z, viewport.w);
                this._viewport = viewport.clone();
            }
        };
        ;
        GlobalState.setPolygonOffset = function (enable, factor, units) {
            if (enable) {
                var gl = MB.Core.getInstance().getGL();
                gl.enable(gl.POLYGON_OFFSET_FILL);
                if (this._currentPolygonOffsetFactor !== factor
                    || this._currentPolygonOffsetUnits !== units) {
                    gl.polygonOffset(factor, units);
                    this._currentPolygonOffsetFactor = factor;
                    this._currentPolygonOffsetUnits = units;
                }
            }
            else {
                var gl = MB.Core.getInstance().getGL();
                gl.disable(gl.POLYGON_OFFSET_FILL);
            }
        };
        ;
        GlobalState.clearBuffers = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        };
        ;
        GlobalState.clearAllBuffers = function () {
            var gl = MB.Core.getInstance().getGL();
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BITS);
        };
        ;
        GlobalState._currentLineWidth = 1.0;
        GlobalState._viewport = new MB.Vector4(0.0, 0.0, 0.0, 0.0);
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            this._color.x = MB.Mathf.clamp01(r);
            this._color.y = MB.Mathf.clamp01(g);
            this._color.z = MB.Mathf.clamp01(b);
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
                this._color.x = MB.Mathf.clamp01(r);
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
                this._color.y = MB.Mathf.clamp01(g);
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
                this._color.z = MB.Mathf.clamp01(b);
            },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        ;
        ;
        Color3.prototype.setRGB = function (r, g, b) {
            this.r = MB.Mathf.clamp01(r);
            this.g = MB.Mathf.clamp01(g);
            this.b = MB.Mathf.clamp01(b);
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
            this._color.x = r;
            this._color.y = g;
            this._color.z = b;
            this._color.w = a;
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MB;
(function (MB) {
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
    }(MB.BufferAttribute));
    MB.InstancedInterleavedBuffer = InstancedInterleavedBuffer;
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
            var currDepthComp = MB.GlobalState.depth.getCurrentComparisonFunc();
            MB.GlobalState.depth.setFunc(MB.ctes.ComparisonFunc.LessEqual);
            this._prog.use();
            var auxView = view.toMat3().toMat4();
            this._prog.sendUniformMat4("view", auxView._value);
            this._prog.sendUniformMat4("projection", projection._value);
            this._cubeMapTexture.bind(0);
            this._VertexArray.bind();
            gl.drawArrays(gl.TRIANGLES, 0, 36);
            this._VertexArray.unbind();
            MB.GlobalState.depth.setFunc(currDepthComp);
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
                geom2.addAttr(attrName, new MB.BufferAttribute(arr, itemSize));
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        function Texture(target, options) {
            if (options === void 0) { options = {}; }
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
            var gl = MB.Core.getInstance().getGL();
            this._handle_ = gl.createTexture();
            this._flipY_ = Boolean(options.flipY || false);
            this._internalformat_ = options.internalFormat || MB.ctes.TextureFormat.RGBA;
            this._format_ = options.format || MB.ctes.TextureFormat.RGBA;
            this._type_ = options.type || gl.UNSIGNED_BYTE;
            this._level_ = options.level || 0;
            this._compressed_ = Boolean(options.compressed || false);
            this.bind();
            this.minFilter(options.minFilter || MB.ctes.TextureType.Nearest);
            this.magFilter(options.minFilter || MB.ctes.TextureType.Nearest);
            this._minLOD_ = options.minLOD || -1000;
            this._maxLOD_ = options.maxLOD || 1000;
            this._anisotropy_ = options.anisotropic || 1;
            if (this._type_ === gl.FLOAT) {
                if (!Texture.canUseFloatingPointTextures()) {
                    throw new Error('OES_texture_float is required but not supported');
                }
                if ((this._minFilter_ !== MB.ctes.TextureType.Nearest
                    || this._magFilter_ !== MB.ctes.TextureType.Nearest) &&
                    !Texture.canUseFloatingPointLinearFiltering()) {
                    throw new Error('OES_texture_float_linear is required but not supported');
                }
            }
            else if (this._type_ === gl.HALF_FLOAT) {
                if (!Texture.canUseHalfFloatingPointTextures()) {
                    throw new Error('OES_texture_half_float is required but not supported');
                }
                if ((this._minFilter_ !== MB.ctes.TextureType.Nearest
                    || this._magFilter_ !== MB.ctes.TextureType.Nearest) &&
                    !Texture.canUseHalfFloatingPointLinearFiltering()) {
                    throw new Error('OES_texture_half_float_linear is required but not supported');
                }
            }
        }
        Texture.canUseFloatingPointTextures = function () {
            var gl = MB.Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                return true;
            }
            else {
                return !!MB.Extensions.get("OES_texture_float");
            }
        };
        ;
        Texture.canUseFloatingPointLinearFiltering = function () {
            return !!MB.Extensions.get("ES_texture_float_linear");
        };
        ;
        Texture.canUseHalfFloatingPointTextures = function () {
            var gl = MB.Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                return true;
            }
            else {
                return !!MB.Extensions.get("OES_texture_half_float");
            }
        };
        ;
        Texture.canUseHalfFloatingPointLinearFiltering = function () {
            var gl = MB.Core.getInstance().getGL();
            if (gl instanceof WebGL2RenderingContext) {
                return true;
            }
            else {
                return !!MB.Extensions.get("OES_texture_half_float_linear");
            }
        };
        ;
        ;
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
            if (max_anisotropy < level && this._anisotropy_ !== level) {
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MB;
(function (MB) {
    var CanvasTexture = (function (_super) {
        __extends(CanvasTexture, _super);
        function CanvasTexture(domCanvas, options, onSuccess) {
            if (options === void 0) { options = {}; }
            if (onSuccess === void 0) { onSuccess = null; }
            _super.call(this, MB.ctes.TextureTarget.Texture2D, options);
            var gl = MB.Core.getInstance().getGL();
            this._domCanvas = domCanvas;
            this._compressed_ = Boolean(options.compressed || false);
            gl.texImage2D(this._target_, this._level_, this._internalformat_, this._format_, this._type_, this._domCanvas);
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MB;
(function (MB) {
    var CubeMapTexture = (function (_super) {
        __extends(CubeMapTexture, _super);
        function CubeMapTexture(options) {
            if (options === void 0) { options = {}; }
            var gl = MB.Core.getInstance().getGL();
            _super.call(this, MB.ctes.TextureTarget.TextureCubeMap, options);
            this.finished = false;
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    var RenderBuffer = (function () {
        function RenderBuffer(size, format, attachment, samples) {
            if (samples === void 0) { samples = 4; }
            var gl = MB.Core.getInstance().getGL();
            this._handle = gl.createRenderbuffer();
            this._size = size;
            this._format = format;
            this._samples = samples;
        }
        ;
        return RenderBuffer;
    }());
    MB.RenderBuffer = RenderBuffer;
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
    var RenderBufferMultisampleTexture = (function (_super) {
        __extends(RenderBufferMultisampleTexture, _super);
        function RenderBufferMultisampleTexture(size, format, attachment, samples) {
            if (samples === void 0) { samples = 4; }
            var gl = MB.Core.getInstance().getGL();
            _super.call(this, size, format, attachment);
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
    }(MB.RenderBuffer));
    MB.RenderBufferMultisampleTexture = RenderBufferMultisampleTexture;
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
    var RenderBufferTexture = (function (_super) {
        __extends(RenderBufferTexture, _super);
        function RenderBufferTexture(size, format, attachment) {
            var gl = MB.Core.getInstance().getGL();
            _super.call(this, size, format, attachment);
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
    }(MB.RenderBuffer));
    MB.RenderBufferTexture = RenderBufferTexture;
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
    var SimpleTexture2D = (function (_super) {
        __extends(SimpleTexture2D, _super);
        function SimpleTexture2D(size, options, onSuccess) {
            if (options === void 0) { options = {}; }
            if (onSuccess === void 0) { onSuccess = null; }
            _super.call(this, MB.ctes.TextureTarget.Texture2D, options);
            this._size = size;
            var gl = MB.Core.getInstance().getGL();
            this._offsets_ = options.offsets;
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            _super.call(this, MB.ctes.TextureTarget.Texture3D, options);
            this._offsets_ = options.offsets;
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MB;
(function (MB) {
    var Texture2D = (function (_super) {
        __extends(Texture2D, _super);
        function Texture2D(data, options, onSuccess) {
            if (options === void 0) { options = {}; }
            if (onSuccess === void 0) { onSuccess = null; }
            _super.call(this, MB.ctes.TextureTarget.Texture2D, options);
            var gl = MB.Core.getInstance().getGL();
            this.bind();
            gl.texImage2D(this._target_, this._level_, this._internalformat_, this._format_, this._type_, data);
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            _super.call(this, MB.ctes.TextureTarget.Texture2DArray, options);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._layer_ = 0;
            gl.texParameteri(this._target_, gl.TEXTURE_BASE_LEVEL, 0);
            gl.texParameteri(this._target_, gl.TEXTURE_MAX_LEVEL, 0);
            this._numTex_ = images.length;
            gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, gl.RGB8, this._numTex_, this._numTex_, 16, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
            images.forEach(function (image, i) {
                gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0, 0, 0, i, _this._numTex_, _this._numTex_, 1, gl.RGB, gl.UNSIGNED_BYTE, image);
            });
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            _super.call(this, MB.ctes.TextureTarget.Texture3D, options);
            if (this._compressed_) {
                gl.compressedTexImage3D(this._target_, this._level_, this._format_, size.x, size.y, size.z, 0, data);
            }
            else {
                gl.texImage3D(this._target_, this._level_, this._internalformat_, size.x, size.y, size.z, 0, this._format_, this._type_, data);
            }
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MB;
(function (MB) {
    var VideoTexture = (function (_super) {
        __extends(VideoTexture, _super);
        function VideoTexture(video, loop, frameTime, onSuccess) {
            if (loop === void 0) { loop = true; }
            if (frameTime === void 0) { frameTime = 15; }
            if (onSuccess === void 0) { onSuccess = null; }
            var gl = MB.Core.getInstance().getGL();
            _super.call(this, MB.ctes.TextureTarget.Texture2D, {
                internalFormat: MB.ctes.TextureFormat.RGBA,
                format: MB.ctes.TextureFormat.RGBA,
                type: gl.UNSIGNED_BYTE,
                flipY: true
            });
            this._video = video;
            this._video.muted = true;
            this._video.loop = loop;
            this.update();
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
