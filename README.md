const { data } = arguments;

let raw = data.series[0].fields[0].values;
let plotlySeries = [];

for (let i = 0; i < raw.length; i++) {
  let row = raw.get(i);
  try {
    let obj = typeof row === 'string' ? JSON.parse(row) : row;

    if (Array.isArray(obj.data)) {
      obj.data.forEach((trace, index) => {
        // Assign yaxis dynamically: y, y2, y3...
        trace.yaxis = index === 0 ? 'y' : 'y' + (index + 1);
        trace.type = 'scatter';
        trace.mode = 'lines';
        plotlySeries.push(trace);
      });
    }
  } catch (e) {
    // ignore bad rows
  }
}

// Dynamically generate yaxis1, yaxis2, ..., yaxisN
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

plotlySeries.forEach((_, index) => {
  const axisKey = index === 0 ? 'yaxis' : 'yaxis' + (index + 1);
  layout[axisKey] = {
    title: `Y${index + 1}`,
    overlaying: 'y',
    side: index % 2 === 0 ? 'left' : 'right',
    position: index === 0 ? 0 : Math.min(1, index * 0.1), // Avoid overlapping
    anchor: 'free',
    autorange: true,
  };
});

return {
  data: plotlySeries,
  layout,
};
