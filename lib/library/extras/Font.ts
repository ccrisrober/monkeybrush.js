class Font {
    public generateShapes(text: string, size: number = 100, divisions: number = 4) {

        let data: any = {}; // TODO

        function createPath(c: string, scale: number, offset: number) {
            const glyph = data.glyphs[c] || data.glyphs["?"];
            if (!glyph) return;

            let path = {};

            // TODO

            return {
                offset: 0,
                path: path
            };
        };

        function pt(text: string) {
            let chars = String(text).split("");
            let scale = size / data.resolution;
            let offset = 0;

            // Create path character for any char in text
            let paths = chars.map((c: string) => {
                let ret = this.createPath(c, scale, offset);
                offset += ret.offset;
                return ret.path;
            });

            return paths;
        };

        let paths = pt(text);
        let shapes = [];
        shapes.push(paths);

        return shapes;
    }
};

export { Font };
