// Get the raw Plotly JSON string
const raw = data.series[0].fields[0].values[0];

// Parse the string into a JavaScript object
const plotlyChart = JSON.parse(raw);

// Enhance layout with custom styles
plotlyChart.layout = {
  ...(plotlyChart.layout || {}),

  // Title customization
  title: {
    text: plotlyChart.layout?.title?.text || "My Custom Plot",
    font: {
      color: 'white', // Title font color
      size: 22
    }
  },

  // X-axis customization
  xaxis: {
    ...(plotlyChart.layout?.xaxis || {}),
    title: {
      text: plotlyChart.layout?.xaxis?.title?.text || "X Axis",
      font: { color: 'white' }
    },
    tickfont: {
      color: 'white'
    }
  },

  // Y-axis customization
  yaxis: {
    ...(plotlyChart.layout?.yaxis || {}),
    title: {
      text: plotlyChart.layout?.yaxis?.title?.text || "Y Axis",
      font: { color: 'white' }
    },
    tickfont: {
      color: 'white'
    }
  },

  // Legend customization (keeps toggling behavior)
  showlegend: true,
  legend: {
    font: { color: 'white' },
    bgcolor: 'rgba(0,0,0,0)',
    bordercolor: '#444'
  },

  // Optional: background and plot styling
  paper_bgcolor: 'transparent',
  plot_bgcolor: 'transparent'
};

// Return the formatted chart
return {
  data: plotlyChart.data,
  layout: plotlyChart.layout
};
