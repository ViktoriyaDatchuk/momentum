const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    const config = {
        devtool: isProduction ? 'cheap-module-source-map' : 'source-map',
        watch: !isProduction,
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'script.js',
            assetModuleFilename: 'asset/[name][ext]'
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env']
                      }
                    }
                },

                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },

                {
                    test: /\.(?:ico|png|jpg|jpeg|svg|gif|webp)$/i,
                    type: 'asset/resource',
                },
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './index.html',
                favicon: "./src/assets/favicon.ico"
              })
        ]
    }

    return config;
}