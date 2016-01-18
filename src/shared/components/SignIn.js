import React from "react";
import UIButton from "./mui/UIButton.js";
import UIText from "./mui/UIText.js";
import reqwest from "reqwest";
import Notifications from 'react-notifications';

class SignIn extends React.Component {
    //TODO: React-notification is kind of messy? Possibly to create a mixin? Or use a better library?
    constructor() {
        super();
        this.state = { signedIn: true, notifications: []};
        this._signIn = this._handleSignIn.bind(this);
        this._signOut = this._handleSignOut.bind(this);
        this._notification = this._handleNotification.bind(this);
    }

    _handleSignIn() {
        var payload = JSON.stringify({user: this.refs.user.getValue(), password: this.refs.password.getValue()});
        reqwest({
            url: '/authenticate',
            type: 'json',
            contentType: 'application/json',
            method: 'post',
            data: payload,
            success: (success) => {
                if(success.type) {
                    this.createNotification('success', 'Sign in', 'You can now use API protected endpoints, ' + success.data.user);
                    localStorage.setItem('user', success.data.user);
                    localStorage.setItem('token', success.token);
                    this.setState({signedIn: true})
                }
                else {
                    this.createNotification('error', "Sign in", success.data);
                }
            }
        });
    }

    _handleSignOut() {
        if(localStorage) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        this.createNotification("info", "Signed out", "You will not be able to use protected API anymore")
        this.setState({signedIn: false});
    }

    _handleNotification(notification) {
        let notifications = this.state.notifications.filter(n => n.id !== notification.id);
        this.setState({
            notifications: notifications
        });
    }

    createNotification(type, header, text) {
        let notifications = this.state.notifications;
        let id = new Date().getTime();
        let notification = {
            id: id,
            type: type,
            title: header,
            message: text,
            timeOut: (Math.random() * 6000),
        };
        notifications.push(notification);
        this.setState({
            notifications: notifications
        });
    };

    componentDidMount() {
        var signedIn = false;
        if(localStorage && localStorage.getItem('token')) {
            signedIn = true;
        }
        this.setState({signedIn: signedIn});
    }
    render() {
        return (
            <div>
                <Notifications notifications={this.state.notifications} onRequestHide={this._notification}/>
                {!this.state.signedIn? [
                        <UIText labelText={"User"} ref="user" key="user" />,
                        <UIText labelText={"Password"} ref="password" type={"password"} key="password" />,

                <UIButton primary={true} label={'Sign in'} onClick={this._signIn} /> ]:null}
                {this.state.signedIn? <div className="signed-in" onClick={this._signOut}> &#10003;</div> :null}
            </div>
        );
    }
}


module.exports = SignIn;