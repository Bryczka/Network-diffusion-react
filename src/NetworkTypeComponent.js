import React, { Component } from "react";
import { FormControl, Button, RadioGroup, FormControlLabel, Radio, TextField } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

class NetworkTypeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { radioValue: "0", nodesCount: 50 };
  }

  onGenerationConfirm = (event) => {
    this.props.parentCallback({
      networkType: this.state.radioValue,
      nodesCount: this.state.nodesCount,
    });
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.onGenerationConfirm} style={{ flex: 1 }}>
        <div style={{ flex: 1, flexDirection: "row", display: "flex", justifyContent: "center" }}>
          <h3 style={{ marginTop: 0 }}>Generowanie modelu sieci</h3>
          <ArrowDropDownIcon />
        </div>

        <FormControl
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <RadioGroup
            value={this.state.radioValue}
            onChange={this.handleRadioChange}
            style={{ flex: 1, display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <FormControlLabel value="0" control={<Radio />} label="Sieć regularna" />
            <FormControlLabel value="1" control={<Radio />} label="Sieć losowa" />
            <FormControlLabel value="2" control={<Radio />} label="Sieć Scale Free" />
            <FormControlLabel value="3" control={<Radio />} label="Sieć Small World" />
          </RadioGroup>
          <div style={{ flex: 1, display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <TextField
              id="outlined-basic"
              label="Liczba węzłów"
              variant="standard"
              value={this.state.nodesCount}
              onChange={this.handleNodesCountChange}
              style={{ marginRight: 20, width: 150 }}
            />
            <Button type="submit" variant="contained" color="primary" s>
              Generuj sieć
            </Button>
          </div>
        </FormControl>
      </form>
    );
  }

  handleNodesCountChange = (event) => {
    this.setState({ nodesCount: event.target.value });
  };

  handleRadioChange = (event) => {
    this.setState({ radioValue: event.target.value });
  };
}

export default NetworkTypeComponent;
