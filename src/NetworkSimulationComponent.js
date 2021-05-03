import React, { Component } from "react";
import {
  FormControl,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";

class NetworkSimulationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelType: "0",
      infectionRate: 0.2,
      recoveryRate: 0,
      iterationsCount: 100,
    };
  }

  onSimulationConfirm = (event) => {
    this.props.parentCallback({
      modelType: this.state.modelType,
      infectionRate: this.state.infectionRate,
      recoveryRate: this.state.recoveryRate,
      iterationsCount: this.state.iterationsCount,
    });
    event.preventDefault();
  };

  render() {
    return (
      <div style={{ flex: 1 }}>
        <form onSubmit={this.onSimulationConfirm} style={{ flex: 1 }}>
          <FormControl
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <div style={{ flexDirection: "row" }}>
              <Select
                value={this.state.modelType}
                onChange={this.handleModelChange}
              >
                <MenuItem value="0">Model SI/SIS</MenuItem>
                <MenuItem value="1">Model SIR/SIRS</MenuItem>
                <MenuItem value="2">Model Threshold</MenuItem>
                <MenuItem value="3">Model Voter</MenuItem>
                <MenuItem value="3">Model Majority Rule</MenuItem>
                <MenuItem value="3">Model Sznajd</MenuItem>
              </Select>
              <TextField
                label="Liczba iteracji"
                variant="standard"
                value={this.state.iterationsCount}
                onChange={this.handleIterationsCountChange}
              />
              <TextField
                label="Współczynnik zaraźliwości"
                variant="standard"
                value={this.state.infectionRate}
                onChange={this.handleInfectionRateChange}
              />
              <TextField
                label="Współczynnik ozdrowień"
                variant="standard"
                value={this.state.recoveryRate}
                onChange={this.handleRecoveryRateChange}
              />
              <Button type="submit" variant="contained" color="primary">
                Generuj symulację
              </Button>
            </div>
          </FormControl>
        </form>
      </div>
    );
  }

  handleInfectionRateChange = (event) => {
    this.setState({ infectionRate: event.target.value });
  };

  handleRecoveryRateChange = (event) => {
    this.setState({ recoveryRate: event.target.value });
  };

  handleIterationsCountChange = (event) => {
    this.setState({ iterationsCount: event.target.value });
  };

  handleModelChange = (event) => {
    this.setState({ modelType: event.target.value });
  };
}

export default NetworkSimulationComponent;
