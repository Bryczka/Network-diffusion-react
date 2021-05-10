import React, { Component, createRef } from "react";
import { Network } from "vis";
import vis from "vis";
import { options } from "../Constants";
import NetworkTypeComponent from "./NetworkTypeComponent";
import NetworkSimulationComponent from "./NetworkSimulationComponent";
import Card from "@material-ui/core/Card";
import SimulationStepsComponent from "./SimulationStepsComponent";
import StatisticsComponent from "./StatisticsComponent";

var data;
var backendData = [];
var simulation = [];

class VisNetwork extends Component {
  constructor() {
    super();
    this.appRef = createRef();
    this.state = {
      currentIterationNumber: 0,
      iterationsCount: 100,
      networkPrepared: false,
      simulation: [],
    };
  }

  updateSimulation(e) {
    this.setState({ simulation: e.target.value });
  }

  render() {
    return (
      <div style={{ display: "flex", height: "100%", flexDirection: "row" }}>
        <div style={{ flex: 1, backgroundColor: "lightgray", overflowY: "scroll" }}>
          <Card style={{ margin: 10, padding: 20 }}>
            <NetworkTypeComponent parentCallback={this.handleNetworkGeneration} />
          </Card>
          <Card style={{ margin: 10, padding: 20 }}>
            <NetworkSimulationComponent
              parentCallback={this.handleSimulationGeneration}
              handleIterationsCountChange={this.handleIterationsCountChange}
            />
          </Card>
          <Card style={{ margin: 10, padding: 20 }}>
            <SimulationStepsComponent
              key={this.state.iterationsCount}
              singleStep={this.handleSimulationSteps}
              resetSimulation={this.handleSimulationStop}
              iterationsCount={this.state.iterationsCount}
            />
          </Card>
        </div>
        <div style={{ flex: 4, backgroundColor: "#efefef" }} ref={this.appRef}></div>
        {this.state.networkPrepared && (
          <Card style={{ margin: 10, padding: 20, position: "absolute", right: 10, bottom: 10, width: 400, height: 220 }}>
            <StatisticsComponent network={backendData} simulation={this.state.simulation} currentIteration={this.state.currentIterationNumber} />
          </Card>
        )}
      </div>
    );
  }

  handleIterationsCountChange = (iterationsCount) => {
    this.setState({ iterationsCount: iterationsCount });
  };

  handleSimulationStop = () => {
    data.nodes.update(simulation[0]);
    this.setState({ currentIterationNumber: 0 });
  };

  handleSimulationSteps = (simulationStep) => {
    this.setState({ currentIterationNumber: simulationStep });
    data.nodes.update(simulation[simulationStep]);
  };

  handleSimulationGeneration = (simulationParameters) => {
    this.setState({ currentIterationNumber: 0 });
    this.handleSimulation(simulationParameters);
  };

  handleSimulation = (simulationParameters) => {
    this.setState({ simulationPrepared: false });
    fetch("https://localhost:5001/simulation/" + simulationParameters.iterationsCount + "/" + simulationParameters.modelType, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ Item1: backendData, Item2: simulationParameters.statesData }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        simulation = responseData;
        data.nodes.update(simulation[0]);
        this.setState({ simulation: simulation });
      });
  };

  handleNetworkGeneration = (networkParameters) => {
    this.handleNetworkRequest(networkParameters);
  };

  handleNetworkRequest = (networkParameters) => {
    this.setState({ networkPrepared: false });
    fetch("https://localhost:5001/network/" + networkParameters.networkType + "/" + networkParameters.nodesCount, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(networkParameters.networkParameters),
    })
      .then((response) => response.json())
      .then((responseData) => {
        backendData = responseData;
        data = {
          nodes: new vis.DataSet(responseData.nodes),
          edges: new vis.DataSet(responseData.edges),
        };
        this.network = new Network(this.appRef.current, data, options);
        this.setState({ networkPrepared: true });
      });
  };
}

export default VisNetwork;
