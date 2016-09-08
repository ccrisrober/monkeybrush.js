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


import { Core } from "../core/Core";

"use strict";

class Sync {
    protected _handle: WebGLSync;
    
    constructor(condition: SyncCondition = SyncCondition.GPUCommandsComplete) {
        const gl = Core.getInstance().getGL();
        this._handle = gl.fenceSync(condition, 0);
    };
    /*
     * [clientWait description]
     * @param {number} timeout: Timeout (in nanoseconds) for which to wait
     *      for the sync obj to become signaled.
     */
    public clientWait(timeout: number): SyncWaitResult {
        const gl = Core.getInstance().getGL();
        return gl.clientWaitSync(this._handle, 0, timeout);
    }
    public destroy() {
       const gl = Core.getInstance().getGL();
        gl.deleteSync(this._handle);
    };
    public isValid(): boolean {
        const gl = Core.getInstance().getGL();
        return gl.isSync(this._handle);
    };
    public wait(timeout: number = -1) {
        const gl = Core.getInstance().getGL();
        gl.waitSync(this._handle, 0, timeout);
    }
    public status(): SyncStatus {
        const gl = Core.getInstance().getGL();
        return gl.getParameter(gl.SYNC_STATUS);
    }
    public condition(): SyncCondition {
        const gl = Core.getInstance().getGL();
        return gl.getParameter(gl.SYNC_CONDITION);
    }
    public type(): SyncType {
        const gl = Core.getInstance().getGL();
        return gl.getParameter(gl.OBJECT_TYPE);
    }
    public isSignaled(): boolean {
        const gl = Core.getInstance().getGL();
        return gl.getParameter(gl.SYNC_STATUS) == SyncStatus.Signaled;
    }
    get signaled(): SyncStatus {
        const gl = Core.getInstance().getGL();
        return gl.getParameter(gl.SYNC_STATUS);
    }
};

enum SyncWaitResult {
    ConditionSatisfied = 0x911C,
    AlreadySignaled = 0x911A,
    TimeoutExpired = 0x911B,
    WaitFailed = 0x911D
};

enum SyncType {
    Fence = 0x9116
};

enum SyncCondition {
    GPUCommandsComplete = 0x9117
};

enum SyncStatus {
    Signaled = 0x9119,
    Unsignaled = 0x9118
}

export { SyncWaitResult, Sync };
