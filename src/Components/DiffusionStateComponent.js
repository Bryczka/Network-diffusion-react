import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import { CompactPicker } from "react-color";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class DiffusionStateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateData: this.props.stateData,
    };
  }

  handleEditing() {
    this.props.changeStateData(this.state.stateData);
  }

  render() {
    return (
      <Accordion style={{ marginBottom: 10 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: "#eeeeee" }}>
          <Typography>{this.state.stateData.Title}</Typography>
        </AccordionSummary>
        <div style={{ padding: 5, alignContnet: "center", justifyItems: "center", flex: 1, marginTop: 10 }}>
          <TextField
            id="state-propability"
            label="Prawdopodobieństwo wejścia w stan"
            style={{ flex: 1 }}
            variant="outlined"
            fullWidth
            value={this.state.stateData.ChangeToPropabilityRate}
            onChange={(event) => {
              this.setState({ stateData: { ...this.state.stateData, ChangeToPropabilityRate: event.target.value } }, this.handleEditing);
            }}
          />
          <div style={{ justifyContent: "center", display: "flex", padding: 5 }}>
            <CompactPicker
              color={this.props.stateData.Color}
              onChange={(color) => {
                this.setState({ stateData: { ...this.state.stateData, Color: color.hex } }, this.handleEditing);
              }}
            />
          </div>
        </div>
      </Accordion>
    );
  }
}

export default DiffusionStateComponent;
