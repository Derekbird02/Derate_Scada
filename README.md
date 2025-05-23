import React, { useState, useEffect } from 'react';

const SiteDetails = ({ selectedSite }) => {
  const [editState, setEditState] = useState(false);
  const [editedSite, setEditedSite] = useState({ ...selectedSite });

  useEffect(() => {
    setEditedSite({ ...selectedSite });
  }, [selectedSite]);

  const handleChange = (field, value) => {
    setEditedSite((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Toggle Edit Button */}
      <div className="flex justify-end pb-4">
        <button
          onClick={() => setEditState(!editState)}
          className="px-4 py-1 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          {editState ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {[
        { label: 'Site Name', field: 'site_name' },
        { label: 'Customer', field: 'customer' },
        { label: 'Number of Turbines', field: 'number_of_turbines' },
        { label: 'Rated Power', field: 'rated_power' },
        { label: 'Voltage Schedule', field: 'voltage_schedule' },
        { label: 'Location', field: 'location' },
        { label: 'Timezone', field: 'timezone' },
        { label: 'Site Software', field: 'site_software' },
      ].map(({ label, field }) => (
        <dl key={field} className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
            {label}
          </dt>
          <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right w-full sm:w-auto">
            {editState ? (
              <input
                type="text"
                className="border rounded px-2 py-1 w-full dark:bg-gray-800 dark:text-white"
                value={editedSite[field] ?? ''}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            ) : (
              selectedSite[field]
            )}
          </dd>
        </dl>
      ))}

      {/* WCS Configuration */}
      <dl className="pt-4 sm:flex sm:items-start sm:justify-between sm:gap-4">
        <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
          WCS Configuration
        </dt>
        <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right w-full sm:w-auto">
          {editState ? (
            <div className="space-y-2">
              {Array.isArray(editedSite.wcs_config) &&
                editedSite.wcs_config.map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    className="border rounded px-2 py-1 w-full dark:bg-gray-800 dark:text-white"
                    value={item}
                    onChange={(e) => {
                      const updated = [...editedSite.wcs_config];
                      updated[index] = e.target.value;
                      handleChange('wcs_config', updated);
                    }}
                  />
                ))}
            </div>
          ) : Array.isArray(selectedSite.wcs_config) ? (
            selectedSite.wcs_config.map((item, index) => (
              <div key={index} className="mb-2">{item}</div>
            ))
          ) : (
            selectedSite.wcs_config
          )}
        </dd>
      </dl>
    </div>
  );
};

export default SiteDetails;

