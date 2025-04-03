import React, { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

export default function ForcedVPage() {
    const [selectedPark, setSelectedPark] = useState("");
    const [selectedDevice, setSelectedDevice] = useState("");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const rowsPerPage = 20;
    
    const parkNames = [...new Set(data.map((item) => item.park_name))];

    const devicesForPark = selectedPark
    ? [...new Set(data.filter((item) => item.park_name === selectedPark).map((item) => item.device_name))]
    : [];

    const filteredData = data.filter((item) => 
        (!selectedPark || item.park_name === selectedPark) &&
        (!selectedDevice || item.device_name === selectedDevice)
    );

    const paginatedData = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    const fetchData = async () => {
        try {
          const response = await fetch(import.meta.env.VITE_API_FORCED_VARIABLES, { method: "POST" });
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error("Error fetching fleet data:", error);
        }
      };

      useEffect(() => {
        fetchData();
      }, []);
  
    // Pie Chart Data
    const variableCounts = filteredData.reduce((acc, item) => {
        acc[item.variable_name] = (acc[item.variable_name] || 0) + 1;
        return acc;
    }, {});

    const topVariables = Object.entries(variableCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([name, value]) => ({ id: name, value, label: name }));
  
    return (
        <div className="flex">
          {/* Table and Filters */}
          <div className="flex-1 mb-4 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 md:p-6">
            {/* Filters */}
            <div className="flex space-x-4 mb-4">
              <Autocomplete
                  options={parkNames}
                  size="small"
                  sx={{ width: 200 }}
                  value={selectedPark}
                  onChange={(event, newValue) => {
                      setSelectedPark(newValue);
                      setSelectedDevice(null);
                  }}
                  renderInput={(params) => <TextField {...params} label="Select Park" variant="outlined" />}
              />
      
              <Autocomplete
                  options={devicesForPark}
                  size="small"
                  sx={{ width: 200 }}
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
              />
            </div>
      
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-3">Park Name</th>
                    <th className="px-4 py-3">Device Name</th>
                    <th className="px-4 py-3">Variable Name</th>
                    <th className="px-4 py-3">Value</th>
                    <th className="px-4 py-3">Unit</th>
                    <th className="px-4 py-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr key={index} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="px-4 py-3">{item.park_name}</td>
                      <td className="px-4 py-3">{item.device_name}</td>
                      <td className="px-4 py-3">{item.variable_name}</td>
                      <td className="px-4 py-3">{item.value_string}</td>
                      <td className="px-4 py-3">{item.unit}</td>
                      <td className="px-4 py-3">{item.insert_dttm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="text-gray-700 dark:text-gray-300">
                    Page {page + 1} of {Math.ceil(filteredData.length / rowsPerPage)}
                </span>

                <button
                    onClick={() =>
                    setPage((prev) =>
                        prev < Math.ceil(filteredData.length / rowsPerPage) - 1 ? prev + 1 : prev
                    )
                    }
                    disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
                </div>
          </div>
          
          {/* Pie Chart */}
          <div className="w-1/3 flex justify-center items-center p-4">
            <PieChart
                series={[{ data: topVariables, innerRadius: 50, outerRadius: 100 }]}
                width={300}
                height={300}
                slotProps={{ legend: { hidden: true } }}
            />
          </div>
        </div>
      );
}
