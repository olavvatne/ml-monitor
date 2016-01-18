"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _muiUIButtonJs = require("../mui/UIButton.js");

var _muiUIButtonJs2 = _interopRequireDefault(_muiUIButtonJs);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var Duration = (function (_React$Component) {
    _inherits(Duration, _React$Component);

    function Duration() {
        _classCallCheck(this, Duration);

        _get(Object.getPrototypeOf(Duration.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Duration, [{
        key: "render",
        value: function render() {
            if (this.props.stop) {
                var time = _moment2["default"].duration((0, _moment2["default"])(this.props.stop).diff((0, _moment2["default"])(this.props.start))).asHours().toFixed(2) + " Hours";
            } else {
                var time = (0, _moment2["default"])(this.props.start).fromNow(true);
            }

            return _react2["default"].createElement(
                "span",
                null,
                time
            );
        }
    }]);

    return Duration;
})(_react2["default"].Component);

var Label = (function (_React$Component2) {
    _inherits(Label, _React$Component2);

    function Label() {
        _classCallCheck(this, Label);

        _get(Object.getPrototypeOf(Label.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Label, [{
        key: "render",
        value: function render() {
            var text = this.props.show ? "Running" : "Stopped";
            var type = this.props.show ? "label label-info" : "label";
            return _react2["default"].createElement(
                "span",
                { className: type },
                text
            );
        }
    }]);

    return Label;
})(_react2["default"].Component);

var ExperimentControl = (function (_React$Component3) {
    _inherits(ExperimentControl, _React$Component3);

    function ExperimentControl() {
        _classCallCheck(this, ExperimentControl);

        _get(Object.getPrototypeOf(ExperimentControl.prototype), "constructor", this).call(this);
        this.state = { open: false };
        this._toggle = this._toggleDisplay.bind(this);
    }

    _createClass(ExperimentControl, [{
        key: "_toggleDisplay",
        value: function _toggleDisplay() {
            var toggleState = this.state.open;
            this.setState({ open: !toggleState });
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            //If experiment is first in list, have it initally open.
            if (this.props.experiment.first) {
                this.setState({ open: true });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var experiment = this.props.experiment;
            return _react2["default"].createElement(
                "div",
                { className: "experiments" },
                _react2["default"].createElement(
                    "div",
                    { className: "experiments__bar", onClick: this._toggle },
                    _react2["default"].createElement(
                        "ul",
                        null,
                        _react2["default"].createElement(
                            "li",
                            null,
                            "Started: ",
                            (0, _moment2["default"])(experiment.date_start).format("HH:mm:ss DD-MM-YYYY")
                        ),
                        _react2["default"].createElement(
                            "li",
                            null,
                            "Duration: ",
                            _react2["default"].createElement(Duration, { start: experiment.date_start, stop: experiment.date_stop })
                        ),
                        _react2["default"].createElement(
                            "li",
                            null,
                            "Status: ",
                            _react2["default"].createElement(Label, { show: experiment.running })
                        )
                    )
                ),
                this.state.open ? this.props.children : null
            );
        }
    }]);

    return ExperimentControl;
})(_react2["default"].Component);

module.exports = ExperimentControl;