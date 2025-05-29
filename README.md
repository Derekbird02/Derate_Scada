import React, { useState, useMemo, useEffect } from "react";
import {
  TextField,
  Autocomplete,
  MenuItem as SelectItem,
} from "@mui/material";

import FrequencyEditModal from "./FrequencyEditModal";
import TestFile from "./TestFile";


export default function FrequencyPage() {
  const [selectedEmcode, setSelectedEmcode] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalFunction, setModalFunction] = useState("");
  const [frequencyData, setFrequencyData] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const emcodeOptions = useMemo(() => {
    return [...new Set(frequencyData.map((item) => item.emcode))];
  }, [frequencyData]);

  const platformOptions = useMemo(() => {
    return [...new Set(frequencyData.map((item) => item.platform))];
  }, [frequencyData]);

  const filteredData = useMemo(() => {
    return frequencyData.filter((item) => {
      return (
        (selectedEmcode ? item.emcode === selectedEmcode : true) &&
        (selectedPlatform ? item.platform === selectedPlatform : true)
      );
    });
  }, [frequencyData, selectedEmcode, selectedPlatform]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);

  const handleEditClick = (row) => {
    setEditRow(row);
    setModalFunction("edit")
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditRow(null);
    setShowModal(false);
  };

  const handleAddModal = () => {
    setModalFunction("add")
    setShowModal(true);
  };

  const fetchData = async () => {
      const fetchURL = import.meta.env.VITE_API_FREQUENCY_FETCH;
  
      try {
        const response = await fetch(fetchURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const table1Data = await response.json();

        setFrequencyData(table1Data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
  
    useEffect(() => {
      fetchData();
    }, []);

  

  return (
    <div id="reviews" role="tabpanel">
      <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 md:p-6">
            

            <div className="mb-4 items-center gap-4 flex justify-between">
              <div className="flex">
              <Autocomplete
                options={emcodeOptions}
                value={selectedEmcode}
                onChange={(e, newValue) => {
                  setSelectedEmcode(newValue);
                  setCurrentPage(1);
                }}
                size="small"
                sx={{
                  width:300,
                  svg: { color: "#FFFFFF" },
                  input: { color: "#FFFFFF" },
                  label: { color: "#FFFFFF" },
                  color:"white"
              }}
                renderInput={(params) => (
                  <TextField {...params} label="Select EM Code" variant="outlined" />
                )}
                className="block p-2.5 text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
              <Autocomplete
                options={platformOptions}
                value={selectedPlatform}
                onChange={(e, newValue) => {
                  setSelectedPlatform(newValue);
                  setCurrentPage(1);
                }}
                size="small"
                sx={{
                            width:300,
                            svg: { color: "#FFFFFF" },
                            input: { color: "#FFFFFF" },
                            label: { color: "#FFFFFF" },
                            color:"white"
                        }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Platform" variant="outlined" />
                )}
                className="ml-5 block p-2.5 text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
              </div>
              <div>
              <button
                type="button"
                onClick={handleAddModal}
                className="mr-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:bg-gray-600 dark:hover:text-white"
                title="Add Code"
              >
                <svg className="w-5 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1v12M1 7h12" />
                </svg>
                <span className="sr-only">Create Alert</span>
              </button>
            </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-3">EM Code</th>
                    <th className="px-4 py-3">Platform</th>
                    <th className="px-4 py-3">1 Day</th>
                    <th className="px-4 py-3">7 Day</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-2">{row.emcode}</td>
                      <td className="px-4 py-2">{row.platform}</td>
                      <td className="px-4 py-2">{row.one_day}</td>
                      <td className="px-4 py-2">{row.one_week}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleEditClick(row)}
                          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xl"
                        >
                        <svg className="w-5 h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                        </svg>

                        </button>
                      </td>
                    </tr>
                  ))}

                  {Array.from({length: rowsPerPage - paginatedData.length }).map((_, index) => (

                    <tr key={`empty-${index}`} className=" dark:border-gray-600">
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

            <div className="flex justify-between items-center gap-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 mt-5"
                >
                Previous
              </button>
              <span className="text-gray-700 dark:text-gray-300 mt-5">
              Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < Math.ceil(filteredData.length / rowsPerPage) ? prev + 1 : prev
                  )
                }
                disabled={currentPage >= Math.ceil(filteredData.length / rowsPerPage)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 mt-5"
                >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

     {showModal && (
      <FrequencyEditModal onClose={handleCloseModal} frequencyData={frequencyData} asset={editRow} mode={modalFunction} fetchData={fetchData}/>
      )}
    </div>
    //<TestFile data={frequencyData}/>
  );
}
