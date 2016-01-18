/**
 * Created by Olav on 10/10/2015.
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _UIButtonJs = require('./UIButton.js');

var _UIButtonJs2 = _interopRequireDefault(_UIButtonJs);

var UIIncrementButton = (function (_React$Component) {
    _inherits(UIIncrementButton, _React$Component);

    function UIIncrementButton() {
        _classCallCheck(this, UIIncrementButton);

        _get(Object.getPrototypeOf(UIIncrementButton.prototype), "constructor", this).call(this);
        this._up = this._adjustParagraphCount.bind(this, 1);
        this._down = this._adjustParagraphCount.bind(this, -1);
        this.state = { count: 0 };
    }

    _createClass(UIIncrementButton, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            console.log(this.props.initvalue);
            this.setState({ count: parseInt(this.props.initvalue) });
        }
    }, {
        key: "_adjustParagraphCount",
        value: function _adjustParagraphCount(inc) {
            //TODO: add Maximum as well.
            var count = Math.max(this.props.minimum, this.state.count + inc);

            this.setState({ count: count });
            this.props.onAdjust(inc);
        }
    }, {
        key: "getValue",
        value: function getValue() {
            return this.state.count;
        }
    }, {
        key: "render",
        value: function render() {
            return _react2["default"].createElement(
                "span",
                { style: { margin: "5px" } },
                _react2["default"].createElement(_UIButtonJs2["default"], {
                    label: "-",
                    primary: false,
                    onClick: this._down }),
                _react2["default"].createElement(
                    "span",
                    { style: { marginLeft: "5px", marginRight: "5px", fontSize: "1.5em" } },
                    this.state.count
                ),
                _react2["default"].createElement(_UIButtonJs2["default"], {
                    label: "+",
                    primary: false,
                    onClick: this._up })
            );
        }
    }]);

    return UIIncrementButton;
})(_react2["default"].Component);

;

module.exports = UIIncrementButton;