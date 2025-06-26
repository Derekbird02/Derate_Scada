const { data, variables } = arguments;

let targetName = variables?.targetName || "Sample Data3"; // Use variable or hardcoded name
let raw = data.series[0].fields[0].values;
let plotlySeries = [];

for (let i = 0; i < raw.length; i++) {
  let row = raw.get(i);
  try {
    let obj = typeof row === 'string' ? JSON.parse(row) : row;

    if (Array.isArray(obj.data)) {
      // Only include the trace that matches the target name
      obj.data.forEach((trace) => {
        if (trace.name === targetName) {
          trace.yaxis = 'y'; // Use default y-axis
          trace.type = 'scatter';
          trace.mode = 'lines';
          plotlySeries.push(trace);
        }
      });
    }
  } catch (e) {
    // skip bad rows
  }
}

return {
  data: plotlySeries,
  layout: {
    title: { text: `Trace: ${targetName}` },
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