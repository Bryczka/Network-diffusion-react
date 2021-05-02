import React, { Component, createRef } from "react";
import { Graph2d, DataSet, moment } from "vis";

var items = [
  { x: "2014-06-13", y: 30, group: 0 },
  { x: "2014-06-14", y: 10, group: 0 },
  { x: "2014-06-15", y: 15, group: 1 },
  { x: "2014-06-16", y: 30, group: 1 },
  { x: "2014-06-17", y: 10, group: 1 },
  { x: "2014-06-18", y: 15, group: 1 },
];
var data = new DataSet(items);

var options = {
  start: moment().add(-30, "seconds"), // changed so its faster
  end: moment(),
  dataAxis: {
    left: {
      range: {
        min: -10,
        max: 10,
      },
    },
  },
  drawPoints: {
    style: "circle", // square, circle
  },
  shaded: {
    orientation: "bottom", // top, bottom
  },
};

class VisGraph extends Component {
  constructor() {
    super();
    this.graph2d = {};
    this.appRef = createRef();
  }

  componentDidMount() {
    this.graph2d = new Graph2d(this.appRef.current, data, options);
  }

  render() {
    return (
      <>
        {/* <button onClick={this.changeColor}>Zmień kolor</button> */}
        <div style={{ height: "400px" }} ref={this.appRef} />;
      </>
    );
  }
}

export default VisGraph;
