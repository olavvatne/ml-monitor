var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

var createEntries = function() {
    /*
     Reads client folder and creates an entry for each of them. Each file in client treated
     as a page that are going to run react in the front in any way.
     */
    console.log("DOING Stuff");
    var dir = './src/client';
    var files = fs.readdirSync(dir);
    var entries = {};
    for (var i in files){
        var page = files[i].split('.').shift(); //removes the extension.
        //TODO: What does webpack-dev-erver and only dev server do?
        entries[page] = [
            dir + '/' + page]
    }
    console.log(entries);
    return entries;
};
//TODO: Hash files [hash]
module.exports = {
    devtool: "source-map",
    entry: createEntries(),
    output: {
        path: __dirname + '/public/js/',
        filename: "[name].entry.js",
        chunkFilename: "[name]-[chunkhash].js",
        publicPath: "/public/js/"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: [nodeModulesPath]
        },{
            test: /\.css$/,
            loader: 'style!css'
        }]
    }
}