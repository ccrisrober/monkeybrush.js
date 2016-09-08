
import { Camera2 } from "../Camera2";

class DOMElement {
    protected _domElem: HTMLElement;
    protected _matrix: Float32Array;
    constructor(domElem: HTMLElement = document.createElement("div")) {
        this._domElem = domElem;
        this._domElem.style.overflow = "hidden";
        this._domElem.style.["WebkitTransformStyle"] = 'preserve-3d';
        this._domElem.style.["MozTransformStyle"] = 'preserve-3d';
        this._domElem.style.["oTransformStyle"] = 'preserve-3d';
        this._domElem.style.transformStyle = 'preserve-3d';
    }

    public render(camera: Camera2) {
        const fov = 45.0 * 3.14 / 360.0;
        // Only change perspective if camera changed (more eficient)
        this._domElem.style.["WebkitPerspective"] = fov + "px";
        this._domElem.style.["MozPerspective"] = fov + "px";
        this._domElem.style.["oPerspective"] = fov + "px";
        this._domElem.style.perspective = fov + "px";

        // const style = "translate3d(0, 0,";
    }
}
