import React from "react";

class ExperimentImages extends React.Component {

    constructor() {
        super();
    }


    render() {
        let imageDiv = null;
        if(this.props.images) {
            imageDiv = this.props.images.map(url => {
                return (<a key={url} href={url} target="_blank"><img src={url} alt="experiment image"/></a>)
            });
        }
        return (
            <div className="images">
                {imageDiv}
            </div>
        );
    }
}

module.exports = ExperimentImages;
