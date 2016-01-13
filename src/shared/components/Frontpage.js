
import React from "react";

class Frontpage extends React.Component {

    constructor() {
        super();
    }


    componentDidMount() {

    }



    render() {
        return (
            <div className="mui-container">
                <h1>Frontpage</h1>
                <pre>{this.props.data}</pre>
            </div>
        );
    }
}



Frontpage.title = "Overview";
Frontpage.description =  "";

module.exports = Frontpage;