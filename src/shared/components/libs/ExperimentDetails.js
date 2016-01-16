import React from "react";
import moment from "moment";
import AutoTable from "./AutoTable";

class ExperimentDetails extends React.Component {

    render() {
        return (
            <div>
                <h2>Details</h2>

            <table className="experiment-table">
                <tr>
                    <th>Started</th>
                    <th>Stopped</th>
                    <th>Epochs</th>
                    <th>Events</th>
                </tr>
                <tr>
                    <td>{moment(this.props.details.date_start).format("HH:mm:ss DD-MM-YYYY")}</td>
                    <td>{moment(this.props.details.date_stop).format("HH:mm:ss DD-MM-YYYY")}</td>
                    <td>{this.props.configuration.epochs}</td>
                    <td>{this.props.details.nr_events}</td>
                </tr>
                <tr>
                    <th colSpan="4">Filename</th>
                </tr>
                <tr>
                    <td colSpan="4">{this.props.configuration.dataset_path}</td>
                </tr>
            </table>
            <h2 className="mt30">Optimization parameters</h2>
            <AutoTable data={this.props.configuration.optimization_params} className={'experiment-table'}></AutoTable>
            <h2 className="mt30">Model parameters</h2>
            <AutoTable data={this.props.configuration.model_params} className={'experiment-table'}></AutoTable>
            <h2 className="mt30">Model parameters</h2>
            <AutoTable data={this.props.configuration.dataset_params} className={'experiment-table'}></AutoTable>
            </div>
        );
    }
}
module.exports = ExperimentDetails;