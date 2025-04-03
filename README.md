import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ForcedVPage() {
    const [selectedPark, setSelectedPark] = useState("");
    const [selectedDevice, setSelectedDevice] = useState("");
    const [data, setData] = useState([]);
    
    const parkNames = [...new Set(data.map((item) => item.park_name))];

    const devicesForPark = selectedPark
    ? [...new Set(data.filter((item) => item.park_name === selectedPark).map((item) => item.device_name))]
    : [];

    const filteredData = data.filter((item) => 
        (!selectedPark || item.park_name === selectedPark) &&
        (!selectedDevice || item.device_name === selectedDevice)
    );

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
  
    return (
        <div className="mb-4 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 md:p-6">
          {/* Filters */}
          <div className="flex space-x-4 mb-4">
            {/* Park Name Filter */}
            <Autocomplete
          options={parkNames}
          sx={{
            svg: { color: "#FFFFFF" },
            input: { color: "#FFFFFF" },
            label: { color: "#FFFFFF" },
          }}
          className="block p-2.5 w-full text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"

          value={selectedPark}
          onChange={(event, newValue) => {
            setSelectedPark(newValue);
            setSelectedDevice(null); // Reset device selection
          }}
          renderInput={(params) => <TextField {...params} label="Select Park" variant="outlined" />}
          fullWidth
        />
    
    <Autocomplete
          options={devicesForPark}
          sx={{
            svg: { color: "#FFFFFF" },
            input: { color: "#FFFFFF" },
            label: { color: "#FFFFFF" },
          }}
          className="block p-2.5 w-full text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"

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
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
                  <th scope="col" className="px-4 py-3">Park Name</th>
                  <th scope="col" className="px-4 py-3">Device Name</th>
                  <th scope="col" className="px-4 py-3">Variable Name</th>
                  <th scope="col" className="px-4 py-3">Value</th>
                  <th scope="col" className="px-4 py-3">Unit</th>
                  <th scope="col" className="px-4 py-3">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 font-normal whitespace-nowrap dark:text-white">{item.park_name}</td>
                    <td className="px-4 py-3 font-normal whitespace-nowrap dark:text-white">{item.device_name}</td>
                    <td className="px-4 py-3 font-normal whitespace-nowrap dark:text-white">{item.variable_name}</td>
                    <td className="px-4 py-3 font-normal whitespace-nowrap dark:text-white">{item.value_string}</td>
                    <td className="px-4 py-3 font-normal whitespace-nowrap dark:text-white">{item.unit}</td>
                    <td className="px-4 py-3 font-normal whitespace-nowrap dark:text-white">{item.insert_dttm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
}
