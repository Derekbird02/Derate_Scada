import React, { useState, useMemo } from "react";
import { Autocomplete, TextField } from "@mui/material";

// Your data example
const data = [
  { emcode: "EM001", platform: "1x" },
  { emcode: "EM002", platform: "2x" },
  { emcode: "EM001", platform: "3x" },
  { emcode: "EM003", platform: "2x" },
];

const platformOptions = ["1x", "2x", "3x"];

const YourComponent = () => {
  const [selectedEmcode, setSelectedEmcode] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  // Get all unique emcodes from the data
  const emcodeOptions = useMemo(() => {
    const unique = [...new Set(data.map(item => item.emcode))];
    return unique;
  }, [data]);

  // Filter data based on selected values
  const filteredData = useMemo(() => {
    return data.filter(item => {
      return (
        (selectedEmcode ? item.emcode === selectedEmcode : true) &&
        (selectedPlatform ? item.platform === selectedPlatform : true)
      );
    });
  }, [data, selectedEmcode, selectedPlatform]);

  return (
    <div className="mb-4 items-center gap-4 sm:flex md:mb-0">
      <Autocomplete
        options={emcodeOptions}
        value={selectedEmcode}
        onChange={(e, newValue) => setSelectedEmcode(newValue)}
        size="small"
        className="block p-2.5"
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
        className="block p-2.5"
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
      
      {/* Example usage of filteredData */}
      <div className="mt-4 text-white">
        <h3 className="font-bold">Filtered Results:</h3>
        <ul>
          {filteredData.map((item, index) => (
            <li key={index}>{`${item.emcode} - ${item.platform}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default YourComponent;
