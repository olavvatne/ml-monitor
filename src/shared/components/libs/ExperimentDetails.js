import React from "react";
import moment from "moment";
import AutoTable from "./AutoTable";

class ExperimentDetails extends React.Component {

    render() {
        let configuration = this.props.configuration;
        let result = this.props.result;
        if(!configuration) {
            configuration = {};
        }
        if(!result.evaluation) {
            result = {evaluation: {}, dataset: {}}
        }
        console.log("result", result);

        return (
            <div>
                <h2>Details</h2>

            <table className="experiment-table">
                <thead><tr>
                    <th>Started</th>
                    <th>Stopped</th>
                    <th>Scheduled epochs</th>
                    <th>Events</th>
                </tr></thead>
                <tbody><tr>
                    <td>{moment(this.props.details.date_start).format("HH:mm:ss DD-MM-YYYY")}</td>
                    <td>{moment(this.props.details.date_stop).format("HH:mm:ss DD-MM-YYYY")}</td>
                    <td>{configuration.epochs}</td>
                    <td>{this.props.details.nr_events}</td>
                </tr></tbody>
                <thead><tr>
                    <th>Training duration</th>
                    <th>Iterations</th>
                    <th>Epochs</th>
                    <th>Best iteration</th>
                </tr></thead>
                <tbody><tr>
                    <td>{result.evaluation.duration? result.evaluation.duration.toFixed(2)+"m": ""} </td>
                    <td>{result.evaluation.iteration}</td>
                    <td>{result.evaluation.epoch}</td>
                    <td>{result.evaluation.best_iteration}</td>
                </tr></tbody>
                <thead><tr>
                    <th>Best validation</th>
                    <th>Best test</th>
                    <th>Learning adjustments</th>
                    <th>ID</th>
                </tr></thead>
                <tbody><tr>
                    <td>{result.evaluation.valid_Score}</td>
                    <td>{result.evaluation.test_score}</td>
                    <td>{result.evaluation.learning_adjustments}</td>
                    <td>{this.props.details._id}</td>
                </tr></tbody>
                <thead><tr>
                    <th>Train examples</th>
                    <th>Test examples</th>
                    <th>Validation examples</th>
                    <th></th>
                </tr></thead>
                <tbody><tr>
                    <td>{result.dataset.train}</td>
                    <td>{result.dataset.test}</td>
                    <td>{result.dataset.valid}</td>
                    <td></td>
                </tr></tbody>
                <thead><tr>
                    <th colSpan="4">Filename</th>
                </tr></thead>
                <tbody><tr>
                    <td colSpan="4">{!this.props.configuration? "-": configuration.dataset_path}</td>
                </tr></tbody>
            </table>
                {configuration.optimization_params ? <h2 className="mt30">Optimization parameters</h2>: null}
            <AutoTable data={configuration.optimization_params} className={'experiment-table'}></AutoTable>
                {configuration.model_params ? <h2 className="mt30">Model parameters</h2>: null}
            <AutoTable data={configuration.model_params} className={'experiment-table'}></AutoTable>
                {configuration.dataset_params ? <h2 className="mt30">Dataset parameters</h2>: null}
            <AutoTable data={configuration.dataset_params} className={'experiment-table'}></AutoTable>
            </div>
        );
    }
}
module.exports = ExperimentDetails;