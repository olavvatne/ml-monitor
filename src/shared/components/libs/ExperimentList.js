import React from "react";
import UIButton from "../mui/UIButton.js";
import moment from "moment";

class Duration extends React.Component {
    render() {
        if(this.props.stop) {
            var time = moment.duration(moment(this.props.stop).diff(moment(this.props.start))).asHours().toFixed(2) + " Hours";
        }
        else {
            var time = moment(this.props.start).fromNow(true);
        }

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
        var experiment = this.props.experiment;
        return (
            <div className="experiments">
                <div className="experiments__bar" onClick={this._toggle}>
                    <ul>
                        <li>Started: {moment(experiment.date_start).format("HH:mm:ss DD-MM-YYYY")}</li>
                        <li>Duration: <Duration start={experiment.date_start} stop={experiment.date_stop} /></li>
                        <li>Status: <Label show={experiment.running}></Label></li>
                    </ul>
                </div>
                {this.state.open? this.props.children : null}
            </div>
        );
    }
}



module.exports = ExperimentControl;