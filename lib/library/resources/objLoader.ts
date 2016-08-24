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

namespace ObjLoader {
    function loadFile(filename: string): string {
        let req = new XMLHttpRequest();
        req.open("GET", filename, false);
        if (req.overrideMimeType) {
          req.overrideMimeType("text/plain");
        }
        try {
          req.send(null);
        } catch (e) {
          console.log(`Error reading file ${filename}`);
        }
        return req.responseText;
    }
    export function loadObj(filename: string): Object {
        let verts = [];
        let norms = [];
        let tcs = [];

        let ret = {
            vertices: [],
            normals: [],
            texCoords: [],
            indices: [],
        };

        let text = loadFile(filename);
        // console.log(text);

        let objFile = text.split("\n");

        objFile.forEach((line: string) => {
            line = line.trim();

            let type = line.substr(0, 2).trim();
            // Comments
            if (type === "#") {
                return; // stop processing this iteration
            }
            // Vertices
            if (type === "v") {
                let values = splitLineToFloats(line);
                verts.push(values);
            }
            // Normals
            if (type === "vn") {
                let values = splitLineToFloats(line);
                norms.push(values);
            }
            // Tex Coords
            if (type === "vt") {
                let values = splitLineToFloats(line);
                tcs.push(values);
            }
            if (type === "f") {
                let values = splitFace(line);
                values.forEach((value: number) => {
                    ret.indices.push(value - 1);
                });
            }
        });

        // Unindex
        for (let i = 0, size = ret.indices.length / 3; i < size; ++i) {
            for (let j = 0; j < verts[ret.indices[i * 3]].length; ++j) {
                ret.vertices.push(verts[ret.indices[i * 3]][j]);
            }
            for (let j = 0; j < norms[ret.indices[i * 3 + 2]].length; ++j) {
                ret.normals.push(norms[ret.indices[i * 3 + 2]][j]);
            }
            for (let j = 0; j < tcs[ret.indices[i * 3 + 1]].length; ++j) {
                ret.texCoords.push(tcs[ret.indices[i * 3 + 1]][j]);
            }
        }

        return ret;
    }

    function splitLineToFloats(line: string): Array<number> {
        let values = new Array();

        let split = line.split(" ");
        split.forEach((value: any) => {
            if (!isNaN(value)) {
                values.push(value);
            }
        });

        return values;
    }

    function splitFace(line: string): Array<number> {
        let values = [];
        let split = line.split(" ");
        for (let i = 1; i < split.length; ++i) {
            let splitFace = split[i].split("/");
            splitFace.forEach((value: any) => {
                if (!isNaN(value)) {
                  values.push(value);
                }
            });
        }
        return values;
    }
};

export default ObjLoader;
