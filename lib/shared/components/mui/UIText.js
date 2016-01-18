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

var UIText = (function (_React$Component) {
    _inherits(UIText, _React$Component);

    function UIText() {
        _classCallCheck(this, UIText);

        _get(Object.getPrototypeOf(UIText.prototype), "constructor", this).call(this);
        this._handle = this._handleChange.bind(this);
        this.state = { value: null };
    }

    _createClass(UIText, [{
        key: "getValue",
        value: function getValue() {
            //TODO: State not updated itself before getValue is called. Results in form being one
            //character behind. FindDomNode works! Is this the best way of doing things?
            return _react2["default"].findDOMNode(this.refs.element).value;
        }
    }, {
        key: "_handleChange",
        value: function _handleChange(event) {
            //TODO: Necessary to set state?
            this.setState({ value: event.target.value });
            if (this.props.onChange) {
                this.props.onChange(event.target.value);
            }
        }
    }, {
        key: "render",
        value: function render() {
            //TODO: Handle errors
            var type = "text";
            if (this.props.type) {
                type = this.props.type;
            }
            //var errorText = (<small style={{"position":"absolute", "color": "red"}}>Not a number</small>)
            return _react2["default"].createElement(
                "div",
                { className: "mui-form-group" },
                _react2["default"].createElement("input", { ref: "element", type: type,
                    className: "mui-form-control",
                    value: this.state.value,
                    onChange: this._handle,
                    pattern: this.props.validationPattern,
                    style: this.props.style }),
                _react2["default"].createElement(
                    "label",
                    { className: "mui-form-floating-label" },
                    this.props.labelText
                )
            );
        }
    }]);

    return UIText;
})(_react2["default"].Component);

;

module.exports = UIText;