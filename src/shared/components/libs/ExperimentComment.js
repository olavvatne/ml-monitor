import React from "react";
import UIButton from "../mui/UIButton.js";
import reqwest from "reqwest";

class ExperimentComment extends React.Component {

    constructor() {
        super();
        this.state = {saved: false, changed: false, value: ""};
        this._comment = this._postComment.bind(this);
        this._handleChange = this._onChange.bind(this);
    }

    _onChange() {
        var change = {value: this.refs.comment.value};
        if(!this.state.changed) {
            change.changed = true;
            change.saved = false;
        }
        this.setState(change);
    }

    componentWillReceiveProps(props) {
        var defaultValue = props.comment || "";
        this.setState({value: defaultValue});
    }

    _postComment() {
        var token = localStorage.getItem("token");
        var experimentId = this.props.eid;
        reqwest({
            url: '/job/' + experimentId + '/comment',
            type: 'json',
            contentType: 'application/json',
            method: 'post',
            data: JSON.stringify({comment: this.refs.comment.value}),
            headers: {
                "authorization": token
            },
            success: (success) => {
                this.setState({saved: true, changed: false});
            }
        });
    }

    render() {
        return (
           <div className="comment">
               <h2>Comment</h2>
               <textarea
                   ref="comment"
                   value={this.state.value}
                   onChange={this._handleChange}/>
               <div style={{display: "block"}}>
                   <UIButton label="Save" primary={true} onClick={this._comment}></UIButton>
               </div>

               <span>{this.state.saved? "Comment saved": ""}</span>
               <span>{this.state.changed? "Unsaved changes": ""}</span>
           </div>
        );
    }
}

module.exports = ExperimentComment;