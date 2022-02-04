const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const common = require('./common.js');

module.exports = merge(common, {
	mode: 'production',
	optimization: {
		minimizer: [new UglifyJsPlugin()],
	  },
	plugins: [
		new BundleAnalyzerPlugin(),
		
 		new CompressionPlugin({
			test: /\.js(\?.*)?$/i,
			compressionOptions: {
				threshold: 10240,
				minRatio: 0.8,
				deleteOriginalAssets: false,
			},
		}),  
	],
});