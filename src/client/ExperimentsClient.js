/**
 * Created by Olav on 10/9/2015.
 */

import React from "react";
import Experiments from "../shared/components/Experiments";

var initData = document.getElementById("init").text;
React.render(<Experiments data={initData}/>, document.getElementById('app'));//