'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

//Rickshaw included as script in base.ejs. Node can't handle import that well.

var LineChart = (function (_React$Component) {
    _inherits(LineChart, _React$Component);

    function LineChart() {
        _classCallCheck(this, LineChart);

        _get(Object.getPrototypeOf(LineChart.prototype), 'constructor', this).call(this);
        this.graph = null;
        this.data = [{}, {}];
        this.resize = this.handleResize.bind(this);
    }

    _createClass(LineChart, [{
        key: '_createGraph',
        value: function _createGraph() {
            this.graph = new Rickshaw.Graph({
                element: this.refs.graph,
                width: this.refs.graph.clientWidth - 40,
                renderer: 'line',
                series: this.data

            });
            var xaxes = new Rickshaw.Graph.Axis.X({
                graph: this.graph,
                tickFormat: function tickFormat(x) {
                    if (Number.isInteger(x)) {
                        return x;
                    }return null;
                }
            });

            var hoverDetail = new Rickshaw.Graph.HoverDetail({
                graph: this.graph
            });

            var yaxis = new Rickshaw.Graph.Axis.Y({
                graph: this.graph,
                orientation: 'left',
                tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
                element: this.refs.yaxis
            });
        }
    }, {
        key: '_createSeries',
        value: function _createSeries(name, color, data, dataKey) {
            var newData = data.map(function (element) {
                return { x: element.epoch, y: element[dataKey] };
            });

            return {
                name: name,
                data: newData,
                color: color
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            //Linechart specific to experiment events.
            console.log(props);
            var palette = new Rickshaw.Color.Palette();

            this.data[0] = this._createSeries("Validation loss", palette.color(), props.data, "validation_loss");
            this.data[1] = this._createSeries("Test loss", palette.color(), props.data, "test_loss");
            //this.data[2] = this._createSeries("Training loss", palette.color(), props.data, "training_loss");

            if (!this.graph) {
                this._createGraph();
            }

            this.graph.render();
        }
    }, {
        key: 'handleResize',
        value: function handleResize() {
            console.log(this.refs.graph);
            this.graph.configure({
                width: this.refs.graph.clientWidth - 40
            });
            this.graph.render();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('resize', this.resize);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProp) {
            return true;
        }
    }, {
        key: 'render',
        value: function render() {
            var containerStyle = { position: "relative", fontFamily: "Arial" };
            var chartStyle = { position: "relative", left: "40px" };
            var axisStyle = { position: "absolute", top: "0", bottom: "0", width: "40px" };
            var legendStyle = { display: "inline-block", verticalAlign: "top", margin: "0 0 0 10px" };
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    { style: containerStyle },
                    _react2['default'].createElement('div', { ref: 'yaxis', style: axisStyle }),
                    _react2['default'].createElement('div', { ref: 'graph', style: chartStyle })
                ),
                _react2['default'].createElement('div', { ref: 'legend', style: legendStyle })
            );
        }
    }]);

    return LineChart;
})(_react2['default'].Component);

module.exports = LineChart;