import React from "react";


//Rickshaw included as script in base.ejs. Node can't handle import that well.
class LineChart extends React.Component {

    constructor() {
        super();
        this.graph = null;
        this.data = [];
        this.state = {renderChart: false}
        this.resize = this.handleResize.bind(this);
    }


    _createGraph() {
        console.log("create-graph");
        console.log(this.data);
        this.graph = new Rickshaw.Graph( {
            element: this.refs.graph,
            width: this.refs.graph.clientWidth - 40,
            interpolation: 'linear',
            height: 350,
            renderer: 'line',
            series:this.data

        } );

        var tickFormatter = Rickshaw.Fixtures.Number.formatKMBT;
        if (this.props.xAxisType === 'integer') {
            tickFormatter = function(x) {
                //For safari
                function isInteger(x) {
                    return (typeof x === 'number') && (x % 1 === 0);
                }
                if(isInteger(x)) {return x;} return null;
            };
        }
        var xaxis = new Rickshaw.Graph.Axis.X({
            graph: this.graph,
            tickFormat: tickFormatter
        } );

        var yaxis = new Rickshaw.Graph.Axis.Y( {
            graph: this.graph,
            orientation: 'left',
            tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
            element: this.refs.yaxis
        } );

        console.log(this.refs.preview);


        var hoverDetail = new Rickshaw.Graph.HoverDetail( {
            graph: this.graph,
            xFormatter: function(x) {
                if(x) {
                    return parseFloat(x).toFixed(3) + "";
                }
                return  x;
            },
            yFormatter: function(y) {
                if(y) {
                    return parseFloat(y).toFixed(3) + "";
                }
                return  y;
            }
        } );
        this.graph.render();

        var slider = new Rickshaw.Graph.RangeSlider({
            graph: this.graph,
            element: this.refs.preview
        });

    }

    _createSeries(name, color, data, valY, valX) {
        var newData = [];
        if(data) {
            newData = data.map((element => {
                return {x: element[valX], y: element[valY]}
            }));
        }

        return {
            name: name,
            data: newData,
            color: color
        };
    }
    componentWillReceiveProps(props) {
        //Linechart specific to experiment events.
        console.log("RECIEVE PROPS");
        console.log(props.data);
        var palette = new Rickshaw.Color.Palette();
        var xAxisKey = this.props.xAxisKey;
        var yAxisKeys = this.props.yAxisKey;

        //Cant replace array, because of reference used when updating data.
        this.data.splice(0,this.data.length);
        for(var i = 0; i< yAxisKeys.length; i++) {
                this.data.push(this._createSeries(yAxisKeys[i], palette.color(), props.data, yAxisKeys[i], xAxisKey));
        }
        console.log(this.data);
        this.clear();
        /*if(props.data || true) {
            this.graph.render();
        }*/

    }

    componentDidUpdate(prevState, newState) {
        console.log("COMPONENT UPDATE")
        if(!this.state.renderChart) {
            this.setState({renderChart: true});

            console.log(" SCHEDULE RENDER DIVS")
        }
        else if(!this.graph) {
            console.log("CREATE GRAPH")
            this._createGraph();

        }


    }

    handleResize() {
        console.log(this.refs.graph);
        this.graph.configure({
            width: this.refs.graph.clientWidth -40,
        });
        if(this.graph) {
            this.graph.render();
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    clear() {
        console.log("DESTROY CHART")
        this.graph = null;
        this.setState({renderChart: false});
    }

    render() {
        console.log("RENDER ", this.state.renderChart)
        if(!this.state.renderChart) {
            console.log("EMPTY");
            return (<div>{this.state.renderChart}</div>)
        }

        let containerStyle = {position: "relative", fontFamily: "Arial"};
        /*if(this.state.data.length <= 0) {
            containerStyle.visibility = "hidden";
        }*/
        let chartStyle = {  position: "relative", left: "40px"};
        let axisStyle = {    position: "absolute", top: "0", bottom: "0", width: "40px"};
        let legendStyle = { display: "inline-block", verticalAlign: "top", margin: "0 0 0 10px"};
        let previewStyle = { left: "40px", marginTop: "10px"};
        return (
            <div>
                <div style={containerStyle} key="chart_container">
                    <div ref="yaxis" style={axisStyle} key="y_axis"></div>
                    <div ref="graph" style={chartStyle} key="graph"></div>
                    <div ref="preview" style={previewStyle} key="preview"></div>
                </div>
                <div key="chart_legend" ref="legend" style={legendStyle}></div>
            </div>
            );
    }
}

module.exports = LineChart;