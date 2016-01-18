import React from "react";
import moment from "moment";
import AutoTable from "./AutoTable";

class ExperimentDetails extends React.Component {

    render() {
        let configuration = this.props.configuration;

        if(!configuration) {
            configuration = {};
        }
        console.log(configuration.dataset_path);
        return (
            <div>
                <h2>Details</h2>

            <table className="experiment-table">
                <thead><tr>
                    <th>Started</th>
                    <th>Stopped</th>
                    <th>Epochs</th>
                    <th>Events</th>
                </tr></thead>
                <tbody><tr>
                    <td>{moment(this.props.details.date_start).format("HH:mm:ss DD-MM-YYYY")}</td>
                    <td>{moment(this.props.details.date_stop).format("HH:mm:ss DD-MM-YYYY")}</td>
                    <td>{configuration.epochs}</td>
                    <td>{this.props.details.nr_events}</td>
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