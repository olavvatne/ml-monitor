import React from "react";
import UIButton from "../mui/UIButton.js";
import UISelect from "../mui/UISelect.js";
import reqwest from "reqwest";
import Notifications from 'react-notifications';

//TODO: notification suffers from a duplicate code. Refactor.
//Currently notification is used in this way, since there should be a response from unauthenticated attempts
//at using protected endpoints
class Controls extends React.Component {
    constructor() {
        super();
        this.state = {open: false, stopping: false, notifications: []};
        this._stop = this._stopExperiment.bind(this);
        this._debug = this._debugExperiment.bind(this);
        this._remove = this._removeExperiment.bind(this);
        this._update = this._updateGroup.bind(this);
        this._notification = this._handleNotification.bind(this);
    }

    _debugExperiment() {
        var token = localStorage.getItem("token");
        var experimentId = this.props.eid;
        reqwest({
            url: '/job/' + experimentId + '/debug',
            type: 'json',
            contentType: 'application/json',
            method: 'post',
            headers: {
                "authorization": token
            },
            success: (success) => {
                this.createNotification('success', 'Debugging', 'System will output images shortly');
            },
            error: (error) => {
                this.createNotification('error', 'Problem', 'Could not debug. Probably token');
            }
        });
    }

    _stopExperiment() {
        var r = confirm("Are you sure you want to stop experiment?");
        var token = localStorage.getItem("token");
        if(r === false) {
            return;
        }
        var experimentId = this.props.eid;
        reqwest({
            url: '/job/' + experimentId + '/stop',
            type: 'json',
            contentType: 'application/json',
            method: 'post',
            headers: {
                "authorization": token
            },
            success: (success) => {
                this.setState({stopping: true});
                this.createNotification('success', 'Stopping', 'System stop experiment and save parameters');
            },
            error: (error) => {
                this.createNotification('error', 'Problem', 'Could not stop. Probably token');
            }
        });
    }

    _updateGroup() {
        var experimentId = this.props.eid;
        var token = localStorage.getItem("token");
        var group = parseInt(this.refs.groupselect.getValue());
        if(group === null || group === undefined) {
            return;
        }
        reqwest({
            url: '/job/' + experimentId + '/group',
            type: 'json',
            headers: {
                "authorization": token
            },
            contentType: 'application/json',
            method: 'post',
            data: JSON.stringify({gid: group}),
            success: (success) => {
                this.createNotification('success', 'Group update', 'Experiment assigned new group. Refresh.');
            },
            error: (error) => {
                this.createNotification('error', 'Problem', 'Could not update group. Probably token');
            }
        });
    }

    _removeExperiment() {
        var r = confirm("Are you sure you want to remove experiment?");
        if(r === false) {
            return;
        }
        var token = localStorage.getItem("token");
        var experimentId = this.props.eid;
        reqwest({
            url: '/job/' + experimentId,
            type: 'json',
            contentType: 'application/json',
            method: 'delete',
            headers: {
                "authorization": token
            },
            success: (success) => {
                this.props.onRemove();
                this.createNotification('success', 'Removing', 'Experiment record is removed');
            },
            error: (error) => {
                this.createNotification('error', 'Problem', 'Could not stop. Probably token');
            }
        });
    }

    _handleNotification(notification) {
        let notifications = this.state.notifications.filter(n => n.id !== notification.id);
        this.setState({
            notifications: notifications
        });
    }

    createNotification(type, header, text) {
        let notifications = this.state.notifications;
        let id = new Date().getTime();
        let notification = {
            id: id,
            type: type,
            title: header,
            message: text,
            timeOut: (Math.random() * 6000)
        };
        notifications.push(notification);
        this.setState({
            notifications: notifications
        });
    };

    render() {
        var items = [];
        var groups = this.props.groups || [];
            for(var i in groups) {
                items.push({payload: groups[i].gid, text: groups[i].name});
            }

        return (
            <div className="mui-row">
                <div className="mui-col-md-12 controls">
                    <Notifications notifications={this.state.notifications} onRequestHide={this._notification} key="notification"/>
                    {this.props.running && !this.state.stopping ? <UIButton label="Stop" danger={true} onClick={this._stop} key="stop"></UIButton> : null}
                    {this.props.running && !this.state.stopping ? <UIButton label="Debug" primary={true} onClick={this._debug} key="debug"></UIButton> : null}
                    {!this.props.running || this.state.stopping ?
                        <UIButton label="Remove" danger={true} onClick={this._remove} key="remove"></UIButton> : null}
                    {!this.props.running || this.state.stopping ?
                        [<span className="pl20 pr10" key="select"><UISelect menuItems={items} ref="groupselect"/></span>,
                        <UIButton label="Update group" onClick={this._update} key="update"></UIButton>]
                    : null}
                </div>
            </div>
        );
    }
}
module.exports = Controls;
