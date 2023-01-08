const path = require('path')
const nodeExternals = require('webpack-node-externals')

require('dotenv').config()

const {
	NODE_ENV = 'production',
	WEBPACK_NO_WATCH
} = process.env

const NO_WATCH = WEBPACK_NO_WATCH === 'true'

module.exports = {
	entry: path.resolve(__dirname, 'src', 'app.ts'),
	mode: NODE_ENV,
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js'
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: {
								noEmit: false,
							},
						},
					},
				]
			}
		]
	},
	externals: [ nodeExternals() ],
	watch: !NO_WATCH && NODE_ENV === 'development',
}
