obj.data.forEach((trace) => {
  if (trace.name === "Sample Data") {
    trace.yaxis = 'y'; // Primary Y-axis (default)
  } else if (trace.name === "Sample Data2") {
    trace.yaxis = 'y2'; // Secondary Y-axis
  }

  trace.type = 'scatter';
  trace.mode = 'lines';
  plotlySeries.push(trace);
});


layout: {
  title: { text: "Sample Data + Sample Data2" },
  xaxis: {
    title: 'Time',
    type: 'date',
  },
  yaxis: {
    title: 'Primary Y Axis (Sample Data)',
    autorange: true,
  },
  yaxis2: {
    title: 'Secondary Y Axis (Sample Data2)',
    overlaying: 'y',   // Stack on top of primary Y
    side: 'right',     // Appear on right side
    autorange: true,
  },
  plot_bgcolor: '#ffffff',
  paper_bgcolor: '#ffffff',
  font: { color: '#000000' },
  showlegend: true,
  legend: {
    orientation: 'h',
    x: 0,
    y: -0.3,
  },
}
