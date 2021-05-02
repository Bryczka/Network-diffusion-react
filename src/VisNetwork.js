import React, { Component, createRef } from "react";
import { Network } from "vis";
import vis from "vis";
import {
  FormControl,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Slider,
} from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { options } from "./Constants";

var data;
var backendData = [];
var simulation = [];

class VisNetwork extends Component {
  constructor() {
    super();
    this.appRef = createRef();
    this.state = { radioValue: "0", nodesCount: 50, currentIterationNumber: 1 };
  }

  render() {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <form onSubmit={this.handleSubmit} style={{ flex: 1 }}>
            <FormControl
              style={{
                width: "100%",
                alignItems: "center",
              }}
            >
              <RadioGroup
                value={this.state.radioValue}
                onChange={this.handleRadioChange}
                style={{ flex: 1, flexDirection: "row", padding: 10 }}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="Sieć regularna"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sieć losowa"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Sieć Scale Free"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Sieć Small World"
                />
              </RadioGroup>
              <div style={{ flexDirection: "row" }}>
                <TextField
                  id="outlined-basic"
                  label="Liczba węzłów"
                  variant="standard"
                  value={this.state.nodesCount}
                  onChange={this.handleNodesCountChange}
                />
                <Button type="submit" variant="contained" color="primary">
                  Generuj nową sieć
                </Button>
              </div>
            </FormControl>
          </form>
          <div style={{ flex: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSimulation}
            >
              Rozpocznij symulacje
            </Button>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            height: "70vh",
            width: "100%",
            backgroundColor: "lightgray",
          }}
          ref={this.appRef}
        />
        <div style={{ flex: 1, flexDirection: "row" }}>
          <Slider
            value={this.state.currentIterationNumber}
            step={1}
            marks
            min={1}
            max={1000}
          />
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
    );
  }

  handleSimulation = () => {
    console.log(JSON.stringify(backendData));
    fetch("https://localhost:44316/simulation/0.3/100", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(backendData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        simulation = responseData;
        data.nodes.update(simulation[0]);
      });
  };

  handleNextIteration = () => {
    this.setState({
      currentIterationNumber: this.state.currentIterationNumber + 1,
    });
    console.log(this.state.currentIterationNumber);
    data.nodes.update(simulation[this.state.currentIterationNumber]);
  };

  handlePreviousIteration = () => {
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
  };

  handleNodesCountChange = (event) => {
    this.setState({ nodesCount: event.target.value });
  };

  handleRadioChange = (event) => {
    this.setState({ radioValue: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      "https://localhost:44316/network/" +
        this.state.radioValue +
        "/" +
        this.state.nodesCount
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

  changeColor = () => {
    data.nodes.update({
      id: Math.floor(Math.random() * data.nodes.length),
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    });
  };
}

export default VisNetwork;
