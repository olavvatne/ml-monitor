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

var _AutoTable = require("./AutoTable");

var _AutoTable2 = _interopRequireDefault(_AutoTable);

var ExperimentDetails = (function (_React$Component) {
    _inherits(ExperimentDetails, _React$Component);

    function ExperimentDetails() {
        _classCallCheck(this, ExperimentDetails);

        _get(Object.getPrototypeOf(ExperimentDetails.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(ExperimentDetails, [{
        key: "render",
        value: function render() {
            var configuration = this.props.configuration;

            if (!configuration) {
                configuration = {};
            }
            console.log(configuration.dataset_path);
            return _react2["default"].createElement(
                "div",
                null,
                _react2["default"].createElement(
                    "h2",
                    null,
                    "Details"
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
                                "Started"
                            ),
                            _react2["default"].createElement(
                                "th",
                                null,
                                "Stopped"
                            ),
                            _react2["default"].createElement(
                                "th",
                                null,
                                "Epochs"
                            ),
                            _react2["default"].createElement(
                                "th",
                                null,
                                "Events"
                            )
                        )
                    ),
                    _react2["default"].createElement(
                        "tbody",
                        null,
                        _react2["default"].createElement(
                            "tr",
                            null,
                            _react2["default"].createElement(
                                "td",
                                null,
                                (0, _moment2["default"])(this.props.details.date_start).format("HH:mm:ss DD-MM-YYYY")
                            ),
                            _react2["default"].createElement(
                                "td",
                                null,
                                (0, _moment2["default"])(this.props.details.date_stop).format("HH:mm:ss DD-MM-YYYY")
                            ),
                            _react2["default"].createElement(
                                "td",
                                null,
                                configuration.epochs
                            ),
                            _react2["default"].createElement(
                                "td",
                                null,
                                this.props.details.nr_events
                            )
                        )
                    ),
                    _react2["default"].createElement(
                        "thead",
                        null,
                        _react2["default"].createElement(
                            "tr",
                            null,
                            _react2["default"].createElement(
                                "th",
                                { colSpan: "4" },
                                "Filename"
                            )
                        )
                    ),
                    _react2["default"].createElement(
                        "tbody",
                        null,
                        _react2["default"].createElement(
                            "tr",
                            null,
                            _react2["default"].createElement(
                                "td",
                                { colSpan: "4" },
                                !this.props.configuration ? "-" : configuration.dataset_path
                            )
                        )
                    )
                ),
                configuration.optimization_params ? _react2["default"].createElement(
                    "h2",
                    { className: "mt30" },
                    "Optimization parameters"
                ) : null,
                _react2["default"].createElement(_AutoTable2["default"], { data: configuration.optimization_params, className: 'experiment-table' }),
                configuration.model_params ? _react2["default"].createElement(
                    "h2",
                    { className: "mt30" },
                    "Model parameters"
                ) : null,
                _react2["default"].createElement(_AutoTable2["default"], { data: configuration.model_params, className: 'experiment-table' }),
                configuration.dataset_params ? _react2["default"].createElement(
                    "h2",
                    { className: "mt30" },
                    "Dataset parameters"
                ) : null,
                _react2["default"].createElement(_AutoTable2["default"], { data: configuration.dataset_params, className: 'experiment-table' })
            );
        }
    }]);

    return ExperimentDetails;
})(_react2["default"].Component);

module.exports = ExperimentDetails;