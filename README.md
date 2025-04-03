import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function ForcedVPage() {
    const [selectedPark, setSelectedPark] = useState("");
    const [selectedDevice, setSelectedDevice] = useState("");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 20;

    const parkNames = [...new Set(data.map((item) => item.park_name))];
    const devicesForPark = selectedPark
      ? [...new Set(data.filter((item) => item.park_name === selectedPark).map((item) => item.device_name))]
      : [];

    const filteredData = data.filter((item) => 
      (!selectedPark || item.park_name === selectedPark) &&
      (!selectedDevice || item.device_name === selectedDevice)
    );

    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

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

    // Calculate top 15 most common variable names
    const variableCounts = data.reduce((acc, item) => {
        acc[item.variable_name] = (acc[item.variable_name] || 0) + 1;
        return acc;
    }, {});

    const topVariables = Object.entries(variableCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([name, count]) => ({ name, value: count }));

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6B6B", "#4CAF50", "#FF4081", "#795548", "#2196F3", "#FFC107", "#9C27B0", "#E91E63", "#CDDC39", "#607D8B"];

    return (
        <div className="mb-4 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 md:p-6">
          {/* Filters */}
          <div className="flex space-x-4 mb-4">
            <Autocomplete
              options={parkNames}
              sx={{ width: 200 }}
              size="small"
              value={selectedPark}
              onChange={(event, newValue) => {
                setSelectedPark(newValue);
                setSelectedDevice("");
              }}
              renderInput={(params) => <TextField {...params} label="Select Park" variant="outlined" />}
            />
            <Autocomplete
              options={devicesForPark}
              sx={{ width: 200 }}
              size="small"
              value={selectedDevice}
              onChange={(event, newValue) => setSelectedDevice(newValue)}
              renderInput={(params) => <TextField {...params} label="Select Device" variant="outlined" disabled={!selectedPark} />}
              disabled={!selectedPark}
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
          <div className="flex justify-between items-center mt-4">
            <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</Button>
            <span>Page {currentPage}</span>
            <Button onClick={() => setCurrentPage((prev) => (startIndex + rowsPerPage < filteredData.length ? prev + 1 : prev))} disabled={startIndex + rowsPerPage >= filteredData.length}>Next</Button>
          </div>

          {/* Pie Chart */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4">Top 15 Most Common Variable Names</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={topVariables} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                  {topVariables.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
    );
}
