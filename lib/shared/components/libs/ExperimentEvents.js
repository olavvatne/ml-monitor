"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var ExperimentDetails = (function (_React$Component) {
    _inherits(ExperimentDetails, _React$Component);

    function ExperimentDetails() {
        _classCallCheck(this, ExperimentDetails);

        _get(Object.getPrototypeOf(ExperimentDetails.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(ExperimentDetails, [{
        key: "render",
        value: function render() {
            //Need all events for figure, but recent event list contains only 5 elements.
            var recentEvents = [];
            if (this.props.events) {
                recentEvents = this.props.events.slice(-5);
            }
            var events = recentEvents.map(function (event) {
                return _react2["default"].createElement(
                    "tr",
                    { key: event.epoch },
                    _react2["default"].createElement(
                        "td",
                        null,
                        event.epoch
                    ),
                    _react2["default"].createElement(
                        "td",
                        null,
                        (0, _moment2["default"])(event.date_recorded).format("HH:mm:ss DD-MM-YYYY")
                    ),
                    _react2["default"].createElement(
                        "td",
                        null,
                        event.validation_loss.toFixed(4)
                    ),
                    _react2["default"].createElement(
                        "td",
                        null,
                        event.test_loss.toFixed(4)
                    )
                );
            });
            return _react2["default"].createElement(
                "div",
                null,
                _react2["default"].createElement(
                    "h2",
                    null,
                    "Recent events"
                ),
                _react2["default"].createElement(
                    "table",
                    { className: "experiment-table" },
                    _react2["default"].createElement(
                        "thead",
                        null,
                        _react2["default"].createElement(
                            "tr",
                            null,
                            _react2["default"].createElement(
                                "th",
                                null,
                                "Epoch"
                            ),
                            _react2["default"].createElement(
                                "th",
                                null,
                                "Time"
                            ),
                            _react2["default"].createElement(
                                "th",
                                null,
                                "Validation"
                            ),
                            _react2["default"].createElement(
                                "th",
                                null,
                                "Test"
                            )
                        )
                    ),
                    _react2["default"].createElement(
                        "tbody",
                        null,
                        events
                    )
                )
            );
        }
    }]);

    return ExperimentDetails;
})(_react2["default"].Component);

module.exports = ExperimentDetails;