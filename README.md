import React, { useState, useMemo } from "react";
import {
  TextField,
  Autocomplete,
  Menu,
  MenuItem,
  Modal,
  Box,
  Typography,
  Select,
  MenuItem as MuiMenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

export default function FrequencyPage({ frequencyData }) {
  const [selectedEmcode, setSelectedEmcode] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const rowsPerPage = 15;
  const numberOptions = Array.from({ length: 41 }, (_, i) => i);

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

  const handleEditClick = (row) => {
    setEditData({ ...row });
    setOpenModal(true);
    handleMenuClose();
  };

  const handleUpdate = () => {
    console.log("Update:", {
      emcode: editData.emcode,
      platform: editData.platform,
      one_day: editData.one_day,
      one_week: editData.one_week,
    });
    setOpenModal(false);
  };

  const handleDelete = () => {
    const { emcode, platform } = editData;
    const confirmed = window.confirm(`Are you sure you want to delete EM Code ${emcode} on platform ${platform}?`);
    if (confirmed) {
      console.log("Delete:", { emcode, platform });
      setOpenModal(false);
    }
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
                sx={{ width: 300, svg: { color: "#FFFFFF" }, input: { color: "#FFFFFF" }, label: { color: "#FFFFFF" } }}
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
                sx={{ width: 300, svg: { color: "#FFFFFF" }, input: { color: "#FFFFFF" }, label: { color: "#FFFFFF" } }}
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
                    <tr key={index} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="px-4 py-2">{row.emcode}</td>
                      <td className="px-4 py-2">{row.platform}</td>
                      <td className="px-4 py-2">{row.one_day}</td>
                      <td className="px-4 py-2">{row.one_week}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={(e) => handleMenuOpen(e, index)}
                          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xl"
                        >
                          ⋮
                        </button>
                        {menuIndex === index && (
                          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem onClick={() => handleEditClick(row)}>Edit</MenuItem>
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

        {/* Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box sx={{ p: 4, maxWidth: 400, bgcolor: "background.paper", margin: "10% auto", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>EM Code: {editData?.emcode}</Typography>
            <Typography variant="h6" gutterBottom>Platform: {editData?.platform}</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>1 Day</InputLabel>
              <Select
                value={editData?.one_day || 0}
                onChange={(e) => setEditData({ ...editData, one_day: e.target.value })}
              >
                {numberOptions.map((num) => (
                  <MuiMenuItem key={num} value={num}>{num}</MuiMenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>7 Day</InputLabel>
              <Select
                value={editData?.one_week || 0}
                onChange={(e) => setEditData({ ...editData, one_week: e.target.value })}
              >
                {numberOptions.map((num) => (
                  <MuiMenuItem key={num} value={num}>{num}</MuiMenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                disabled={
                  editData?.one_day === paginatedData[menuIndex]?.one_day &&
                  editData?.one_week === paginatedData[menuIndex]?.one_week
                }
              >
                Update
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          </Box>
        </Modal>
      </section>
    </div>
  );
}


