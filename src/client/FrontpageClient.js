import React from "react";
import Frontpage from "../shared/components/Frontpage";
var initData = document.getElementById("init").text;
React.render(<Frontpage data={initData}/>, document.getElementById('app'));//