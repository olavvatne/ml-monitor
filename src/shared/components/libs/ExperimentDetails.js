import React from "react";
import moment from "moment";

class ExperimentDetails extends React.Component {

    render() {
        return (
            <div>
                <h2>Details</h2>

            <table style={{width: "100%"}}>
                <tr>
                    <th>Started</th>
                    <th>Events</th>
                </tr>
                <tr>
                    <td>{moment(this.props.details.date_start).format("HH:mm:ss DD-MM-YYYY")}</td>
                    <td>{this.props.details.nr_events}</td>
                </tr>
            </table>
            <pre>{JSON.stringify(this.props.configuration, null, 2)}</pre>
            </div>
        );
    }
}
module.exports = ExperimentDetails;