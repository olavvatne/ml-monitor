import express from "express";
import engine  from "ejs-locals";
import favicon from 'serve-favicon';
import controllers from './controllers';
import serverApi from './api';
import sassMiddleware from 'node-sass-middleware';
import sass from 'node-sass';
import fs from 'fs';
import mongo from 'mongod';
import monk from 'monk';
var bodyParser = require('body-parser');

const db = monk('localhost:27017/ml-monitor')
const app = express();

app.set("env", process.env.NODE_ENV || "development");
app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());

app.engine('ejs', engine);//Support for layout for templates
app.set('view engine', 'ejs');

app.set('views', './views');
app.use(favicon( './public/images/favicon/favicon.ico'));

var srcPath = './';
var destPath = './public';

//TODO: If folder does not exist, its not moved.
var moveFile = function(from, to) {
    if(fs.existsSync(to)) {
        return;
    }
    fs.readFile(from, function (err, data) {
        if (err) throw err;
        fs.writeFile(to, data, function (err) {
            if (err) throw err;
            console.log('It\'s saved! ' + to);
        });
    });
}
moveFile('./node_modules/muicss/dist/css/mui.min.css', './public/style/mui.min.css');
moveFile('./node_modules/muicss/dist/js/mui.min.js', './public/js/mui.min.js');
moveFile('./node_modules/normalize.css/normalize.css', './public/style/normalize.css');
moveFile('./node_modules/rickshaw/rickshaw.min.css', './public/style/rickshaw.min.css');
moveFile('./node_modules/rickshaw/rickshaw.min.js', './public/js/rickshaw.min.js');
moveFile('./node_modules/rickshaw/vendor/d3.layout.min.js', './public/style/d3.layout.min.js');
moveFile('./node_modules/rickshaw/vendor/d3.min.js', './public/js/d3.min.js');



if(app.get('env') === 'development') {
    app.use(sassMiddleware({
        /* Options */
        src: srcPath,
        dest: destPath,
        debug: true,
        outputStyle: 'compressed',
        prefix:  '/prefix'
    }));
    app.use(express.static('./public')); //compiled sass and other stuff put in here
}
else {
    app.use(express.static('./public')); //compiled sass and other stuff put in here
}

//TODO: Move to build.js
if(app.get('env') === 'production') {
    console.log("==== Render SASS =====")
    //TODO: Dest in public not in public/style in production. Fix
    sass.render({
        file: srcPath + '/style/style.scss',
            outputStyle: 'compressed'
    },
    function(err, result) {
        if(err) {
            console.log(err);
            throw new Error("Could not render SASS")
        }
        else {
            fs.writeFile(destPath + '/style.css', result.css, function(err) {
                if(err) {
                    return console.log(err);
                    throw new Error("Could not write SASS")
                }
                console.log("The file was saved!");
            });
        }
    });
}
app.use(function(req,res,next){
    req.db = db;
    next();
});

serverApi.set(app);
controllers.set(app);



var server = app.listen(app.get("port"), function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});