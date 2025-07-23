const raw = data.series[0].fields[0].values[0];
const plotlyChart = JSON.parse(raw);

// Force all traces to use the main y-axis
plotlyChart.data.forEach(trace => {
  delete trace.yaxis;
});

plotlyChart.layout = {
  ...(plotlyChart.layout || {}),

  title: {
    ...(plotlyChart.layout?.title || {}),
    font: {
      color: 'black'
    },
    y: 0.90,
    yanchor: 'top',
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
    tickfont: { color: 'black' },
    titlefont: { color: 'black' }
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