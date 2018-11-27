const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	entry: './src/index.js',
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			inject: true,
			template: './src/index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		contentBase: './dist',
		hot: true,
	},
	mode: 'development',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		modules: [path.resolve(__dirname, './node_modules'), path.resolve(__dirname, './src')],
		extensions: ['.js', '.jsx', '.styl'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.styl$/,
				include: path.resolve(__dirname, './src'),
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[folder]__[local]--[hash:base64:5]',
						},
					},
					'stylus-loader',
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(html)$/,
				use: ['html-loader'],
				exclude: /node_modules/,
			},
		],
	},
}
