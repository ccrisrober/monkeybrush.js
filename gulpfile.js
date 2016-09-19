var gulp = require("gulp");
// remove all __extends declarations except the first one
var cleants = require('gulp-clean-ts-extends');
var uglify = require("gulp-uglify");
var ts = require("gulp-typescript");
var concat = require("gulp-concat");
var expect = require('gulp-expect-file');
var replace = require("gulp-replace");
var config = require("./config.json");
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var merge = require("merge2");

var notify = require("gulp-notify");
var path = require("path");

gulp.task("gen-dts", function () {

    var tsResult = gulp.src(config.core.typescript).
        pipe(ts({
            sortOutput: true,
            noExternalResolve: true,
            target: 'ES5',
            declarationFiles: true,
            typescript: require('typescript'),
            experimentalDecorators: true
        }));
    return merge([
        tsResult.dts
            .pipe(concat(config.build.declarationFilename))
            .pipe(gulp.dest(config.build.outputDirectory))
        //, tsResult.js
        //    .pipe(gulp.dest(config.build.srcOutputDirectory))
    ])

    /*var res = gulp.src(config.core.typescript)
        .pipe(ts({
            sortOutput: true,
            target: "ES5",
            experimentalDecorators: true,
            typescript: require('typescript'),
            removeComments: true
        }));
    return merge([
        res.dts
            .pipe(concat(config.build.declarationFilename))
            .pipe(gulp.dest(config.build.outputDirectory))

        //, res.js
        //    .pipe(concat(config.build.filename))
        //    .pipe(gulp.dest(config.build.outputDirectory))
    ])*/
});

gulp.task("build", function () {
    return merge(
            gulp.src(config.core.files2)
                .pipe(expect({
                    errorOnFailure: true,
                    reportMissing: true
                }, config.core.files2))
        )
        .pipe(concat(config.build.filename))
        .pipe(cleants())
        .pipe(replace(/var\s__extends[\s\S]+?\};/g, ""))
        .pipe(replace(/var\s__decorate[\s\S]+?\};/g, ""))
        .pipe(addModuleExports("MonkeyBrush"))
        .pipe(gulp.dest(config.build.outputDirectory))
        .pipe(rename(config.build.minFilename))
        .pipe(uglify())
        .pipe(gulp.dest(config.build.outputDirectory));
});

gulp.task("typescript", ["gen-dts"/*, "build"*/], function(cb) {
    cb();
});

var webserver = require('gulp-webserver');

gulp.task("build-debug", function() {
    var tsResult = gulp.src(config.core.ts_files)
        //.pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(ts({
            sortOutput: true,
            target: "ES5",
            experimentalDecorators: true,
            removeComments: true
        }))
        /*.on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error running something"
        }))*/;

    return tsResult.js
        .pipe(concat('output.js'))
        //.pipe(cleants())
        //.pipe(replace(/var\s__extends[\s\S]+?\};/g, ""))
        //.pipe(replace(/var\s__decorate[\s\S]+?\};/g, ""))
        //.pipe(addModuleExports("MonkeyBrush"))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build.outputDirectory))
        /*.pipe(notify({
            title: "monkeybrush.js",
            message: "Code OK",
            icon: path.join(__dirname, '_images/logo.png')
        }))*/;
});
gulp.task("watch-ts", ["build-debug", "webserver"], function() {
    gulp.watch(config.core.typescript, ["build-debug"]);
});

gulp.task("watch", ["build-debug"], function() {
    gulp.watch(config.core.typescript, ["build-debug"]);
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            open: true,
            fallback: 'index.html'
        }));
});
var typedoc = require("gulp-typedoc");
gulp.task("typedoc", function() {
  return gulp
      .src(config.core.ts_files)
      .pipe(typedoc({
        // TypeScript options (see typescript docs)
        module: "commonjs",
        target: "es5",
        includeDeclarations: true,
        experimentalDecorators: true,
        // Output options (see typedoc docs)
        out: "./doc",

        // TypeDoc options (see typedoc docs)
        name: "Monkey Brush",
        readme: "./READMEDOC.md",
        //theme: "minimal",
        mode: "file",
        plugins: [],
        ignoreCompilerErrors: false,
        version: true
    }));
});
