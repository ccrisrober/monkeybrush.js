class Font {
    public generateShapes(text, size: number = 100, divisions: number = 4) {

        var data: any = {}; // TODO

        let createPath = function(c: string, scale: number, offset: number) {
            const glyph = data.glyphs[ c ] || data.glyphs[ '?' ];
            if (!glyph) return;

            let path = {};

            // TODO

            return {
                offset: 0,
                path: {}
            };
        }

        let paths = function(text: string) {
            var chars = String(text).split( '' );
            var scale = size / data.resolution;
            var offset = 0;

            // Create path character for any char in text
            var paths = chars.map((c: string) => {
                let ret = this.createPath(c, scale, offset);
                offset += ret.offset;
                return ret.path;
            });

            return paths;
        }(text);
        let shapes = [];

        return shapes;
    }
};

export { Font };
