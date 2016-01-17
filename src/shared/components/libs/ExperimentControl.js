import React from "react";
import UIButton from '../mui/UIButton.js';
import ExperimentDetails from './ExperimentDetails.js';
import ExperimentEvents from './ExperimentEvents.js';
import LineChart from './LineChart.js';
import moment from "moment";
var reqwest = require('reqwest');
var XMLHttpRequest = require('xhr2');
//TODO: split into several files

class Controls extends React.Component {
    constructor() {
        super();
        this.state = {open: false};
        this._stop = this._stopExperiment.bind(this);
    }
    _stopExperiment() {
        var experimentId = this.props.eid;
        var succ = function(success) {
            console.log(success)
        };
        reqwest({
            url: '/job/' + experimentId + '/stop',
            type: 'json',
            contentType: 'application/json',
            method: 'post',
            data: {},
            success: succ
        });
    }

    render() {
        return (
            <div className="mui-row" >
                <div className="mui-col-md-12 controls">
                    <UIButton label="Stop" danger={true} onClick={this._stop}></UIButton>
                </div>
            </div>
        );
    }
}


class ExperimentControl extends React.Component {

    constructor() {
        super();
        this.state = {showGraph: false};
    }

    componentWillMount() {
        //If experiment is first in list, have it initally open.
        if(this.props.experiment.first) {
            this.setState({open: true})
        }
    }

    componentDidMount() {
        this.setState({showGraph: true});
    }

    render() {
        var experiment = this.props.experiment;
        var graphEvents = [];
        if(this.state.showGraph) {
            graphEvents = experiment.events;
        }
        return (
            <div className="experiments__content">
                {experiment.running? <Controls eid={experiment._id}/>: null }
                <div className="mui-row" style={{height:"300px"}}>
                    <div className="mui-col-md-12">
                        <LineChart data={graphEvents}></LineChart>
                    </div>
                </div>
                <div className="mui-row">
                    <div className="mui-col-md-8">
                        <ExperimentDetails details={experiment}></ExperimentDetails>
                    </div>
                    <div className="mui-col-md-4">
                        <ExperimentEvents events={experiment.events}></ExperimentEvents>
                    </div>
                </div>
            </div>
        );
    }
}



module.exports = ExperimentControl;