const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// TODO consider https://webpack.js.org/loaders/url-loader/ to load small images/data as base64 url

const PATHS = {
    src: __dirname + '/src/',
    output: __dirname + '/dist/',
}

function pugPage(name) {
    return new HtmlWebpackPlugin({
        template: PATHS.src + name + '.pug',
        filename: name + '.html',
        inject: false, // do NOT add js scripts into html
    })
}

module.exports = {
    entry: {
        index: PATHS.src + 'index.ts',
        go: PATHS.src + 'go.ts',
        // styles: PATHS.src + 'styles/style.styl',
    },
    plugins: [
        pugPage('index'),
        pugPage('go'),
        // new CopyWebpackPlugin([
        //     { from: 'src/images', to: 'images' }
        // ]),
        // extractToStyleCss,
    ],
    devtool: 'inline-source-map',
    output: {
        path: PATHS.output,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                use: 'pug-loader'
            },
            { // *.inline.styl --> return plain CSS text (used for inlining)
                test: /\.inline\.styl$/,
                exclude: /node_modules/,
                use: ['css-loader', 'stylus-loader']
            },
            { // *.url.styl --> create output file and return url to load
                test: /\.url\.styl$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].css', // default is '[hash].[ext]' https://github.com/webpack-contrib/file-loader
                            outputPath: path => path.replace("src/", "")
                        }
                    },
                    'extract-loader', // extract as plain text contents - it's before file-loader to output plain file. See https://stackoverflow.com/questions/49184401/how-can-i-get-webpack-to-output-raw-css-files-but-with-everything-resolved
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]', // default is '[hash].[ext]' https://github.com/webpack-contrib/file-loader
                            outputPath: path => path.replace("src/", "")
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'] // allows "import .." without specifying extension
    }
}
