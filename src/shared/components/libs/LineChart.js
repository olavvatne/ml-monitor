import React from "react";


//Rickshaw included as script in base.ejs. Node can't handle import that well.
class LineChart extends React.Component {

    constructor() {
        super();
        this.graph = null;
        this.data = [{}, {}];
        this.resize = this.handleResize.bind(this);
    }


    _createGraph() {
        this.graph = new Rickshaw.Graph( {
            element: this.refs.graph.getDOMNode(),
            width: this.refs.graph.getDOMNode().clientWidth - 40,
            renderer: 'line',
            series:this.data

        } );
        var xaxes = new Rickshaw.Graph.Axis.X(
            {
                graph: this.graph,
                tickFormat: function(x) {if(Number.isInteger(x)) {return x;} return null; }
            } );

        var hoverDetail = new Rickshaw.Graph.HoverDetail( {
            graph: this.graph
        } );


        var yaxis = new Rickshaw.Graph.Axis.Y( {
            graph: this.graph,
            orientation: 'left',
            tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
            element: this.refs.yaxis.getDOMNode(),
        } );
    }

    _createSeries(name, color, data, dataKey) {
        var newData = data.map((element => {
            return {x: element.epoch, y: element[dataKey]}
        }));

        return {
            name: name,
            data: newData,
            color: color
        };
    }
    componentWillReceiveProps(props) {
        //Linechart specific to experiment events.
        console.log(props);
        var palette = new Rickshaw.Color.Palette();

        this.data[0] = this._createSeries("Validation loss", palette.color(), props.data, "validation_loss");
        this.data[1] = this._createSeries("Test loss", palette.color(), props.data, "test_loss");
        //this.data[2] = this._createSeries("Training loss", palette.color(), props.data, "training_loss");

        if(!this.graph) {
            this._createGraph();
        }

        this.graph.render();
    }


    handleResize() {
        console.log(this.refs.graph.getDOMNode());
        this.graph.configure({
            width: this.refs.graph.getDOMNode().clientWidth -40,
        });
        this.graph.render();
    }


    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }


    shouldComponentUpdate(nextProp) {
        return true;
    }


    render() {
        let containerStyle = {position: "relative", fontFamily: "Arial"};
        let chartStyle = {  position: "relative", left: "40px"};
        let axisStyle = {    position: "absolute", top: "0", bottom: "0", width: "40px"};
        let legendStyle = { display: "inline-block", verticalAlign: "top", margin: "0 0 0 10px"};
        return (
            <div>
                <div style={containerStyle}>
                    <div ref="yaxis" style={axisStyle}></div>
                    <div ref="graph" style={chartStyle}></div>
                </div>
                <div ref="legend" style={legendStyle}></div>
            </div>
            );
    }
}

module.exports = LineChart;