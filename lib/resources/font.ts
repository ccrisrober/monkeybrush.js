/// <reference path="resourceMap.ts" />

class Font {
	constructor(fontName: string) {
		var rm : ResourceMap = ResourceMap.getInstance();
		if(!(rm.isAssetLoaded(fontName))) {
			var fontInfoSrcStr = fontName + ".fnt";
			var texSrcStr = fontName + ".png";

			rm.asyncLoadRequested(fontName);

			// Load texture
			// Load text file
		} else {
			rm.incAssetRefCount(fontName);
		}
	}
	public unloadFont(fontName: string) {
		var rm : ResourceMap = ResourceMap.getInstance();
		if(!(rm.unloadAsset(fontName))) {
			var fontInfoSrcStr = fontName + ".fnt";
			var texSrcStr = fontName + ".png";

			// Destroy texture
			// Destroy text file
		}
	}
}

module Font {
	export class CharacterInfo {
		// in texture coordinate (0 to 1) maps to the entier image
		protected mTexCoordLeft = 0;
		protected mTexCoordRight = 1;
		protected mTexCoordBottom = 0;
		protected mTexCoordTop = 0;

		// reference to nominal character size, 1 is "standard width/height" of a char
		protected mCharWidth = 1;
		protected mCharHeight = 1;
		protected mCharWidthOffset = 0;
		protected mCharHeightOffset = 0;

		// reference of char width/height ration
		protected mCharAspectRatio = 1;
	}
}