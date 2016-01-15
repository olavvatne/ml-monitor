import React from "react";
import UIButton from '../mui/UIButton.js';
import moment from "moment";
var reqwest = require('reqwest');
var XMLHttpRequest = require('xhr2');
//TODO: split into several files

class Duration extends React.Component {
    render() {
        var time = moment(this.props.start).fromNow(true);
        return (
            <span>{time}</span>
        );
    }
}
class Label extends React.Component {

    render() {
        var text = this.props.show? "Running" : "Stopped" ;
        var type = this.props.show? "label label-info": "label";
        return (
            <span className={type}>{text}</span>
        );
    }
}

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
        this.state = {open: false};
        this._toggle = this._toggleDisplay.bind(this);
    }

    _toggleDisplay() {
        var toggleState = this.state.open;
        this.setState({open: !toggleState});
    }
    componentWillMount() {
        //If experiment is first in list, have it initally open.
        if(this.props.experiment.first) {
            this.setState({open: true})
        }
    }
    render() {
        //Need all events for figure, but recent event list contains only 5 elements.
        var recentEvents = [];
        if(this.props.experiment.events) {
            recentEvents = this.props.experiment.events.slice(-5);
        }
        var events = recentEvents.map((event) => {
            return (<li key={event.epoch}>{event.test_loss}</li>)
        });
        var experiment = this.props.experiment;
        return (
            <div className="experiments">
                <div className="experiments__bar" onClick={this._toggle}>
                    <ul>
                        <li>Started: {moment(experiment.date_start).format("YYYY-MM-DD HH:mm:ss")}</li>
                        <li>Duration: <Duration start={experiment.date_start}/></li>
                        <li>Status: <Label show={experiment.running}></Label></li>
                    </ul>
                </div>
                {this.state.open? <div className="experiments__content">
                    {experiment.running? <Controls eid={experiment._id}/>: null }
                    <div className="mui-row" style={{height:"300px"}}>
                        <div className="mui-col-md-12">
                            <p>Figure</p>
                        </div>
                    </div>
                    <div className="mui-row">
                        <div className="mui-col-md-8">
                            <h2>Details</h2>
                            <table>
                                <tr>
                                    <th>Started</th>
                                    <th>Events</th>
                                </tr>
                                <tr>
                                    <td>{moment(experiment.date_start).format("YYYY-MM-DD HH:mm:ss")}</td>
                                    <td>{experiment.nr_events}</td>
                                </tr>
                            </table>
                        </div>
                        <div className="mui-col-md-4">
                            <h2>Recent events</h2>
                            <ul>{events}</ul>
                        </div>
                    </div>
                </div>: null}
            </div>
        );
    }
}



module.exports = ExperimentControl;