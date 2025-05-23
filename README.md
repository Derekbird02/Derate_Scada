import React, { useEffect, useState } from 'react';

export default function FeederSelector({ siteid }) {
  const [options, setOptions] = useState([]);
  const [valueToPercent, setValueToPercent] = useState([]);

  useEffect(() => {
    if (!siteid) return;

    // Filter and get unique feedername + unitnumber combinations
    const filtered = data.filter(item => item.siteid === siteid);

    const uniqueCombinations = Array.from(
      new Set(filtered.map(item => `${item.feedername} - Unit ${item.unitnumber}`))
    ).map(str => {
      const [feedername, unit] = str.split(' - Unit ');
      return { label: str, feedername, unitnumber: unit };
    });

    setOptions(uniqueCombinations);
  }, [siteid]);

  const handleChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(opt => {
      const [feedername, unitnumber] = opt.value.split('||');
      return { feedername, unitnumber };
    });
    setValueToPercent(selected);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-semibold">Select Feeders & Units</label>
      <select
        multiple
        className="p-2 border rounded-md"
        onChange={handleChange}
      >
        {options.map((opt, index) => (
          <option
            key={index}
            value={`${opt.feedername}||${opt.unitnumber}`}
          >
            {opt.label}
          </option>
        ))}
      </select>

      <div className="text-sm text-gray-600">
        Selected: {valueToPercent.map(v => `${v.feedername} - Unit ${v.unitnumber}`).join(', ')}
      </div>
    </div>
  );
}
