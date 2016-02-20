import React from "react";
import ExperimentDetails from "./ExperimentDetails.js";
import ExperimentEvents from "./ExperimentEvents.js";
import ExperimentComment from "./ExperimentComment.js";
import ExperimentImages from "./ExperimentImages.js";
import LineChart from "./LineChart.js";
import Controls from "./Controls.js";
import reqwest from "reqwest";


class ExperimentHistory extends React.Component {

    constructor() {
        super();
        this.state = {events: [], configuration: {}, result:{}, comment: "", curve: [], images: []}
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
            if(success.length >0) {
                var experiment = success[0];
                if(experiment.curve) {
                    experiment.curve = experiment.curve.sort(function(a, b) {return a.recall - b.recall});
                    console.log(experiment.curve);
                }
                that.setState({
                    events: experiment.events,
                    configuration: experiment.configuration,
                    result: experiment.result,
                    comment: experiment.comment,
                    curve: experiment.curve,
                    images: experiment.images
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

        var graphEvents = [];
        if(this.state.events) {
            graphEvents = this.state.events;
            //Remove epoch 0, Since the difference between 0 and 1 is so big. Do not reveal training progress at all.
            if(graphEvents.length > 0 && graphEvents[0].epoch === 0) {
                graphEvents.shift();
            }
        }

        var chartYAxisKeys = ['validation_loss', 'test_loss', 'training_loss'];
        var curveY = ['precision'];
        return isExperiment ? (
           <div className="experiments__content">
               <Controls eid={experiment._id} running={experiment.running} onRemove={this.props.onRemove}/>
                <div className="mui-row">
                    <div className="mui-col-md-12">
                         <LineChart data={graphEvents} xAxisKey={'epoch'} yAxisKey={chartYAxisKeys} xAxisType="integer">
                         </LineChart>
                    </div>
                </div>

               <div className="mui-row">
                   <div className="mui-col-md-12">
                       <LineChart data={this.state.curve} xAxisKey={'recall'} yAxisKey={curveY}></LineChart>
                   </div>
               </div>

               <div className="mui-row">
                   <div className="mui-col-md-12">
                       <ExperimentComment comment={this.state.comment} eid={experiment._id}></ExperimentComment>
                   </div>
               </div>

               <div className="mui-row">
                   <ExperimentImages images={this.state.images}></ExperimentImages>
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
                       <a href={"/job/" + experiment._id} style={{float: "right", marginTop: "20px"}}>Raw json data</a>
                   </div>
               </div>
            </div>
        ): null;
    }
}



module.exports = ExperimentHistory;