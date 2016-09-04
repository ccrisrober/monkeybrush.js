#!/usr/bin/env node

if (process.argv[3]) {
    switch (process.argv[2]) {
        case "-h":
        case "--help":
            help();
            break;
        default:
            require(__dirname + '/auxiliar/opentype.min').load(process.argv[2], function (err, font) {
                if (err) {
                    console.log('Font could not be loaded: ' + err);
                } else {
                    convert(font, process.argv[3]);
                }
            });
            break;
    }
} else {
    console.log("ERROR: No file supplied");
    help();
}

function tokenCmd(command, x, y, scale) {
    var str = "";
    if (command[x] !== undefined && command[y] !== undefined) {
        str += Math.round(command[x] * scale);
        str += " "
        str += Math.round(command[y] * scale);
        str += " "
    }
    return str;
}

function convert(font, outputFile) {
    var scale = (1000 * 100) / ( (font.unitsPerEm || 2048) *72);
    var res = {};
    res.glyphs = {};

    font.glyphs.forEach(function(glyph) {
        if (glyph.unicode !== undefined) {

            var token = {};
            token.ha = Math.round(glyph.advanceWidth * scale);
            token.x_min = Math.round(glyph.xMin * scale);
            token.x_max = Math.round(glyph.xMax * scale);
            token.o = ""
            glyph.path.commands.forEach(function(command, i) {
                if (command.type.toLowerCase() === "c") { command.type = "b"; }
                token.o += command.type.toLowerCase();
                token.o += " ";
                token.o += tokenCmd(command, "x", "y", scale);
                token.o += tokenCmd(command, "x1", "y1", scale);
                token.o += tokenCmd(command, "x2", "y2", scale);
            });
            res.glyphs[String.fromCharCode(glyph.unicode)] = token;
        };
    });
    res.familyName = font.familyName;
    res.ascender = Math.round(font.ascender * scale);
    res.descender = Math.round(font.descender * scale);
    res.underlinePosition = font.tables.post.underlinePosition;
    res.underlineThickness = font.tables.post.underlineThickness;
    res.boundingBox = {
        "yMin": font.tables.head.yMin,
        "xMin": font.tables.head.xMin,
        "yMax": font.tables.head.yMax,
        "xMax": font.tables.head.xMax
    };
    res.resolution = 1000;
    res.original_font_information = font.tables.name;
    if (font.styleName.toLowerCase().indexOf("bold") > -1) {
        res.cssFontWeight = "bold";
    } else {
        res.cssFontWeight = "normal";
    };

    if (font.styleName.toLowerCase().indexOf("italic") > -1) {
        res.cssFontStyle = "italic";
    } else {
        res.cssFontStyle = "normal";
    };

    require("fs").writeFile(outputFile, "if (_typeface_js && _typeface_js.loadFace) _typeface_js.loadFace("+ JSON.stringify(res) + ");");
};

function help() {
    console.log("Usage: typefacegen [font file source] [generated font file output]");
}
