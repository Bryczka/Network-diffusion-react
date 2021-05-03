import React, { Component, createRef } from "react";
import { Network } from "vis";
import vis from "vis";
import { Button, Slider } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { options } from "./Constants";
import NetworkTypeComponent from "./NetworkTypeComponent";
import NetworkSimulationComponent from "./NetworkSimulationComponent";

var data;
var backendData = [];
var simulation = [];

class VisNetwork extends Component {
  constructor() {
    super();
    this.appRef = createRef();
    this.state = {
      currentIterationNumber: 0,
      iterationsCount: 0,
    };
  }

  render() {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <NetworkTypeComponent parentCallback={this.handleNetworkGeneration} />
          <NetworkSimulationComponent
            parentCallback={this.handleSimulationGeneration}
          />
        </div>
        <div
          style={{
            flex: 1,
            marginTop: "20px",
            height: "70vh",
            width: "100%",
            backgroundColor: "lightgray",
          }}
          ref={this.appRef}
        />
        {this.state.iterationsCount !== 0 && (
          <>
            <Slider
              value={this.state.currentIterationNumber}
              step={1}
              marks={true}
              valueLabelDisplay="on"
              min={1}
              max={this.state.iterationsCount}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBack />}
                onClick={this.handlePreviousIteration}
              >
                Poprzednia iteracja
              </Button>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForward />}
                onClick={this.handleNextIteration}
              >
                Następna iteracja
              </Button>
            </div>
          </>
        )}
      </>
    );
  }

  handleNextIteration = () => {
    if (this.state.currentIterationNumber < this.state.iterationsCount) {
      this.setState({
        currentIterationNumber: this.state.currentIterationNumber + 1,
      });
      data.nodes.update(simulation[this.state.currentIterationNumber]);
    }
  };

  handlePreviousIteration = () => {
    if (this.state.currentIterationNumber !== 0) {
      simulation[this.state.currentIterationNumber - 1].forEach((node) =>
        data.nodes.update({
          id: node.id,
          color: "#b4ff42",
          title: "none",
        })
      );
      this.setState({
        currentIterationNumber: this.state.currentIterationNumber - 1,
      });
    }
  };

  handleSimulationGeneration = (simulationParameters) => {
    this.handleSimulation(simulationParameters);
    this.setState({ currentIterationNumber: 0 });
    this.setState({ iterationsCount: simulationParameters.iterationsCount });
  };

  handleSimulation = (simulationParameters) => {
    console.log(JSON.stringify(backendData));
    fetch(
      "https://localhost:44316/simulation/" +
        simulationParameters.modelType +
        "/" +
        simulationParameters.infectionRate +
        "/" +
        simulationParameters.recoveryRate +
        "/" +
        simulationParameters.iterationsCount,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(backendData),
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        simulation = responseData;
        data.nodes.update(simulation[0]);
      });
  };

  handleNetworkGeneration = (networkParameters) => {
    this.handleNetworkRequest(networkParameters);
  };

  handleNetworkRequest = (networkParameters) => {
    fetch(
      "https://localhost:44316/network/" +
        networkParameters.networkType +
        "/" +
        networkParameters.nodesCount
    )
      .then((response) => response.json())
      .then((responseData) => {
        backendData = responseData;
        data = {
          nodes: new vis.DataSet(responseData.nodes),
          edges: new vis.DataSet(responseData.edges),
        };
        this.network = new Network(this.appRef.current, data, options);
      });
  };
}

export default VisNetwork;
