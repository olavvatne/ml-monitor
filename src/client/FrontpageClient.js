import React from "react";
import ReactDOM from "react-dom";
import Frontpage from "../shared/components/Frontpage";
var initData = document.getElementById("init").text;
ReactDOM.render(<Frontpage data={initData}/>, document.getElementById('app'));//