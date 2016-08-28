namespace easing {
    const PI_2 = Math.PI / 2.0;
    // Sine functions
    export namespace sine {
        export function easeIn(t: number): number {
            return Math.sin(PI_2 * t);
        };
        export function easeOut(t: number): number {
            return 1.0 + Math.sin(PI_2 * (--t));
        };
        export function easeInOut(t: number): number {
            return 0.5 * (1.0 + Math.sin( Math.PI * (t - 0.5) ) );
        };
    };

    // Quad functions
    export namespace quad {
        export function easeIn(t: number): number {
            return t * t;
        };
        export function easeOut(t: number): number {
            return t * (2.0 - t);
        };
        export function easeInOut(t: number): number {
            return t < 0.5 ? 2.0 * t * t : t * (4.0 - 2.0 * t) - 1;
        };
    };

    // Cubic functions
    export namespace cubic {
        export function easeIn(t: number): number {
            return t * t * t;
        };
        export function easeOut(t: number): number {
            return 1 + (--t) * t * t;
        };
        export function easeInOut(t: number): number {
            return t < 0.5 ? 4.0 * t * t * t : 1.0 + (--t) *
                    (2.0 * (--t)) * (2.0 * t);
        };
    };

    // Quart functions
    export namespace quart {
        export function easeIn(t: number): number {
            t *= t;
            return t * t;
        };
        export function easeOut(t: number): number {
            t = (--t) * t;
            return 1.0 - t * t;
        };
        export function easeInOut(t: number): number {
            if (t < 0.5) {
                t *= t;
                return 8.0 * t * t;
            } else {
                t = (--t) * t;
                return 1.0 - 8.0 * t * t;
            }
        };
    };

    // Quint functions
    export namespace quint {
        export function easeIn(t: number): number {
            const t2: number = t * t;
            return t * t2 * t2;
        };
        export function easeOut(t: number): number {
            const t2: number = (--t) * t;
            return 1.0 + t * t2 * t2;
        };
        export function easeInOut(t: number): number {
            let t2: number;
            if (t < 0.5) {
                t2 = t * t;
                return 16.0 * t * t2 * t2;
            } else {
                t2 = (--t) * t;
                return 1 + 16 * t * t2 * t2;
            }
        };
    };

    // Expo functions
    export namespace expo {
        export function easeIn(t: number): number {
            return (Math.pow( 2.0, 8.0 * t ) - 1.0) / 255.0;
        };
        export function easeOut(t: number): number {
            return 1 - Math.pow( 2.0, -8.0 * t );
        };
        export function easeInOut(t: number): number {
            if (t < 0.5) {
                return (Math.pow( 2.0, 16.0 * t ) - 1.0) / 510.0;
            } else {
                return 1.0 - 0.5 * Math.pow( 2.0, -16.0 * (t - 0.5) );
            }
        };
    };

    // Circ functions
    export namespace circ {
        export function easeIn(t: number): number {
            return 1.0 - Math.sqrt( 1.0 - t );
        };
        export function easeOut(t: number): number {
            return Math.sqrt( t );
        };
        export function easeInOut(t: number): number {
            if (t < 0.5) {
                return (1.0 - Math.sqrt( 1.0 - 2.0 * t )) * 0.5;
            } else {
                return (1.0 + Math.sqrt( 2.0 * t - 1.0 )) * 0.5;
            }
        };
    };

    // Back functions
    export namespace back {
        export function easeIn(t: number): number {
            return t * t * (2.70158 * t - 1.70158);
        };
        export function easeOut(t: number): number {
            return 1.0 + (--t) * t * (2.70158 * t + 1.70158);
        };
        export function easeInOut(t: number): number {
            if (t < 0.5) {
                return t * t * (7.0 * t - 2.5) * 2.0;
            } else {
                return 1.0 + (--t) * t * 2.0 * (7.0 * t + 2.5);
            }
        };
    };

    // Elastic functions
    export namespace elastic {
        export function easeIn(t: number): number {
            let t2: number = t * t;
            return t2 * t2 * Math.sin( t * Math.PI * 4.5 );
        };
        export function easeOut(t: number): number {
            let t2: number = (t - 1.0) * (t - 1.0);
            return 1.0 - t2 * t2 * Math.cos( t * Math.PI * 4.5 );
        };
        export function easeInOut(t: number): number {
            let t2: number;
            if (t < 0.45) {
                t2 = t * t;
                return 8.0 * t2 * t2 * Math.sin( t * Math.PI * 9.0 );
            } else if (t < 0.55) {
                return 0.5 + 0.75 * Math.sin( t * Math.PI * 4.0 );
            } else {
                t2 = (t - 1.0) * (t - 1.0);
                return 1.0 - 8.0 * t2 * t2 * Math.sin( t * Math.PI * 9.0 );
            }
        };
    };

    // Bounce functions
    export namespace bounce {
        export function easeIn(t: number): number {
            return Math.pow( 2.0, 6.0 * (t - 1.0) ) * Math.abs( Math.sin( t * Math.PI * 3.5 ) );
        };
        export function easeOut(t: number): number {
            return 1.0 - Math.pow( 2.0, -6.0 * t ) * Math.abs( Math.cos( t * Math.PI * 3.5 ) );
        };
        export function easeInOut(t: number): number {
            if (t < 0.5) {
                return 8.0 * Math.pow( 2.0, 8.0 * (t - 1.0) ) * Math.abs( Math.sin( t * Math.PI * 7.0 ) );
            } else {
                return 1.0 - 8.0 * Math.pow( 2.0, -8.0 * t ) * Math.abs( Math.sin( t * Math.PI * 7.0 ) );
            }
        };
    };
};

export { easing };
