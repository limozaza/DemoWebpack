const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const dev= process.env.NODE_ENV === "dev";

let config = {
    entry: './assets/js/app.js',
    watch: dev,
     output: {
         path: path.resolve('./dist'),
         filename: 'bundle.js',
         publicPath: "/dist/"
     },
    devtool: dev ? "cheap-module-eval-source-map" : "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
       
    ]
}
if(!dev){
    config.plugins.push( new uglifyJsPlugin({
        //sourceMap: true  debbuge en prod
    }))
}

module.exports =  config;