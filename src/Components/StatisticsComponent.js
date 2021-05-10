import { Table, TableBody, TableCell, TableRow, Typography, Avatar } from "@material-ui/core";
import React, { Component } from "react";
import { PieChart } from "react-minimal-pie-chart";

var table = [];

class StatisticsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { network: [], stateNames: [] };
  }

  handleChange = (labelRenderProps) => {
    table = this.state.stateNames;
    table.push(labelRenderProps.dataEntry.title);
    this.setState({ stateNames: table });
  };

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  groupNodesByState = (currentIteration) => {
    if (this.props.simulation[currentIteration] !== undefined) {
      var statesCount = [];
      var uniqueStates = new Set(
        this.props.simulation[currentIteration].map(function (item) {
          return item.title;
        })
      );
      uniqueStates.forEach((element) => {
        statesCount.push({
          title: element,
          value: this.props.simulation[currentIteration].filter((item) => item.title === element).length,
          color: this.props.simulation[currentIteration].filter((item) => item.title === element)[0].color,
        });
      });
    }
    return statesCount;
  };

  render() {
    this.groupNodesByState();
    return (
      <>
        <Typography>Parametry wygenerowanej sieci</Typography>
        <div>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={{ borderBottom: "none", fontWeight: "bold" }}>Liczba wierzchołków</TableCell>
                <TableCell style={{ borderBottom: "none" }}>{this.props.network.nodes.length}</TableCell>
                <TableCell style={{ borderBottom: "none", fontWeight: "bold" }}>Liczba krawędzi</TableCell>
                <TableCell style={{ borderBottom: "none" }}>{this.props.network.edges.length}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div style={{ display: "flex", flexDirection: "row", margin: 10, flex: 1 }}>
          <PieChart style={{ height: 120, flex: 1 }} data={this.groupNodesByState(this.props.currentIteration)} />
          <div>
            {this.groupNodesByState(this.props.currentIteration) !== undefined &&
              this.groupNodesByState(this.props.currentIteration).map((item, index) => {
                return (
                  <div style={{ flexDirection: "row", display: "flex", alignItems: "center" }} key={index}>
                    <Avatar style={{ color: item.color, backgroundColor: item.color, height: "16px", width: "16px", margin: 5 }} variant="rounded" />
                    <Typography>
                      {item.title} ({item.value})
                    </Typography>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

export default StatisticsComponent;
