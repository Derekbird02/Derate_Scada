const { data } = arguments;

// Get the `workflow` and `data` fields
let workflowField = data.series[0].fields.find(f => f.name === "workflow");
let dataField = data.series[0].fields.find(f => f.name === "data");

// Get the actual workflow name from the first row
let workflowName = workflowField?.values?.get(0) || "";

// Map workflow name to the correct trace name
let targetName = "";
if (workflowName === "120") {
  targetName = "SampleData3";
} else if (workflowName === "430Flow") {
  targetName = "SampleTest3";
} else {
  targetName = "Unknown"; // fallback
}

// Parse and filter trace data
let raw = dataField?.values;
let plotlySeries = [];

for (let i = 0; i < raw.length; i++) {
  let row = raw.get(i);
  try {
    let obj = typeof row === 'string' ? JSON.parse(row) : row;

    if (Array.isArray(obj.data)) {
      obj.data.forEach((trace) => {
        if (trace.name === targetName) {
          trace.yaxis = 'y';
          trace.type = 'scatter';
          trace.mode = 'lines';
          plotlySeries.push(trace);
        }
      });
    }
  } catch (e) {
    // skip invalid JSON rows
  }
}

// Final output
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
