var webpack = require('webpack');
var CircularDependencyPlugin = require('circular-dependency-plugin');
module.exports = {
	entry: "./lib/index.ts",
	output: {
		filename: "./build/bundle.js"
	},
	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"],
        moduleDirectories: ["bower_components"]
	},
	// Turn on sourcemaps
	devtool: 'source-map',
	// Add minification
	plugins: [
		//new webpack.optimize.UglifyJsPlugin(),
		new CircularDependencyPlugin({
			exclude: /a\.js/
		})/*,
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        )*/
	],
	module: {
		loaders: [
			{
                test: /\.ts(x?)$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
		]
	}
};
