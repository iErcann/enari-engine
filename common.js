const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const __root = path.resolve(__dirname, '.');

module.exports = {
	entry: {
		index: [ './src/main.ts'],
	},
	output: {
		path: path.resolve(__root, 'dist2'),
		filename: 'scripts/[name].[chunkhash].js',
		chunkFilename: 'scripts/[name].[chunkhash].js',
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ],
		fallback: {
			fs: false
		  },
	},
	module: {
		rules: [
		  {
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/,
		  },
		],
	  },
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: false
		}),

	]
};