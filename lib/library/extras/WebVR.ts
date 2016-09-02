// Code based in https://github.com/jb55/vrdevices/blob/master/index.js

namespace VRDevice {
    export function getVRDevice(done: Function) {
        if (navigator["getVRDisplays"]) {
            return navigator["getVRDisplays"]().then(next);
        } else if (navigator["getVRDevices"]) {
            return navigator["getVRDevices"]().then(next);
        } else if (navigator["mozGetVRDevices"]) {
            return navigator["mozGetVRDevices"](next);
        } else {
            return done(new Error('Your browser is not VR Ready'), []);
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
        var typ = window["VRDisplay"] || window["PositionSensorVRDevice"];
        return getType(typ, done);
    };
    export function getHmds (done) {
        var typ = window["VRDisplay"] || window["HMDVRDevice"];
        return getType(typ, done);
    };
};

export { VRDevice };
