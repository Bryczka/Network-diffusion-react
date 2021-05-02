export const options = {
  physics: {
    enabled: true,
    forceAtlas2Based: {
      gravitationalConstant: -50,
      centralGravity: 0.05,
      springConstant: 1.2,
      springLength: 10,
      damping: 0.4,
      avoidOverlap: 0,
    },
    maxVelocity: 50,
    minVelocity: 0.1,
    solver: "forceAtlas2Based",
    stabilization: {
      enabled: false,
      iterations: 1000,
      updateInterval: 100,
      onlyDynamicEdges: false,
      fit: false,
    },
    timestep: 0.5,
    adaptiveTimestep: true,
  },
  layout: { improvedLayout: false },
};
