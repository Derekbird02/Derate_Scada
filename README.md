import React, { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

export default function ForcedVPage() {
    const [selectedPark, setSelectedPark] = useState("");
    const [selectedDevice, setSelectedDevice] = useState("");
    const [selectedVariable, setSelectedVariable] = useState("");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    
    const parkNames = [...new Set(data.map((item) => item.park_name))];
    const devicesForPark = selectedPark ? [...new Set(data.filter((item) => item.park_name === selectedPark).map((item) => item.device_name))] : [];
    const variableNames = [...new Set(data.map((item) => item.variable_name))];
    
    const filteredData = data.filter((item) => 
        (!selectedPark || item.park_name === selectedPark) &&
        (!selectedDevice || item.device_name === selectedDevice) &&
        (!selectedVariable || item.variable_name === selectedVariable)
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

    // Pie Chart Data - Variables
    const variableCounts = filteredData.reduce((acc, item) => {
        acc[item.variable_name] = (acc[item.variable_name] || 0) + 1;
        return acc;
    }, {});

    const topVariables = Object.entries(variableCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([name, value]) => ({ id: name, value, label: name }));

    // Pie Chart Data - Devices
    const deviceCounts = filteredData.reduce((acc, item) => {
        acc[item.device_name] = (acc[item.device_name] || 0) + 1;
        return acc;
    }, {});

    const topDevices = Object.entries(deviceCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(([name, value]) => ({ id: name, value, label: name }));

    const siteCounts = filteredData.reduce((acc, item) => {
        acc[item.park_name] = (acc[item.park_name] || 0) + 1;
        return acc;
        }, {});
        
    const topSites = Object.entries(siteCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([name, value]) => ({ id: name, value, label: name }));
  
    return (
        <div className="flex flex-wrap">
            {/* Table and Filters */}
            <div className="flex-1 mb-4 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 md:p-6">
                {/* Filters */}
                <div className="flex space-x-4 mb-4">
                    <Autocomplete
                    
                        options={parkNames}
                        size="small"
                        className="block p-2.5 text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        sx={{
                            width:300,
                            svg: { color: "#FFFFFF" },
                            input: { color: "#FFFFFF" },
                            label: { color: "#FFFFFF" },
                        }}
                        value={selectedPark}
                        onChange={(event, newValue) => {
                            setSelectedPark(newValue);
                            setSelectedDevice("");
                            setPage(0);
                        }}
                        renderInput={(params) => <TextField {...params} label="Select Park" variant="outlined" />}
                    />
                    <Autocomplete
                        options={devicesForPark}
                        size="small"
                        className="block p-2.5 text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        sx={{
                            width:300,
                            svg: { color: "#FFFFFF" },
                            input: { color: "#FFFFFF" },
                            label: { color: "#FFFFFF" },
                        }}
                        value={selectedDevice}
                        onChange={(event, newValue) => setSelectedDevice(newValue)}
                        renderInput={(params) => <TextField {...params} label="Select Device" variant="outlined" disabled={!selectedPark} />}
                    />
                    <Autocomplete
                        options={variableNames}
                        size="small"
                        className="block p-2.5 text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        sx={{
                            width:300,
                            svg: { color: "#FFFFFF" },
                            input: { color: "#FFFFFF" },
                            label: { color: "#FFFFFF" },
                        }}
                        value={selectedVariable}
                        onChange={(event, newValue) => setSelectedVariable(newValue)}
                        renderInput={(params) => <TextField {...params} label="Select Variable" variant="outlined" />}
                    />
                </div>
                
                {/* Table */}
                <div className="overflow-x-auto">
  <table className="w-full table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th className="px-4 py-3 w-36">Park Name</th>
        <th className="px-4 py-3 w-36">Device Name</th>
        <th className="px-4 py-3 w-48">Variable Name</th>
        <th className="px-4 py-3 w-32">Value</th>
        <th className="px-4 py-3 w-40">Timestamp</th>
      </tr>
    </thead>
    <tbody>
      {paginatedData.map((item, index) => {
        let displayValue;
        if (item.unit == "null") {
          if (item.value_string === "1") displayValue = "Forced True";
          else if (item.value_string === "0") displayValue = "Forced False";
          else displayValue = item.value_string;
        } else {
          displayValue = `${item.value_string} ${item.unit}`;
        }

        return (
          <tr
            key={index}
            className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <td className="px-4 py-3 w-36 truncate">{item.park_name}</td>
            <td className="px-4 py-3 w-36 truncate">{item.device_name}</td>
            <td className="px-4 py-3 w-48 truncate">{item.variable_name}</td>
            <td className="px-4 py-3 w-32 truncate">{displayValue}</td>
            <td className="px-4 py-3 w-40 truncate">{item.insert_dttm}</td>
          </tr>
        );
      })}

      {[...Array(rowsPerPage - paginatedData.length)].map((_, index) => (
        <tr key={`empty-${index}`} className="border-b dark:border-gray-600">
          <td className="px-4 py-3 w-36">
            <span className="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 inline-block w-full"></span>
          </td>
          <td className="px-4 py-3 w-36">
            <span className="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 inline-block w-full"></span>
          </td>
          <td className="px-4 py-3 w-48">
            <span className="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 inline-block w-full"></span>
          </td>
          <td className="px-4 py-3 w-32">
            <span className="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 inline-block w-full"></span>
          </td>
          <td className="px-4 py-3 w-40">
            <span className="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 inline-block w-full"></span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

                <div className="flex justify-between items-center mt-3">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 mt-5"
                >
                    Previous
                </button>

                <span className="text-gray-700 dark:text-gray-300 mt-5">
                    Page {page + 1} of {Math.ceil(filteredData.length / rowsPerPage)}
                </span>

                <button
                    onClick={() =>
                    setPage((prev) =>
                        prev < Math.ceil(filteredData.length / rowsPerPage) - 1 ? prev + 1 : prev
                    )
                    }
                    disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 mt-5"
                >
                    Next
                </button>
                </div>
            </div>
            
            <div className="flex flex-col items-center gap-6 p-6">
      {/* Top Row - Two Pie Charts */}
      <div className="flex justify-center gap-6 w-full">
        <div className="dark:bg-gray-700 p-4 rounded-lg shadow-md w-1/2">
          <h3 className="text-center font-semibold mb-2 text-white">Top 15 Variables</h3>
          <PieChart
            series={[{ data: topVariables, innerRadius: 50, outerRadius: 100 }]}
            width={300}
            height={300}
            slotProps={{ legend: { hidden: true } }}
          />
        </div>

        <div className="dark:bg-gray-700 p-4 rounded-lg shadow-md w-1/2">
          <h3 className="text-center font-semibold mb-2 text-white">Top 15 Devices</h3>
          <PieChart
            series={[{ data: topDevices, innerRadius: 50, outerRadius: 100 }]}
            width={300}
            height={300}
            slotProps={{ legend: { hidden: true } }}
          />
        </div>
      </div>

      {/* Bottom Row - Single Pie Chart */}
      <div className="dark:bg-gray-700 p-4 rounded-lg shadow-md w-1/2">
        <h3 className="text-center font-semibold mb-2 text-white">Top 15 Sites</h3>
        <PieChart
          series={[{ data: topSites, innerRadius: 50, outerRadius: 100 }]}
          width={300}
          height={300}
          slotProps={{ legend: { hidden: true } }}
        />
      </div>
    </div>
        
        </div>
    );
}
