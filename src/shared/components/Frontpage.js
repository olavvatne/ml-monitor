
import React from "react";
import UIButton from './mui/UIButton.js';
import ExperimentControl from './libs/ExperimentControl.js';

class Frontpage extends React.Component {

    constructor() {
        super();
        this.state = {experiments: []};
    }

    componentWillMount() {
        this.setState({experiments: JSON.parse(this.props.data)})
    }
    componentDidMount() {

    }



    render() {
        var experiments = this.state.experiments.map((experiment) => {
            return (<ExperimentControl experiment={experiment} key={experiment._id}></ExperimentControl>)
        });
        return (
            <div className="mui-container">
                <h1>Running experiment</h1>
                {experiments}
            </div>
        );
    }
}



Frontpage.title = "Overview";
Frontpage.description =  "";

module.exports = Frontpage;