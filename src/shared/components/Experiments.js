/**
 * Created by Olav on 10/9/2015.
 */
import React from "react";
import ExperimentHistory from './libs/ExperimentHistory.js';
import ExperimentList from './libs/ExperimentList.js';
import moment from "moment";

class List extends React.Component {

    constructor() {
        super();
        this.state = {active: {}}
    }

    _handleListClick(experiment) {
        console.log(experiment);
        this.setState({active: experiment});
    }

    render() {

        var list = this.props.experiments.map((experiment) => {
            let handler = this._handleListClick.bind(this, experiment);
            let isActive = this.state.active._id === experiment._id? "active": "";
            return (
                <li className={isActive}><a onClick={handler}>
                    {moment(experiment.date_start).format("HH:mm:ss DD-MM-YYYY")}
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
        var emptyMessage = experiments.length === 0? (<div className="message-panel"><p>No experiments</p></div>): null;
        return (
            <div>
                <div id="sidebar">
                    <List experiments={this.state.experiments} />
                </div>
                <div id="content" className="mui-container-fluid">
                    <h1 className="page-header">Experiment history</h1>
                    {experiments}
                    {emptyMessage}
                </div>
            </div>
        );
    }
}



Experiments.title = "Experiments";
Experiments.description =  "";

module.exports = Experiments;