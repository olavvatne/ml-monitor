"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _muiUIButtonJs = require("./mui/UIButton.js");

var _muiUIButtonJs2 = _interopRequireDefault(_muiUIButtonJs);

var _muiUITextJs = require("./mui/UIText.js");

var _muiUITextJs2 = _interopRequireDefault(_muiUITextJs);

var _reqwest = require("reqwest");

var _reqwest2 = _interopRequireDefault(_reqwest);

var _reactNotifications = require('react-notifications');

var _reactNotifications2 = _interopRequireDefault(_reactNotifications);

var SignIn = (function (_React$Component) {
    _inherits(SignIn, _React$Component);

    //TODO: React-notification is kind of messy? Possibly to create a mixin? Or use a better library?

    function SignIn() {
        _classCallCheck(this, SignIn);

        _get(Object.getPrototypeOf(SignIn.prototype), "constructor", this).call(this);
        this.state = { signedIn: true, notifications: [] };
        this._signIn = this._handleSignIn.bind(this);
        this._signOut = this._handleSignOut.bind(this);
        this._notification = this._handleNotification.bind(this);
    }

    _createClass(SignIn, [{
        key: "_handleSignIn",
        value: function _handleSignIn() {
            var _this = this;

            var payload = JSON.stringify({ user: this.refs.user.getValue(), password: this.refs.password.getValue() });
            (0, _reqwest2["default"])({
                url: '/authenticate',
                type: 'json',
                contentType: 'application/json',
                method: 'post',
                data: payload,
                success: function success(_success) {
                    if (_success.type) {
                        _this.createNotification('success', 'Sign in', 'You can now use API protected endpoints, ' + _success.data.user);
                        localStorage.setItem('user', _success.data.user);
                        localStorage.setItem('token', _success.token);
                        _this.setState({ signedIn: true });
                    } else {
                        _this.createNotification('error', "Sign in", _success.data);
                    }
                }
            });
        }
    }, {
        key: "_handleSignOut",
        value: function _handleSignOut() {
            if (localStorage) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
            this.createNotification("info", "Signed out", "You will not be able to use protected API anymore");
            this.setState({ signedIn: false });
        }
    }, {
        key: "_handleNotification",
        value: function _handleNotification(notification) {
            var notifications = this.state.notifications.filter(function (n) {
                return n.id !== notification.id;
            });
            this.setState({
                notifications: notifications
            });
        }
    }, {
        key: "createNotification",
        value: function createNotification(type, header, text) {
            var notifications = this.state.notifications;
            var id = new Date().getTime();
            var notification = {
                id: id,
                type: type,
                title: header,
                message: text,
                timeOut: Math.random() * 6000
            };
            notifications.push(notification);
            this.setState({
                notifications: notifications
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var signedIn = false;
            if (localStorage && localStorage.getItem('token')) {
                signedIn = true;
            }
            this.setState({ signedIn: signedIn });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2["default"].createElement(
                "div",
                null,
                _react2["default"].createElement(_reactNotifications2["default"], { notifications: this.state.notifications, onRequestHide: this._notification }),
                !this.state.signedIn ? [_react2["default"].createElement(_muiUITextJs2["default"], { labelText: "User", ref: "user", key: "user" }), _react2["default"].createElement(_muiUITextJs2["default"], { labelText: "Password", ref: "password", type: "password", key: "password" }), _react2["default"].createElement(_muiUIButtonJs2["default"], { primary: true, label: 'Sign in', onClick: this._signIn })] : null,
                this.state.signedIn ? _react2["default"].createElement(
                    "div",
                    { className: "signed-in", onClick: this._signOut },
                    " ✓"
                ) : null
            );
        }
    }]);

    return SignIn;
})(_react2["default"].Component);

module.exports = SignIn;