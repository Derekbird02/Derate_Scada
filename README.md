import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const GroupedTableWithFilters = ({ data }) => {
  const [openRows, setOpenRows] = useState({});
  const [selectedEmcode, setSelectedEmcode] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");

  // Unique values for filters
  const emcodeOptions = [...new Set(data.map((d) => d.emcode))];
  const platformOptions = [...new Set(data.map((d) => d.platform))];

  // Filtered data
  const filtered = data.filter((row) => {
    const emcodeMatch = selectedEmcode ? row.emcode === selectedEmcode : true;
    const platformMatch = selectedPlatform ? row.platform === selectedPlatform : true;
    return emcodeMatch && platformMatch;
  });

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.emcode]) acc[item.emcode] = [];
    acc[item.emcode].push(item);
    return acc;
  }, {});

  const toggleRow = (emcode) => {
    setOpenRows((prev) => ({ ...prev, [emcode]: !prev[emcode] }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/* Filters */}
      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium">Filter by EM Code</label>
          <select
            className="border rounded p-1 w-full"
            value={selectedEmcode}
            onChange={(e) => setSelectedEmcode(e.target.value)}
          >
            <option value="">All</option>
            {emcodeOptions.map((emcode) => (
              <option key={emcode} value={emcode}>
                {emcode}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Filter by Platform</label>
          <select
            className="border rounded p-1 w-full"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            <option value="">All</option>
            {platformOptions.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">EM Code</th>
            <th className="p-2">Platform</th>
            <th className="p-2">1 Day</th>
            <th className="p-2">1 Week</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([emcode, rows]) => (
            <React.Fragment key={emcode}>
              {/* Parent row */}
              <tr
                className="bg-white cursor-pointer hover:bg-gray-50"
                onClick={() => toggleRow(emcode)}
              >
                <td className="p-2 flex items-center gap-1 font-medium">
                  {openRows[emcode] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  {emcode}
                </td>
                <td colSpan={3} className="p-2 italic text-gray-400">
                  {openRows[emcode] ? "Click to hide platforms" : "Click to view platforms"}
                </td>
              </tr>

              {/* Platform rows */}
              {openRows[emcode] &&
                rows.map((platformRow, i) => (
                  <tr key={i} className="bg-gray-50 border-t">
                    <td className="p-2 pl-6 text-gray-600">↳</td>
                    <td className="p-2">{platformRow.platform}</td>
                    <td className="p-2">{platformRow.one_day}</td>
                    <td className="p-2">{platformRow.one_week}</td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
