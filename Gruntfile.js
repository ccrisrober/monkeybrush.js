var _port = 3030;
var _path = "http://localhost:" + _port + "/index.html";	// TODO: Unused

var Promise = require("bluebird");
var fs = require("fs");
var parseOBJ = require("parse-obj");

module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-typescript");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jsdoc : {
            dist : {
                src: ['lib/**/*.ts'],
                options: {
                    destination: 'doc'
                }
            }
        },
        typescript: {
            base: {
                src: ["lib/index.ts"],
                dest: "index.js",
                options: {
                    module: "amd",
                    target: "es6",
                    sourcemap: true,
                    declaration: false
                }
            }
        },
        watch: {
            files: "lib/index.ts",
            tasks: ["typescript"]
        },
        typedoc: {
            build: {
                options: {
                    out: './docs',
                    name: 'monkeybrush.js',
                    target: 'ES6',
                    //mode: "modules",
                    readme: "./READMEDOC.md",
                    externalPattern: "node_modules",


                    module: "system"
                    //, theme: "minimal"
                },
                src: ['./src/**/*']
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-typedoc');

    //grunt.registerTask("default", ["typescript", "typescript", "watch"]);

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
