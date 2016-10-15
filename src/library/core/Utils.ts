/// Copyright (C) 2016 [MonkeyBrush.js]
///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of this
/// software and associated documentation files (the "Software"), to deal in the Software
/// without restriction, including without limitation the rights to use, copy, modify,
/// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
/// permit persons to whom the Software is furnished to do so, subject to the following
/// conditions:
///
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
/// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
/// OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
/// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
/// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

"use strict";

namespace MB {
    export namespace Utils {
        /**
         * Concat two Uint8Array's.
         * @param  {Uint8Array} first  First operand.
         * @param  {Uint8Array} second Second operand.
         * @return {Uint8Array}        New Uint8Array with both
         *                                 operands concatenated.
         */
        export function Uint8Concat(first: Uint8Array, second: Uint8Array): Uint8Array {
            let firstLength = first.length,
                result = new Uint8Array(firstLength + second.length);

            result.set(first);
            result.set(second, firstLength);

            return result;
        };
        /**
         * Concat two Uint16Array's.
         * @param  {Uint16Array} first  First operand.
         * @param  {Uint16Array} second Second operand.
         * @return {Uint16Array}        New Uint16Array with both
         *                                  operands concatenated.
         */
        export function Uint16Concat(first: Uint16Array, second: Uint16Array): Uint16Array {
            let firstLength = first.length,
                result = new Uint16Array(firstLength + second.length);

            result.set(first);
            result.set(second, firstLength);

            return result;
        };
        /**
         * Concat two Uint32Array's.
         * @param  {Uint32Array} first  First operand.
         * @param  {Uint32Array} second Second operand.
         * @return {Uint32Array}        New Uint32Array with both
         *                                  operands concatenated.
         */
        export function Uint32Concat(first: Uint32Array, second: Uint32Array): Uint32Array {
            let firstLength = first.length,
                result = new Uint32Array(firstLength + second.length);

            result.set(first);
            result.set(second, firstLength);

            return result;
        };
        /**
         * Concat two Int8Array's.
         * @param  {Int8Array} first  First operand.
         * @param  {Int8Array} second Second operand.
         * @return {Int8Array}        New Int8Array with both
         *                                operands concatenated.
         */
        export function Int8Concat(first: Int8Array, second: Int8Array): Int8Array {
            let firstLength = first.length,
                result = new Int8Array(firstLength + second.length);

            result.set(first);
            result.set(second, firstLength);

            return result;
        };
        /**
         * Concat two Int16Array's.
         * @param  {Int16Array} first  First operand.
         * @param  {Int16Array} second Second operand.
         * @return {Int16Array}        New Int16Array with both
         *                                 operands concatenated.
         */
        export function Int16Concat(first: Int16Array, second: Int16Array): Int16Array {
            let firstLength = first.length,
                result = new Int16Array(firstLength + second.length);

            result.set(first);
            result.set(second, firstLength);

            return result;
        };
        /**
         * Concat two Int32Array's.
         * @param  {Int32Array} first  First operand.
         * @param  {Int32Array} second Second operand.
         * @return {Int32Array}        New Int32Array with both
         *                                 operands concatenated.
         */
        export function Int32Concat(first: Int32Array, second: Int32Array): Int32Array {
            let firstLength = first.length,
                result = new Int32Array(firstLength + second.length);

            result.set(first);
            result.set(second, firstLength);

            return result;
        };
        /**
         * Concat two Float32Array's.
         * @param  {Float32Array} first  First operand.
         * @param  {Float32Array} second Second operand.
         * @return {Float32Array}        New Float32Array with both
         *                                   operands concatenated.
         */
        export function Float32Concat(first: Float32Array, second: Float32Array): Float32Array {
            let firstLength = first.length,
                result = new Float32Array(firstLength + second.length);

            result.set(first);
            result.set(second, firstLength);

            return result;
        };
        /**
         * Concat two Float64Array's.
         * @param  {Float64Array} first  First operand.
         * @param  {Float64Array} second Second operand.
         * @return {Float64Array}        New Float64Array with both
         *                                   operands concatenated.
         */
        export function Float64Concat(first: Float64Array, second: Float64Array): Float64Array {
            let firstLength = first.length,
                result = new Float64Array(firstLength + second.length);

            result.set(first);
            result.set(second, firstLength);

            return result;
        };
        /**
         * Download canvas image.
         * @param {HTMLCanvasElement} canvas Canvas to download image.
         * @param {string = "file.png"}  name Image name (with extension).
         */
        export function downloadCanvasImage(canvas: HTMLCanvasElement, name: string = "file.png") {
            let a: HTMLAnchorElement = document.createElement("a");
            a.href = canvas.toDataURL();
            a["download"] = name;
            a.click();
        };

        export function arrayToVector(elements: Array<number>): any {
            if (Array.isArray(elements)) {
                if(typeof(elements[3]) !== 'undefined') {
                    return new MB.Vect4(elements[0], elements[1], elements[2], elements[3]);
                } else if (typeof(elements[2]) !== 'undefined') {
                    return new MB.Vect3(elements[0], elements[1], elements[2]);
                } else {
                    return new MB.Vect2(elements[0], elements[1]);
                }
            } else {
                return elements;
            }
        };
    };
};
