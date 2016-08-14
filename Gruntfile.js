var _port = 3030;
var _path = "http://localhost:" + _port + "/index.html";	// TODO: Unused

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
                    target: "es5"
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
 
}