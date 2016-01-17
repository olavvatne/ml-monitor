import React from "react";
import UIButton from '../mui/UIButton.js';
var reqwest = require('reqwest');
var XMLHttpRequest = require('xhr2');

class Controls extends React.Component {
    constructor() {
        super();
        this.state = {open: false};
        this._stop = this._stopExperiment.bind(this);
        this._remove = this._removeExperiment.bind(this);
    }

    _stopExperiment() {
        var r = confirm("Are you sure you want to stop experiment?");
        if(r === false) {
            return;
        }
        var experimentId = this.props.eid;
        reqwest({
            url: '/job/' + experimentId + '/stop',
            type: 'json',
            contentType: 'application/json',
            method: 'post',
            success: (success) => {
                console.log(success)
            }
        });
    }

    _removeExperiment() {
        var r = confirm("Are you sure you want to remove experiment?");
        if(r === false) {
            return;
        }
        var experimentId = this.props.eid;
        reqwest({
            url: '/job/' + experimentId,
            type: 'json',
            contentType: 'application/json',
            method: 'delete',
            success: (success) => {
                this.props.onRemove();
            }
        });
    }

    render() {
        return (
            <div className="mui-row">
                <div className="mui-col-md-12 controls">
                    {this.props.running ? <UIButton label="Stop" danger={true} onClick={this._stop}></UIButton> : null}
                    {!this.props.running ?
                        <UIButton label="Remove" danger={true} onClick={this._remove}></UIButton> : null}
                </div>
            </div>
        );
    }
}
module.exports = Controls;
