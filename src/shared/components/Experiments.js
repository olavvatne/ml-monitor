/**
 * Created by Olav on 10/9/2015.
 */
import React from "react";
import ExperimentHistory from "./libs/ExperimentHistory.js";
import ExperimentList from "./libs/ExperimentList.js";
import moment from "moment";

class List extends React.Component {

    constructor() {
        super();
        this.state = {active: {}}
    }

    _handleListClick(experiment) {
        this.setState({active: experiment});
        this.props.onListChange(experiment);
    }
    render() {
        var list = this.props.experiments.map((experiment) => {
            let handler = this._handleListClick.bind(this, experiment);
            let isActive = this.state.active._id === experiment._id? "active": "";
            return (
                <li className={isActive} key={experiment._id}><a onClick={handler}>
                    {moment.utc(experiment.date_start).local().format("HH:mm:ss DD-MM-YYYY")}
                </a></li>)
        });
        return (
            <ul>{list}</ul>
        );
    }
}

class Experiments extends React.Component {

    constructor() {
        super();
        this.state = {experiments: [], display: {}};
        this._listChange = this._handleListChange.bind(this);
        this._removeJob = this._handleRemoveJob.bind(this);
    }


    componentWillMount() {
        var jobs = JSON.parse(this.props.data);
        this.setState({experiments: jobs})
    }

    _handleListChange(experiment) {
        this.setState({display: experiment});
    }

    _handleRemoveJob() {
        var experiments = this.state.experiments;
        for( var i =0; i< experiments.length; i++) {
            if(experiments[i]._id === this.state.display._id) {
                experiments.splice(i, 1);
                this.setState({experiments: experiments, display: {}});
                return;
            }
        }
    }

    render() {

        var emptyMessage = !this.state.display._id? (<div className="message-panel"><p>No experiment has been selected</p></div>): null;
        return (
            <div>
                <h1 className="page-header">Experiment history</h1>
                {emptyMessage}
                <div id="sidebar">
                    <List ref="list" experiments={this.state.experiments} onListChange={this._listChange}/>
                </div>
                <div id="content" className="mui-container-fluid">

                    <ExperimentHistory experiment={this.state.display} onRemove={this._removeJob}/>

                </div>
            </div>
        );
    }
}



Experiments.title = "Experiments";
Experiments.description =  "";

module.exports = Experiments;