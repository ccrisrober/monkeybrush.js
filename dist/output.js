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
    MB.CullingState = CullingState;
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
    MB.DepthState = DepthState;
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
    MB.ColorState = ColorState;
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
    MB.ScissorsState = ScissorsState;
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
    MB.StencilState = StencilState;
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
    MB.BlendingState = BlendingState;
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
var MB;
(function (MB) {
    var DepthTexture = (function () {
        function DepthTexture(onSuccess) {
            if (onSuccess === void 0) { onSuccess = null; }
        }
        ;
        return DepthTexture;
    }());
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
        function Texture2DArray(size, images, options, onSuccess) {
            var _this = this;
            if (options === void 0) { options = {}; }
            if (onSuccess === void 0) { onSuccess = null; }
            var gl = MB.Core.getInstance().getGL();
            if (!(gl instanceof WebGL2RenderingContext)) {
                throw new Error("Must provide a WebGL2 context ...");
            }
            _super.call(this, MB.ctes.TextureTarget.Texture2DArray, options);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._size_ = size;
            this._layer_ = 0;
            gl.texParameteri(this._target_, gl.TEXTURE_BASE_LEVEL, 0);
            gl.texParameteri(this._target_, gl.TEXTURE_MAX_LEVEL, 0);
            this._numTex_ = images.length;
            gl.texImage3D(this.target, this._level_, this._internalformat_, this._size_.x, this._size_.y, this._numTex_, 0, this._format_, this._type_, null);
            images.forEach(function (image, i) {
                gl.texSubImage3D(_this.target, 0, 0, 0, i, _this._size_.x, _this._size_.y, 1, _this._format_, _this._type_, image);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vbmtleUJydXNoLnRzIiwicG9seWZpbGxzLnRzIiwib3RoZXJzL0V4Y2VwdGlvbnMudHMiLCJvdGhlcnMvTGlzdC50cyIsIm1hdGhzL0JveDJELnRzIiwibWF0aHMvQm94M0QudHMiLCJtYXRocy9DdXJ2ZXMudHMiLCJtYXRocy9FdWxlckFuZ2xlLnRzIiwibWF0aHMvTWF0Mi50cyIsIm1hdGhzL01hdDMudHMiLCJtYXRocy9NYXQ0LnRzIiwibWF0aHMvTWF0aGYudHMiLCJtYXRocy9QYXRoLnRzIiwibWF0aHMvUXVhdC50cyIsIm1hdGhzL1NwaGVyZTJELnRzIiwibWF0aHMvU3BoZXJlM0QudHMiLCJtYXRocy9TcGxpbmUudHMiLCJtYXRocy9WZWN0Mi50cyIsIm1hdGhzL1ZlY3QzLnRzIiwibWF0aHMvVmVjdDQudHMiLCJtYXRocy9WZWN0b3IyLnRzIiwibWF0aHMvVmVjdG9yMy50cyIsIm1hdGhzL1ZlY3RvcjQudHMiLCJDYW1lcmEyLnRzIiwiRGVjb3JhdG9ycy50cyIsIlNjZW5lLnRzIiwiQXBwLnRzIiwibW9kZWxzL0RyYXdhYmxlLnRzIiwibW9kZWxzL1BvbHloZWRyb24udHMiLCJtb2RlbHMvQ29uZS50cyIsImNvbnN0YW50cy9Db25zdGFudHMudHMiLCJjb3JlL0NvbnRleHQudHMiLCJjb3JlL0NvcmUudHMiLCJjb3JlL0RPTUVsZW1lbnQudHMiLCJjb3JlL0ZyYW1lYnVmZmVyLnRzIiwiY29yZS9HbG9iYWxTdGF0ZS50cyIsImNvcmUvSW5wdXQudHMiLCJjb3JlL0xvZy50cyIsImNvcmUvUHJvZ3JhbS50cyIsImNvcmUvUXVlcnkudHMiLCJjb3JlL1NhbXBsZXIudHMiLCJjb3JlL1N5bmMudHMiLCJjb3JlL1RyYW5zZm9ybUZlZWRiYWNrLnRzIiwiY29yZS9VdGlscy50cyIsImNvcmUvVmVydGV4QXJyYXkudHMiLCJjb3JlL1ZlcnRleEJ1ZmZlci50cyIsImNvcmUvVmVydGV4VUJPLnRzIiwiZXh0cmFzL0F4aXMudHMiLCJleHRyYXMvQmlsbGJvYXJkLnRzIiwiZXh0cmFzL0J1ZmZlckF0dHJpYnV0ZS50cyIsImV4dHJhcy9DYXBhYmlsaXRpZXMudHMiLCJleHRyYXMvQ2xvY2sudHMiLCJleHRyYXMvQ29sb3IzLnRzIiwiZXh0cmFzL0NvbG9yNC50cyIsImV4dHJhcy9FYXNpbmcudHMiLCJleHRyYXMvRW5jb2RpbmdzLnRzIiwiZXh0cmFzL0V4dGVuc2lvbnMudHMiLCJleHRyYXMvR0J1ZmZlci50cyIsImV4dHJhcy9HZW9tZXRyeS50cyIsImV4dHJhcy9JbnN0YW5jZWRJbnRlcmxlYXZlZEJ1ZmZlci50cyIsImV4dHJhcy9Ob2lzZS50cyIsImV4dHJhcy9QaW5nUG9uZy50cyIsImV4dHJhcy9Qb2ludENsb3VkLnRzIiwiZXh0cmFzL1Bvc3RQcm9jZXNzLnRzIiwiZXh0cmFzL1JhbmRvbUdlbmVyYXRvci50cyIsImV4dHJhcy9SYXkudHMiLCJleHRyYXMvU2t5Ym94LnRzIiwiZXh0cmFzL1NvdXJjZUZyYWdzLnRzIiwiZXh0cmFzL1Nwcml0ZS50cyIsImV4dHJhcy9UaW1lci50cyIsImV4dHJhcy9WZXJ0ZXhCdWZmZXJHZW9tZXRyeS50cyIsImxpZ2h0cy9MaWdodC50cyIsImxpZ2h0cy9BbWJpZW50TGlnaHQudHMiLCJsaWdodHMvRGlyZWN0aW9uYWxMaWdodC50cyIsImxpZ2h0cy9IZW1pc3BoZXJpY0xpZ2h0LnRzIiwibGlnaHRzL1BvaW50TGlnaHQudHMiLCJsaWdodHMvU3BvdExpZ2h0LnRzIiwibW9kZWxzL0NhcHN1bGUudHMiLCJtb2RlbHMvQ3ViZS50cyIsIm1vZGVscy9DdWJvY3RhaGVkcm9uLnRzIiwibW9kZWxzL0N1c3RvbU1vZGVsLnRzIiwibW9kZWxzL0N5bGluZGVyLnRzIiwibW9kZWxzL0Rpc2MudHMiLCJtb2RlbHMvRG9kZWNhaGVkcm9uLnRzIiwibW9kZWxzL0Zsb29yLnRzIiwibW9kZWxzL0ljb3NhaGVkcm9uLnRzIiwibW9kZWxzL0xhdGhlLnRzIiwibW9kZWxzL01lc2gudHMiLCJtb2RlbHMvT2N0YWhlZHJvbi50cyIsIm1vZGVscy9QYXJhbWV0cmljR2VvbS50cyIsIm1vZGVscy9QbGFuZS50cyIsIm1vZGVscy9QcmlzbS50cyIsIm1vZGVscy9TcGhlcmUudHMiLCJtb2RlbHMvVGV0cmFoZWRyb24udHMiLCJtb2RlbHMvVG9ydXMudHMiLCJyZXNvdXJjZXMvTG9hZGVycy50cyIsInJlc291cmNlcy9PYmpMb2FkZXIudHMiLCJyZXNvdXJjZXMvUHJvZ3JhbU1hbmFnZXIudHMiLCJyZXNvdXJjZXMvUmVzb3VyY2VNYXAudHMiLCJyZXNvdXJjZXMvbG9hZGVycy9Mb2FkQXVkaW8udHMiLCJyZXNvdXJjZXMvbG9hZGVycy9Mb2FkQ3ViZU1hcC50cyIsInJlc291cmNlcy9sb2FkZXJzL0xvYWRGb250LnRzIiwicmVzb3VyY2VzL2xvYWRlcnMvTG9hZEltYWdlLnRzIiwicmVzb3VyY2VzL2xvYWRlcnMvTG9hZFZpZGVvLnRzIiwicmVzb3VyY2VzL2xvYWRlcnMvTG9hZFdlYkNhbS50cyIsInJlc291cmNlcy9sb2FkZXJzL1hIUkxvYWRlci50cyIsInRleHR1cmVzL1RleHR1cmUudHMiLCJ0ZXh0dXJlcy9DYW52YXNUZXh0dXJlLnRzIiwidGV4dHVyZXMvQ3ViZW1hcFRleHR1cmUudHMiLCJ0ZXh0dXJlcy9EZXB0aFRleHR1cmUudHMiLCJ0ZXh0dXJlcy9SZW5kZXJCdWZmZXIudHMiLCJ0ZXh0dXJlcy9SZW5kZXJCdWZmZXJNdWx0aXNhbXBsZVRleHR1cmUudHMiLCJ0ZXh0dXJlcy9SZW5kZXJCdWZmZXJUZXh0dXJlLnRzIiwidGV4dHVyZXMvU2ltcGxlVGV4dHVyZTJELnRzIiwidGV4dHVyZXMvU2ltcGxlVGV4dHVyZTNELnRzIiwidGV4dHVyZXMvVGV4dHVyZTJELnRzIiwidGV4dHVyZXMvVGV4dHVyZTJEQXJyYXkudHMiLCJ0ZXh0dXJlcy9UZXh0dXJlM0QudHMiLCJ0ZXh0dXJlcy9WaWRlb1RleHR1cmUudHMiLCJ0ZXh0dXJlcy9XZWJjYW1UZXh0dXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1CQSxZ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QUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDNUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMzQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFdkQsS0FBSyxNQUFNLENBQUMsR0FBRztvQkFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQy9DLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDM0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUM3QyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzNCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXRDLEtBQUssTUFBTSxDQUFDLEdBQUc7b0JBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2xELENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDN0MsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMzQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDNUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXZELEtBQUssTUFBTSxDQUFDLEdBQUc7b0JBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMvQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDNUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUM3QyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzNCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVyQyxLQUFLLE1BQU0sQ0FBQyxHQUFHO29CQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakQsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUM3QyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDNUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMzQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFdkQsS0FBSyxNQUFNLENBQUMsR0FBRztvQkFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQy9DLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDM0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUM3QyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzNCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXRDLEtBQUssTUFBTSxDQUFDLEdBQUc7b0JBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2xELENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDN0MsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMzQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDNUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXZELEtBQUssTUFBTSxDQUFDLEdBQUc7b0JBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMvQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDNUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUM3QyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzNCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVyQyxLQUFLLE1BQU0sQ0FBQyxHQUFHO29CQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNsRCxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQzdDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDM0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzVCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV2RCxLQUFLLE1BQU0sQ0FBQyxHQUFHO29CQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDL0MsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzVCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDN0MsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMzQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFckMsS0FBSyxNQUFNLENBQUMsR0FBRztvQkFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2pELENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDN0MsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzVCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDM0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXZELEtBQUssTUFBTSxDQUFDLEdBQUc7b0JBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMvQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcs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QUFHLEdBQUcsR0FBRyxHQUFHLEVBQzlCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFFbEMsTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ25ELENBQUM7O1FBQ0QscUJBQU0sR0FBTjtZQUNJLElBQ0ksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ2hFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUNoRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVyRSxJQUNJLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQzdCLEtBQUssR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDOUIsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUVsQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztZQUVsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDTCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRWhCLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBRWhCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBRS9DLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQzs7UUFDRCxrQkFBRyxHQUFILFVBQUksQ0FBTztZQUNQLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDOztRQUNELGtCQUFHLEdBQUgsVUFBSSxDQUFPO1lBQ1AsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7O1FBQ0QsbUJBQUksR0FBSixVQUFLLENBQU87WUFDUixJQUNJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUNoRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDaEUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFckUsSUFDSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDaEUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ2hFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXJFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBRW5ELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBRW5ELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBRW5ELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQzs7UUFDRCx1QkFBUSxHQUFSO1lBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbkIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDOztRQUNELHVCQUFRLEdBQVI7WUFDSSxNQUFNLENBQUMsNEJBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLDJCQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsMkJBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxtQkFDMUQsQ0FBQztRQUNOLENBQUM7O1FBQ0Qsd0JBQVMsR0FBVCxVQUFVLENBQVE7WUFDZCxJQUNJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUNoRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDaEUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ2hFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV2QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUV6QyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7O1FBQ0QscUJBQU0sR0FBTixVQUFPLEtBQWEsRUFBRSxJQUFXO1lBQzdCLElBQ0ksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQ1YsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQ1YsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFZixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQztZQUVoQixFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZixNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztnQkFDcEIsQ0FBQyxJQUFJLE1BQU0sQ0FBQztnQkFDWixDQUFDLElBQUksTUFBTSxDQUFDO2dCQUNaLENBQUMsSUFBSSxNQUFNLENBQUM7WUFDaEIsQ0FBQztZQUVELElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUIsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUxQixJQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBRWxCLElBQ0ksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ2hFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUNoRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUV0RSxJQUNJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ3pFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ3pFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFMUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFFbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFFbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFFbkQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDOztRQUNELG9CQUFLLEdBQUwsVUFBTSxDQUFRO1lBQ1YsSUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFcEIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDOztRQUNMLFdBQUM7SUFBRCxDQTNRQSxBQTJRQyxJQUFBO0lBM1FZLE9BQUksT0EyUWhCLENBQUE7SUFBQSxDQUFDO0FBQ04sQ0FBQyxFQWpSUyxFQUFFLEtBQUYsRUFBRSxRQWlSWDtBQUFBLENBQUM7O0FDblJGLFlBQVksQ0FBQztBQUViLElBQVUsRUFBRSxDQWlnQlg7QUFqZ0JELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFLVjtRQU9JLGNBQVksTUFBZ0M7WUFBaEMsc0JBQWdDLEdBQWhDLGFBQWdDO1lBTHJDLFdBQU0sR0FBaUIsSUFBSSxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7WUFpSjVDLFNBQUksR0FBRyxVQUFTLENBQU8sRUFBRSxJQUFpQjtnQkFBakIsb0JBQWlCLEdBQWpCLFdBQWlCO2dCQUM3QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUN0RixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDdEYsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQ3hGLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUcvRixJQUFJLEVBQUUsR0FBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBRTNELEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBRTNELEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBRTVELEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztnQkFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxF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QUMsQ0FBQyxFQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUN6RixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDekYsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQzFGLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUU5RixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUMzQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUMzQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUMzQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUMzQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUMzQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUMzQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUMzQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUMzQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUMzQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUMzQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUMzQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUczQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFFNUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUNELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBRWhCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUU1RCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7O1FBQ00sMEJBQVcsR0FBbEI7WUFDSSxJQUNJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUN0RixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDdEYsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQ3hGLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRS9GLElBQ0ksS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDN0IsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDN0IsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDN0IsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDN0IsS0FBSyxHQUFH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Q0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ1AsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ1AsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFWixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVwQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVwQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVyQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFbEMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDOztRQUNNLHFCQUFNLEdBQWIsVUFBYyxLQUFhLEVBQUUsSUFBVyxFQUFFLElBQWlCO1lBQWpCLG9CQUFpQixHQUFqQixXQUFpQjtZQUN2RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQ2xDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ3RDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUNQLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFDbEIsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUNsQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQ2xCLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUNiLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUNiLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBRWxCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQUMsQ0FBQztZQUU1QyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNkLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDVCxDQUFDLElBQUksR0FBRyxDQUFDO1lBQ1QsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUVULENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRVYsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkYsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkYsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFHekYsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFHdEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFFcEQsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLE1BQU0s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bEQsSUFDSSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDOUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQzlFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUNoRixHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUV2RixJQUNJLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUM5RSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDOUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQ2hGLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXZGLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ2YsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBRTdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUU3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFFN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7aUJBQ2hELENBQUMsQ0FBQztZQUNQLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDZixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFFN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBRTdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUU3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQzdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztpQkFDaEQsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUM7O1FBT00scUJBQU0sR0FBYjtZQUNJLE1BQU0sQ0FBQyxJQUFJLE9BQUksQ0FBQztnQkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzthQUNsQixDQUFDLENBQUM7UUFDUCxDQUFDO1FBbEJhLGFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ2pDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDVixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ1YsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNWLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDYixDQUFDLENBQUM7UUFjUCxXQUFDO0lBQUQsQ0EzZkEsQUEyZkMsSUFBQTtJQTNmWSxPQUFJLE9BMmZoQixDQUFBO0lBQUEsQ0FBQztBQUNOLENBQUMsRUFqZ0JTLEVBQUUsS0FBRixFQUFFLFFBaWdCWDtBQUFBLENBQUM7O0FDbmdCRixZQUFZLENBQUM7QUFFYixJQUFVLEVBQUUsQ0FpVFg7QUFqVEQsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNWLElBQWlCLEtBQUssQ0ErU3JCO0lBL1NELFdBQWlCLEtBQUssRUFBQyxDQUFDO1FBVXBCLGNBQXFCLENBQVMsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUNsRCxHQUFXLEVBQUUsR0FBVztZQUV4QixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3ZFLENBQUM7UUFKZSxVQUFJLE9BSW5CLENBQUE7UUFBQSxDQUFDO1FBZUYsZ0JBQXVCLENBQVMsRUFBRSxDQUFTLEVBQUUsR0FBVyxFQUNwRCxHQUFXLEVBQUUsR0FBVyxFQUFFLEdBQVcsRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUM3RCxFQUFVLEVBQUUsRUFBVTtZQUV0QixJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFckMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQVJlLFlBQU0sU0FRckIsQ0FBQTtRQUFBLENBQUM7UUFzQkYsaUJBQXdCLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLElBQVksRUFDakUsSUFBWSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUFFLElBQVksRUFDcEUsSUFBWSxFQUFFLElBQVksRUFBRSxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsRUFBRSxFQUFVLEVBQzFFLEVBQVUsRUFBRSxFQUFVO1lBRXRCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEMsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNyQyxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRXJDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFiZSxhQUFPLFVBYXRCLENBQUE7UUFBQSxDQUFDO1FBRVcsYUFBTyxHQUFXLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ2hDLGFBQU8sR0FBVyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQU03QyxrQkFBMEIsSUFBWTtZQUNsQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDL0IsQ0FBQztRQUZlLGNBQVEsV0FFdkIsQ0FBQTtRQUFBLENBQUM7UUFNRixrQkFBMEIsSUFBWTtZQUNsQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDL0IsQ0FBQztRQUZlLGNBQVEsV0FFdkIsQ0FBQTtRQUFBLENBQUM7UUFNRixlQUF1QixDQUFTO1lBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFGZSxXQUFLLFFBRXBCLENBQUE7UUFBQSxDQUFDO1FBTUYsb0JBQTJCLENBQVM7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBRmUsZ0JBQVUsYUFFekIsQ0FBQTtRQUFBLENBQUM7UUFRRixlQUFzQixDQUFTLEVBQUUsR0FBVyxFQUFFLEdBQVc7WUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUZlLFdBQUssUUFFcEIsQ0FBQTtRQUFBLENBQUM7UUFNRixpQkFBd0IsQ0FBUztZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRmUsYUFBTyxVQUV0QixDQUFBO1FBQUEsQ0FBQztRQU1GLGNBQXFCLENBQVM7WUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2IsQ0FBQztZQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUxlLFVBQUksT0FLbkIsQ0FBQTtRQUFBLENBQUM7UUFNRix3QkFBK0IsUUFBZ0I7WUFDM0MsUUFBUSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLEdBQUcsUUFBUSxHQUFHLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUM3RCxDQUFDO1FBSGUsb0JBQWMsaUJBRzdCLENBQUE7UUFRRCxvQkFBMkIsQ0FBUyxFQUFFLEdBQWUsRUFBRSxHQUFlO1lBQWhDLG1CQUFlLEdBQWYsT0FBZTtZQUFFLG1CQUFlLEdBQWYsT0FBZTtZQUNsRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztnQkFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBRXZCLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUU1QixNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQVBlLGdCQUFVLGFBT3pCLENBQUE7UUFBQSxDQUFDO1FBUUYsc0JBQTZCLENBQVMsRUFBRSxHQUFXLEVBQUUsR0FBVztZQUM1RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztnQkFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFMZSxrQkFBWSxlQUszQixDQUFBO1FBQUEsQ0FBQztRQU1GLGVBQXNCLENBQVM7WUFDM0IsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDVixNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckMsQ0FBQztZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsQ0FBQztRQU5lLFdBQUssUUFNcEIsQ0FBQTtRQUFBLENBQUM7UUFPRiw4QkFBcUMsRUFBUyxFQUFFLEVBQVM7WUFDckQsSUFBTSxLQUFLLEdBQUcsUUFBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUhlLDBCQUFvQix1QkFHbkMsQ0FBQTtRQUFBLENBQUM7UUFPRiw4QkFBcUMsRUFBUyxFQUFFLEVBQVM7WUFDckQsSUFBTSxLQUFLLEdBQUcsUUFBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUhlLDBCQUFvQix1QkFHbkMsQ0FBQTtRQUFBLENBQUM7UUFVRixzQkFBNkIsRUFBUyxFQUFFLEVBQVMsRUFBRSxFQUFTLEVBQUUsRUFBUyxFQUFFLENBQVM7WUFDOUUsSUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRWxCLElBQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDL0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFN0QsSUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFB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QUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQy9ELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRTdELElBQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDL0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFN0QsTUFBTSxDQUFDLElBQUksUUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQWpCZSxrQkFBWSxlQWlCM0IsQ0FBQTtRQUFBLENBQUM7UUFVRixtQkFBMEIsRUFBUyxFQUFFLEVBQVMsRUFBRSxFQUFTLEVBQUUsRUFBUyxFQUFFLENBQVM7WUFDM0UsSUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRWxCLElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDOUMsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUN2QyxJQUFNLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQyxJQUFNLEtBQUssR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBRXRCLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lB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aEIsQ0FBQztRQUNNLFFBQUcsR0FBVixVQUFXLENBQU8sRUFBRSxFQUFRLEVBQUUsSUFBaUI7WUFBakIsb0JBQWlCLEdBQWpCLFdBQWlCO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBRTdCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXBCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNNLFFBQUcsR0FBVixVQUFXLENBQU8sRUFBRSxFQUFRLEVBQUUsSUFBaUI7WUFBakIsb0JBQWlCLEdBQWpCLFdBQWlCO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBRTdCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXBCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNN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QUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXRDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQzs7UUFPYSxTQUFHLEdBQWpCLFVBQWtCLEVBQVMsRUFBRSxFQUFTO1lBQ2xDLElBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXRDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQzs7UUFRYSxVQUFJLEdBQWxCLFVBQW1CLElBQVcsRUFBRSxHQUFVLEVBQUUsQ0FBUztZQUNqRCxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUUxQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUM7O1FBUWEsV0FB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O1FBQzlCLENBQUM7O1FBUWEsVUFBSSxHQUFsQixVQUFtQixJQUFXLEVBQUUsR0FBVSxFQUFFLENBQVM7WUFDakQsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFMUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQzs7UUFRYSxXQUFLLEdBQW5CLFVBQW9CLEtBQVksRUFBRSxHQUFVLEVBQUUsR0FBVTtZQUNwRCxJQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUUsSUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFFLElBQU0sQ0FBQyxHQUFH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LEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRztnQkFDdkUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztnQkFDeEUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDdkUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRztnQkFDcEUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRztnQkFDeEUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztnQkFDdkUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDdkUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztnQkFDekUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztnQkFDM0UsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztnQkFDekUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdB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SSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFDOUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ1QsSUFBSSxDQUFDLENBQUMsRUFDRixJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ3ZELElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUNuRSxFQUNB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LENBQUM7b0JBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFekIsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO29CQUM1QixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO29CQUN0RCxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDO2dCQUNELEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztvQkFDdEIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQztvQkFDdEQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUMzRCxDQUFDO2dCQUNELENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7Z0JBQ3BELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUVuRCxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ1osQ0FBQztZQUVELENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUdkLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUNoQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDO1lBQzNCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7WUFDNUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBRWhCLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLENBQUM7UUFsQ2UseUJBQVMsWUFrQ3hCLENBQUE7UUFBQSxDQUFDO1FBS0Y7WUFDSSxNQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRmUsMkJBQVcsY0FFMUIsQ0FBQTtRQUFBLENBQUM7UUFLRjtZQUNJLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUU5QyxDQUFDO1FBSGUsMEJBQVUsYUFHekIsQ0FBQTtRQUdEO1lBQ0ksTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxDQUFDO1FBRTlDLENBQUM7UUFIZSxzQkFBTSxTQUdyQixDQUFBO1FBQUEsQ0FBQztRQUtGO1lBQ0ksTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLENBQUM7UUFFdEQsQ0FBQztRQUhlLDBCQUFVLGFBR3pCLENBQUE7UUFBQSxDQUFDO1FBS0Y7WUFDSSxJQUFNLENBQUMsR0FBRyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQ3JCLENBQUMsR0FBRyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFKZSwwQkFBVSxhQUl6QixDQUFBO1FBQUEsQ0FBQztJQUNOLENBQUMsRUE5R2dCLGVBQWUsR0FBZixrQkFBZSxLQUFmLGtCQUFlLFFBOEcvQjtJQUFBLENBQUM7QUFDTixDQUFDLEVBbklTLEVBQUUsS0FBRixFQUFFLFFBbUlYO0FBQUEsQ0FBQzs7QUN0SUYsWUFBWSxDQUFDO0FBRWIsSUFBVSxFQUFFLENBOEVYO0FBOUVELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFLVjtRQVFJLGFBQVksTUFBaUMsRUFDekMsU0FBb0M7WUFENUIsc0JBQWlDLEdBQWpDLGFBQXVCLEVBQUUsQ0FBQyxLQUFLLEVBQUU7WUFDekMseUJBQW9DLEdBQXBDLGdCQUEwQixFQUFFLENBQUMsS0FBSyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQ2hDLENBQUM7O1FBS0Qsc0JBQUksdUJBQU07aUJBQVY7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDeEIsQ0FBQztpQkFLRCxVQUFXLE1BQWdCO2dCQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUMxQixDQUFDOzs7V0FQQTs7O1FBWUQsc0JBQUksMEJBQVM7aUJBQWI7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDM0IsQ0FBQztpQkFLRCxVQUFjLFNBQW1CO2dCQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUNoQyxDQUFDOzs7V0FQQTs7O1FBYU0sZ0JBQUUsR0FBVCxVQUFVLENBQVM7WUFDZixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQ3pDLENBQUM7UUFDTixDQUFDOztRQUtNLG9CQUFNLEdBQWIsVUFBYyxDQUFXO1lBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoRSxDQUFDOztRQWFMLFVBQUM7SUFBRCxDQXhFQSxBQXdFQyxJQUFBO0lBeEVZLE1BQUcsTUF3RWYsQ0FBQTtJQUFBLENBQUM7QUFDTixDQUFDLEVBOUVTLEVBQUUsS0FBRixFQUFFLFFBOEVYO0FBQUEsQ0FBQzs7QUNoRkYsWUFBWSxDQUFDO0FBRWIsSUFBVSxFQUFFLENBcU5YO0FBck5ELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFLVjtRQWlDSSxnQkFBWSxHQUFXLEVBQUUsUUFBd0I7WUFBeEIsd0JBQXdCLEdBQXhCLGVBQXdCO1lBQzdDLElBQUksS0FBSyxHQUFrQixFQUFFLENBQUM7WUFDOUIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLENBQUM7WUFDL0IsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLENBQUM7WUFDOUIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUM7WUFDN0IsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsYUFBYSxDQUFDLENBQUM7WUFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLENBQUM7WUFDOUIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLENBQUM7WUFFL0IsSUFBTSxFQUFFLEdBQTBCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFaEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUU5QixJQUFJLEVBQVUsQ0FBQztZQUVmLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsRUFBRSxHQUFHLHdiQVVILENBQUM7WUFDUCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osRUFBRSxHQUFHLDRZQVNILENBQUM7WUFDUCxDQUFDO1lBR0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVoRixJQUFJLEVBQVUsQ0FBQztZQUVmLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsRUFBRSxHQUFHLHNSQU9ILENBQUM7WUFDUCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osRUFBRSxHQUFHLG9PQUtILENBQUM7WUFDUCxDQUFDO1lBR0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsRixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXJCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFFL0MsSUFBSSxjQUFjLEdBQUcsSUFBSSxZQUFZLENBQUM7Z0JBRWxDLENBQUMsR0FBRyxFQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUc7Z0JBQ2hCLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRztnQkFDZixHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHO2dCQUNmLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUc7Z0JBQ2YsR0FBRyxFQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUc7Z0JBQ2hCLENBQUMsR0FBRyxFQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUc7Z0JBRWhCLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFHLEdBQUc7Z0JBQ2hCLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRztnQkFDaEIsQ0FBQyxHQUFHLEVBQUcsR0FBRyxFQUFFLENBQUMsR0FBRztnQkFDaEIsQ0FBQyxHQUFHLEVBQUcsR0FBRyxFQUFFLENBQUMsR0FBRztnQkFDaEIsQ0FBQyxHQUFHLEVBQUcsR0FBRyxFQUFHLEdBQUc7Z0JBQ2hCLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFHLEdBQUc7Z0JBRWYsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRztnQkFDZixHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUcsR0FBRztnQkFDZixHQUFHLEVBQUcsR0FBRyxFQUFHLEdBQUc7Z0JBQ2YsR0FBRyxFQUFHLEdBQUcsRUFBRyxHQUFHO2dCQUNmLEdBQUcsRUFBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHO2dCQUNmLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUc7Z0JBRWhCLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFHLEdBQUc7Z0JBQ2hCLENBQUMsR0FBRyxFQUFHLEdBQUcsRUFBRyxHQUFHO2dCQUNmLEdBQUcsRUFBRyxHQUFHLEVBQUcsR0FBRztnQkFDZixHQUFHLEVBQUcsR0FB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QixLQUFLLEVBQUcsS0FBSyxFQUFFLEtBQUs7Z0JBQ3JCLENBQUMsS0FBSyxFQUFHLEtBQUssRUFBRSxLQUFLO2dCQUVwQixLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSztnQkFDcEIsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSztnQkFDckIsS0FBSyxFQUFHLEtBQUssRUFBRSxDQUFDLEtBQUs7Z0JBQ3JCLEtBQUssRUFBRyxLQUFLLEVBQUUsS0FBSztnQkFFckIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLO2dCQUN0QixDQUFDLEtBQUssRUFBRyxLQUFLLEVBQUUsQ0FBQyxLQUFLO2dCQUNyQixLQUFLLEVBQUcsS0FBSyxFQUFFLENBQUMsS0FBSztnQkFDckIsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSztnQkFFdEIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSztnQkFDckIsQ0FBQyxLQUFLLEVBQUcsS0FBSyxFQUFFLEtBQUs7Z0JBQ3JCLENBQUMsS0FBSyxFQUFHLEtBQUssRUFBRSxDQUFDLEtBQUs7Z0JBQ3RCLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSztnQkFFdEIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSztnQkFDckIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLO2dCQUNyQixLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLO2dCQUNyQixLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSztnQkFFckIsQ0FBQyxLQUFLLEVBQUcsS0FBSyxFQUFFLEtBQUs7Z0JBQ3BCLEtBQUssRUFBRyxLQUFLLEVBQUUsS0FBSztnQkFDcEIsS0FBSyxFQUFHLEtBQUssRUFBRSxDQUFDLEtBQUs7Z0JBQ3RCLENBQUMsS0FBSyxFQUFHLEtBQUssRUFBRSxDQUFDLEtBQUs7YUFDeEIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksWUFBWSxDQUFDO2dCQUV0RSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7Z0JBQ2IsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO2dCQUNiLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztnQkFDYixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7Z0JBRWIsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO2dCQUNiLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztnQkFDYixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7Z0JBQ2IsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO2dCQUViLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHO2dCQUNkLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHO2dCQUNkLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHO2dCQUNkLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHO2dCQUVkLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO2dCQUNkLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO2dCQUNkLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO2dCQUNkLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO2dCQUVkLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHO2dCQUNkLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHO2dCQUNkLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHO2dCQUNkLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHO2dCQUVkLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztnQkFDYixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7Z0JBQ2IsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO2dCQUNiLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRzthQUNoQixDQUFD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Q0FBRSxDQUFDLEVBQU0sQ0FBQyxFQUFFLENBQUUsQ0FBQyxFQUFHLENBQUM7Z0JBQzNCLENBQUMsRUFBRyxDQUFDLEVBQUUsQ0FBRSxDQUFDLEVBQU0sQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDO2dCQUd6QixDQUFDLEVBQUUsQ0FBRSxDQUFDLEVBQUUsQ0FBRSxDQUFDLEVBQU0sQ0FBQyxFQUFFLENBQUUsQ0FBQyxFQUFHLENBQUM7Z0JBQzNCLENBQUMsRUFBRyxDQUFDLEVBQUUsQ0FBRSxDQUFDLEVBQU0sQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDO2dCQUcxQixDQUFFLENBQUMsRUFBRSxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUssQ0FBRSxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUM7Z0JBQzNCLENBQUMsRUFBRSxDQUFFLENBQUMsRUFBRyxDQUFDLEVBQU0sQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDO2dCQUcxQixDQUFFLENBQUMsRUFBRyxDQUFDLEVBQUUsQ0FBRSxDQUFDLEVBQU0sQ0FBQyxFQUFHLENBQUMsRUFBRSxDQUFFLENBQUM7Z0JBQzVCLENBQUUsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQU0sQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDO2FBQzdCLENBQUM7WUFFRixJQUFJLEVBQUUsR0FBRztnQkFDSixDQUFDLEVBQUUsRUFBRSxFQUFHLENBQUMsRUFBTyxDQUFDLEVBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7Z0JBQ3pDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFPLENBQUMsRUFBRSxFQUFFLEVBQUcsQ0FBQyxFQUFPLENBQUMsRUFBRyxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsRUFBRSxFQUFHLENBQUMsRUFBRyxDQUFDLEVBQU0sRUFBRSxFQUFHLENBQUMsRUFBRSxFQUFFLEVBQU0sRUFBRSxFQUFFLEVBQUUsRUFBRyxDQUFDO2dCQUN6QyxDQUFDLEVBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBTyxDQUFDLEVBQUUsRUFB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QUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFFcEMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFFMUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUN0RCxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUV6QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVqQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFbkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2pDLENBQUM7O1FBU0wsWUFBQztJQUFELENBdERBLEFBc0RDLENBdEQwQixXQUFRLEdBc0RsQztJQXREWSxRQUFLLFFBc0RqQixDQUFBO0lBQUEsQ0FBQztBQUNOLENBQUMsRUE1RFMsRUFBRSxLQUFGLEVBQUUsUUE0RFg7QUFBQSxDQUFDOztBQzlERixZQUFZLENBQUM7Ozs7OztBQUdiLElBQVUsRUFBRSxDQThEWDtBQTlERCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBS1Y7UUFBaUMsK0JBQVU7UUFNdkMscUJBQVksTUFBb0IsRUFBRSxZQUF3QjtZQUE5QyxzQkFBb0IsR0FBcEIsWUFBb0I7WUFBRSw0QkFBd0IsR0FBeEIsZ0JBQXdCO1lBQ3RELFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO2dCQUMxRCxNQUFNLENBQUM7WUFDWCxDQUFDO1lBRUQsSUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVqQyxJQUFJLEtBQUssR0FBRztnQkFDUixDQUFDLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQztnQkFDVCxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUM7Z0JBQ1YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUcsQ0FBQztnQkFDVCxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUcsQ0FBQztnQkFFVCxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUcsQ0FBQztnQkFDVCxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUM7Z0JBQ1QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDVCxDQUFDLEVBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFVCxDQUFDLEVBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDVCxDQUFDLEVBQUcsQ0FBQyxFQUFHLENBQUM7Z0JBQ1YsQ0FBQyxDQUFDLEVBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDVixDQUFDLENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQzthQUNiLENBQUM7WUFDRixJQUFJLEVBQUUsR0FBRztnQkFDSixDQUFDLEVBQUUsRUFBRSxFQUFHLENBQUM7Z0JBQ1QsQ0FBQyxFQUFHLENBQUMsRUFBRyxDQUFDO2dCQUNULENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQztnQkFDVCxDQUFDLEVBQUcsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1QsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO2dCQUNULENBQUMsRUFBRyxDQUFDLEVBQUcsQ0FBQztnQkFDVCxDQUFDLEVBQUUs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QUFDO2dCQUM1QyxJQUFNLEVBQUUsR0FBYSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU1QyxJQUFNLEVBQUUsR0FBYSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzFDLElBQU0sRUFBRSxHQUFhLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDMUMsSUFBTSxFQUFFLEdBQWEsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUU1QyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFELENBQUM7WUFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDdEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN4QyxDQUFDO1lBRUQsSUFB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LENBQUM7UUFDTCxtQkFBQztJQUFELENBbkVBLEFBbUVDLENBbkVpQyxVQUFPLEdBbUV4QztJQW5FWSxlQUFZLGVBbUV4QixDQUFBO0lBQUEsQ0FBQztBQUNOLENBQUMsRUF6RVMsRUFBRSxLQUFGLEVBQUUsUUF5RVg7QUFBQSxDQUFDOztBQzNFRixZQUFZLENBQUM7Ozs7OztBQUViLElBQVUsRUFBRSxDQWtCWDtBQWxCRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBS1Y7UUFBNEIsaUNBQVk7UUFNcEMsdUJBQVksSUFBK0MsRUFBRSxTQUE0QjtZQUE3RSxvQkFBK0MsR0FBL0MsT0FBaUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7WUFBRSx5QkFBNEIsR0FBNUIsZ0JBQTRCO1lBQ3JGLGtCQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFFOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7O1FBQ0wsb0JBQUM7SUFBRCxDQVpBLEFBWUMsQ0FaMkIsZUFBWSxHQVl2QztJQUFBLENBQUM7QUFDTixDQUFDLEVBbEJTLEVBQUUsS0FBRixFQUFFLFFBa0JYO0FBQUEsQ0FBQyIsImZpbGUiOiJvdXRwdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gQ29weXJpZ2h0IChDKSAyMDE2IFtNb25rZXlCcnVzaC5qc11cbi8vL1xuLy8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpc1xuLy8vIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZVxuLy8vIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSxcbi8vLyBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvXG4vLy8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmdcbi8vLyBjb25kaXRpb25zOlxuLy8vXG4vLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vL1xuLy8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG4vLy8gRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SU1xuLy8vIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbi8vLyBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbm5hbWVzcGFjZSBNQiB7XG4gICAgZXhwb3J0IGNvbnN0IFZFUlNJT046IHN0cmluZyA9IFwiMS45LjBcIjtcbn07XG4iLCIvLy8gQ29weXJpZ2h0IChDKSAyMDE2IFtNb25rZXlCcnVzaC5qc11cbi8vL1xuLy8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpc1xuLy8vIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZVxuLy8vIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSxcbi8vLyBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvXG4vLy8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmdcbi8vLyBjb25kaXRpb25zOlxuLy8vXG4vLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vL1xuLy8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG4vLy8gRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SU1xuLy8vIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxuLy8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbi8vLyBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaWYgKE51bWJlcltcImVwc2lsb25cIl0gPT09IHVuZGVmaW5lZCkge1xuICAgIE51bWJlcltcImVwc2lsb25cIl0gPSAwLjAwMDE7XG59XG5pZiAoTnVtYmVyW1wic21hbGxFcHNpbG9uXCJdID09PSB1bmRlZmluZWQpIHtcbiAgICBOdW1iZXJbXCJzbWFsbEVwc2lsb25cIl0gPSAwLjAwMDAwMDE7XG59XG5pZiAoTnVtYmVyW1wiZGVmYXVsdElPUlwiXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgTnVtYmVyW1wiZGVmYXVsdElPUlwiXSA9IDEuMDAwMjc3O1xufVxuXG5pZiAoTWF0aFtcImRlZ3JlZVwiXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgTWF0aFtcImRlZ3JlZVwiXSA9IE1hdGguUEkgLyAxODAuMDtcbn07XG5pZiAoTWF0aFtcInRvUmFkaWFuXCJdID09PSB1bmRlZmluZWQpIHtcbiAgICBNYXRoW1widG9SYWRpYW5cIl0gPSBmdW5jdGlvbihhKSB7XG4gICAgICAgIHJldHVybiBhICogTWF0aFtcImRlZ3JlZVwiXTtcbiAgICB9O1xufTtcbmlmIChNYXRoW1widHJ1bmNcIl0gPT09IHVuZGVmaW5lZCkge1xuICAgIE1hdGhbXCJ0cnVuY1wiXSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuIHggLSB4ICUgMTtcbiAgICB9O1xufTtcbi8qXG5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG59O1xuTm9kZUxpc3QucHJvdG90eXBlLnJlbW92ZSA9IEhUTUxDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAodGhpc1tpXSAmJiB0aGlzW2ldLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXNbaV0ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5BcnJheS5wcm90b3R5cGUuaW5kZXhPZiB8fCAoQXJyYXkucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbihkLCBlKSB7XG4gICAgdmFyIGE7XG4gICAgaWYgKG51bGwgPT0gdGhpcykgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ0aGlzXCIgaXMgbnVsbCBvciBub3QgZGVmaW5lZCcpO1xuICAgIHZhciBjID0gT2JqZWN0KHRoaXMpLFxuICAgICAgICBiID0gYy5sZW5ndGggPj4+IDA7XG4gICAgaWYgKDAgPT09IGIpIHJldHVybiAtMTtcbiAgICBhID0gK2UgfHwgMDtcbiAgICBJbmZpbml0eSA9PT0gTWF0aC5hYnMoYSkgJiYgKGEgPSAwKTtcbiAgICBpZiAoYSA+PSBiKSByZXR1cm4gLTE7XG4gICAgZm9yIChhID0gTWF0aC5tYXgoMCA8PSBhID8gYSA6IGIgLSBNYXRoLmFicyhhKSwgMCk7IGEgPCBiOykge1xuICAgICAgICBpZiAoYSBpbiBjICYmIGNbYV0gPT09IGQpIHJldHVybiBhO1xuICAgICAgICBhKytcbiAgICB9XG4gICAgcmV0dXJuIC0xXG59KTtcblxuaWYgKCFBcnJheS5wcm90b3R5cGUuZmluZEluZGV4KSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCA9IGZ1bmN0aW9uKHByZWRpY2F0ZSkge1xuICAgICAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ID0gT2JqZWN0KHRoaXMpO1xuICAgICAgICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGggPj4+IDA7XG4gICAgICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdO1xuICAgICAgICB2YXIgdmFsdWU7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFsdWUgPSBsaXN0W2ldO1xuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBsaXN0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9O1xufVxuKi9cbi8qQXJyYXkucHJvdG90eXBlLnJlbW92ZUJ5SW5kZXggPSBmdW5jdGlvbihpbmRleCkge1xuICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LnByb3RvdHlwZS5yZW1vdmVCeUluZGV4IGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICBpZiAoaW5kZXggKyAxID4gdGhpcy5sZW5ndGggfHwgaW5kZXggPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFycmF5IGxpbWl0IGluZGV4XCIpO1xuICAgIH1cbiAgICAvL3RoaXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdGhpcztcbn07Ki9cbiIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsIi8vLyBDb3B5cmlnaHQgKEMpIDIwMTYgW01vbmtleUJydXNoLmpzXVxuLy8vXG4vLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzXG4vLy8gc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlXG4vLy8gd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LFxuLy8vIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cbi8vLyBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xuLy8vIGNvbmRpdGlvbnM6XG4vLy9cbi8vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy8vXG4vLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbi8vLyBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTXG4vLy8gT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSXG4vLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxuLy8vIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5cInVzZSBzdHJpY3RcIjtcblxubmFtZXNwYWNlIE1CIHtcbiAgICBleHBvcnQgY2xhc3MgQ2FtZXJhMiB7XG4gICAgICAgIC8vIENhbWVyYSBhdHRyc1xuICAgICAgICBwcm90ZWN0ZWQgcG9zaXRpb246IE1CLlZlY3QzO1xuICAgICAgICBwcm90ZWN0ZWQgZnJvbnQ6IE1CLlZlY3QzO1xuICAgICAgICBwcm90ZWN0ZWQgdXA6IE1CLlZlY3QzO1xuICAgICAgICBwcm90ZWN0ZWQgcmlnaHQ6IE1CLlZlY3QzO1xuICAgICAgICBwcm90ZWN0ZWQgd29ybGRVcDogTUIuVmVjdDM7XG5cbiAgICAgICAgLy8gRXVsZXIgYW5nbGVzXG4gICAgICAgIHByb3RlY3RlZCB5YXc6IG51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIHBpdGNoOiBudW1iZXI7XG5cbiAgICAgICAgLy8gQ2FtZXJhIG9wdGlvbnNcbiAgICAgICAgcHJvdGVjdGVkIG1vdlNwZWVkOiBudW1iZXIgPSAwLjA1O1xuICAgICAgICBwcm90ZWN0ZWQgbW91c2VTZW5zaXZpdHk6IG51bWJlciA9IDAuMjU7XG4gICAgICAgIHByb3RlY3RlZCBfdXBkYXRlQ2FtZXJhOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIHB1YmxpYyB0aW1lRWxhcHNlZDogbnVtYmVyO1xuXG4gICAgICAgIHB1YmxpYyBHZXRQb3MoKTogTUIuVmVjdDMge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0SG9tZSh2OiBNQi5WZWN0Mykge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHY7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbWVyYVZlY3RvcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBNQi5WZWN0MyA9IG5ldyBNQi5WZWN0MygwLCAwLCAwKSxcbiAgICAgICAgICAgIHVwOiBNQi5WZWN0MyA9IG5ldyBNQi5WZWN0MygwLCAxLCAwKSwgeWF3OiBudW1iZXIgPSAtOTAuMCwgcGl0Y2g6IG51bWJlciA9IDAuMCkge1xuICAgICAgICAgICAgdGhpcy5mcm9udCA9IG5ldyBNQi5WZWN0MygwLCAwLCAtMSk7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgICAgICB0aGlzLndvcmxkVXAgPSB1cDtcbiAgICAgICAgICAgIHRoaXMueWF3ID0geWF3O1xuICAgICAgICAgICAgdGhpcy5waXRjaCA9IHBpdGNoO1xuXG4gICAgICAgICAgICB0aGlzLnJpZ2h0ID0gbmV3IE1CLlZlY3QzKCk7XG4gICAgICAgICAgICB0aGlzLnVwID0gbmV3IE1CLlZlY3QzKCk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2FtZXJhVmVjdG9ycygpO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB1cGRhdGUoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDYW1lcmEgPSBmYWxzZTtcblxuICAgICAgICAgICAgbGV0IHNwZWVkID0gMS4wO1xuXG4gICAgICAgICAgICBpZiAoTUIuSW5wdXQuaXNLZXlQcmVzc2VkKE1CLmN0ZXMuS2V5U3RhdGUuTGVmdF9TaGlmdCkpIHtcbiAgICAgICAgICAgICAgICBzcGVlZCA9IDIuNTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKE1CLklucHV0LmlzS2V5UHJlc3NlZChNQi5jdGVzLktleVN0YXRlLlopKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm92ID4gMzAuMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvdiAtPSAwLjU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbWVyYSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE1CLklucHV0LmlzS2V5UHJlc3NlZChNQi5jdGVzLktleVN0YXRlLlgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm92IDwgOTAuMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvdiArPSAwLjU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbWVyYSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoTUIuSW5wdXQuaXNLZXlQcmVzc2VkKE1CLmN0ZXMuS2V5U3RhdGUuVykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NLZXlib2FyZCg0LCBzcGVlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2FtZXJhID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChNQi5JbnB1dC5pc0tleVByZXNzZWQoTUIuY3Rlcy5LZXlTdGF0ZS5TKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0tleWJvYXJkKDUsIHNwZWVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDYW1lcmEgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE1CLklucHV0LmlzS2V5UHJlc3NlZChNQi5jdGVzLktleVN0YXRlLkEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzS2V5Ym9hcmQoMiwgc3BlZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbWVyYSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTUIuSW5wdXQuaXNLZXlQcmVzc2VkKE1CLmN0ZXMuS2V5U3RhdGUuRCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NLZXlib2FyZCgzLCBzcGVlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2FtZXJhID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChNQi5JbnB1dC5pc0tleVByZXNzZWQoTUIuY3Rlcy5LZXlTdGF0ZS5FKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0tleWJvYXJkKDAsIHNwZWVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDYW1lcmEgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE1CLklucHV0LmlzS2V5UHJlc3NlZChNQi5jdGVzLktleVN0YXRlLlEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzS2V5Ym9hcmQoMSwgc3BlZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbWVyYSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTUIuSW5wdXQuaXNLZXlQcmVzc2VkKDM4KSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc01vdXNlTW92ZW1lbnQoMC4wLCAyLjUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbWVyYSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTUIuSW5wdXQuaXNLZXlQcmVzc2VkKDQwKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc01vdXNlTW92ZW1lbnQoMC4wLCAtMi41KTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDYW1lcmEgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE1CLklucHV0LmlzS2V5UHJlc3NlZCgzNykpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnByb2Nlc3NNb3VzZU1vdmVtZW50KDIuNSwgMC4wKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NNb3VzZU1vdmVtZW50KC0yLjUsIDAuMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2FtZXJhID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChNQi5JbnB1dC5pc0tleVByZXNzZWQoMzkpKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5wcm9jZXNzTW91c2VNb3ZlbWVudCgtMi41LCAwLjApO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc01vdXNlTW92ZW1lbnQoMi41LCAwLjApO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbWVyYSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fdXBkYXRlQ2FtZXJhICYmIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBwcm9jZXNzS2V5Ym9hcmQoZGlyZWN0aW9uOiBudW1iZXIsIHNwZWVkOiBudW1iZXIgPSAxLjApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVFbGFwc2VkID4gMjUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB2ZWxvY2l0eSA9IHRoaXMubW92U3BlZWQgKiB0aGlzLnRpbWVFbGFwc2VkICogc3BlZWQ7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkaXJlY3Rpb24pO1xuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSBNQi5WZWN0My5zY2FsZUFuZEFkZCh0aGlzLnBvc2l0aW9uLCB0aGlzLmZyb250LCB2ZWxvY2l0eSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSBNQi5WZWN0My5zY2FsZUFuZEFkZCh0aGlzLnBvc2l0aW9uLCB0aGlzLmZyb250LCAtdmVsb2NpdHkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gTUIuVmVjdDMuc2NhbGVBbmRBZGQodGhpcy5wb3NpdGlvbiwgdGhpcy5yaWdodCwgLXZlbG9jaXR5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IE1CLlZlY3QzLnNjYWxlQW5kQWRkKHRoaXMucG9zaXRpb24sIHRoaXMucmlnaHQsIHZlbG9jaXR5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSA0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IE1CLlZlY3QzLnNjYWxlQW5kQWRkKHRoaXMucG9zaXRpb24sIHRoaXMudXAsIHZlbG9jaXR5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSA1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IE1CLlZlY3QzLnNjYWxlQW5kQWRkKHRoaXMucG9zaXRpb24sIHRoaXMudXAsIC12ZWxvY2l0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcHJvY2Vzc01vdXNlTW92ZW1lbnQoeE9mZnNldDogbnVtYmVyLCB5T2Zmc2V0OiBudW1iZXIpIHtcbiAgICAgICAgICAgIHhPZmZzZXQgKj0gdGhpcy5tb3ZTcGVlZCAqIDIuMCAqIHRoaXMudGltZUVsYXBzZWQ7XG4gICAgICAgICAgICB5T2Zmc2V0ICo9IHRoaXMubW92U3BlZWQgKiAyLjAgKiB0aGlzLnRpbWVFbGFwc2VkO1xuXG4gICAgICAgICAgICB0aGlzLnlhdyArPSB4T2Zmc2V0O1xuICAgICAgICAgICAgdGhpcy5waXRjaCArPSB5T2Zmc2V0O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5waXRjaCA+IDg5LjApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBpdGNoID0gODkuMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnBpdGNoIDwgLTg5LjApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBpdGNoID0gLTg5LjA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbWVyYVZlY3RvcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB1cGRhdGVDYW1lcmFWZWN0b3JzKCkge1xuICAgICAgICAgICAgY29uc3QgZnJvbnQ6IE1CLlZlY3QzID0gbmV3IE1CLlZlY3QzKFxuICAgICAgICAgICAgICAgIE1hdGguY29zKE1hdGhbXCJ0b1JhZGlhblwiXSh0aGlzLnlhdykpICogTWF0aC5jb3MoTWF0aFtcInRvUmFkaWFuXCJdKHRoaXMucGl0Y2gpKSxcbiAgICAgICAgICAgICAgICBNYXRoLnNpbihNYXRoW1widG9SYWRpYW5cIl0odGhpcy5waXRjaCkpLFxuICAgICAgICAgICAgICAgIE1hdGguc2luKE1hdGhbXCJ0b1JhZGlhblwiXSh0aGlzLnlhdykpICogTWF0aC5jb3MoTWF0aFtcInRvUmFkaWFuXCJdKHRoaXMucGl0Y2gpKVxuICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5mcm9udCA9IGZyb250Lm5vcm1hbGl6ZSgpO1xuXG4gICAgICAgICAgICAvLyBSZWNhbGN1bGF0ZSByaWdodCBhbmQgdXAgdmVjdG9yXG4gICAgICAgICAgICB0aGlzLnJpZ2h0ID0gTUIuVmVjdDMuY3Jvc3ModGhpcy5mcm9udCwgdGhpcy53b3JsZFVwKS5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgIHRoaXMudXAgPSBNQi5WZWN0My5jcm9zcyh0aGlzLnJpZ2h0LCB0aGlzLmZyb250KS5ub3JtYWxpemUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBHZXRWaWV3TWF0cml4KCk6IE1CLk1hdDQge1xuICAgICAgICAgICAgcmV0dXJuIE1CLk1hdDQubG9va0F0KFxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24sXG4gICAgICAgICAgICAgICAgTUIuVmVjdDMuYWRkKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyb250XG4gICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHRoaXMudXBcbiAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgR2V0T3J0aG9Qcm9qZWN0aW9uTWF0cml4KHc6IG51bWJlciwgaDogbnVtYmVyKTogTUIuTWF0NCB7XG4gICAgICAgICAgICBjb25zdCB5TWluID0gLTAuMDAwMSAqIE1hdGgudGFuKHRoaXMuZm92ICogTWF0aC5QSSAvIDM2MC4wKTtcbiAgICAgICAgICAgIGNvbnN0IHlNYXggPSAteU1pbjtcbiAgICAgICAgICAgIGNvbnN0IHhNaW4gPSB5TWluICsgKHcgKiAxLjApIC8gKGggKiAxLjApO1xuICAgICAgICAgICAgY29uc3QgeE1heCA9IHlNYXggKyAodyAqIDEuMCkgLyAoaCAqIDEuMCk7XG4gICAgICAgICAgICByZXR1cm4gTUIuTWF0NC5vcnRob2dyYXBoaWMoeE1pbiwgeE1heCwgeU1pbiwgeU1heCwgMC4wMDAxLCAxMTAwMC4wKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgR2V0UHJvamVjdGlvbk1hdHJpeCh3OiBudW1iZXIsIGg6IG51bWJlcik6IE1CLk1hdDQge1xuICAgICAgICAgICAgcmV0dXJuIE1CLk1hdDQucGVyc3BlY3RpdmUodGhpcy5mb3YsICh3ICogMS4wKSAvIChoICogMS4wKSwgMC4wMDAxLCAxMDAwLjApO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGZvdjogbnVtYmVyID0gNDUuMDtcbiAgICB9O1xufTtcbiIsIm5hbWVzcGFjZSBNQiB7XHJcbiAgICBleHBvcnQgbmFtZXNwYWNlIERlY29yYXRvcnMge1xyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBzZWFsZWQoY29uc3RydWN0b3I6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5zZWFsKGNvbnN0cnVjdG9yKTtcclxuICAgICAgICAgICAgT2JqZWN0LnNlYWwoY29uc3RydWN0b3IucHJvdG90eXBlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBsb2dQcm9wZXJ0eSh0YXJnZXQ6IGFueSwga2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IG5ld0tleSA9IGBfX2xvZ2dlZCR7a2V5fWA7XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIG5ld0tleSwge1xyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGFyZ2V0W2tleV1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHByb3BlcnR5IGdldHRlclxyXG4gICAgICAgICAgICBsZXQgZ2V0dGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IHRoaXNbbmV3S2V5XTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBHZXQ6ICR7a2V5fSA9PiAke3ZhbH1gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBwcm9wZXJ0eSBzZXR0ZXJcclxuICAgICAgICAgICAgbGV0IHNldHRlciA9IGZ1bmN0aW9uIChuZXdWYWw6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFNldDogJHtrZXl9ID0+ICR7bmV3VmFsfWApO1xyXG4gICAgICAgICAgICAgICAgdGhpc1tuZXdLZXldID0gbmV3VmFsO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gRGVsZXRlIHByb3BlcnR5LlxyXG4gICAgICAgICAgICBpZiAoZGVsZXRlIHRoaXNba2V5XSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBuZXcgcHJvcGVydHkgd2l0aCBnZXR0ZXIgYW5kIHNldHRlclxyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBnZXR0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0OiBzZXR0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuIiwiLy8vIENvcHlyaWdodCAoQykgMjAxNiBbTW9ua2V5QnJ1c2guanNdXHJcbi8vL1xyXG4vLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzXHJcbi8vLyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmVcclxuLy8vIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSxcclxuLy8vIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cclxuLy8vIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nXHJcbi8vLyBjb25kaXRpb25zOlxyXG4vLy9cclxuLy8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXHJcbi8vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuLy8vXHJcbi8vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxyXG4vLy8gRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuLy8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTXHJcbi8vLyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVJcclxuLy8vIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cclxuLy8vIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxyXG5cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL2RhdC1ndWkuZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL3N0YXRzLmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy92YW5pbGxhLXRvYXN0cy92YW5pbGxhLXRvYXN0cy5kLnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBNQiB7XHJcbiAgICBARGVjb3JhdG9ycy5zZWFsZWRcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTY2VuZSB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBfc3RhdHM6IFN0YXRzO1xyXG4gICAgICAgIHByb3RlY3RlZCBfZ3VpOiBkYXQuR1VJO1xyXG4gICAgICAgIHByb3RlY3RlZCBfd2ViZ2xWZXJzaW9uO1xyXG5cclxuICAgICAgICAvLyBwcm90ZWN0ZWQgX2F1dG9DbGVhckNvbG9yOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAvLyBwcm90ZWN0ZWQgX2F1dG9DbGVhckRlcHRoOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAvLyBwcm90ZWN0ZWQgX2F1dG9DbGVhclN0ZW5jaWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHRleHQ6IGFueTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IodGV4dDogYW55LCB0aXRsZTogc3RyaW5nID0gbnVsbCwgd2ViZ2xWZXJzaW9uOiBudW1iZXIgPSAyKSB7XHJcbiAgICAgICAgICAgIE1CLkxvZy5pbmZvKFwiaW5pdCBzY2VuZVwiKTtcclxuICAgICAgICAgICAgaWYgKCF3ZWJnbFZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgIHdlYmdsVmVyc2lvbiA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTUIuQ29udGV4dC53ZWJnbFZlcnNpb24gPSB3ZWJnbFZlcnNpb247XHJcbiAgICAgICAgICAgIE1CLkNvcmUuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3dlYmdsVmVyc2lvbiA9IHdlYmdsVmVyc2lvbjtcclxuICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGUgfHwgYFdlYkdMJHt3ZWJnbFZlcnNpb259IGFwcGA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9faW5pdF9fKHRleHQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHB1YmxpYyB3ZWJnbFZlcnNpb24oKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlYmdsVmVyc2lvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGxvYWRBc3NldHMoKSAge31cclxuICAgICAgICBwdWJsaWMgY2FtZXJhVXBkYXRlKCkge31cclxuICAgICAgICBwdWJsaWMgdGV4dENCKGc6IGRhdC5HVUkpIHt9XHJcblxyXG4gICAgICAgIGFic3RyYWN0IGluaXRpYWxpemUoKTtcclxuICAgICAgICBhYnN0cmFjdCB1cGRhdGUoZHQ6IG51bWJlcik7XHJcbiAgICAgICAgYWJzdHJhY3QgZHJhdyhkdD86IG51bWJlcik7XHJcblxyXG4gICAgICAgIHByaXZhdGUgX19pbml0X18odGV4dCkge1xyXG4gICAgICAgICAgICBNQi5Db3JlLmdldEluc3RhbmNlKCkuaW5pdGlhbGl6ZShbMS4wLCAxLjAsIDEuMCwgMS4wXSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9ndWkgPSBuZXcgZGF0LkdVSSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50ZXh0Q0IodGhpcy5fZ3VpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5fZ3VpLmFkZCh0ZXh0LCBcInJlc3VtZVwiLCB0cnVlKS5vbkNoYW5nZShmdW5jdGlvbih2KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgc2VsZi5yZXN1bWUoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzID0gbmV3IFN0YXRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzLnNldE1vZGUoMCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fc3RhdHMuZG9tRWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvYWRBc3NldHMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBzdGF0cygpOiBTdGF0cyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGF0cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGFydCgpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGY6IFNjZW5lID0gdGhpcztcclxuICAgICAgICAgICAgTUIuUmVzb3VyY2VNYXAuc2V0TG9hZENvbXBsZXRlQ2FsbGJhY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBNQi5Mb2cuaW5mbyhcIkFMTCBSRVNPVVJDRVMgTE9BREVEISEhIVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmluaXRpYWxpemUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgbG9hZGVyIGNzczMgd2luZG93XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNwaW5uZXJcIikucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTUIuQ29yZS5nZXRJbnN0YW5jZSgpLmNhbnZhcygpLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHZhciBlbDogYW55ID0gTUIuQ29yZS5nZXRJbnN0YW5jZSgpLmNhbnZhcygpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmIChlbC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBlbC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgZWwubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiBfX3JlbmRlcl9fKGR0PzogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfX3JlbmRlcl9fKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNQi5JbnB1dC51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdHMuYmVnaW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHQgKj0gMC4wMDE7IC8vIGNvbnZlcnQgdG8gc2Vjb25kc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgTUIuVGltZXIudXBkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWxmLl9fcmVzaXplX18oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLl9yZXN1bWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlKGR0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZHJhdyhkdCk7ICAgIC8vIERyYXcgdXNlciBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRzLmVuZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKDAuMCk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVmFuaWxsYVRvYXN0cy5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvcjpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYCR7ZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImVycm9yXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHVibGljIHBhdXNlKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBBVVNFXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXN1bWUgPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyByZXN1bWUoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVTVU1FXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXN1bWUgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBfcmVzdW1lOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9fcmVzaXplX18oKSB7XHJcbiAgICAgICAgICAgIGxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gTUIuQ29yZS5nZXRJbnN0YW5jZSgpLmNhbnZhcygpO1xyXG4gICAgICAgICAgICBsZXQgcmVhbFRvQ1NTUGl4ZWxzID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcclxuXHJcbiAgICAgICAgICAgIC8vIExvb2t1cCB0aGUgc2l6ZSB0aGUgYnJvd3NlciBpcyBkaXNwbGF5aW5nIHRoZSBjYW52YXMgaW4gQ1NTIHBpeGVsc1xyXG4gICAgICAgICAgICAvLyBhbmQgY29tcHV0ZSBhIHNpemUgbmVlZGVkIHRvIG1ha2Ugb3VyIGRyYXdpbmdidWZmZXIgbWF0Y2ggaXQgaW5cclxuICAgICAgICAgICAgLy8gZGV2aWNlIHBpeGVscy5cclxuICAgICAgICAgICAgbGV0IGRpc3BsYXlXaWR0aCAgPSBNYXRoLmZsb29yKGNhbnZhcy5jbGllbnRXaWR0aCAgKiByZWFsVG9DU1NQaXhlbHMpO1xyXG4gICAgICAgICAgICBsZXQgZGlzcGxheUhlaWdodCA9IE1hdGguZmxvb3IoY2FudmFzLmNsaWVudEhlaWdodCAqIHJlYWxUb0NTU1BpeGVscyk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgY2FudmFzIGlzIG5vdCB0aGUgc2FtZSBzaXplLlxyXG4gICAgICAgICAgICBpZiAoY2FudmFzLndpZHRoICAhPT0gZGlzcGxheVdpZHRoIHx8XHJcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ICE9PSBkaXNwbGF5SGVpZ2h0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTWFrZSB0aGUgY2FudmFzIHRoZSBzYW1lIHNpemVcclxuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCAgPSBkaXNwbGF5V2lkdGg7XHJcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gZGlzcGxheUhlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHZpZXdwb3J0IHRvIG1hdGNoXHJcbiAgICAgICAgICAgICAgICBNQi5HbG9iYWxTdGF0ZS5zZXRWaWV3cG9ydChuZXcgVmVjdG9yNDxudW1iZXI+KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2FtZXJhVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG4iLCIvLy8gQ29weXJpZ2h0IChDKSAyMDE2IFtNb25rZXlCcnVzaC5qc11cclxuLy8vXHJcbi8vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXNcclxuLy8vIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZVxyXG4vLy8gd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LFxyXG4vLy8gbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xyXG4vLy8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmdcclxuLy8vIGNvbmRpdGlvbnM6XHJcbi8vL1xyXG4vLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuLy8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4vLy9cclxuLy8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXHJcbi8vLyBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4vLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlNcclxuLy8vIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUlxyXG4vLy8gSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxyXG4vLy8gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvdmFuaWxsYS10b2FzdHMvdmFuaWxsYS10b2FzdHMuZC50c1wiIC8+XHJcblxyXG5uYW1lc3BhY2UgTUIge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQXBwIHtcclxuICAgICAgICB0aXRsZT86IHN0cmluZztcclxuICAgICAgICB3ZWJnbFZlcnNpb24/OiBudW1iZXI7XHJcbiAgICAgICAgbG9hZEFzc2V0czogKCkgPT4gdm9pZDtcclxuICAgICAgICBpbml0aWFsaXplOiAoYXBwXzogQXBwKSA9PiB2b2lkO1xyXG4gICAgICAgIHVwZGF0ZTogKGFwcF86IEFwcCwgZHQ6IG51bWJlcikgPT4gdm9pZDtcclxuICAgICAgICBkcmF3OiAoYXBwXzogQXBwLCBkdD86IG51bWJlcikgPT4gdm9pZDtcclxuICAgICAgICBjYW1lcmFVcGRhdGU6ICgpID0+IHZvaWQ7XHJcbiAgICAgICAgdGV4dENCOiAoZ3VpOiBkYXQuR1VJKSA9PiB2b2lkO1xyXG4gICAgfVxyXG5cclxuICAgIEBEZWNvcmF0b3JzLnNlYWxlZFxyXG4gICAgZXhwb3J0IGNsYXNzIEFwcCB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBzdGF0czogU3RhdHM7XHJcbiAgICAgICAgcHJvdGVjdGVkIGd1aTogZGF0LkdVSTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGNhbWVyYVVwZGF0ZUNiO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGluaXQ6IElBcHAsIHRleHQ6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAoIWluaXQud2ViZ2xWZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0LndlYmdsVmVyc2lvbiA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fYXBwRnVuY3Rpb25zID0gaW5pdDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5fYXBwRnVuY3Rpb25zKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coTUIuQ29udGV4dC53ZWJnbFZlcnNpb24pO1xyXG4gICAgICAgICAgICBNQi5Db250ZXh0LndlYmdsVmVyc2lvbiA9IGluaXQud2ViZ2xWZXJzaW9uO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhNQi5Db250ZXh0LndlYmdsVmVyc2lvbik7XHJcbiAgICAgICAgICAgIE1CLkNvcmUuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gaW5pdC50aXRsZSB8fCBgV2ViR0wke2luaXQud2ViZ2xWZXJzaW9ufSBhcHBgO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fX2luaXRfXyh0ZXh0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgd2ViZ2xWZXJzaW9uKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBGdW5jdGlvbnMud2ViZ2xWZXJzaW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfX2luaXRfXyh0ZXh0KSB7XHJcbiAgICAgICAgICAgIE1CLkNvcmUuZ2V0SW5zdGFuY2UoKS5pbml0aWFsaXplKFsxLjAsIDAuMCwgMS4wLCAxLjBdKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3VpID0gbmV3IGRhdC5HVUkoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2FwcEZ1bmN0aW9ucy50ZXh0Q0IodGhpcy5ndWkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmd1aS5hZGQodGV4dCwgXCJyZXN1bWVcIiwgdHJ1ZSkub25DaGFuZ2UoZnVuY3Rpb24odikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHYgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgIHNlbGYucmVzdW1lKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHMuc2V0TW9kZSgwKTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0cy5kb21FbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9IFwiMFwiO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRzLmRvbUVsZW1lbnQuc3R5bGUudG9wID0gXCIwXCI7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5zdGF0cy5kb21FbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2FwcEZ1bmN0aW9ucy5sb2FkQXNzZXRzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhcnQoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgTUIuUmVzb3VyY2VNYXAuc2V0TG9hZENvbXBsZXRlQ2FsbGJhY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFMTCBSRVNPVVJDRVMgTE9BREVEISEhIVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9hcHBGdW5jdGlvbnMuaW5pdGlhbGl6ZShzZWxmKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgbG9hZGVyIGNzczMgd2luZG93XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNwaW5uZXJcIikucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLypNQi5Db3JlLmdldEluc3RhbmNlKCkuY2FudmFzKCkuYWRkRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsOiBhbnkgPSBNQi5Db3JlLmdldEluc3RhbmNlKCkuY2FudmFzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTsqL1xyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIF9fcmVuZGVyX18oZHQ/OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF9fcmVuZGVyX18pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1CLklucHV0LnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0cy5iZWdpbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdCAqPSAwLjAwMTsgLy8gY29udmVydCB0byBzZWNvbmRzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNQi5UaW1lci51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbGYuX19yZXNpemVfXygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX3Jlc3VtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fYXBwRnVuY3Rpb25zLnVwZGF0ZShzZWxmLCBkdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9hcHBGdW5jdGlvbnMuZHJhdyhzZWxmLCBkdCk7ICAgIC8vIERyYXcgdXNlciBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRzLmVuZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKDAuMCk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVmFuaWxsYVRvYXN0cy5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvcjpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYCR7ZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImVycm9yXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHVibGljIHBhdXNlKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBBVVNFXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXN1bWUgPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHB1YmxpYyByZXN1bWUoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVTVU1FXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXN1bWUgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBfcmVzdW1lOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9fcmVzaXplX18oKSB7XHJcbiAgICAgICAgICAgIGxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gTUIuQ29yZS5nZXRJbnN0YW5jZSgpLmNhbnZhcygpO1xyXG4gICAgICAgICAgICBsZXQgcmVhbFRvQ1NTUGl4ZWxzID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcclxuXHJcbiAgICAgICAgICAgIC8vIExvb2t1cCB0aGUgc2l6ZSB0aGUgYnJvd3NlciBpcyBkaXNwbGF5aW5nIHRoZSBjYW52YXMgaW4gQ1NTIHBpeGVsc1xyXG4gICAgICAgICAgICAvLyBhbmQgY29tcHV0ZSBhIHNpemUgbmVlZGVkIHRvIG1ha2Ugb3VyIGRyYXdpbmdidWZmZXIgbWF0Y2ggaXQgaW5cclxuICAgICAgICAgICAgLy8gZGV2aWNlIHBpeGVscy5cclxuICAgICAgICAgICAgbGV0IGRpc3BsYXlXaWR0aCAgPSBNYXRoLmZsb29yKGNhbnZhcy5jbGllbnRXaWR0aCAgKiByZWFsVG9DU1NQaXhlbHMpO1xyXG4gICAgICAgICAgICBsZXQgZGlzcGxheUhlaWdodCA9IE1hdGguZmxvb3IoY2FudmFzLmNsaWVudEhlaWdodCAqIHJlYWxUb0NTU1BpeGVscyk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgY2FudmFzIGlzIG5vdCB0aGUgc2FtZSBzaXplLlxyXG4gICAgICAgICAgICBpZiAoY2FudmFzLndpZHRoICAhPT0gZGlzcGxheVdpZHRoIHx8XHJcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ICE9PSBkaXNwbGF5SGVpZ2h0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTWFrZSB0aGUgY2FudmFzIHRoZSBzYW1lIHNpemVcclxuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCAgPSBkaXNwbGF5V2lkdGg7XHJcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gZGlzcGxheUhlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHZpZXdwb3J0IHRvIG1hdGNoXHJcbiAgICAgICAgICAgICAgICBNQi5HbG9iYWxTdGF0ZS5zZXRWaWV3cG9ydChuZXcgVmVjdG9yNDxudW1iZXI+KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2FtZXJhVXBkYXRlQ2IoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9hcHBGdW5jdGlvbnM6IElBcHA7XHJcbiAgICB9O1xyXG59XHJcbiIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGxdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
