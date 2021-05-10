import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

class NetworkModelComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parametersData: this.props.parametersData,
    };
  }

  handleEditing() {
    this.props.changeParametersData(this.state.parametersData);
  }

  render() {
    return (
      <Accordion style={{ marginBottom: 10, flex: 1, width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: "#eeeeee" }}>
          <Typography>{this.state.parametersData.Name}</Typography>
        </AccordionSummary>
        <div style={{ padding: 5, alignContnet: "center", justifyItems: "center", flex: 1, marginTop: 10 }}>
          <TextField
            id="state-propability"
            label={this.state.parametersData.Name}
            style={{ flex: 1 }}
            variant="outlined"
            fullWidth
            value={this.state.parametersData.Value}
            onChange={(event) => {
              this.setState({ parametersData: { ...this.state.parametersData, Value: event.target.value } }, this.handleEditing);
            }}
          />
        </div>
      </Accordion>
    );
  }
}

export default NetworkModelComponent;
