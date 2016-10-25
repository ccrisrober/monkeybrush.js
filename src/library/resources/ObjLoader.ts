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
    export namespace ObjLoader {
        function loadFile(filename: string): string {
            let req = new XMLHttpRequest();
            req.open("GET", filename, false);
            if (req.overrideMimeType) {
                req.overrideMimeType("text/plain");
            }
            try {
                req.send(null);
            } catch (e) {
                console.error(`Error reading file ${filename}`);
            }
            return req.responseText;
        }
        function splitLineToFloats(line: string): Array<number> {
            let values = new Array();

            let split = line.split(" ");
            split.forEach((value: any) => {
                if (!isNaN(value)) {
                    values.push(parseFloat(value));
                }
            });

            return values;
        }
        function splitLineToIntegers(line: string): Array<number> {
            let values = new Array();

            let split = line.split(" ");
            split.forEach((value: any) => {
                if (!isNaN(value)) {
                    values.push(parseInt(value));
                }
            });

            return values;
        }
        function splitFace(line: string): Array<number> {
            let values = [];
            let split = line.split(" ");
            for (let i = 0; i < split.length; ++i) {
                let splitFace = split[i].split("/");
                splitFace.forEach((value: any) => {
                    if (!isNaN(value)) {
                      values.push(value);
                    }
                });
            }
            return values;
        }
        export function loadMTL(filename: string): Object {
            let mtl = {
                diffuseColor: null,
                ambientColor: null,
                specularColor: null,
                specPower: 0,
                alpha: 1.0,
                diffuseTexSrc: null,
                ambientTexSrc: null,
                specularTexSrc: null,
            };

            let lines = loadFile(filename).split("\n");
            let aux;

            lines.forEach((line: string) => {
                let elems = line.split(/\s+/);
                elems.shift();

                let type: string = line.substr(0, 2).trim();

                // Blank line or comment
                if (type.length === 0 || type === "#") {
                    return;
                }
                type = type.toLowerCase();
                if (type === "kd") {
                    aux = splitLineToFloats(line);
                    mtl.diffuseColor = new MB.Color3(aux[0], aux[1], aux[2]);
                }
                else if (type === "ka") {
                    aux = splitLineToFloats(line);
                    mtl.ambientColor = new MB.Color3(aux[0], aux[1], aux[2]);
                }
                else if (type === "ks") {
                    aux = splitLineToFloats(line);
                    mtl.specularColor = new MB.Color3(aux[0], aux[1], aux[2]);
                }
                else if (type === "ns") {
                    mtl.specPower = splitLineToIntegers(line)[0];
                }
                else if (type === "d") {
                    mtl.alpha = splitLineToFloats(line)[0];
                }

                // TODO:
                // map_Ka -s 1 1 1 -o 0 0 0 -mm 0 1 chrome.mpc
                // map_Kd -s 1 1 1 -o 0 0 0 -mm 0 1 chrome.mpc
                // map_Ks -s 1 1 1 -o 0 0 0 -mm 0 1 chrome.mpc
                // map_Ns -s 1 1 1 -o 0 0 0 -mm 0 1 wisp.mps
                // map_d -s 1 1 1 -o 0 0 0 -mm 0 1 wisp.mps
                // disp -s 1 1 .5 wisp.mps
                // decal -s 1 1 1 -o 0 0 0 -mm 0 1 sand.mps
                // bump -s 1 1 1 -o 0 0 0 -bm 1 sand.mpb

            });

            return mtl;
        };
        export function loadObj(filename: string): Object {
            let verts = [],
                normals = [],
                textures = [],
                idxCache = {},
                idx = 0;

            let model = {
                vertices: [],
                normals: [],
                indices: [],
                texCoords: []
            };

            let lines = loadFile(filename).split("\n");

            lines.forEach((line: string) => {
                let elems = line.split(/\s+/);
                elems.shift();

                let type: string = line.substr(0, 2).trim();

                // Blank line or comment
                if (type.length === 0 || type === "#") {
                    return;
                }
                type = type.toLowerCase();

                // if (/^v\s/.test(line)) {
                if (type === "v") {
                    let values = splitLineToFloats(line);
                    verts.push(values[0], values[1], values[2]);
                // } else if (/^vn\s/.test(line)) {
                } else if (type === "vn") {
                    let values = splitLineToFloats(line);
                    normals.push(values[0], values[1], values[2]);
                // } else if (/^vt\s/.test(line)) {
                } else if (type === "vt") {
                    let values = splitLineToFloats(line);
                    textures.push(values[0], values[1]);
                // } else if (/^f\s/.test(line)) {
                } else if (type === "f") {
                    let quad: boolean = false;
                    for (let j = 0, size = elems.length; j < size; ++j) {
                        // Triangulating quads
                        if (j === 3 && !quad) {
                            // add v2/t2/vn2 in again before continuing to 3
                            j = 2;
                            quad = true;
                        }
                        if (elems[j] in idxCache) {
                            model.indices.push(idxCache[elems[j]]);
                        } else {
                            let vertex: Array<number> = splitFace(elems[j]);
                            // position
                            const v = (vertex[0] - 1) * 3;
                            model.vertices.push(verts[v]);
                            model.vertices.push(verts[v + 1]);
                            model.vertices.push(verts[v + 2]);
                            // textures
                            if (textures.length) {
                                const tc = (vertex[1] - 1) * 2;
                                model.texCoords.push(textures[tc]);
                                model.texCoords.push(textures[tc + 1]);
                            }
                            // normals
                            const n = (vertex[2] - 1) * 3;
                            model.normals.push(normals[n]);
                            model.normals.push(normals[n + 1]);
                            model.normals.push(normals[n + 2]);

                            // Cache indice
                            idxCache[elems[j]] = idx;
                            model.indices.push(idx);
                            // increment the counter
                            ++idx;
                        }
                        if (j === 3 && quad) {
                            // add v0/t0/vn0 onto the second triangle
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
    };
};
