import vis from "vis";

export const generateNetwork = (nodeCount) => {
  var generatedNodes = [];
  var generatedEdges = [];

  for (var node = 0; node < nodeCount; node++) {
    generatedNodes.push({
      id: node,
      color: "black",
      title: "Susceptible",
    });
    generatedEdges.push({
      from: node,
      to: Math.floor(Math.random() * nodeCount - 1),
    });
  }

  var dataNodes = new vis.DataSet(generatedNodes);
  var dataEdges = new vis.DataSet(generatedEdges);
  console.log(generatedNodes);
  const graph = {
    nodes: dataNodes,
    edges: dataEdges,
  };
  return graph;
};
