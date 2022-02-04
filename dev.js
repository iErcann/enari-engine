const { merge } = require('webpack-merge');
const common = require('./common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist2',
		host: '0.0.0.0',
		port: 8080,
		compress: true,
	}
});