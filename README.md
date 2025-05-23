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
    newList[index] = { ...newList[index], [key]: e.target.value };
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
      {/* ... same as before ... */}

      {/* Resources & Outages */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="mb-4 text-lg font-bold dark:text-white">Document Resources</h3>
            {editState ? (
              <div>
                {(editSite.associated_documents || []).map((doc, i) => (
                  <div key={i} className="flex gap-2 items-center mb-2">
                    <input
                      type="text"
                      placeholder="Name"
                      className="flex-1 border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={doc.document_name || ''}
                      onChange={handleListChange('associated_documents', i, 'document_name')}
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      className="flex-1 border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={doc.document_url || ''}
                      onChange={handleListChange('associated_documents', i, 'document_url')}
                    />
                    <button onClick={removeListItem('associated_documents', i)}>
                      <Trash2 className="text-red-500" size={18} />
                    </button>
                  </div>
                ))}
                <button
                  className="flex items-center gap-1 text-primary-700 dark:text-primary-500"
                  onClick={addListItem('associated_documents', { document_name: '', document_url: '' })}
                >
                  <PlusCircle size={16} /> Add Document
                </button>
              </div>
            ) : (
              <ul role="list" className="mt-4 space-y-2 text-primary-700 dark:text-primary-500">
                {Array.isArray(selectedSite.associated_documents) &&
                  selectedSite.associated_documents.map((doc, i) => (
                    <li key={i}>
                      <a href={doc.document_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {doc.document_name}
                      </a>
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold dark:text-white">Outage Specifics</h3>
            {editState ? (
              <div>
                {(editSite.outage_specifics || []).map((o, i) => (
                  <div key={i} className="flex gap-2 items-center mb-2">
                    <input
                      type="text"
                      placeholder="Name"
                      className="flex-1 border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={o.outage_name || ''}
                      onChange={handleListChange('outage_specifics', i, 'outage_name')}
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      className="flex-1 border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={o.outage_url || ''}
                      onChange={handleListChange('outage_specifics', i, 'outage_url')}
                    />
                    <button onClick={removeListItem('outage_specifics', i)}>
                      <Trash2 className="text-red-500" size={18} />
                    </button>
                  </div>
                ))}
                <button
                  className="flex items-center gap-1 text-primary-700 dark:text-primary-500"
                  onClick={addListItem('outage_specifics', { outage_name: '', outage_url: '' })}
                >
                  <PlusCircle size={16} /> Add Outage
                </button>
              </div>
            ) : (
              <ul role="list" className="mt-4 space-y-2 text-primary-700 dark:text-primary-500">
                {Array.isArray(selectedSite.outage_specifics) && selectedSite.outage_specifics.length > 0 ? (
                  selectedSite.outage_specifics.map((o, i) => (
                    <li key={i}>
                      <a href={o.outage_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {o.outage_name}
                      </a>
                    </li>
                  ))
                ) : (
                  <li>Not Applicable</li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
