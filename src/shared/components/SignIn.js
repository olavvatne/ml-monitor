import React from "react";
import UIButton from "./mui/UIButton.js";
import UIText from "./mui/UIText.js";
import reqwest from "reqwest";
import toastr from "toastr";
class SignIn extends React.Component {

    constructor() {
        super();
        this.state = {toggle: false, signedIn: false};
        this._signIn = this._handleSignIn.bind(this);
    }

    _handleSignIn() {
        var payload = JSON.stringify({user: this.refs.user.getValue(), password: this.refs.password.getValue()})
        reqwest({
            url: '/authenticate',
            type: 'json',
            contentType: 'application/json',
            method: 'post',
            data: payload,
            success: (success) => {
                if(success.type) {
                    this.setState({signedIn: true})
                }
                else {
                    toastr.warning("")
                }
            }
        });
    }

    componentDidMount() {
    }
    render() {
        return (
            <div>
                {!this.state.signedIn? [<UIText labelText={"User"} ref="user"></UIText>,
                <UIText labelText={"Password"} ref="password" type={"password"}></UIText>]:null}
                <UIButton primary={true} label={'Sign in'} onClick={this._signIn}></UIButton>
            </div>
        );
    }
}


module.exports = SignIn;