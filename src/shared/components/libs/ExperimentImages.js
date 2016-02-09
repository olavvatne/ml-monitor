import React from "react";

class ExperimentImages extends React.Component {

    constructor() {
        super();
    }


    render() {
        let imageDiv = this.props.images.map(url => {
           return (<a href={url} target="_blank"><img src={url} alt="experiment image"/></a>)
        });
        return (
            <div className="images">
                {imageDiv}
            </div>
        );
    }
}

module.exports = ExperimentImages;