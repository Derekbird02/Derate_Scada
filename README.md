// Get the raw Plotly JSON string
const raw = data.series[0].fields[0].values[0];

// Parse the string into a JavaScript object
const plotlyChart = JSON.parse(raw);

// Enhance layout with custom styles
plotlyChart.layout = {
  ...(plotlyChart.layout || {}),

  // Title customization
  title: {
    ...(plotlyChart.layout?.title || {}),
    font: {
      color: 'black', // Title font color
    },
    y: 0.90,
    yanchor: 'top',
    
  },

  // X-axis customization
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

  // Y-axis customization
  yaxis: {
    ...(plotlyChart.layout?.yaxis || {}),
    
  },

  // Legend customization (keeps toggling behavior)
  showlegend: true,
  legend: {
    orientation: 'h',
    x: 0.5,
    xanchor: 'center',
    y:-0.2,
    font: { color: 'white' },
    bgcolor: 'rgba(0,0,0,0)',
    bordercolor: '#444'
  },

 
};

// Return the formatted chart
return {
  data: plotlyChart.data,
  layout: plotlyChart.layout
};
