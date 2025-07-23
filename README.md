// Get the raw Plotly JSON string
const raw = data.series[0]?.fields[0]?.values[0];

// If there's no data, return a blank chart
if (!raw) {
  return {
    data: [],
    layout: {
      title: { text: '', font: { color: 'black' } },
      xaxis: { visible: false },
      yaxis: { visible: false },
    }
  };
}

// Parse the string into a JavaScript object
const plotlyChart = JSON.parse(raw);

// Ensure at least one trace uses the default yaxis ('y')
const hasYaxis1 = plotlyChart.data?.some(trace => !trace.yaxis || trace.yaxis === 'y');
if (!hasYaxis1 && plotlyChart.data?.length > 0) {
  plotlyChart.data[0].yaxis = 'y';
}

// Build the layout enhancements
plotlyChart.layout = {
  ...(plotlyChart.layout || {}),

  title: {
    ...(plotlyChart.layout?.title || {}),
    font: { color: 'black' },
    y: 0.90,
    yanchor: 'top',
  },

  xaxis: {
    ...(plotlyChart.layout?.xaxis || {}),
    title: {
      text: plotlyChart.layout?.xaxis?.title?.text || "",
      font: { color: 'black' }
    },
    tickfont: { color: 'black' }
  },

  yaxis: {
    ...(plotlyChart.layout?.yaxis || {}),
    autorange: false,
    range: plotlyChart.layout?.yaxis?.range || undefined,
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

// Return the final Plotly config
return {
  data: plotlyChart.data,
  layout: plotlyChart.layout
};