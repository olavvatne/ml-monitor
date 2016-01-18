/**
 * Created by Olav on 10/2/2015.
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var UISelect = (function (_React$Component) {
    _inherits(UISelect, _React$Component);

    function UISelect() {
        _classCallCheck(this, UISelect);

        _get(Object.getPrototypeOf(UISelect.prototype), "constructor", this).call(this);
        this._handle = this._handleChange.bind(this);
        this.state = { value: "" };
    }

    _createClass(UISelect, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.setState({
                value: this.props.value
            });
        }
    }, {
        key: "_handleChange",
        value: function _handleChange(event) {
            var value = event.target.value;
            this.setState({ value: value });
        }
    }, {
        key: "getValue",
        value: function getValue() {
            return this.state.value;
        }
    }, {
        key: "render",
        value: function render() {
            //TODO: Value
            var items = this.props.menuItems.map(function (menu) {
                return _react2["default"].createElement(
                    "option",
                    { value: menu.payload },
                    menu.text
                );
            });
            //TODO: Change state!
            return _react2["default"].createElement(
                "div",
                { className: "mui-select" },
                _react2["default"].createElement(
                    "select",
                    { onChange: this._handle,
                        value: this.state.value, style: this.props.style },
                    items
                )
            );
        }
    }]);

    return UISelect;
})(_react2["default"].Component);

;

module.exports = UISelect;