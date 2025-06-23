const { data, variables } = arguments;

let targetNames = ["Sample Data", "Sample Data2"]; // You can customize this or use variables
let raw = data.series[0].fields[0].values;
let plotlySeries = [];

for (let i = 0; i < raw.length; i++) {
  let row = raw.get(i);
  try {
    let obj = typeof row === 'string' ? JSON.parse(row) : row;

    if (Array.isArray(obj.data)) {
      obj.data.forEach((trace) => {
        if (targetNames.includes(trace.name)) {
          trace.yaxis = 'y'; // Share the same Y-axis
          trace.type = 'scatter';
          trace.mode = 'lines';
          plotlySeries.push(trace);
        }
      });
    }
  } catch (e) {
    // ignore malformed rows
  }
}

return {
  data: plotlySeries,
  layout: {
    title: { text: `Traces: ${targetNames.join(", ")}` },
    xaxis: {
      title: 'Time',
      type: 'date',
      autorange: true,
    },
    yaxis: {
      title: 'Value',
      autorange: true,
    },
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 0,
      y: -0.3,
    },
  },
};
