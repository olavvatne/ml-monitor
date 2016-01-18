
import React from "react";
import ReactDOM from "react-dom";
import Experiments from "../shared/components/Experiments";

var initData = document.getElementById("init").text;
ReactDOM.render(<Experiments data={initData}/>, document.getElementById('app'));//