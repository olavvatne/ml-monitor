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

var _reqwest = require("reqwest");

var _reqwest2 = _interopRequireDefault(_reqwest);

var Controls = (function (_React$Component) {
    _inherits(Controls, _React$Component);

    function Controls() {
        _classCallCheck(this, Controls);

        _get(Object.getPrototypeOf(Controls.prototype), "constructor", this).call(this);
        this.state = { open: false };
        this._stop = this._stopExperiment.bind(this);
        this._remove = this._removeExperiment.bind(this);
    }

    _createClass(Controls, [{
        key: "_stopExperiment",
        value: function _stopExperiment() {
            var r = confirm("Are you sure you want to stop experiment?");
            var token = localStorage.getItem("token");
            if (r === false) {
                return;
            }
            var experimentId = this.props.eid;
            (0, _reqwest2["default"])({
                url: '/job/' + experimentId + '/stop',
                type: 'json',
                contentType: 'application/json',
                method: 'post',
                headers: {
                    "authorization": token
                },
                success: function success(_success) {
                    console.log(_success);
                }
            });
        }
    }, {
        key: "_removeExperiment",
        value: function _removeExperiment() {
            var _this = this;

            var r = confirm("Are you sure you want to remove experiment?");
            if (r === false) {
                return;
            }
            var token = localStorage.getItem("token");
            var experimentId = this.props.eid;
            (0, _reqwest2["default"])({
                url: '/job/' + experimentId,
                type: 'json',
                contentType: 'application/json',
                method: 'delete',
                headers: {
                    "authorization": token
                },
                success: function success(_success2) {
                    _this.props.onRemove();
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2["default"].createElement(
                "div",
                { className: "mui-row" },
                _react2["default"].createElement(
                    "div",
                    { className: "mui-col-md-12 controls" },
                    this.props.running ? _react2["default"].createElement(_muiUIButtonJs2["default"], { label: "Stop", danger: true, onClick: this._stop }) : null,
                    !this.props.running ? _react2["default"].createElement(_muiUIButtonJs2["default"], { label: "Remove", danger: true, onClick: this._remove }) : null
                )
            );
        }
    }]);

    return Controls;
})(_react2["default"].Component);

module.exports = Controls;