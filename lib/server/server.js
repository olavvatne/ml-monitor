"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _ejsLocals = require("ejs-locals");

var _ejsLocals2 = _interopRequireDefault(_ejsLocals);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _controllers = require('./controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _nodeSassMiddleware = require('node-sass-middleware');

var _nodeSassMiddleware2 = _interopRequireDefault(_nodeSassMiddleware);

var _nodeSass = require('node-sass');

var _nodeSass2 = _interopRequireDefault(_nodeSass);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mongod = require('mongod');

var _mongod2 = _interopRequireDefault(_mongod);

var _monk = require('monk');

var _monk2 = _interopRequireDefault(_monk);

var bodyParser = require('body-parser');

var db = (0, _monk2["default"])('localhost:27017/ml-monitor');
var app = (0, _express2["default"])();

app.set("env", process.env.NODE_ENV || "development");
app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());

app.engine('ejs', _ejsLocals2["default"]); //Support for layout for templates
app.set('view engine', 'ejs');

app.set('views', './views');
app.use((0, _serveFavicon2["default"])('./public/images/favicon/favicon.ico'));

var srcPath = './';
var destPath = './public';

//TODO: If folder does not exist, its not moved.
var moveFile = function moveFile(from, to) {
    if (_fs2["default"].existsSync(to)) {
        return;
    }
    _fs2["default"].readFile(from, function (err, data) {
        if (err) throw err;
        _fs2["default"].writeFile(to, data, function (err) {
            if (err) throw err;
            console.log('It\'s saved! ' + to);
        });
    });
};
moveFile('./node_modules/muicss/dist/css/mui.min.css', './public/style/mui.min.css');
moveFile('./node_modules/muicss/dist/js/mui.min.js', './public/js/mui.min.js');
moveFile('./node_modules/normalize.css/normalize.css', './public/style/normalize.css');
moveFile('./node_modules/react-notifications/lib/notifications.css', './public/style/notifications.css');
moveFile('./node_modules/rickshaw/rickshaw.min.css', './public/style/rickshaw.min.css');
moveFile('./node_modules/rickshaw/rickshaw.min.js', './public/js/rickshaw.min.js');
moveFile('./node_modules/rickshaw/vendor/d3.layout.min.js', './public/js/d3.layout.min.js');
moveFile('./node_modules/rickshaw/vendor/d3.min.js', './public/js/d3.min.js');

if (app.get('env') === 'development') {
    app.use((0, _nodeSassMiddleware2["default"])({
        /* Options */
        src: srcPath,
        dest: destPath,
        debug: true,
        outputStyle: 'compressed',
        prefix: '/prefix'
    }));
    app.use(_express2["default"]["static"]('./public')); //compiled sass and other stuff put in here
} else {
        app.use(_express2["default"]["static"]('./public')); //compiled sass and other stuff put in here
    }

//TODO: Move to build.js
if (app.get('env') === 'production') {
    console.log("==== Render SASS =====");
    //TODO: Dest in public not in public/style in production. Fix
    _nodeSass2["default"].render({
        file: srcPath + '/style/style.scss',
        outputStyle: 'compressed'
    }, function (err, result) {
        if (err) {
            console.log(err);
            throw new Error("Could not render SASS");
        } else {
            _fs2["default"].writeFile(destPath + '/style.css', result.css, function (err) {
                if (err) {
                    return console.log(err);
                    throw new Error("Could not write SASS");
                }
                console.log("The file was saved!");
            });
        }
    });
}

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(function (req, res, next) {
    req.db = db;
    next();
});

_api2["default"].set(app);
_controllers2["default"].set(app);

var server = app.listen(app.get("port"), function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});