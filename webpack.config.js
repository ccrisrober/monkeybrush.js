var webpack = require('webpack');
var path = require('path');
var CircularDependencyPlugin = require('circular-dependency-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

var libraryName = "MonkeyBrush";

module.exports = {
    devtool: 'eval',
    context: __dirname + "/lib/library",
	entry: "./MonkeyBrush.ts",
	output: {
        publicPath: "/build",
        filename: "bundle.js",
        path: path.resolve("build"),
        library: libraryName
        //,library: "LolLib"
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
		/*new CircularDependencyPlugin({
			exclude: /a\.js/
		}),*/
        // Add the Webpack HMR plugin so it will notify the browser when the app code changes
        new webpack.HotModuleReplacementPlugin(),
        // Set up the notifier plugin - you can remove this (or set alwaysNotify false) if desired
        new WebpackNotifierPlugin({
            alwaysNotify: true,
            title: "monkeybrush.js",
            contentImage: path.join(__dirname, '_images/logo.png')
        })
        /*,
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        )*/
	],
	module: {
		loaders: [
            { test: /\.tsx?$/, loaders: ['babel', 'ts-loader'] }
		]
	}
};
