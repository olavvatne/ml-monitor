import React from "react";
import ExperimentDetails from "./ExperimentDetails.js";
import ExperimentEvents from "./ExperimentEvents.js";
import ExperimentComment from "./ExperimentComment.js";
import LineChart from "./LineChart.js";
import Controls from "./Controls.js";
import reqwest from "reqwest";


class ExperimentHistory extends React.Component {

    constructor() {
        super();
        this.state = {events: [], configuration: {}, result:{}, comment: ""}
    }

    componentWillReceiveProps(props) {
        if(props.experiment._id) {
            this._getExperimentData(props)
        }
    }

    _getExperimentData(props) {
        var experimentId = props.experiment._id;
        var that = this;
        var succ = function(success) {
            console.log(success);
            if(success.length >0) {
                var experiment = success[0];
                that.setState({
                    events: experiment.events,
                    configuration: experiment.configuration,
                    result: experiment.result,
                    comment: experiment.comment
                });
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
        var isExperiment = experiment._id ? true: false;

        return isExperiment ? (
           <div className="experiments__content">
               <Controls eid={experiment._id} running={experiment.running} onRemove={this.props.onRemove}/>
                <div className="mui-row" style={{height:"300px"}}>
                    <div className="mui-col-md-12">
                         <LineChart data={this.state.events}></LineChart>
                    </div>
                </div>

                <div className="mui-row">
                    <div className="mui-col-md-12">
                        <ExperimentDetails details={experiment}
                                           configuration={this.state.configuration}
                                           result={this.state.result}>
                        </ExperimentDetails>
                    </div>
                </div>
                <div className="mui-row">
                    <div className="mui-col-md-12">
                        <ExperimentEvents events={this.state.events}></ExperimentEvents>
                    </div>
                </div>

               <div className="mui-row">
                   <div className="mui-col-md-12">
                       <ExperimentComment comment={this.state.comment} eid={experiment._id}></ExperimentComment>
                   </div>
               </div>

               <div className="mui-row">
                   <div className="mui-col-md-12">
                       <a href={"/job/" + experiment._id} style={{float: "right", marginTop: "20px"}}>Raw json data</a>
                   </div>
               </div>
            </div>
        ): null;
    }
}



module.exports = ExperimentHistory;