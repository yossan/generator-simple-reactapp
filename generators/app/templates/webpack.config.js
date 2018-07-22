const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const port = process.env.PORT || 3000;

module.exports = {
  mode: 'none',
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.js",
	},
    devtool: 'inline-source-map',
	module: {
		rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            }
		]
	},
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            filename: 'index.html'
        })
    ],
    devServer: {
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true
    }
}
