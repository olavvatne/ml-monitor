import React from "react";
import moment from "moment";

class ExperimentDetails extends React.Component {


    render() {
        //Need all events for figure, but recent event list contains only 5 elements.
        var recentEvents = [];
        if(this.props.events) {
            recentEvents = this.props.events.slice(-5);
        }
        var events = recentEvents.map((event) => {
            return (
                <tr key={event.epoch}>
                    <td>
                        {event.epoch}
                    </td>
                    <td>
                        {moment(event.date_recorded).format("HH:mm:ss DD-MM-YYYY")}
                    </td>
                    <td>
                        {event.validation_loss.toFixed(4)}
                    </td>
                    <td>
                        {event.test_loss.toFixed(4)}
                    </td>
                </tr>
                )
        });
        return (
            <div>
                <h2>Recent events</h2>
                <table className="experiment-table">
                    <thead><tr>
                        <th>Epoch</th>
                        <th>Time</th>
                        <th>Validation</th>
                        <th>Test</th>
                    </tr></thead>
                    <tbody>{events}</tbody>
                </table>
            </div>
        );
    }
}
module.exports = ExperimentDetails;