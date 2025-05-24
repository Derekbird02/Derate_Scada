import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Check, X } from 'lucide-react';

export default function SiteDetails({ selectedSite, editState, onSave, onCancel, onEdit }) {
  const [editSite, setEditSite] = useState(selectedSite);
  const [activeIndex, setActiveIndex] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setEditSite(selectedSite);
    setError(null);
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

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSaveClick = () => {
    // Validation logic
    const docsValid = (editSite.associated_documents || []).every(
      (doc) => doc.document_name && isValidUrl(doc.document_url)
    );
    const outagesValid = (editSite.outage_specifics || []).every(
      (out) => out.outage_name && isValidUrl(out.outage_url)
    );
    const notesValid = (editSite.site_specific_notes || []).every(note => note.trim() !== '');

    if (!docsValid || !outagesValid || !notesValid) {
      setError('All document/outage fields must be filled with a valid link. Notes cannot be blank.');
      return;
    }

    setError(null);
    onSave && onSave(editSite);
  };

  const handleCancelClick = () => {
    setEditSite(selectedSite);
    setError(null);
    onCancel && onCancel();
  };

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
    <div>
      {/* Edit Mode Controls */}
      <div className="flex justify-end mb-4">
        {!editState ? (
          <button
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={onEdit}
          >
            <Check size={16} /> Edit
          </button>
        ) : (
          <>
            <button
              className="flex items-center gap-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
              onClick={handleCancelClick}
            >
              <X size={16} /> Cancel
            </button>
            <button
              className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleSaveClick}
            >
              <Check size={16} /> Save
            </button>
          </>
        )}
      </div>

      {error && (
        <div className="text-red-600 font-semibold mb-4 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* General Information */}
        {/* ...rest of your existing grid content...*/}
      </div>
    </div>
  );
}
