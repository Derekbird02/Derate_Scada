const { data, variables, options, utils } = arguments;

if (!data.series.length || !data.series[0].fields.length) {
  return {
    data: [],
    layout: { title: 'No data available' },
  };
}

let raw = data.series[0].fields[0].values;
let jsonText = raw?.get(0); // Assumes the JSON is in first row
let parsed;

try {
  parsed = JSON.parse(jsonText); // Should be { data: [...] }
} catch (err) {
  return {
    data: [],
    layout: { title: 'Invalid JSON format in data field' },
  };
}

return {
  data: parsed.data,
  layout: {
    title: 'Custom Plotly Chart',
    xaxis: { title: 'Time' },
    yaxis: { title: 'Value' },
  },
};
