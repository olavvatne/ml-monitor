"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _libsExperimentControlJs = require("./libs/ExperimentControl.js");

var _libsExperimentControlJs2 = _interopRequireDefault(_libsExperimentControlJs);

var _libsExperimentListJs = require("./libs/ExperimentList.js");

var _libsExperimentListJs2 = _interopRequireDefault(_libsExperimentListJs);

var _reqwest = require("reqwest");

var _reqwest2 = _interopRequireDefault(_reqwest);

var Frontpage = (function (_React$Component) {
    _inherits(Frontpage, _React$Component);

    function Frontpage() {
        _classCallCheck(this, Frontpage);

        _get(Object.getPrototypeOf(Frontpage.prototype), "constructor", this).call(this);
        this.state = { experiments: [] };
        this._refresh = this._refreshData.bind(this);
    }

    _createClass(Frontpage, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var jobs = JSON.parse(this.props.data);
            if (jobs.length > 0) {
                jobs[0].first = true;
            }
            this.setState({ experiments: jobs });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            self._timer = setInterval(this._refresh, 15000);
        }
    }, {
        key: "_refreshData",
        value: function _refreshData() {
            var _this = this;

            (0, _reqwest2["default"])({
                url: '/current-job',
                type: 'json',
                contentType: 'application/json',
                method: 'get',
                success: function success(_success) {
                    _this.setState({ experiments: _success });
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var experiments = this.state.experiments.map(function (experiment) {
                return _react2["default"].createElement(
                    _libsExperimentListJs2["default"],
                    { experiment: experiment, key: experiment._id },
                    _react2["default"].createElement(_libsExperimentControlJs2["default"], { experiment: experiment, key: experiment._id })
                );
            });
            var emptyMessage = experiments.length === 0 ? _react2["default"].createElement(
                "div",
                { className: "message-panel" },
                _react2["default"].createElement(
                    "p",
                    null,
                    "No running experiments"
                )
            ) : null;
            return _react2["default"].createElement(
                "div",
                null,
                _react2["default"].createElement(
                    "h1",
                    { className: "page-header" },
                    "Running experiment"
                ),
                experiments,
                _react2["default"].createElement(
                    "div",
                    { className: "mui-container" },
                    emptyMessage
                )
            );
        }
    }]);

    return Frontpage;
})(_react2["default"].Component);

Frontpage.title = "Overview";
Frontpage.description = "";

module.exports = Frontpage;