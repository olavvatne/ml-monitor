import React from "react";
import UIButton from './mui/UIButton.js';
import UIText from './mui/UIText.js';

class SignIn extends React.Component {

    constructor() {
        super();
        this.state = {toggle: false, signedIn: true};
        this._toggle = this._handleToggle.bind(this);
    }

    _handleToggle() {
        console.log("TOGGLE");
        this.setState({toggle: !this.state.toggle});
    }

    componentDidMount() {
        console.log("MOUNT");
    }
    render() {
        return (
            <span>
                {this.state.toggle? [<UIText></UIText>,
                <UIText></UIText>]:null}
                <UIButton primary={true} label={'Sign in'} onClick={this._toggle}></UIButton>
            </span>
        );
    }
}


module.exports = SignIn;