var webpack = require('webpack');
var fs = require('fs');

//TODO: js should preferrably be served from express port.
//TODO: Make system production ready. webpack.config.prod.js?

var createEntries = function() {
    /*
    Reads client folder and creates an entry for each of them. Each file in client treated
    as a page that are going to run react in the front in any way.
     */
    var dir = './src/client';
    var files = fs.readdirSync(dir);
    var entries = {};
    for (var i in files){
        var page = files[i].split('.').shift(); //removes the extension.
        //TODO: What does webpack-dev-erver and only dev server do?
        entries[page] = [
            dir + '/' + page,
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server']
    }
    console.log(entries);
    return entries;
};

module.exports = {
    devtool: 'inline-source-map',
    entry: createEntries(),
    output: {
        path: __dirname + '/public/js/',
        filename: '[name].entry.js',
        publicPath: 'http://localhost:8080/js/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader?experimental'], exclude: /node_modules/ }
        ]
    }
}