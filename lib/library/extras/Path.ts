
import { Vect2 } from "../maths/Vect2";

class Path {
    public _currentPoint; Vect2 = new Vect2();
};

class ShapePath {
    /**
     * Moves the path to the specified point in the canvas, without creating a line.
     * @param {number} x The x-coordinate of where to move the path to.
     * @param {number} y The y-coordinate of where to move the path to.
     */
    public moveTo(x: number, y: number) {

    };
    /**
     * Adds a new point and creates a line to that point from the last specified
     *     point in the canvas.
     * @param {number} x The x-coordinate of where to create the line to.
     * @param {number} y The y-coordinate of where to create the line to.
     */
    public lineTo(x: number, y: number) {

    };
    /**
     * Adds a point to the current path by using the specified control points that represent
     * a quadratic Bézier curve.
     * @param  {[type]} cpx: number        The x-coordinate of the Bézier control point.
     * @param  {[type]} cpy: number        The y-coordinate of the Bézier control point.
     * @param  {[type]} x:   number        The x-coordinate of the ending point.
     * @param  {[type]} y:   number        The y-coordinate of the ending point.
     * @return {[type]}      [description]
     */
    public quadraticCurveTo(cpx: number,  cpy: number, x: number, y: number) {

    };
    /**
     * Adds a point to the current path by using the specified control points
     *     that represent a cubic Bézier curve.
     * @param {number} cpx1 The x-coordinate of the first Bézier control point.
     * @param {number} cpy1 The y-coordinate of the first Bézier control point.
     * @param {number} cpx2 The x-coordinate of the second Bézier control point.
     * @param {number} cpy2 The y-coordinate of the second Bézier control point.
     * @param {number} x    The x-coordinate of the ending point.
     * @param {number} y    The y-coordinate of the ending point.
     */
    public bezierCurveTo(cpx1: number, cpy1: number,
        cpx2: number, cpy2: number, x: number, y: number) {

    };
};
