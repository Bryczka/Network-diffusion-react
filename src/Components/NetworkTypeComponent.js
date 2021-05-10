import React, { Component } from "react";
import { FormControl, Button, TextField, Typography, Select, MenuItem } from "@material-ui/core";
import NetworkModelComponent from "./NetworkModelComponent";
class NetworkTypeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { networkType: "", nodesCount: 50, networkParameters: [], networkParametersPrepared: false };
    this.handleParametersDataChange = this.handleParametersDataChange.bind(this);
  }

  onGenerationConfirm = (event) => {
    this.props.parentCallback({
      networkType: this.state.networkType,
      nodesCount: this.state.nodesCount,
      networkParameters: this.state.networkParameters,
    });
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.onGenerationConfirm} style={{ flex: 1 }}>
        <div style={{ flex: 1, flexDirection: "row", display: "flex", justifyContent: "center" }}>
          <Typography>Generowanie modelu sieci</Typography>
        </div>
        <FormControl
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
            <Select
              value={this.state.networkType}
              onChange={this.handleNetworkTypeChange}
              style={{ flex: 3, marginRight: 5 }}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="" disabled>
                Wybierz model
              </MenuItem>
              <MenuItem value="0">Sieć regularna</MenuItem>
              <MenuItem value="1">Sieć losowa</MenuItem>
              <MenuItem value="2">Sieć Scale Free</MenuItem>
              <MenuItem value="3">Sieć Small World</MenuItem>
            </Select>
            <TextField
              label="Liczba węzłów"
              value={this.state.nodesCount}
              onChange={this.handleNodesCountChange}
              variant="outlined"
              style={{ flex: 1 }}
            />
          </div>
          {this.state.networkParametersPrepared &&
            this.state.networkParameters.map((parameter, index) => {
              return (
                <NetworkModelComponent
                  key={parameter.Id}
                  parametersData={parameter}
                  changeParametersData={this.handleParametersDataChange}
                  index={index}
                />
              );
            })}
          <Button type="submit" variant="contained" color="primary" style={{ width: "100%" }} disabled={this.state.networkType === ""}>
            Generuj sieć
          </Button>
        </FormControl>
      </form>
    );
  }

  handleParametersDataChange(value) {
    var newList = this.state.networkParameters;
    var index = newList.indexOf(newList.find((x) => x.Id === value.Id));
    newList[index] = value;
    this.setState({ networkParameters: newList });
  }

  handleNodesCountChange = (event) => {
    this.setState({ nodesCount: event.target.value });
  };

  handleNetworkTypeChange = (event) => {
    this.setState({ networkParametersPrepared: false });
    fetch("https://localhost:5001/network/model/" + event.target.value)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ networkParameters: responseData });
        this.setState({ networkParametersPrepared: true });
      });
    this.setState({ networkType: event.target.value });
  };
}

export default NetworkTypeComponent;
