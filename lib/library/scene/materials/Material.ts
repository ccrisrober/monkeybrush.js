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


import { BlendingEq , BlendingType, ComparisonFunc, FaceSide }
    from "../../constants/Constants";

abstract class Material {
    public _blending;
    public _side: FaceSide = FaceSide.Front;
    public _opacity: number = 1;
    public _blendSrc: BlendingType = BlendingType.SrcAlpha;
    public _blendDst: BlendingType = BlendingType.DstAlpha;
    public _blendEq: BlendingEq = BlendingEq.Add;
    // public _blendSrcAlpha;
    // public _blendDstAlpha;
    // public _blendEqAlpha;
    public _depthFunc: ComparisonFunc = ComparisonFunc.LessEqual;
    public _depthTest: boolean = true;
    public _transparent: boolean = false;
    public _iluminate: boolean = true;

    get blending() { return this._blending; };
    get side(): FaceSide { return this._side; };
    get opacity(): number { return this._opacity; };
    get blendSrc(): BlendingType { return this._blendSrc; };
    get blendDst(): BlendingType { return this._blendDst; };
    get blendEq(): BlendingEq { return this._blendEq; };
    // get blendSrcAlpha() { return this._blendSrcAlpha; };
    // get blendDstAlpha() { return this._blendDstAlpha; };
    // get blendEqAlpha() { return this._blendEqAlpha; };
    get depthFunc(): ComparisonFunc { return this._depthFunc; };
    get depthTest(): boolean { return this._depthTest; };
    get transparent(): boolean { return this._transparent; };
    get iluminate(): boolean { return this._iluminate; };



    set blending(b) {
        this._blending = b;
    };
    set side(s: FaceSide) {
        this._side = s;
    };
    set opacity(o: number) {
        if (o < 0.0 || o > 1.0) return;
        this._opacity = o;
    };
    set blendSrc(b: BlendingType) {
        this._blendSrc = b;
    };
    set blendDst(b: BlendingType) {
        this._blendDst = b;
    };
    set blendEq(b: BlendingEq) {
        this._blendEq = b;
    };
    // set blendSrcAlpha(b) {
    //     this._blendSrcAlpha = b;
    // };
    // set blendDstAlpha(b) {
    //     this._blendDstAlpha = b;
    // };
    // set blendEqAlpha(b) {
    //     this._blendEqAlpha = b;
    // };
    set depthFunc(d: ComparisonFunc) {
        this._depthFunc = d;
    };
    set depthTest(d: boolean) {
        this._depthTest = d;
    };
    set transparent(t: boolean) {
        this._transparent = t;
    };
    set iluminate(i: boolean) {
        this._iluminate = i;
    };
};

export { Material };
