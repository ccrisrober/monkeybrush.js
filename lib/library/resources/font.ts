/// <reference path="resourceMap.ts" />

"use strict";

class Font {
    public loadFont(fontName: string) {
        if (!(ResourceMap.isAssetLoaded(fontName))) {
            const fontInfoSrcStr = fontName + ".fnt";
            const texSrcStr = fontName + ".png";

            ResourceMap.asyncLoadRequested(fontName);

            // Load texture
            // Load text file
        } else {
            ResourceMap.incAssetRefCount(fontName);
        }
    }
    public unloadFont(fontName: string) {
        if (!(ResourceMap.unloadAsset(fontName))) {
            const fontInfoSrcStr = fontName + ".fnt";
            const texSrcStr = fontName + ".png";

            // Destroy texture
            // Destroy text file
        }
    }
}

namespace Font {
    export class CharacterInfo {
        // in texture coordinate (0 to 1) maps to the entier image
        protected _texCoordLeft = 0;
        protected _texCoordRight = 1;
        protected _texCoordBottom = 0;
        protected _texCoordTop = 0;

        // reference to nominal character size, 1 is "standard width/height" of a char
        protected _charWidth = 1;
        protected _charHeight = 1;
        protected _charWidthOffset = 0;
        protected _charHeightOffset = 0;

        // reference of char width/height ration
        protected _charAspectRatio = 1;
    }
}