import React, { useState, useEffect, useRef } from 'react';

const data = [
  { siteid: "121134", assetid: "123", feedername: "Feeder 1", unitnumber: "1" },
  { siteid: "121134", assetid: "122", feedername: "Feeder 1", unitnumber: "1" },
  { siteid: "121134", assetid: "121", feedername: "Feeder 5", unitnumber: "2" },
];

export default function FeederDropdown({ siteid }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [valueToPercent, setValueToPercent] = useState([]);
  const dropdownRef = useRef();

  useEffect(() => {
    const closeOnOutsideClick = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (!siteid) return;

    const filtered = data.filter(item => item.siteid === siteid);

    const unitOptions = Array.from(new Set(filtered.map(i => i.unitnumber))).map(unit => ({
      type: 'unit',
      label: `Unit ${unit}`,
      value: `unit||${unit}`
    }));

    const feederOptions = Array.from(
      new Set(filtered.map(i => `${i.feedername}||${i.unitnumber}`))
    ).map(str => {
      const [feedername, unitnumber] = str.split('||');
      return {
        type: 'feeder',
        label: `${feedername} (Unit ${unitnumber})`,
        value: `feeder||${feedername}||${unitnumber}`
      };
    });

    setOptions([...unitOptions, ...feederOptions]);
  }, [siteid]);

  const handleCheck = (value, checked) => {
    let newSelected = [...valueToPercent];

    if (value.startsWith("unit")) {
      const unitnumber = value.split("||")[1];
      const feeders = data
        .filter(d => d.siteid === siteid && d.unitnumber === unitnumber)
        .map(d => ({
          feedername: d.feedername,
          unitnumber: d.unitnumber
        }));

      if (checked) {
        newSelected = [...newSelected, ...feeders];
      } else {
        newSelected = newSelected.filter(v => v.unitnumber !== unitnumber);
      }
    } else if (value.startsWith("feeder")) {
      const [, feedername, unitnumber] = value.split("||");
      if (checked) {
        newSelected.push({ feedername, unitnumber });
      } else {
        newSelected = newSelected.filter(
          v => !(v.feedername === feedername && v.unitnumber === unitnumber)
        );
      }
    }

    // Deduplicate
    const deduped = Array.from(
      new Set(newSelected.map(i => `${i.feedername}||${i.unitnumber}`))
    ).map(str => {
      const [feedername, unitnumber] = str.split("||");
      return { feedername, unitnumber };
    });

    setValueToPercent(deduped);
  };

  const isChecked = (opt) => {
    if (opt.type === "unit") {
      return valueToPercent.some(v => v.unitnumber === opt.value.split("||")[1]);
    }
    if (opt.type === "feeder") {
      const [, feedername, unitnumber] = opt.value.split("||");
      return valueToPercent.some(v => v.feedername === feedername && v.unitnumber === unitnumber);
    }
  };

  return (
    <div className="relative w-64" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-left bg-white shadow-sm"
      >
        {valueToPercent.length > 0
          ? valueToPercent.map(v => `${v.feedername} (Unit ${v.unitnumber})`).join(', ')
          : "Select Units / Feeders"}
      </button>

      {dropdownOpen && (
        <div className="absolute z-10 w-full mt-1 max-h-64 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg p-2 space-y-2">
          {options.map((opt, idx) => (
            <label key={idx} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isChecked(opt)}
                onChange={(e) => handleCheck(opt.value, e.target.checked)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
