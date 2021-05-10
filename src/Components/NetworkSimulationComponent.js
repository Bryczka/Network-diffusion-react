import React, { Component } from "react";
import { FormControl, Button, TextField, Select, MenuItem, Typography } from "@material-ui/core";
import DiffusionStateComponent from "./DiffusionStateComponent";

class NetworkSimulationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelType: "",
      statesData: [],
      iterationsCount: 100,
    };
    this.handleStatesDataChange = this.handleStatesDataChange.bind(this);
  }

  render() {
    return (
      <div style={{ flex: 1 }}>
        <form onSubmit={this.onSimulationConfirm} style={{ flex: 1 }}>
          <div style={{ flex: 1, flexDirection: "row", display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <Typography>Symulacja rozprzestrzeniania</Typography>
          </div>

          <FormControl>
            <div>
              <div style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
                <Select
                  value={this.state.modelType}
                  onChange={this.handleModelChange}
                  style={{ flex: 3, marginRight: 5 }}
                  displayEmpty
                  variant="outlined"
                >
                  <MenuItem value="" disabled>
                    Wybierz model
                  </MenuItem>
                  <MenuItem value="0">Model SI</MenuItem>
                  <MenuItem value="1">Model SIS</MenuItem>
                  <MenuItem value="2">Model SIR</MenuItem>
                  <MenuItem value="3">Model SIRS</MenuItem>
                  <MenuItem value="4">Model SEIR</MenuItem>
                  <MenuItem value="5">Model SEIRS</MenuItem>
                  <MenuItem value="6">Model Voter</MenuItem>
                  <MenuItem value="7">Model Majority Rule</MenuItem>
                  <MenuItem value="8">Model Sznajd</MenuItem>
                </Select>
                <TextField
                  label="Iteracje"
                  value={this.state.iterationsCount}
                  onChange={this.handleIterationChange}
                  variant="outlined"
                  style={{ flex: 1 }}
                />
              </div>
              {this.state.statesData.map((state, index) => {
                if (state.ChangeToPropabilityRate !== null) {
                  return <DiffusionStateComponent key={state.Id} stateData={state} index={index} changeStateData={this.handleStatesDataChange} />;
                }
                return null;
              })}
              <Button type="submit" variant="contained" color="primary" style={{ width: "100%" }} disabled={this.state.modelType === ""}>
                Generuj symulację
              </Button>
            </div>
          </FormControl>
        </form>
      </div>
    );
  }

  handleIterationChange = (event) => {
    this.setState({ iterationsCount: event.target.value });
    this.props.handleIterationsCountChange(event.target.value);
  };

  handleStatesDataChange(value) {
    var newList = this.state.statesData;
    var index = newList.indexOf(newList.find((x) => x.Id === value.Id));
    newList[index] = value;
    this.setState({ statesData: newList });
  }

  onSimulationConfirm = (event) => {
    this.props.parentCallback({
      modelType: this.state.modelType,
      statesData: this.state.statesData,
      iterationsCount: this.state.iterationsCount,
    });
    event.preventDefault();
  };

  handleIterationsCountChange = (event) => {
    this.setState({ iterationsCount: event.target.value });
  };

  handleModelChange = (event) => {
    fetch("https://localhost:5001/simulation/model/" + event.target.value)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ statesData: responseData });
      });

    this.setState({ modelType: event.target.value });
  };
}

export default NetworkSimulationComponent;
