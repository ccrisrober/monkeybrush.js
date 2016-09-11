var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

var libraryName = "MonkeyBrush";
module.exports = {
    context: __dirname + "/src",
    entry: "./index.ts",
    output: {
        publicPath: "/build",
        filename: "bundle.js",
        path: path.resolve("build")
        //, library: libraryName
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"],
        moduleDirectories: ["bower_components", "js"]
    },
    // Turn on sourcemaps
    devtool: 'source-map',
    watch: true,
    // Add minification
    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),
        // Add the Webpack HMR plugin so it will notify the browser when the app code changes
        new webpack.HotModuleReplacementPlugin(),
        // Set up the notifier plugin - you can remove this (or set alwaysNotify false) if desired
        new WebpackNotifierPlugin({
            alwaysNotify: true,
            title: "monkeybrush.js",
            contentImage: path.join(__dirname, '_images/logo.png')
        })
        //,
        //new webpack.ResolverPlugin(
        //    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        //)
    ],
    module: {
        loaders: [
            { test: /\.tsx?$/, loaders: ['babel', 'ts-loader'] }
        ]
    }
};
