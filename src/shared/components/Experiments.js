/**
 * Created by Olav on 10/9/2015.
 */
import React from "react";
import ExperimentControl from './libs/ExperimentControl.js';

class Experiments extends React.Component {

    constructor() {
        super();
        this.state = {experiments: []};
    }


    componentWillMount() {
        var jobs = JSON.parse(this.props.data);
        this.setState({experiments: jobs})
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



Experiments.title = "Experiments";
Experiments.description =  "";

module.exports = Experiments;