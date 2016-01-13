/**
 * Created by Olav on 10/3/2015.
 */
import React from "react";

class UIButton extends React.Component {
    constructor() {
        //TODO: Color option, and raised flat etc
        super();
    }

    render() {

        var primary = this.props.primary ? "primary" : "";

        return (
            <button className="mui-btn"
                    data-mui-color={primary}
                    data-mui-style="raised"
                onClick={this.props.onClick}
                style={this.props.style}>
            {this.props.label}
        </button>
        )
    }
};

module.exports = UIButton;