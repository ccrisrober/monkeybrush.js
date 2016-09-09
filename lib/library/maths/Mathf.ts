
import { Vect2 } from "./Vect2";
import { Vect3 } from "./Vect3";

namespace Mathf {
    export function lerp(x: number, x1: number, x2: number,
        q00: number, q01: number): number {

        return ((x2 - x) / (x2 - x1)) * q00 + ((x - x1) / (x2 - x1)) * q01;
    };

    export function biLerp(x: number, y: number, q11: number,
        q12: number, q21: number, q22: number, x1: number, x2: number,
        y1: number, y2: number): number {

        const r1 = lerp(x, x1, x2, q11, q21);
        const r2 = lerp(x, x1, x2, q12, q22);

        return lerp(y, y1, y2, r1, r2);
    };

    export function triLerp(x: number, y: number, z: number, q000: number,
        q001: number, q010: number, q011: number, q100: number, q101: number,
        q110: number, q111: number, x1: number, x2: number, y1: number, y2: number,
        z1: number, z2: number): number {

        const x00 = lerp(x, x1, x2, q000, q100);
        const x10 = lerp(x, x1, x2, q010, q110);
        const x01 = lerp(x, x1, x2, q001, q101);
        const x11 = lerp(x, x1, x2, q011, q111);
        const r0 = lerp(y, y1, y2, x00, x01);
        const r1 = lerp(y, y1, y2, x10, x11);

        return lerp(z, z1, z2, r0, r1);
    };

    export const Deg2Rad: number = Math.PI / 180;
    export const Rad2Deg: number = 180 / Math.PI;

    export function degToRad (degs: number): number {
        return degs * this.Deg2Rad;
    };
    export function radToDeg (rads: number): number {
        return rads * this.Rad2Deg;
    };
    export function isPOT (v: number): boolean {
        return (v & (v - 1)) === 0 && v !== 0;
    };
    export function nearestPOT(v: number): number {
        return Math.pow(2, Math.round(Math.log(v) / Math.LN2));
    };
    export function clamp(v: number, min: number, max: number): number {
        return Math.min(max, Math.max(min, v));
    };
    /**
     * Return 1 when is a positive number. -1 otherwise.
     * @param  {number} v [description]
     * @return {number}   [description]
     */
    export function sign(v: number): number {
        if (v === 0 || isNaN(v)) {
            return v;
        }
        return (v > 0) ? 1: -1;
    }
    export function smoothstep(x: number, min: number = 0, max: number = 1): number {
        if (x <= min) return 0;
        if (x >= max) return 1;

        x = (x - min) / (max - min);

        return x * x * (3 - 2 * x);
    };
    export function smootherstep(x: number, min: number, max: number): number {
        if (x <= min) return 0;
        if (x >= max) return 1;
        x = (x - min) / (max - min);
        return Math.pow(x, 3) * (x * (x * 6 - 15) + 10);
    };
    export function toHex(n: number): string {
        let str = n.toString(16);
        if (n <= 15) {
            return ("0" + str).toUpperCase();
        }
        return str.toUpperCase();
    };
    // return: radians angle!
    export function angleBetween2DPoints(p0: Vect2, p1: Vect2): number {
        const delta = Vect2.sub(p1, p0);
        return Math.atan2(delta.y, delta.x);
    };
    // return: radians angle!
    export function angleBetween3DPoints(p0: Vect3, p1: Vect3): number {
        const delta = Vect3.sub(p1, p0);
        return Math.atan2(delta.z, delta.x);
    };

    export function CatmullRom2D(p0: Vect2, p1: Vect2, p2: Vect2, p3: Vect2, t: number): Vect2 {
        const t2 = t * t;
        const t3 = t * t2;

        const x = 0.5 * ((((2.0 * p1.x) + ((-p0.x + p2.x) * t)) +
            (((((2.0 * p0.x) - (5.0 * p1.x)) + (4.0 * p2.x)) - p3.x) * t2)) +
            ((((-p0.x + (3.0 * p1.x)) - (3.0 * p2.x)) + p3.x) * t3));

        const y = 0.5 * ((((2.0 * p1.y) + ((-p0.y + p2.y) * t)) +
            (((((2.0 * p0.y) - (5.0 * p1.y)) + (4.0 * p2.y)) - p3.y) * t2)) +
            ((((-p0.y + (3.0 * p1.y)) - (3.0 * p2.y)) + p3.y) * t3));

        return new Vect2(x, y);
    };

    export function Hermite2D(p0: Vect2, t0: Vect2, p1: Vect2, t1: Vect2, t: number): Vect2 {
        const t2 = t * t;
        const t3 = t * t2;

        const part1 = ((2.0 * t3) - (3.0 * t2)) + 1.0;
        const part2 = (-2.0 * t3) + (3.0 * t2);
        const part3 = (t3 - (2.0 * t2)) + t;
        const part4 = t3 - t2;

        const x = (((p0.x * part1) + (p1.x * part2)) + (t0.x * part3)) + (t1.x * part4);
        const y = (((p0.y * part1) + (p1.y * part2)) + (t0.y * part3)) + (t1.y * part4);

        return new Vect2(x, y);
    };

    export function CatmullRom3D(p0: Vect3, p1: Vect3, p2: Vect3, p3: Vect3, t: number): Vect3 {
        const t2 = t * t;
        const t3 = t * t2;

        const x = 0.5 * ((((2.0 * p1.x) + ((-p0.x + p2.x) * t)) +
            (((((2.0 * p0.x) - (5.0 * p1.x)) + (4.0 * p2.x)) - p3.x) * t2)) +
            ((((-p0.x + (3.0 * p1.x)) - (3.0 * p2.x)) + p3.x) * t3));

        const y = 0.5 * ((((2.0 * p1.y) + ((-p0.y + p2.y) * t)) +
            (((((2.0 * p0.y) - (5.0 * p1.y)) + (4.0 * p2.y)) - p3.y) * t2)) +
            ((((-p0.y + (3.0 * p1.y)) - (3.0 * p2.y)) + p3.y) * t3));

        const z = 0.5 * ((((2.0 * p1.z) + ((-p0.z + p2.z) * t)) +
            (((((2.0 * p0.z) - (5.0 * p1.z)) + (4.0 * p2.z)) - p3.z) * t2)) +
            ((((-p0.z + (3.0 * p1.z)) - (3.0 * p2.z)) + p3.z) * t3));

        return new Vect3(x, y, z);
    };

    export function Hermite3D(p0: Vect3, t0: Vect3, p1: Vect3, t1: Vect3, t: number): Vect3 {
        const t2 = t * t;
        const t3 = t * t2;

        const part1 = ((2.0 * t3) - (3.0 * t2)) + 1.0;
        const part2 = (-2.0 * t3) + (3.0 * t2);
        const part3 = (t3 - (2.0 * t2)) + t;
        const part4 = t3 - t2;

        const x = (((p0.x * part1) + (p1.x * part2)) + (t0.x * part3)) + (t1.x * part4);
        const y = (((p0.y * part1) + (p1.y * part2)) + (t0.y * part3)) + (t1.y * part4);
        const z = (((p0.z * part1) + (p1.z * part2)) + (t0.z * part3)) + (t1.z * part4);

        return new Vect3(x, y, z);
    };
};

export { Mathf };
