const { data } = arguments;

let raw = data.series[0].fields[0].values;
let plotlyData = [];

for (let i = 0; i < raw.length; i++) {
  try {
    let obj = JSON.parse(raw.get(i));
    if (Array.isArray(obj.data)) {
      plotlyData.push(...obj.data);
    }
  } catch (e) {
    // Ignore invalid JSON rows
  }
}

return {
  data: plotlyData,
  layout: {
    title: { text: 'Custom Plotly Chart' },
    xaxis: { title: 'Time', type: 'date' },
    yaxis: { title: 'Value', autorange: true },
  },
};
