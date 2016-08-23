var webpack = require('webpack');
var CircularDependencyPlugin = require('circular-dependency-plugin');
module.exports = {
	entry: "./lib/index.ts",
	output: {
		filename: "./build/bundle.js"
	},
	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
	},
	// Turn on sourcemaps
	devtool: 'source-map',
	// Add minification
	/*plugins: [
		new webpack.optimize.UglifyJsPlugin()
	],*/
	/*plugins: [
		new CircularDependencyPlugin({
			exclude: /a\.js/
		})
	],*/
	module: {
		loaders: [
			{ test: /\.ts(x?)$/, loader: 'ts-loader' }
		]
	}
};