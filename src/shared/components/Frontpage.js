
import React from "react";
import ExperimentControl from './libs/ExperimentControl.js';
import ExperimentList from './libs/ExperimentList.js';

class Frontpage extends React.Component {

    constructor() {
        super();
        this.state = {experiments: []};
    }

    componentWillMount() {
        var jobs = JSON.parse(this.props.data);
        if(jobs.length > 0) {
            jobs[0].first = true;
        }
        this.setState({experiments: jobs})
    }

    render() {
        var experiments = this.state.experiments.map((experiment) => {
            return (
                <ExperimentList experiment={experiment} key={experiment._id}>
                    <ExperimentControl experiment={experiment} key={experiment._id} />
                </ExperimentList>
            )
        });
        var emptyMessage = experiments.length === 0? (<div className="message-panel"><p>No running experiments</p></div>): null;
        return (
            <div className="mui-container">
                <h1 className="page-header">Running experiment</h1>
                {experiments}
                {emptyMessage}
            </div>
        );
    }
}



Frontpage.title = "Overview";
Frontpage.description =  "";

module.exports = Frontpage;