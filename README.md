const raw = data.series[0].fields[0].values[0];
const plotlyChart = JSON.parse(raw);

// Normalize y-axis usage
plotlyChart.data.forEach((trace, index) => {
  if (index === 3) {
    trace.yaxis = 'y2'; // Trace 4 (index 3) uses secondary y-axis
  } else {
    delete trace.yaxis; // Ensure others use primary y-axis
  }
});

plotlyChart.layout = {
  ...(plotlyChart.layout || {}),

  title: {
    ...(plotlyChart.layout?.title || {}),
    font: {
      color: 'black'
    },
    y: 0.90,
    yanchor: 'top'
  },

  xaxis: {
    ...(plotlyChart.layout?.xaxis || {}),
    title: {
      text: plotlyChart.layout?.xaxis?.title?.text || "",
      font: { color: 'black' }
    },
    tickfont: {
      color: 'black'
    }
  },

  yaxis: {
    ...(plotlyChart.layout?.yaxis || {}),
    titlefont: { color: 'black' },
    tickfont: { color: 'black' }
  },

  // Define secondary y-axis for the 4th trace
  yaxis2: {
    overlaying: 'y',
    side: 'right',
    title: 'Secondary Y-Axis', // you can customize this
    titlefont: { color: 'black' },
    tickfont: { color: 'black' }
  },

  showlegend: true,
  legend: {
    orientation: 'h',
    x: 0.5,
    xanchor: 'center',
    y: -0.2,
    font: { color: 'white' },
    bgcolor: 'rgba(0,0,0,0)',
    bordercolor: '#444'
  }
};

return {
  data: plotlyChart.data,
  layout: plotlyChart.layout
};