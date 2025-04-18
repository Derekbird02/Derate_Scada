import React, { useState, useMemo } from "react";
import { TextField, Autocomplete, Switch, FormControlLabel } from "@mui/material";


export default function FrequencyPage({frequencyData}) {
  const [selectedEmcode, setSelectedEmcode] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const emcodeOptions = useMemo(() => {
    return [...new Set(frequencyData.map(item => item.emcode))];
  }, [frequencyData]);
  
  const platformOptions = useMemo(() => {
    return [...new Set(frequencyData.map(item => item.platform))];
  }, [frequencyData]);
  
  const filteredData = useMemo(() => {
    return frequencyData.filter(item => {
      return (
        (selectedEmcode ? item.emcode === selectedEmcode : true) &&
        (selectedPlatform ? item.platform === selectedPlatform : true)
      );
    });
  }, [frequencyData, selectedEmcode, selectedPlatform]);
  
  
  
    return (
      <div id="reviews" role="tabpanel">
        <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mb-4 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 md:p-6">
              <div className="items-center justify-between pb-4 md:flex mb">
                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white md:mb-0">
                  EM Code Frequency
                </h2>
              </div>
  
              <div className="mb-4 items-center gap-4 sm:flex">
      <Autocomplete
        options={emcodeOptions}
        value={selectedEmcode}
        onChange={(e, newValue) => setSelectedEmcode(newValue)}
        size="small"
        className="block p-2.5 text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        sx={{
          width: 300,
          svg: { color: "#FFFFFF" },
          input: { color: "#FFFFFF" },
          label: { color: "#FFFFFF" },
        }}
        renderInput={(params) => (
          <TextField {...params} label="Select EM Code" variant="outlined" />
        )}
      />
      <Autocomplete
        options={platformOptions}
        value={selectedPlatform}
        onChange={(e, newValue) => setSelectedPlatform(newValue)}
        size="small"
        className="block p-2.5 text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        sx={{
          width: 300,
          svg: { color: "#FFFFFF" },
          input: { color: "#FFFFFF" },
          label: { color: "#FFFFFF" },
        }}
        renderInput={(params) => (
          <TextField {...params} label="Select Platform" variant="outlined" />
        )}
      />
      
    </div>
  
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        EM Code
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Platform
                      </th>
                      <th scope="col" className="px-4 py-3">
                        1 Day
                      </th>
                      <th scope="col" className="px-4 py-3 whitespace-nowrap">
                        7 Day
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {filteredData.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                    <td className="px-4 py-2">
                        <div className="inline-flex items-center text-xs font-medium rounded">
                          {row.emcode}
                        </div>
                    </td>
                    <td className="px-4 py-2">
                        <div className="inline-flex items-center text-xs font-medium rounded">
                          {row.platform}
                        </div>
                    </td>
                    <td className="px-4 py-2">
                        <div className="inline-flex items-center text-xs font-medium rounded">
                          {row.one_day}
                        </div>
                    </td>
                    <td className="px-4 py-2">
                        <div className="inline-flex items-center text-xs font-medium rounded">
                          {row.one_week}
                        </div>
                    </td>

                <td className="px-4 py-2">
                    <button
                          type="button"
                          className="inline-flex items-center p-1.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                          <span className="sr-only">Show CRUD actions</span>
                        </button>
                    </td>
                    
                    </tr>

                    ))}
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}
