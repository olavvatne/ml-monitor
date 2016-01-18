"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ControlsJs = require("./Controls.js");

var _ControlsJs2 = _interopRequireDefault(_ControlsJs);

var _ExperimentDetailsJs = require("./ExperimentDetails.js");

var _ExperimentDetailsJs2 = _interopRequireDefault(_ExperimentDetailsJs);

var _ExperimentEventsJs = require("./ExperimentEvents.js");

var _ExperimentEventsJs2 = _interopRequireDefault(_ExperimentEventsJs);

var _LineChartJs = require("./LineChart.js");

var _LineChartJs2 = _interopRequireDefault(_LineChartJs);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var ExperimentControl = (function (_React$Component) {
    _inherits(ExperimentControl, _React$Component);

    function ExperimentControl() {
        _classCallCheck(this, ExperimentControl);

        _get(Object.getPrototypeOf(ExperimentControl.prototype), "constructor", this).call(this);
        this.state = { showGraph: false };
    }

    _createClass(ExperimentControl, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            //If experiment is first in list, have it initally open.
            if (this.props.experiment.first) {
                this.setState({ open: true });
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.setState({ showGraph: true });
        }
    }, {
        key: "render",
        value: function render() {
            var experiment = this.props.experiment;
            var graphEvents = [];
            if (this.state.showGraph) {
                graphEvents = experiment.events;
            }
            return _react2["default"].createElement(
                "div",
                { className: "experiments__content" },
                _react2["default"].createElement(_ControlsJs2["default"], { eid: experiment._id, running: experiment.running }),
                _react2["default"].createElement(
                    "div",
                    { className: "mui-row", style: { height: "300px" } },
                    _react2["default"].createElement(
                        "div",
                        { className: "mui-col-md-12" },
                        _react2["default"].createElement(_LineChartJs2["default"], { data: graphEvents })
                    )
                ),
                _react2["default"].createElement(
                    "div",
                    { className: "mui-row" },
                    _react2["default"].createElement(
                        "div",
                        { className: "mui-col-md-8" },
                        _react2["default"].createElement(_ExperimentDetailsJs2["default"], { details: experiment })
                    ),
                    _react2["default"].createElement(
                        "div",
                        { className: "mui-col-md-4" },
                        _react2["default"].createElement(_ExperimentEventsJs2["default"], { events: experiment.events })
                    )
                )
            );
        }
    }]);

    return ExperimentControl;
})(_react2["default"].Component);

module.exports = ExperimentControl;