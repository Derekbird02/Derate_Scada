import React, { useState, useMemo } from "react";
import {
  TextField,
  Autocomplete,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function FrequencyPage({ frequencyData }) {
  const [selectedEmcode, setSelectedEmcode] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

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

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
  };

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
                onChange={(e, newValue) => {
                  setSelectedEmcode(newValue);
                  setCurrentPage(1);
                }}
                size="small"
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
                onChange={(e, newValue) => {
                  setSelectedPlatform(newValue);
                  setCurrentPage(1);
                }}
                size="small"
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
                    <th className="px-4 py-3">EM Code</th>
                    <th className="px-4 py-3">Platform</th>
                    <th className="px-4 py-3">1 Day</th>
                    <th className="px-4 py-3 whitespace-nowrap">7 Day</th>
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
                        <IconButton
                          onClick={(e) => handleMenuOpen(e, index)}
                          className="text-gray-500 dark:text-gray-400"
                        >
                          <MoreVertIcon />
                        </IconButton>
                        {menuIndex === index && (
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            <MenuItem
                              onClick={() => {
                                console.log("Edit clicked:", row);
                                handleMenuClose();
                              }}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                console.log("Delete clicked:", row);
                                handleMenuClose();
                              }}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-end items-center gap-4 mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-sm font-medium rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < Math.ceil(filteredData.length / rowsPerPage) ? prev + 1 : prev
                  )
                }
                disabled={currentPage >= Math.ceil(filteredData.length / rowsPerPage)}
                className="px-4 py-2 bg-gray-200 text-sm font-medium rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

