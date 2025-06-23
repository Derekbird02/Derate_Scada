const { data } = arguments;

let raw = data.series[0].fields[0].values;
let plotlyData = [];

for (let i = 0; i < raw.length; i++) {
  let row = raw.get(i);

  try {
    // Only parse if it's a string
    let obj = typeof row === 'string' ? JSON.parse(row) : row;

    if (Array.isArray(obj.data)) {
      plotlyData.push(...obj.data);
    }
  } catch (e) {
    // Optionally log or skip invalid row
    // console.log('Invalid JSON at row', i, row);
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
