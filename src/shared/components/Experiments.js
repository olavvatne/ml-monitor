/**
 * Created by Olav on 10/9/2015.
 */
import React from "react";
import UIButton from './mui/UIButton.js';
import UIIncrementButton from './mui/UIIncrementButton.js';

class Experiments extends React.Component {

    constructor() {
        super();
    }


    componentDidMount() {

    }



    render() {
        var initData = JSON.parse(this.props.data);
        var jobs = initData.map( job => {
            return (<p>{job.nr_events}</p>);
        });
        return (
            <div className="mui-container">
                <h1>Experiments</h1>
                {jobs}
            </div>
        );
    }
}



Experiments.title = "Experiments";
Experiments.description =  "";

module.exports = Experiments;