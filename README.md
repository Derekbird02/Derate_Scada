import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const DataTable = ({ data }) => {
  const [selectedPark, setSelectedPark] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Extract unique park names
  const parkNames = [...new Set(data.map((item) => item.park_name))];

  // Extract devices for the selected park
  const devicesForPark = selectedPark
    ? [...new Set(data.filter((item) => item.park_name === selectedPark).map((item) => item.device_name))]
    : [];

  // Filter table data
  const filteredData = data.filter((item) => 
    (!selectedPark || item.park_name === selectedPark) &&
    (!selectedDevice || item.device_name === selectedDevice)
  );

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="flex space-x-4 mb-4">
        {/* Park Name Dropdown */}
        <Autocomplete
          options={parkNames}
          value={selectedPark}
          onChange={(event, newValue) => {
            setSelectedPark(newValue);
            setSelectedDevice(null); // Reset device selection
          }}
          renderInput={(params) => <TextField {...params} label="Select Park" variant="outlined" />}
          fullWidth
        />

        {/* Device Name Dropdown */}
        <Autocomplete
          options={devicesForPark}
          value={selectedDevice}
          onChange={(event, newValue) => setSelectedDevice(newValue)}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="Select Device" 
              variant="outlined" 
              disabled={!selectedPark} 
            />
          )}
          fullWidth
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Park Name</th>
              <th className="border px-4 py-2">Device Name</th>
              <th className="border px-4 py-2">Variable Name</th>
              <th className="border px-4 py-2">Value</th>
              <th className="border px-4 py-2">Unit</th>
              <th className="border px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border">
                <td className="border px-4 py-2">{item.park_name}</td>
                <td className="border px-4 py-2">{item.device_name}</td>
                <td className="border px-4 py-2">{item.variable_name}</td>
                <td className="border px-4 py-2">{item.value_string}</td>
                <td className="border px-4 py-2">{item.unit}</td>
                <td className="border px-4 py-2">{item.insert_dttm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Example data
const sampleData = [
  { park_name: "Park A", device_name: "Device 1", variable_name: "Voltage", value_string: "220", unit: "V", insert_dttm: "2024-04-01 10:00:00" },
  { park_name: "Park A", device_name: "Device 2", variable_name: "Current", value_string: "10", unit: "A", insert_dttm: "2024-04-01 10:01:00" },
  { park_name: "Park B", device_name: "Device 1", variable_name: "Temperature", value_string: "30", unit: "°C", insert_dttm: "2024-04-01 10:02:00" },
];

const App = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Device Data Table</h1>
      <DataTable data={sampleData} />
    </div>
  );
};

export default App;
