"use strict";
declare var VanillaToasts: any;
namespace ResourceMap {
    export class MapEntry {
        public _asset: string;
        public _refCount: number;
        constructor(resName: string) {
            this._asset = resName;
            this._refCount = 1;
        }
        public getAsset(): string { return this._asset; }
        public setAsset(name: string) {
            this._asset = name;
        }
        public count(): number {
            return this._refCount;
        }
        public incCount() {
            this._refCount++;
        }
        public decCount() {
            this._refCount--;
        }
    }
    let _numOutstandingLoads: number = 0;

    let _loadCompleteCallback: Function = null;

    let _resourceMap: { [ key: string ]: MapEntry; } = {};

    export function asyncLoadRequested(resName: string) {
        _resourceMap[resName] = new MapEntry(resName);
        ++_numOutstandingLoads;
    };

    export function asyncLoadFailed(resName: string) {
        VanillaToasts.create({
            title: `${resName} completed`,
            type: "error",
            timeout: 2500
        });
        --_numOutstandingLoads;
        _checkForAllLoadCompleted();
    }

    export function asyncLoadCompleted(resName: string, loadedAsset) {
        if (!isAssetLoaded(resName)) {
            VanillaToasts.create({
                title: `asyncLoadCompleted: [${resName}] not in map!`,
                type: "error",
                timeout: 2500
            });
        }
        VanillaToasts.create({
            title: `${resName} completed`,
            type: "success",
            timeout: 1500
        });
        _resourceMap[resName].setAsset(loadedAsset);
        --_numOutstandingLoads;
        _checkForAllLoadCompleted();
    };

    function _checkForAllLoadCompleted() {
        if ((_numOutstandingLoads === 0) && (_loadCompleteCallback !== null)) {
            let funToCall = _loadCompleteCallback;
            _loadCompleteCallback = null;
            funToCall();
        }
    };

    export function setLoadCompleteCallback(fn) {
        _loadCompleteCallback = fn;
        _checkForAllLoadCompleted();
    };

    export function retrieveAsset(resName: string) {
        let r = null;
        if (resName in _resourceMap) {
            r = _resourceMap[resName].getAsset();
        } else {
            alert(`retrieveAsset: [${resName}] not in map!`);
        }
        return r;
    };

    export function isAssetLoaded(resName: string) {
        return (resName in _resourceMap);
    };

    export function incAssetRefCount (resName: string) {
        _resourceMap[resName].incCount();
    };

    export function unloadAsset (resName: string) {
        let c = 0;
        if (resName in _resourceMap) {
            _resourceMap[resName].decCount();
            c = _resourceMap[resName].count();
            if (c === 0) {
                delete _resourceMap[resName];
            }
        }
        return c;
    };
}