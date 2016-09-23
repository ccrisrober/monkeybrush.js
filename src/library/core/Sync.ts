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

namespace MB {
    /**
     * Sync class
     * @class Sync
     *
     * Sync Objects are objects that are used to synchronize
     * the activity between the GPU and the application.
     * glFinish​ is a start to synchronization,
     * but sync objects allow for much finer grained control.
     */
    export class Sync {
        protected _handler: WebGLSync;

        /**
         * Sync constructor.
         * @param {ctes.SyncCondition = ctes.SyncCondition.GPUCommandsComplete} condition Sync condition.
         */
        constructor(condition: ctes.SyncCondition = ctes.SyncCondition.GPUCommandsComplete) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            this._handler = gl.fenceSync(condition, 0);
        };
        /*
         * Block and wait for a sync object to become signaled.
         * @param {number} timeout: Timeout (in nanoseconds) for which to wait
         *      for the sync obj to become signaled.
         */
        public clientWait(timeout: number): ctes.SyncWaitResult {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            return gl.clientWaitSync(this._handler, 0, timeout);
        };
        /**
         * Destroy sync object.
         */
        public destroy() {
           const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.deleteSync(this._handler);
        };
        /**
         * Return if sync object is a valid sync.
         * @return {boolean} True if sync object is valid.
         */
        public isValid(): boolean {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            return gl.isSync(this._handler);
        };
        /**
         * Instruct the server to block until the sync object becomes signaled.
         * @param {number = -1} timeout Specifies the timeout that the server
         *                  should wait before continuing.
         */
        public wait(timeout: number = -1) {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            gl.waitSync(this._handler, 0, timeout);
        };
        /**
         * Returns current sync status.
         * @return {ctes.SyncStatus} Current sync status.
         */
        public status(): ctes.SyncStatus {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            return gl.getParameter(gl.SYNC_STATUS);
        };
        /**
         * Returns current sync condition.
         * @return {ctes.SyncStatus} Current sync condition.
         */
        public condition(): ctes.SyncCondition {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            return gl.getParameter(gl.SYNC_CONDITION);
        };
        /**
         * Returns current sync type.
         * @return {ctes.SyncStatus} Current sync type.
         */
        public type(): ctes.SyncType {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            return gl.getParameter(gl.OBJECT_TYPE);
        };
        /**
         * Checks if sync is signaled.
         * @return {boolean}
         */
        public isSignaled(): boolean {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            return gl.getParameter(gl.SYNC_STATUS) === ctes.SyncStatus.Signaled;
        };
        /**
         * Returns current sync status.
         * @return {ctes.SyncStatus}
         */
        get signaled(): ctes.SyncStatus {
            const gl: WebGL2RenderingContext = Core.getInstance().getGL();
            return gl.getParameter(gl.SYNC_STATUS);
        };
    };
};
