/**
 * Created by Olav on 10/9/2015.
 */
import React from "react";
import ExperimentHistory from "./libs/ExperimentHistory.js";
import ExperimentList from "./libs/ExperimentList.js";
import moment from "moment";
import reqwest from "reqwest";

class List extends React.Component {

    constructor() {
        super();
        this.state = {active: {}}
    }

    _handleListClick(experiment) {
        this.setState({active: experiment});
        this.props.onListChange(experiment);
    }
    render() {
        var list = null;
        if(this.props.experiments) {
            list = this.props.experiments.map((experiment) => {
            let handler = this._handleListClick.bind(this, experiment);
            let isActive = this.state.active._id === experiment._id? "active": "";
            return (
                <li className={isActive} key={experiment._id}><a onClick={handler}>
                    {moment.utc(experiment.date_start).utcOffset("+01:00").format("HH:mm:ss DD-MM-YYYY")}
                </a></li>)
        });
        }
        return (
            <ul>{list}</ul>
        );
    }
}

class Group extends React.Component {

    constructor() {
        super();
        this.state = {groupData: {}};
    }

    _handleListClick(group) {
        if(!this.state.groupData[group.gid]) {
            reqwest({
                url: '/job/group/' + group.gid,
                type: 'json',
                contentType: 'application/json',
                method: 'get',
                success: (success) => {
                    var exp = this.state.groupData;
                    exp[group.gid] = success;
                    this.setState({groupData: exp});
                }
            });
        }
        else {
            var exp = this.state.groupData;
            delete exp[group.gid];
            this.setState({groupData: exp});
        }
    }

    removeJobFromList(groupId, jobId) {
        var groupData = this.state.groupData;
        var experiments = groupData[groupId];
        for( var i =0; i< experiments.length; i++) {
            if(experiments[i]._id === jobId) {
                experiments.splice(i, 1);
                this.setState({groupData: groupData});
                return;
            }
        }
    }

    render() {
        var list = this.props.groups.map((group) => {
            let handler = this._handleListClick.bind(this, group);
            var groupData = this.state.groupData[group.gid];

            return (
                <li key={group.gid} >
                    <a onClick={handler}>{group.name}</a>
                    {groupData !== undefined ? <ul>
                        <List
                            onListChange={this.props.onListChange}
                            experiments={groupData}>
                        </List>
                    </ul>: null}
                </li>)
        });
        return (
            <ul>{list}</ul>
        );
    }
}

class Experiments extends React.Component {

    constructor() {
        super();
        this.state = {experiments: [], display: {}};
        this._listChange = this._handleListChange.bind(this);
        this._removeJob = this._handleRemoveJob.bind(this);
    }


    componentWillMount() {
        var groupData = JSON.parse(this.props.data);
        this.setState({groups: groupData})
    }

    _handleListChange(experiment) {
        this.setState({display: experiment});
    }

    //TODO: handle, this shit
    _handleRemoveJob() {
        this.refs.list.removeJobFromList(this.state.display.gid, this.state.display._id);
        this.setState({display: {}});
    }

    render() {

        var emptyMessage = !this.state.display._id? (<div className="message-panel"><p>No experiment has been selected</p></div>): null;
        return (
            <div>
                <h1 className="page-header">Experiment history</h1>
                {emptyMessage}
                <div id="sidebar">
                    <Group ref="list" groups={this.state.groups} onListChange={this._listChange}/>
                </div>
                <div id="content" className="mui-container-fluid">

                    <ExperimentHistory
                        experiment={this.state.display}
                        groups={this.state.groups}
                        onRemove={this._removeJob}/>

                </div>
            </div>
        );
    }
}



Experiments.title = "Experiments";
Experiments.description =  "";

module.exports = Experiments;