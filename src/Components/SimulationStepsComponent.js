import React, { Component } from "react";
import { Typography, Slider, IconButton } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos, Pause, PlayArrow, Stop } from "@material-ui/icons";

class SimulationStepsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { iteration: 0, maxIterations: this.props.iterationsCount };
  }

  stepBackward = () => {
    if (this.state.iteration > 0) {
      this.props.singleStep(this.state.iteration - 1);
      this.setState({ iteration: this.state.iteration - 1 });
    }
  };

  stepForward = () => {
    if (this.state.iteration < this.state.maxIterations) {
      this.props.singleStep(this.state.iteration + 1);
      this.setState({ iteration: this.state.iteration + 1 });
    }
  };

  tick = () => {
    if (this.state.iteration < this.state.maxIterations) {
      this.stepForward();
    } else {
      this.stopTimer();
    }
  };

  startTimer = () => {
    this.interval = setInterval(this.tick, 500);
  };

  stopTimer = () => {
    clearInterval(this.interval);
  };

  reset = () => {
    this.setState({ iteration: 0 });
    this.props.resetSimulation();
    clearInterval(this.interval);
  };

  render() {
    return (
      <div>
        <Typography>Kroki symulacji</Typography>
        <Slider value={this.state.iteration} step={1} marks={true} valueLabelDisplay="on" max={this.state.maxIterations} style={{ marginTop: 40 }} />
        <div style={{ flex: 1, flexDirection: "row", display: "flex", backgroundColor: "#eeeeee", justifyContent: "space-evenly" }}>
          <IconButton variant="contained" color="primary" onClick={() => this.startTimer()}>
            <PlayArrow />
          </IconButton>
          <IconButton variant="contained" color="primary" onClick={() => this.stopTimer()}>
            <Pause />
          </IconButton>
          <IconButton variant="contained" color="primary" onClick={() => this.reset()}>
            <Stop />
          </IconButton>
        </div>
        <div style={{ flex: 1, flexDirection: "row", display: "flex", backgroundColor: "#eeeeee", justifyContent: "space-evenly" }}>
          <IconButton variant="contained" color="primary" onClick={() => this.stepBackward()}>
            <ArrowBackIos />
          </IconButton>
          <IconButton variant="contained" color="primary" onClick={() => this.stepForward()}>
            <ArrowForwardIos />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default SimulationStepsComponent;
