import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

export default function SiteDetails({ selectedSite, editState }) {
  const [editSite, setEditSite] = useState(selectedSite);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    setEditSite(selectedSite);
  }, [selectedSite]);

  const handleChange = (field) => (e) => {
    setEditSite({ ...editSite, [field]: e.target.value });
  };

  const handleListChange = (field, index, key) => (e) => {
    const newList = [...(editSite[field] || [])];
    newList[index] = key ? { ...newList[index], [key]: e.target.value } : e.target.value;
    setEditSite({ ...editSite, [field]: newList });
  };

  const addListItem = (field, template) => () => {
    const newList = [...(editSite[field] || []), template];
    setEditSite({ ...editSite, [field]: newList });
  };

  const removeListItem = (field, index) => () => {
    const newList = [...(editSite[field] || [])];
    newList.splice(index, 1);
    setEditSite({ ...editSite, [field]: newList });
  };

  const toggleAccordion = (idx) => setActiveIndex(activeIndex === idx ? null : idx);

  const renderField = (fieldKey, label, type = 'text') => (
    <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4" key={fieldKey}>
      <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
        {label}
      </dt>
      <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
        {editState ? (
          <input
            type={type}
            className="w-full max-w-xs border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={editSite[fieldKey] || ''}
            onChange={handleChange(fieldKey)}
          />
        ) : (
          selectedSite[fieldKey]
        )}
      </dd>
    </dl>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {/* General Information */}
      {/* ... existing general + contact sections unchanged ... */}

      {/* Site Notes & Issues */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:col-span-2">
        <h3 className="mb-4 text-lg font-bold dark:text-white">Site Guidelines & Special Notes</h3>
        <div id="accordion-flush" data-accordion="collapse">
          {/* Site-Specific Notes */}
          <div>
            <button
              type="button"
              className="flex items-center justify-between w-full py-5 font-medium text-gray-500 border-b dark:border-gray-700 dark:text-gray-400"
              onClick={() => toggleAccordion(1)}
            >
              <span>Site-Specific Notes</span>
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeIndex === 1 && (
              <div className="py-5 border-b dark:border-gray-700">
                {editState ? (
                  <>
                    {(editSite.site_specific_notes || []).map((note, i) => (
                      <div key={i} className="flex gap-2 items-center mb-2">
                        <input
                          type="text"
                          className="flex-1 border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          value={note}
                          onChange={handleListChange('site_specific_notes', i)}
                        />
                        <button onClick={removeListItem('site_specific_notes', i)}>
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                    <button
                      className="flex items-center gap-1 text-primary-700 dark:text-primary-500"
                      onClick={addListItem('site_specific_notes', '')}
                    >
                      <PlusCircle size={16} /> Add Note
                    </button>
                  </>
                ) : (
                  (selectedSite.site_specific_notes || []).map((note, i) => (
                    <p key={i} className="mb-2 text-gray-500 dark:text-gray-400">{note}</p>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Site-Specific Known Issues */}
          <div>
            <button
              type="button"
              className="flex items-center justify-between w-full py-5 font-medium text-gray-500 border-b dark:border-gray-700 dark:text-gray-400"
              onClick={() => toggleAccordion(2)}
            >
              <span>Site-Specific Known Issues</span>
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeIndex === 2 && (
              <div className="py-5 border-b dark:border-gray-700">
                {editState ? (
                  <>
                    {(editSite.known_alarms || []).map((alarm, i) => (
                      <div key={i} className="flex gap-2 items-center mb-2">
                        <input
                          type="text"
                          className="flex-1 border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          value={alarm}
                          onChange={handleListChange('known_alarms', i)}
                        />
                        <button onClick={removeListItem('known_alarms', i)}>
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                    <button
                      className="flex items-center gap-1 text-primary-700 dark:text-primary-500"
                      onClick={addListItem('known_alarms', '')}
                    >
                      <PlusCircle size={16} /> Add Issue
                    </button>
                  </>
                ) : (
                  (selectedSite.known_alarms || []).map((alarm, i) => (
                    <p key={i} className="mb-2 text-gray-500 dark:text-gray-400">{alarm}</p>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resources & Outages unchanged below... */}
    </div>
  );
}
