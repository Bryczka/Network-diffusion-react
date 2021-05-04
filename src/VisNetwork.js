import React, { Component, createRef } from "react";
import { Network } from "vis";
import vis from "vis";
import { Button, Slider } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { options } from "./Constants";
import NetworkTypeComponent from "./NetworkTypeComponent";
import NetworkSimulationComponent from "./NetworkSimulationComponent";
import Card from "@material-ui/core/Card";
import Collapse from "@material-ui/core/Collapse";

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
      networkGenerationCollapse: true,
      simulationGenerationCollapse: true,
      simulationStepsCollapse: true,
      networkParametersCollapse: true,
    };
  }

  render() {
    return (
      <div style={{ display: "flex", height: "100%", flexDirection: "row" }}>
        <div style={{ flex: 1, backgroundColor: "lightgray", overflowY: "scroll" }}>
          <Collapse
            in={this.state.networkGenerationCollapse}
            collapsedHeight={70}
            //onClick={() => this.setState({ networkGenerationCollapse: !this.state.networkGenerationCollapse })}
          >
            <Card style={{ margin: 10, padding: 20 }}>
              <NetworkTypeComponent parentCallback={this.handleNetworkGeneration} />
            </Card>
          </Collapse>
          <Collapse
            in={this.state.simulationGenerationCollapse}
            collapsedHeight={70}
            //onClick={() => this.setState({ simulationGenerationCollapse: !this.state.simulationGenerationCollapse })}
          >
            <Card style={{ margin: 10, padding: 20 }}>
              <NetworkSimulationComponent parentCallback={this.handleSimulationGeneration} />
            </Card>
          </Collapse>
          <Collapse
            in={this.state.simulationStepsCollapse}
            collapsedHeight={70}
            //onClick={() => this.setState({ simulationStepsCollapse: !this.state.simulationStepsCollapse })}
          >
            <Card style={{ margin: 10, padding: 20 }}>
              <div style={{ flex: 1, flexDirection: "row", display: "flex", justifyContent: "center" }}>
                <h3 style={{ marginTop: 0 }}>Kroki symulacji</h3>
                <ArrowDropDownIcon />
              </div>
              <Slider
                value={this.state.currentIterationNumber}
                step={1}
                marks={true}
                valueLabelDisplay="on"
                min={1}
                max={this.state.iterationsCount}
                style={{ marginTop: 40 }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Button variant="contained" color="primary" startIcon={<ArrowBack />} onClick={this.handlePreviousIteration}>
                  Poprzednia iteracja
                </Button>
                <Button variant="contained" color="primary" endIcon={<ArrowForward />} onClick={this.handleNextIteration}>
                  Następna iteracja
                </Button>
              </div>
            </Card>
          </Collapse>
          <Collapse
            in={this.state.networkParametersCollapse}
            collapsedHeight={70}
            //onClick={() => this.setState({ networkParametersCollapse: !this.state.networkParametersCollapse })}
          >
            <Card style={{ margin: 10, padding: 20 }}>
              <div style={{ flex: 1, flexDirection: "row", display: "flex", justifyContent: "center" }}>
                <h3 style={{ marginTop: 0 }}>Parametry sieci</h3>
                <ArrowDropDownIcon />
              </div>
              <p>Średni stopień wierzchołka: **</p>
              <p>Największy stopień wierzchołka: **</p>
              <p>Najmniejszy stopień wierzchołka: **</p>

              <p>Średni współczynnik klasteryzacji: **</p>
              <p>Największy współczynnik klasteryzacji: **</p>
              <p>Najmniejszy współczynnik klasteryzacji: **</p>
              <p>...</p>
            </Card>
          </Collapse>
        </div>
        <div style={{ flex: 4 }} ref={this.appRef}></div>
      </div>
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
    fetch("https://localhost:44316/network/" + networkParameters.networkType + "/" + networkParameters.nodesCount)
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
