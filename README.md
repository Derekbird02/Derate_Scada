return {
  data: plotlySeries,
  layout: {
    title: { text: 'Custom Plotly Chart' },
    xaxis: {
      title: 'Time',
      type: 'date',
      autorange: true,
    },
    yaxis: {
      title: 'Value',
      autorange: true,
      fixedrange: false,
    },
    showlegend: true,
    legend: {
      orientation: "h",
      x: 0,
      y: -0.3
    },
  },
};
