const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//html模板插件
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports={
	// entry:'./src/index.js',
	entry:{
		app:'./src/index.js',
		print:'./src/print.js'
	},
	output:{
		filename:'[name].bundle.js',
		path:path.resolve(__dirname,'dist'),
		publicPath: '/'
	},
	devtool: 'inline-source-map',//开发测试使用
	devServer: {
		 contentBase: './dist'
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
				'style-loader',
				'css-loader'
				]
			},{
				test:/\.(png|svg|jpg|gif)$/,
				use:[
					'file-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use:[
					'file-loader'
				]
			},
			{
				test: /\.(csv|tsv)$/,
				use: [
				 'csv-loader'
				 ]
			},
			{
				test: /\.xml$/,
				use: [
				  'xml-loader'
				 ]
			},			

		]
	},
	plugins:[
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title:'Output Management'
		})
	]
};