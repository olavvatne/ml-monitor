import React from "react";
import Controls from "./Controls.js";
import ExperimentDetails from "./ExperimentDetails.js";
import ExperimentEvents from "./ExperimentEvents.js";
import LineChart from "./LineChart.js";
import moment from "moment";


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
                <Controls eid={experiment._id} running={experiment.running}/>
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