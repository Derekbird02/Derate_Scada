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
    const variableCounts = data.reduce((acc, item) => {
        acc[item.variable_name] = (acc[item.variable_name] || 0) + 1;
        return acc;
    }, {});

    const topVariables = Object.entries(variableCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([name, value]) => ({ id: name, value, label: name }));
  
    return (
        <div className="mb-4 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 md:p-6">
          {/* Filters */}
          <div className="flex space-x-4 mb-4">
            {/* Park Name Filter */}
            <Autocomplete
                options={parkNames}
                size="small"
                sx={{ width: 200 }}
                value={selectedPark}
                onChange={(event, newValue) => {
                    setSelectedPark(newValue);
                    setSelectedDevice(null); // Reset device selection
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
          
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <button 
                className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50" 
                onClick={() => setPage(page - 1)} 
                disabled={page === 0}
            >
                Previous
            </button>
            <button 
                className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50" 
                onClick={() => setPage(page + 1)} 
                disabled={(page + 1) * rowsPerPage >= filteredData.length}
            >
                Next
            </button>
          </div>
          
          {/* Pie Chart */}
          <div className="mt-6 flex justify-center">
            <PieChart
                series={[{ data: topVariables, innerRadius: 50, outerRadius: 100 }]}
                width={400}
                height={300}
            />
          </div>
        </div>
      );
}
