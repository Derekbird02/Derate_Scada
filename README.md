const { data } = arguments;

let raw = data.series[0].fields[0].values;
let plotlySeries = [];

for (let i = 0; i < raw.length; i++) {
  let row = raw.get(i);

  try {
    let obj = typeof row === 'string' ? JSON.parse(row) : row;

    if (Array.isArray(obj.data)) {
      plotlySeries.push(...obj.data);
    }
  } catch (e) {
    // Skip invalid JSON rows
  }
}

return {
  data: plotlySeries,
  layout: {
    title: { text: 'Custom Plotly Chart' },
    xaxis: { title: 'Time', type: 'date' },
    yaxis: { title: 'Value', autorange: true },
  },
};
