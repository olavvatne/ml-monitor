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
        return (
            <div className="mui-container">
                    <h1>Experiments</h1>

            </div>
        );
    }
}



Experiments.title = "Experiments";
Experiments.description =  "";

module.exports = Experiments;