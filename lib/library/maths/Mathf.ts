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
        return Math.max(min, Math.min(max, v));
    };
    export function smoothstep(x: number, min: number, max: number): number {
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
    }
};

export { Mathf };
