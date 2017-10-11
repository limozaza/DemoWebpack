const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const dev= process.env.NODE_ENV === "dev";


let cssLoaders = [
    { loader: 'css-loader', options: { importLoaders: 1, minimize: !dev } }
  ]
if(!dev){
    cssLoaders.push(
        {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')({
                    browsers: ['last 2 versions', 'ie > 8']
                }),
              ]
            }
          }
    )
}

let config = {
    entry: './assets/js/app.js',
    watch: dev,
     output: {
         path: path.resolve('./dist'),
         filename: 'bundle.js',
         publicPath: "/dist/"
     },
    devtool: dev ? "cheap-module-eval-source-map" : false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: cssLoaders
                  })
            },
            /*{
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader','sass-loader']
            },*/
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [...cssLoaders, 'sass-loader']
                  })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: dev
        })
    ]
}
if(!dev){
    config.plugins.push( new uglifyJsPlugin({
        sourceMap: false  //debbuge en prod
    }))
}

module.exports =  config;