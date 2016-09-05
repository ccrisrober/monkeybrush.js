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


// Code based in https://github.com/jb55/vrdevices/blob/master/index.js


"use strict";


namespace VRDevice {
    export function getVRDevice(done: Function) {
        if (navigator["getVRDisplays"]) {
            return navigator["getVRDisplays"]().then(next);
        } else if (navigator["getVRDevices"]) {
            return navigator["getVRDevices"]().then(next);
        } else if (navigator["mozGetVRDevices"]) {
            return navigator["mozGetVRDevices"](next);
        } else {
            return done(new Error("Your browser is not VR Ready"), []);
        }

        function next (devices) {
            return done(null, devices || []);
        }
    };
    export function getType(type, done: Function) {
        return getVRDevice((err, devices) => {
            if (err) return done(err, devices);
            done(null, devices.filter((dev) => {
                return dev instanceof type;
            }));
        });
    };
    export function getPositionSensors (done) {
        const typ = window["VRDisplay"] || window["PositionSensorVRDevice"];
        return getType(typ, done);
    };
    export function getHmds (done) {
        const typ = window["VRDisplay"] || window["HMDVRDevice"];
        return getType(typ, done);
    };
};

export { VRDevice };
