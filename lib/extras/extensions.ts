/// <reference path="../core/core.ts" />

module extensions {
	var _extensions = {};
	export function get(name: string) {
		if(name in _extensions) {
			return _extensions[name];
		}
		var gl = Core.getInstance().getGL();
		var ext = gl.getExtension(name) || gl.getExtension("WEBKIT_" + name) || gl.getExtension("MOZ_" + name);
	
		if(ext === null) {
			console.warn(name + " extension not supported.");
			return;
		}
		_extensions[name] = ext;
		return ext;
	}
};