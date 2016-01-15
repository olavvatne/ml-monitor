/**
 * Created by Olav on 10/9/2015.
 */
import React from "react";
import ExperimentHistory from './libs/ExperimentHistory.js';
import ExperimentList from './libs/ExperimentList.js';

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
            return (
                <ExperimentList experiment={experiment} key={experiment._id}>
                    <ExperimentHistory experiment={experiment} key={experiment._id} />
                </ExperimentList>)
        });
        return (
            <div className="mui-container">
                <h1>Experiment history</h1>
                {experiments}
            </div>
        );
    }
}



Experiments.title = "Experiments";
Experiments.description =  "";

module.exports = Experiments;