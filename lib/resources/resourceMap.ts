class ResourceMap {
    // Number of outstanding load operations
    protected _numOutstandingLoads = 0;

    // Callback function when all textures are loaded
    protected _loadCompleteCallback: Function = null;

    // Resource storage
    protected _resourceMap: { [ key:string ] : ResourceMap.MapEntry; };

    public asyncLoadRequested(resName: string) {
    	this._resourceMap[resName] = new ResourceMap.MapEntry(resName);
    	++this._numOutstandingLoads;
    }
    public asyncLoadCompleted(resName: string, loadedAsset) {
    	if(!this.isAssetLoaded(resName)) {
            alert("asyncLoadCompleted: [" + resName + "] not in map!");
    	}
    	this._resourceMap[resName].setAsset(resName);
    	--this._numOutstandingLoads;
    	this._checkForAllLoadCompleted();
    }
    // Make sure to set the callback _AFTER_ all load commands are issued
    public setLoadCompleteCallback(fun: Function) {
    	this._loadCompleteCallback = fun;
        // in case all loading are done
        this._checkForAllLoadCompleted();
    }

    public retrieveAsset(resName: string) {
        var r = null;
        if (resName in this._resourceMap) {
            r = this._resourceMap[resName].getAsset();
        } else {
            alert("retrieveAsset: [" + resName + "] not in map!");
        }
        return r;
    }

    public unloadAsset(resName: string) {
        var c = 0;
        if (resName in this._resourceMap) {
            this._resourceMap[resName].decCount();
            c = this._resourceMap[resName].count();
            if (c === 0) {
                delete this._resourceMap[resName];
            }
        }
        return c;
    }
    public isAssetLoaded(resName: string) : boolean {
        return (resName in this._resourceMap);
    }
    public incAssetRefCount(resName: string) {
    	this._resourceMap[resName].incCount();
    }

    protected _checkForAllLoadCompleted() {
    	if((this._numOutstandingLoads === 0) && (this._loadCompleteCallback != null)) {
            // ensures the load complete call back will only be called once!
            var fun = this._loadCompleteCallback;
            this._loadCompleteCallback = null;
            fun();
    	}
    }
}

module ResourceMap {
	export class MapEntry {
		protected _asset : string;
		protected _refCount : number;
		constructor(resName: string) {
			this._asset = resName;
			this._refCount = 1;
		}
		public getAsset() : string { return this._asset; }
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
}