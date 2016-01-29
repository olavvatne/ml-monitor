import React from "react";

class ExperimentComment extends React.Component {

    constructor() {
        super();
    }


    render() {



        return (
           <div>
               <h2>Comment</h2>
               <textarea
                   ref="comment"
                   defaultValue={this.props.comment} />
           </div>
        );
    }
}

module.exports = ExperimentComment;