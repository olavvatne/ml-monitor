/**
 * Created by Olav on 10/9/2015.
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _libsExperimentHistoryJs = require("./libs/ExperimentHistory.js");

var _libsExperimentHistoryJs2 = _interopRequireDefault(_libsExperimentHistoryJs);

var _libsExperimentListJs = require("./libs/ExperimentList.js");

var _libsExperimentListJs2 = _interopRequireDefault(_libsExperimentListJs);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var List = (function (_React$Component) {
    _inherits(List, _React$Component);

    function List() {
        _classCallCheck(this, List);

        _get(Object.getPrototypeOf(List.prototype), "constructor", this).call(this);
        this.state = { active: {} };
    }

    _createClass(List, [{
        key: "_handleListClick",
        value: function _handleListClick(experiment) {
            this.setState({ active: experiment });
            this.props.onListChange(experiment);
        }
    }, {
        key: "render",
        value: function render() {
            var _this = this;

            var list = this.props.experiments.map(function (experiment) {
                var handler = _this._handleListClick.bind(_this, experiment);
                var isActive = _this.state.active._id === experiment._id ? "active" : "";
                return _react2["default"].createElement(
                    "li",
                    { className: isActive, key: experiment._id },
                    _react2["default"].createElement(
                        "a",
                        { onClick: handler },
                        (0, _moment2["default"])(experiment.date_start).format("HH:mm:ss DD-MM-YYYY")
                    )
                );
            });
            return _react2["default"].createElement(
                "ul",
                null,
                list
            );
        }
    }]);

    return List;
})(_react2["default"].Component);

var Experiments = (function (_React$Component2) {
    _inherits(Experiments, _React$Component2);

    function Experiments() {
        _classCallCheck(this, Experiments);

        _get(Object.getPrototypeOf(Experiments.prototype), "constructor", this).call(this);
        this.state = { experiments: [], display: {} };
        this._listChange = this._handleListChange.bind(this);
        this._removeJob = this._handleRemoveJob.bind(this);
    }

    _createClass(Experiments, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var jobs = JSON.parse(this.props.data);
            this.setState({ experiments: jobs });
        }
    }, {
        key: "_handleListChange",
        value: function _handleListChange(experiment) {
            this.setState({ display: experiment });
        }
    }, {
        key: "_handleRemoveJob",
        value: function _handleRemoveJob() {
            var experiments = this.state.experiments;
            for (var i = 0; i < experiments.length; i++) {
                if (experiments[i]._id === this.state.display._id) {
                    experiments.splice(i, 1);
                    this.setState({ experiments: experiments, display: {} });
                    return;
                }
            }
        }
    }, {
        key: "render",
        value: function render() {

            var emptyMessage = !this.state.display._id ? _react2["default"].createElement(
                "div",
                { className: "message-panel" },
                _react2["default"].createElement(
                    "p",
                    null,
                    "No experiment has been selected"
                )
            ) : null;
            return _react2["default"].createElement(
                "div",
                null,
                _react2["default"].createElement(
                    "h1",
                    { className: "page-header" },
                    "Experiment history"
                ),
                emptyMessage,
                _react2["default"].createElement(
                    "div",
                    { id: "sidebar" },
                    _react2["default"].createElement(List, { ref: "list", experiments: this.state.experiments, onListChange: this._listChange })
                ),
                _react2["default"].createElement(
                    "div",
                    { id: "content", className: "mui-container-fluid" },
                    _react2["default"].createElement(_libsExperimentHistoryJs2["default"], { experiment: this.state.display, onRemove: this._removeJob })
                )
            );
        }
    }]);

    return Experiments;
})(_react2["default"].Component);

Experiments.title = "Experiments";
Experiments.description = "";

module.exports = Experiments;