import React from "react";
import UIButton from '../mui/UIButton.js';
import moment from "moment";

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
        var text = this.props.show? "Running" : "" ;
        return (
            <span className="label-info">{text}</span>
        );
    }
}


class ExperimentControl extends React.Component {

    constructor() {
        super();
        this.state = {open: false};
    }


    componentDidMount() {

    }



    render() {
        var recentEvents = this.props.experiment.events.slice(-5);
        var events = recentEvents.map((event) => {
            return (<li key={event.epoch}>{event.test_loss}</li>)
        });
        var experiment = this.props.experiment;
        return (
            <div className="experiments">
                <div className="experiments__bar">
                    <ul>
                        <li>Started: {moment(experiment.date_start).format("YYYY-MM-DD HH:mm:ss")}</li>
                        <li>Duration: <Duration start={experiment.date_start}/></li>
                        <li>Status: <Label show={experiment.running}></Label></li>
                    </ul>
                </div>
                <div className="experiments__content">
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
                </div>
            </div>
        );
    }
}



module.exports = ExperimentControl;