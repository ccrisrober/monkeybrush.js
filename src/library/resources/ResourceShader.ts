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
    /**
     * ResourceShader class
     * @class ResourceShader
     */
    export class ResourceShader {
        private static _files = {};
        /**
         * Add data to cache
         * @param {string} key: Key name
         * @param {any} value: Value
         */
        public static add (key: string, value: string) {
            this._files[key] = value;
        };
        /**
         * Get value from cache
         * @param {string} key: Key name
         * @return {any}: Null if key undefined
         */
        public static get (key: string): string {
            return this._files[key];
        };
        public static exist(key: string): boolean {
            return key in this._files;
        };
        /**
         * Remove cache value
         * @param {string} key: Key name
         */
        public static remove(key: string) {
            delete this._files[key];
        };
        /**
         * Remove all data from cache
         */
        public static clear() {
            this._files = {};
        };
    };
};

function loadShader(alias: string, filePath: string) {
    let request: XMLHttpRequest = new XMLHttpRequest();
    request.open("GET", filePath, false);
    try {
        request.send();
    } catch (err) {
        alert("ERROR: " + filePath);
        MB.Log.error("ERROR: " + filePath);
        return null;
    }
    let shaderSource: string = request.responseText;
    MB.ResourceShader.add(alias, _processImports(shaderSource));

};

function _processImports(src: string): string {
    const regex = /#import<(.+)>(\((.*)\))*/g;
    let match = regex.exec(src);
    let ret = src;
    while (match) {
        let includeFile = match[1];
        if (MB.ResourceShader.exist(includeFile)) {
            let includeContent = MB.ResourceShader.get(includeFile);
            ret = ret.replace(match[0], this._processImports(includeContent));
        }
        match = regex.exec(src);
    }
    return ret;
};

loadShader("SimpleNoise3D", "../src/shaders/SimpleNoise3D.glsl");
loadShader("ClassicNoise", "../src/shaders/ClassicNoise.glsl");
loadShader("VertexPP", "../src/shaders/VertexPP.glsl");
loadShader("MatCap", "../src/shaders/MatCap.glsl");
