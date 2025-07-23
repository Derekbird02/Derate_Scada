const raw = data.series[0].fields[0].values[0];
const plotlyChart = JSON.parse(raw);

// Check if the first trace exists
const firstTrace = plotlyChart.data?.[0];

if (!firstTrace) {
  // If no trace, return a blank chart with "No Data" title
  return {
    data: [],
    layout: {
      title: {
        text: 'No Data Available',
        font: {
          color: 'white',
          size: 20
        }
      },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      xaxis: { visible: false },
      yaxis: { visible: false },
      showlegend: false
    }
  };
}

// Otherwise continue as normal
plotlyChart.layout = {
  ...(plotlyChart.layout || {}),

  title: {
    text: firstTrace.name || 'Untitled Trace',
    font: {
      color: 'white',
      size: 22
    },
    y: 0.95,
    yanchor: 'top',
    pad: { b: 10 }
  },

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

  showlegend: true,
  legend: {
    orientation: 'h',
    x: 0.5,
    xanchor: 'center',
    y: -0.2,
    font: { color: 'white' },
    bgcolor: 'rgba(0,0,0,0)',
    bordercolor: '#444'
  },

  margin: {
    t: 100
  },

  paper_bgcolor: 'transparent',
  plot_bgcolor: 'transparent'
};

// Return only the first trace with styled layout
return {
  data: [firstTrace],
  layout: plotlyChart.layout
};
