import React, { Component } from "react";
import { FormControl, Button, TextField, Select, MenuItem } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

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
          <div style={{ flex: 1, flexDirection: "row", display: "flex", justifyContent: "center" }}>
            <h3 style={{ marginTop: 0 }}>Generowanie symulacji rozprzestrzeniania</h3>
            <ArrowDropDownIcon />
          </div>

          <FormControl
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <div style={{ flexDirection: "row", flex: 1 }}>
              <Select value={this.state.modelType} onChange={this.handleModelChange} style={{ marginRight: 20, width: 150, paddingBottom: 20 }}>
                <MenuItem value="0">Model SI</MenuItem>
                <MenuItem value="1">Model SIS</MenuItem>
                <MenuItem value="2">Model SIR</MenuItem>
                <MenuItem value="3">Model Threshold</MenuItem>
                <MenuItem value="4">Model Voter</MenuItem>
                <MenuItem value="5">Model Majority Rule</MenuItem>
                <MenuItem value="6">Model Sznajd</MenuItem>
              </Select>
              <TextField
                label="Liczba iteracji"
                variant="standard"
                value={this.state.iterationsCount}
                onChange={this.handleIterationsCountChange}
                style={{ marginRight: 20, width: 150, paddingBottom: 20 }}
              />
              <TextField
                label="Współczynnik zaraźliwości"
                variant="standard"
                value={this.state.infectionRate}
                onChange={this.handleInfectionRateChange}
                style={{ marginRight: 20, width: 150, paddingBottom: 20 }}
              />
              <TextField
                label="Współczynnik ozdrowień"
                variant="standard"
                value={this.state.recoveryRate}
                onChange={this.handleRecoveryRateChange}
                style={{ marginRight: 20, width: 150, paddingBottom: 20 }}
              />
              <Button type="submit" variant="contained" color="primary" style={{ justifySelf: "center" }}>
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
