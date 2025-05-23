import React, { useEffect, useState } from 'react';

const data = [
  { siteid: "121134", assetid: "123", feedername: "Feeder 1", unitnumber: "1" },
  { siteid: "121134", assetid: "122", feedername: "Feeder 1", unitnumber: "1" },
  { siteid: "121134", assetid: "121", feedername: "Feeder 5", unitnumber: "2" },
];

export default function FeederSelector({ siteid }) {
  const [options, setOptions] = useState([]);
  const [valueToPercent, setValueToPercent] = useState([]);

  useEffect(() => {
    if (!siteid) return;

    const filtered = data.filter(item => item.siteid === siteid);

    const units = Array.from(new Set(filtered.map(i => i.unitnumber))).map(unit => ({
      type: 'unit',
      label: `Unit ${unit}`,
      value: `unit||${unit}`
    }));

    const feeders = Array.from(
      new Set(filtered.map(i => `${i.feedername}||${i.unitnumber}`))
    ).map(str => {
      const [feedername, unit] = str.split('||');
      return {
        type: 'feeder',
        label: `${feedername} (Unit ${unit})`,
        value: `feeder||${feedername}||${unit}`
      };
    });

    setOptions([...units, ...feeders]);
  }, [siteid]);

  const handleChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions).map(opt => opt.value);

    const feedersFromUnits = selectedValues
      .filter(val => val.startsWith("unit"))
      .flatMap(val => {
        const unitNum = val.split("||")[1];
        return data
          .filter(d => d.siteid === siteid && d.unitnumber === unitNum)
          .map(d => ({
            feedername: d.feedername,
            unitnumber: d.unitnumber,
          }));
      });

    const selectedFeeders = selectedValues
      .filter(val => val.startsWith("feeder"))
      .map(val => {
        const [, feedername, unitnumber] = val.split("||");
        return { feedername, unitnumber };
      });

    // Combine and dedupe
    const allSelected = [
      ...selectedFeeders,
      ...feedersFromUnits
    ];

    const deduped = Array.from(
      new Set(allSelected.map(item => `${item.feedername}||${item.unitnumber}`))
    ).map(str => {
      const [feedername, unitnumber] = str.split("||");
      return { feedername, unitnumber };
    });

    setValueToPercent(deduped);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-semibold">Select Units or Feeders</label>
      <select
        multiple
        className="p-2 border rounded-md"
        onChange={handleChange}
      >
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="text-sm text-gray-600">
        Selected Feeders:
        <ul className="list-disc list-inside">
          {valueToPercent.map((v, idx) => (
            <li key={idx}>{v.feedername} (Unit {v.unitnumber})</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
