const { data } = arguments;

let raw = data.series[0].fields[0].values;
let plotlySeries = [];

for (let i = 0; i < raw.length; i++) {
  let row = raw.get(i);
  try {
    let obj = typeof row === 'string' ? JSON.parse(row) : row;

    if (Array.isArray(obj.data)) {
      obj.data.forEach((trace, index) => {
        // Plotly expects first axis to be 'y', then 'y2', 'y3', ...
        trace.yaxis = index === 0 ? 'y' : 'y' + (index + 1);
        trace.type = 'scatter';
        trace.mode = 'lines';
        plotlySeries.push(trace);
      });
    }
  } catch (e) {
    // skip bad rows
  }
}

// Build layout dynamically
let layout = {
  title: { text: 'Custom Plotly Chart' },
  xaxis: {
    title: 'Time',
    type: 'date',
    autorange: true,
  },
  showlegend: true,
  legend: {
    orientation: 'h',
    x: 0,
    y: -0.3,
  },
};

// Add all required yaxes based on trace count
plotlySeries.forEach((_, index) => {
  const axisKey = index === 0 ? 'yaxis' : 'yaxis' + (index + 1);
  layout[axisKey] = {
    title: `Y${index + 1}`,
    overlaying: 'y',
    side: index % 2 === 0 ? 'left' : 'right',
    anchor: 'free',
    position: index === 0 ? 0.0 : 0.05 * index, // slightly offset axes
    autorange: true,
  };
});

return {
  data: plotlySeries,
  layout,
};
