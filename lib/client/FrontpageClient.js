"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _sharedComponentsFrontpage = require("../shared/components/Frontpage");

var _sharedComponentsFrontpage2 = _interopRequireDefault(_sharedComponentsFrontpage);

var initData = document.getElementById("init").text;
_reactDom2["default"].render(_react2["default"].createElement(_sharedComponentsFrontpage2["default"], { data: initData }), document.getElementById('app')); //