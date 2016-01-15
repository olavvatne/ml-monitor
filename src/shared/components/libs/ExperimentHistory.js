import React from "react";
import ExperimentDetails from './ExperimentDetails.js';
import ExperimentEvents from './ExperimentEvents.js';
var reqwest = require('reqwest');
var XMLHttpRequest = require('xhr2');

class ExperimentHistory extends React.Component {

    constructor() {
        super();
        this.state = {events: [], configuration: {}}
    }

    componentWillMount() {
        this._getExperimentData()
    }

    _getExperimentData() {
        var experimentId = this.props.experiment._id;
        var that = this;
        var succ = function(success) {
            if(success.length >0) {
                var experiment = success[0]
                that.setState({events: experiment.events, configuration: experiment.configuration})
            }
        };
        reqwest({
            url: '/job/' + experimentId,
            type: 'json',
            contentType: 'application/json',
            method: 'get',
            success: succ
        });
    }

    render() {

        var experiment = this.props.experiment;
        return (
            <div className="experiments__content">
                <div className="mui-row" style={{height:"300px"}}>
                    <div className="mui-col-md-12">
                        <p>Figure</p>
                    </div>
                </div>
                <div className="mui-row">
                    <div className="mui-col-md-12">
                        <ExperimentDetails details={experiment} configuration={this.state.configuration}></ExperimentDetails>
                    </div>
                </div>
                <div className="mui-row">
                    <div className="mui-col-md-12">
                        <ExperimentEvents events={this.state.events}></ExperimentEvents>
                    </div>
                </div>
            </div>
        );
    }
}



module.exports = ExperimentHistory;