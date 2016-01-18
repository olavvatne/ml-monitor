"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var Row = (function (_React$Component) {
    _inherits(Row, _React$Component);

    function Row() {
        _classCallCheck(this, Row);

        _get(Object.getPrototypeOf(Row.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Row, [{
        key: "render",
        value: function render() {
            if (this.props.header) {
                var row = this.props.data.map(function (d, i) {
                    return _react2["default"].createElement(
                        "th",
                        { key: i },
                        d
                    );
                });
                var content = _react2["default"].createElement(
                    "thead",
                    null,
                    _react2["default"].createElement(
                        "tr",
                        null,
                        row
                    )
                );
            } else {
                var row = this.props.data.map(function (d, i) {
                    return _react2["default"].createElement(
                        "td",
                        { key: i },
                        JSON.stringify(d)
                    );
                });
                var content = _react2["default"].createElement(
                    "tbody",
                    null,
                    _react2["default"].createElement(
                        "tr",
                        null,
                        row
                    )
                );
            }
            return content;
        }
    }]);

    return Row;
})(_react2["default"].Component);

var AutoTable = (function (_React$Component2) {
    _inherits(AutoTable, _React$Component2);

    function AutoTable() {
        _classCallCheck(this, AutoTable);

        _get(Object.getPrototypeOf(AutoTable.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(AutoTable, [{
        key: "_split",
        value: function _split(a, size) {
            var arrays = [];

            while (a.length > 0) arrays.push(a.splice(0, size));

            return arrays;
        }
    }, {
        key: "_constructTable",
        value: function _constructTable() {
            var _this = this;

            var content = [];

            if (this.props.data) {
                var cells = undefined;
                cells = Object.keys(this.props.data).map(function (name) {
                    return name;
                });

                var arr = this._split(cells, 4);
                var lastElement = arr.length - 1;
                while (arr[lastElement].length < 4) {
                    arr[lastElement].push("");
                }

                for (var i = 0; i < arr.length; i++) {
                    var keys = arr[i];
                    content.push(keys);

                    var values = keys.map(function (key) {
                        return _this.props.data[key];
                    });
                    content.push(values);
                }
            }
            return content;
        }
    }, {
        key: "render",
        value: function render() {
            var tableContent = this._constructTable();
            var table = tableContent.map(function (row, i) {
                var isHeader = i % 2 === 0;
                return _react2["default"].createElement(Row, { data: row, header: isHeader, key: "Row" + i });
            });
            return _react2["default"].createElement(
                "table",
                { className: this.props.className },
                table
            );
        }
    }]);

    return AutoTable;
})(_react2["default"].Component);

module.exports = AutoTable;