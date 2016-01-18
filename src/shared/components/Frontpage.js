
import React from "react";
import ExperimentControl from "./libs/ExperimentControl.js";
import ExperimentList from "./libs/ExperimentList.js";
import reqwest from "reqwest";

class Frontpage extends React.Component {

    constructor() {
        super();
        this.state = {experiments: []};
        this._refresh = this._refreshData.bind(this);
    }

    componentWillMount() {
        var jobs = JSON.parse(this.props.data);
        if(jobs.length > 0) {
            jobs[0].first = true;
        }
        this.setState({experiments: jobs})
    }

    componentDidMount() {
        self._timer = setInterval(this._refresh, 15000);
    }

    _refreshData() {
        reqwest({
            url: '/current-job',
            type: 'json',
            contentType: 'application/json',
            method: 'get',
            success: (success) => {
                this.setState({experiments: success});
            }
        });
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