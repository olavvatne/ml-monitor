import React from "react";

class Row extends React.Component {

    render() {
        if(this.props.header) {
            var row = this.props.data.map((d, i) =>{return (<th key={i}>{d.split("_").join(" ")}</th>)});
            var content = <thead><tr>{row}</tr></thead>
        }
        else {
            var row = this.props.data.map((d, i) =>{return (<td key={i}>{JSON.stringify(d)}</td>)});
            var content = <tbody><tr>{row}</tr></tbody>;
        }
        return content;
    }
}
class AutoTable extends React.Component {

    _split(a, size) {
        var arrays = [];

        while (a.length > 0)
            arrays.push(a.splice(0, size));

       return arrays;
    }

    _constructTable() {
        var content = [];

        if(this.props.data) {
            let cells;
            cells = Object.keys(this.props.data).map((name) => {
                return name
            });

            let arr = this._split(cells, 4);
            const lastElement = arr.length -1;
            while(arr[lastElement].length < 4) {
                arr[lastElement].push("");
            }

            for(var i = 0; i<arr.length; i++) {
                let keys = arr[i];
                content.push(keys);

                let values = keys.map((key) => {return this.props.data[key]});
                content.push(values);
            }


        }
       return content;
    }

    render() {
        let tableContent = this._constructTable();
        let table = tableContent.map((row, i) => {
            let isHeader = i%2 === 0;
            return (<Row data={row} header={isHeader } key={"Row" + i}/>)
        });
        return (
            <table className={this.props.className}>
                {table}
            </table>
        );
    }
}

module.exports = AutoTable;