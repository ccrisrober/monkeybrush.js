#!/usr/bin/env node
function loadObj(filename, outputFile) {
    var verts = [],
        normals = [],
        textures = [],
        idxCache = {},
        idx = 0;
    var model = {
        vertices: [],
        normals: [],
        indices: [],
        texCoords: []
    };

    function loadFile(filename) {
        var fs = require('fs');
        return fs.readFileSync(filename, "utf8");
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
            var _splitFace = split[i].split("/");
            _splitFace.forEach(function (value) {
                if (!isNaN(value)) {
                    values.push(value);
                }
            });
        }
        return values;
    }

    var lines = loadFile(filename).split("\n");
    lines.forEach(function (line) {
        var elems = line.split(/\s+/);
        elems.shift();
        var type = line.substr(0, 2).trim();
        if (type === "v") {
            var values = splitLineToFloats(line);
            verts.push(values[0], values[1], values[2]);
        } else if (type === "vn") {
            var _values = splitLineToFloats(line);
            normals.push(_values[0], _values[1], _values[2]);
        } else if (type === "vt") {
            var _values2 = splitLineToFloats(line);
            textures.push(_values2[0], _values2[1]);
        } else if (type === "f") {
            var quad = false;
            for (var j = 0, size = elems.length; j < size; ++j) {
                if (j === 3 && !quad) {
                    j = 2;
                    quad = true;
                }
                if (elems[j] in idxCache) {
                    model.indices.push(idxCache[elems[j]]);
                } else {
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
    require("fs").writeFile(outputFile, JSON.stringify({
        vertices: model.vertices,
        normals: model.normals,
        texCoords: model.texCoords,
        indices: model.indices
    }, null, 4));
}

if (!process.argv[3]) {
    console.log("objToJson <inputFile> <outputFile> ...");
} else {
    console.log(process.argv[2]);
    loadObj(process.argv[2], process.argv[3]);
}
