/// <reference path="../core/core.ts" />

"use strict";

namespace extensions {
    /**
     * [_extensions description]
     * @type {Object}
     */
    let _extensions = {};
    /**
     * @param {string}
     */
    export function get(name: string) {
        if (name in _extensions) {
            return _extensions[name];
        }
        const gl = Core.getInstance().getGL();
        let ext = gl.getExtension(name) || gl.getExtension("WEBKIT_" + name) || gl.getExtension("MOZ_" + name);
    
        if (ext === null) {
            console.warn(name + " extension not supported.");
            return;
        }
        _extensions[name] = ext;
        return ext;
    }
};