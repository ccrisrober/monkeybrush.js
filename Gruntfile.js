var _port = 3030;
var _path = "http://localhost:" + _port + "/index.html";	// TODO: Unused

var Promise = require("bluebird");
var fs = require("fs");
var parseOBJ = require("parse-obj");

module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-typescript");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-open");
 
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        connect: {
            server: {
                options: {
                    port: _port,
                    base: "./"
                }
            }
        },
        typescript: {
            base: {
                src: ["lib/**/*.ts"],
                dest: "js/build.js",
                options: {
                    module: "amd",
                    target: "es5",
                    sourcemap: true,
                    declaration: true
                }
            }
        },
        watch: {
            files: "lib/**/*.ts",
            tasks: ["typescript"]
        },
        open: {
            dev: {
                path: _path
            }
        }
    });
 
    grunt.registerTask("default", ["connect", "open", "watch"]);
    grunt.registerTask("serve", ["connect", "watch"]);

    grunt.registerTask("parseobj", "", function(fileRoute) {
        var done = this.async();
        if (arguments.length === 0) {
            return Promise.reject("File route can not be empty!");
        }
        console.log(fileRoute);
        /**/
        parseOBJ(fs.createReadStream(fileRoute), function(err, result) {
            if(err) {
                throw new Error("Error parsing OBJ file: " + err);
            }
            console.log("Got mesh: ", result);
            done();
        });
        /**/
        //done();
    });
 
}