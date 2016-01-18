/**
 * Created by Olav on 10/2/2015.
 */
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _sharedComponentsExperiments = require("../../shared/components/Experiments");

var _sharedComponentsExperiments2 = _interopRequireDefault(_sharedComponentsExperiments);

var _sharedComponentsFrontpage = require("../../shared/components/Frontpage");

var _sharedComponentsFrontpage2 = _interopRequireDefault(_sharedComponentsFrontpage);

var _sharedComponentsSignIn = require("../../shared/components/SignIn");

var _sharedComponentsSignIn2 = _interopRequireDefault(_sharedComponentsSignIn);

module.exports.set = function (app) {

    var getEnvironment = function getEnvironment() {
        if (app.get('env') === 'development') {
            return { scriptPath: 'http://localhost:8080',
                environment: 'development'
            };
        }
        return { scriptPath: '',
            environment: 'production'
        };
    };

    app.get('/', function (req, res) {
        //TODO: Duplicate code, can possibly use callback functions for these two, to reduce duplicate code.
        var db = req.db;
        var collection = db.get('experimentlist');
        collection.find({ running: { $eq: true } }, {}, function (e, docs) {
            var initData = JSON.stringify(docs);
            var content = _react2["default"].renderToString(_react2["default"].createElement(_sharedComponentsFrontpage2["default"], { data: initData }));
            var signIn = _react2["default"].renderToString(_react2["default"].createElement(_sharedComponentsSignIn2["default"], null));
            var environment = getEnvironment();
            var templateData = {
                title: _sharedComponentsFrontpage2["default"].title,
                toolMetaDescription: _sharedComponentsFrontpage2["default"].toolMetaDescription,
                reactContent: content,
                reactSignIn: signIn,
                reactEntryPath: environment.scriptPath,
                reactScript: "FrontpageClient",
                environment: environment.environment,
                data: initData
            };
            res.render('pages/default-page', templateData);
        });
    });

    app.get('/experiments', function (req, res) {
        //TODO: Duplicate code, but React need this data here. Implement common function and promises to get this working
        var db = req.db;
        var collection = db.get('experimentlist');
        //Events is excluded, because of potensial size in such a listing.
        collection.find({}, { fields: { events: 0 } }, function (e, docs) {
            docs = docs.reverse();
            var initData = JSON.stringify(docs);
            var content = _react2["default"].renderToString(_react2["default"].createElement(_sharedComponentsExperiments2["default"], { data: initData }));
            var signIn = _react2["default"].renderToString(_react2["default"].createElement(_sharedComponentsSignIn2["default"], null));
            var environment = getEnvironment();
            var templateData = {
                title: _sharedComponentsExperiments2["default"].title,
                reactContent: content,
                reactSignIn: signIn,
                reactEntryPath: environment.scriptPath,
                reactScript: "ExperimentsClient",
                environment: environment.environment,
                data: initData
            };
            res.render('pages/default-page', templateData);
        });
    });

    // ===== KEEP THIS AT THE BOTTOM ======= , handles 404 errors
    app.use(function (req, res, next) {
        res.status(404).render('pages/404', { title: "Page not found", environment: getEnvironment().environment });
    });
};