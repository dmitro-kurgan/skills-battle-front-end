const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');

const PATHS = {
	source: path.join(__dirname, 'source'),
	build: path.join(__dirname, 'build')
};


const common = merge([
	{
		entry: {
			'bundle': PATHS.source + '/bundle/bundle.js'
		},

		output: {
			path: PATHS.build,
			filename: 'js/[name].js'
		},

		plugins: [
            new CopyWebpackPlugin([
                { 
                	from: path.join(__dirname, 'locales'),
                	to: path.join(__dirname, 'build/locales')
            	}
            ]),
			new HtmlWebpackPlugin(
				{
					filename: 'index.html',
					chunks: ['bundle'],
					template: PATHS.source + '/index.pug'
				}
			),
			new HtmlWebpackPlugin(
				{
					filename: 'enter.html',
					chunks: ['bundle'],
					template: PATHS.source + '/enter.pug'
				}
			),
			new HtmlWebpackPlugin(
				{
					filename: 'hash.html',
					chunks: ['bundle'],
					template: PATHS.source + '/hash.pug'
				}
			),
			new HtmlWebpackPlugin(
				{
					filename: 'bill.html',
					chunks: ['bundle'],
					template: PATHS.source + '/bill.pug'
				}
			),
			new HtmlWebpackPlugin(
				{
					filename: 'info.html',
					chunks: ['bundle'],
					template: PATHS.source + '/info.pug'
				}
			),
			new HtmlWebpackPlugin(
				{
					filename: 'purchase.html',
					chunks: ['bundle'],
					template: PATHS.source + '/purchase.pug'
				}
			),
			new HtmlWebpackPlugin(
				{
					filename: 'login.html',
					chunks: ['bundle'],
					template: PATHS.source + '/login.pug'
				}
			),
			new HtmlWebpackPlugin(
				{
					filename: 'return.html',
					chunks: ['bundle'],
					template: PATHS.source + '/return.pug'
				}
			),
			new HtmlWebpackPlugin(
				{
					filename: 'browse.html',
					chunks: ['bundle'],
					template: PATHS.source + '/browse.pug'
				}
			),
			new HtmlWebpackPlugin(
				{
					filename: 'browse-ca.html',
					chunks: ['bundle'],
					template: PATHS.source + '/browse-ca.pug'
				}
			)
		]
	},
	pug(),
	images(),
	fonts()
	
]);

module.exports = function(env) {
	if (env === 'production') {
		return merge([
			common,
			extractCSS(),
			uglifyJS()
		]);
	}
	if (env === 'development') {
		return merge([
			common,
			devserver(),
			sass(),
			css()
		])
	}
};