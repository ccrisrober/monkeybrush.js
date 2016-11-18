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

namespace MBX {
    /**
     * Sprite manager class
     * @class SpriteManager
     */
    export class SpriteManager {
        /**
         * Sprite cache dictionary
         */
        protected _spritesDictionary: { [ key: string ]: MBX.Sprite; } = {};
        protected _context: MB.GLContext;
        constructor(context: MB.GLContext) {
            this._context = context;
        };
        /**
         * Return cached sprite from name
         * @param  {string} name: Sprite name
         * @return {Sprite}
         */
        public get(name: string): Sprite {
            let sprite = this._spritesDictionary[name];
            if (!sprite) {
                throw new Error(`Sprite ${name} undefined`);
            }
            return sprite;
        };
        /**
         * Add a existing MBX.Sprite with his name and the MBX.Sprite.
         * @param {string} name: MBX.Sprite name.
         * @param {MBX.Sprite} sprite: Existing sprite.
         */
        public add(name: string, sprite: MBX.Sprite) {
            if (!sprite) {
                throw new Error(`MBX.Sprite ${name} undefined`);
            }
            this._spritesDictionary[name] = sprite;
        };
        /**
         * Destroy all sprites and clear cache.
         */
        public destroy() {
            for (let key in this._spritesDictionary) {
                this._spritesDictionary[key].destroy();
            }
            this._spritesDictionary = {};
        };
    };
};
