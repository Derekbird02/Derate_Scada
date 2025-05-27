import { useState, useEffect } from "react";
import SiteDropdown from "./SiteDropdown";
import axios from "axios";

const Confluence = ({user}) => {
  const [toggleSiteNotes, setToggleSiteNotes] = useState(true);
  const [toggleSiteIssues, setToggleSiteIssues] = useState(true);

  const [siteData, setSiteData] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);

  const [editState, setEditState] = useState(false);

  const [editSite, setEditSite] = useState(null);

  const isEqual = (a,b) => JSON.stringify(a) === JSON.stringify(b);
  const hasChanges = !isEqual(editSite, selectedSite);

  const [error, setError] = useState(null);

  const fetchSiteData = async () => {
      try {
        const response = await fetch(
          import.meta.env.APP_CALL,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setSiteData(data);
      } catch (error) {
        console.error("Error fetching site data:", error.message);
      }
    };

  useEffect(() => {
    fetchSiteData();
  }, []);


  const handleSiteChange = (siteName) => {
    const selected = siteData.find((site) => site.site_name === siteName);
    setSelectedSite(selected || null);
    setEditSite(selected);
    setError(null);
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
            className="w-96 border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={editSite[fieldKey] || ''}
            onChange={handleChange(fieldKey)}
          />
        ) : (
          selectedSite[fieldKey]
        )}
      </dd>
    </dl>
  );

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
    setEditSite({ ...editSite, [field]: newList });};


    const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const docsValid = (editSite.associated_documents || []).every(
      (doc) => doc.document_name && isValidUrl(doc.document_url)
    );
    const outagesValid = (editSite.outage_specifics || []).every(
      (out) => out.outage_name && isValidUrl(out.outage_url)
    );
    const notesValid = (editSite.site_specific_notes || []).every(note => note.trim() !== '');

    const issuesValid = (editSite.known_alarms || []).every(issue => issue.trim() !== '');

    if (!docsValid || !outagesValid || !notesValid || !issuesValid) {
      setError('All document/outage fields must be filled with a valid link. Notes cannot be blank.');
      return;
    }

    setError(null);

    const addUrl = import.meta.env.VITE_APP_API_BOPCONFLUENCESITES_UPDATE;

    try {
      await axios.post(addUrl, {
        editSite: editSite
      });
      setEditState(false);
      fetchSiteData();
      
    } catch (error) {
      console.error("Error adding DNR code: ", error);
    }
  };

  return (
    <section className="bg-white py-12 antialiased dark:bg-gray-800 md:pb-16 lg:dark:bg-gray-900">
      <div className="mx-auto max-w-screen-md text-center mb-8 mt-2">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          How can we help you?
        </h2>
        <p className="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-500">
          Welcome to the BOP Confluence, your go-to resource for site
          information and shift-related documents—select a site from the
          dropdown to get started.{" "}
        </p>


        <div className="flex justify-center items-center">
         <div className="w-3/4">
          <SiteDropdown siteData={siteData} onSiteChange={handleSiteChange} />
        </div>    
          
          
              
            <div>
  {["L1","L2"].includes(user.role) && selectedSite && (
    <div>
      {!editState ? (
        <>
          <button
            type="button"
            onClick={() => setEditState(true)}
            className="ml-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-10 h-10 inline-flex items-center justify-center dark:bg-gray-600 dark:hover:text-white"
            title="Edit"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
            </svg>
            <span className="sr-only">Edit Button</span>
          </button>

          <button
            type="button"
            className="ml-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-10 h-10 inline-flex items-center justify-center dark:bg-gray-600 dark:hover:text-white"
            title="Revisions"
          >
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm6-2a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0 0h-1a5 5 0 0 1-5-5v-.5"/>
            </svg>
            <span className="sr-only">Revision Control</span>
          </button>
        </>
      ) : (
        <>
        {hasChanges && (
          <button
            type="button"
            onClick={handleSaveClick}
            className="ml-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-10 h-10 inline-flex items-center justify-center dark:bg-gray-600 dark:hover:text-white"
            title="Save"
            disabled={!hasChanges}
          >
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>

            <span className="sr-only">Save</span>
          </button>
)}
          <button
            type="button"
            onClick={() => setEditState(false)}
            className="ml-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-10 h-10 inline-flex items-center justify-center dark:bg-gray-600 dark:hover:text-white"
            title="Cancel"
          >
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>

            <span className="sr-only">Cancel</span>
          </button>
        </>
      )}
    </div>
  )}
</div>

        </div>
      </div>

      {selectedSite ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {/* General Information */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex mb-6">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <h2 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
            General Information
          </h2>
        </div>
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 md:p-6 dark:border-gray-700 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-800 mb-6 md:mb-8">
          <div className="flow-root">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {renderField('site_name', 'Site Name')}
              {renderField('customer', 'Customer')}
              {renderField('number_of_turbines', 'Number of Turbines')}
              {renderField('rated_power', 'Rated Power')}
              {renderField('voltage_schedule', 'Voltage Schedule')}
              {renderField('location', 'Location')}
              {renderField('timezone', 'Timezone')}
              {renderField('site_software', 'Site Software')}
              <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                  WCS Configuration
                </dt>
                <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                  {editState ? (
                    <textarea
                      rows={4}
                      className="w-96 border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={Array.isArray(editSite.wcs_config) ? editSite.wcs_config.join('\n') : editSite.wcs_config || ''}
                      onChange={(e) =>
                        setEditSite({
                          ...editSite,
                          wcs_config: e.target.value.split('\n'),
                        })
                      }
                    />
                  ) : Array.isArray(selectedSite.wcs_config) ? (
                    selectedSite.wcs_config.map((item, i) => (
                      <div key={i} className="mb-2">
                        {item}
                      </div>
                    ))
                  ) : (
                    selectedSite.wcs_config
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex mb-6">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
          </svg>
          <h2 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
            Contact Information
          </h2>

        </div>
        
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 md:p-6 dark:border-gray-700 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-800 mb-6 md:mb-8">
          <div className="flow-root">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {renderField('ba', 'ISO / Balancing Authority')}
              {renderField('rc', 'Reliability Coordinator')}
              {renderField('tou', 'Transmission Operator / Utility')}
              <dl className="py-4 sm:flex sm:items-start sm:justify-between sm:gap-4">
                <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                  Site / Customer Contacts
                </dt>
                <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right w-full">
                  {editState ? (
                    <textarea
                      rows={Math.max(3, (editSite.site_contacts || '').split(/\r?\n/).length)}
                      className="w-full border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={editSite.site_contacts || ''}
                      onChange={e =>
                        setEditSite({ ...editSite, site_contacts: e.target.value })
                      }
                    />
                  ) : (
                    (selectedSite.site_contacts || '')
                      .split(/\r?\n/)
                      .map((line, idx) => (
                        <p key={idx} className="mb-1">
                          {line}
                        </p>
                      ))
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Site Notes & Issues */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:col-span-2">
        <div className="flex mb-4">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z"/>
          </svg>

          <h2 className="ml-2 text-lg font-bold dark:text-white">Site Guidelines & Special Notes</h2> 
        </div>
        
        <div id="accordion-flush" data-accordion="collapse">
          {/* Site-Specific Notes */}
          <div>
            <button
              type="button"
              className="flex items-center justify-between w-full py-5 font-medium text-gray-500 border-b dark:border-gray-700 dark:text-gray-400"
              onClick={() => setToggleSiteNotes(!toggleSiteNotes)}
            >
              <span className="text-white">Site-Specific Notes</span>
              {toggleSiteNotes ? (
                <svg className="w-5 h-5 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/>
                </svg>
                ) : (
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
            {toggleSiteNotes && (
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
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                      </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      className="flex items-center gap-1 text-primary-700 dark:text-primary-500"
                      onClick={addListItem('site_specific_notes', '')}
                    >
                      Add Note
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
              onClick={() => setToggleSiteIssues(!toggleSiteIssues)}
            >
              <span className="text-white">Site-Specific Known Issues</span>
              {toggleSiteIssues ? (
                <svg className="w-5 h-5 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/>
                </svg>
                ) : (
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
            {toggleSiteIssues && (
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
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                      </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      className="flex items-center gap-1 text-primary-700 dark:text-primary-500"
                      onClick={addListItem('known_alarms', '')}
                    >
                      Add Issue
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
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                      </svg>

                    </button>
                  </div>
                ))}
                <button
                  className="flex items-center gap-1 text-primary-700 dark:text-primary-500"
                  onClick={addListItem('associated_documents', { document_name: '', document_url: '' })}
                >
                  Add Document
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
                      className="flex-1 border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                      value={o.outage_url || ''}
                      onChange={handleListChange('outage_specifics', i, 'outage_url')}
                    />
                    <button onClick={removeListItem('outage_specifics', i)}>
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                      </svg>

                    </button>
                  </div>
                ))}
                <button
                  className="flex items-center gap-1 text-primary-700 dark:text-primary-500"
                  onClick={addListItem('outage_specifics', { outage_name: '', outage_url: '' })}
                >
                Add Outage
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
      ) : (
        <div className="py-8 px-4 mx-auto max-w-screen-xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="p-4 rounded shadow dark:bg-gray-800">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                <svg className="w-[28px] h-[28px] text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.5 11.5 11 13l4-3.5M12 20a16.405 16.405 0 0 1-5.092-5.804A16.694 16.694 0 0 1 5 6.666L12 4l7 2.667a16.695 16.695 0 0 1-1.908 7.529A16.406 16.406 0 0 1 12 20Z" />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-bold dark:text-white">
                Compliance
              </h3>
              <ul
                role="list"
                className="mb-4 space-y-3 text-gray-500 dark:text-gray-400"
              >
                <li>
                  <a href="#" className="hover:underline">
                    CRT PINs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Brookfield Voltage Schedule
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Orsted Voltage Schedule
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Other Voltage Schedule
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Offtakers correlated to Sites
                  </a>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded shadow dark:bg-gray-800">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                <svg className="w-[28px] h-[28px] text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.5 21h13M12 21V7m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm2-1.8c3.073.661 2.467 2.8 5 2.8M5 8c3.359 0 2.192-2.115 5.012-2.793M7 9.556V7.75m0 1.806-1.95 4.393a.773.773 0 0 0 .37.962.785.785 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.776.776 0 0 0 .09-.716L7 9.556Zm10 0V7.313m0 2.243-1.95 4.393a.773.773 0 0 0 .37.962.786.786 0 0 0 .362.089h2.436a.785.785 0 0 0 .643-.335.775.775 0 0 0 .09-.716L17 9.556Z" />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-bold dark:text-white">
                BOP Procedures
              </h3>
              <ul
                role="list"
                className="mb-4 space-y-3 text-gray-500 dark:text-gray-400"
              >
                <li>
                  <a href="#" className="hover:underline">
                    Daily Audit
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    NOTAMs (FAA Lights)
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    8 Day Email
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    MOD Testing
                  </a>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded shadow dark:bg-gray-800">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                <svg
                  className="w-[28px] h-[28px] text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-bold dark:text-white">
                Outage Coordination
              </h3>
              <ul
                role="list"
                className="mb-4 space-y-3 text-gray-500 dark:text-gray-400"
              >
                <li>
                  <a href="#" className="hover:underline">
                    Outage Stages
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Outage Form Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Power Curtailment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Voltage Change
                  </a>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded shadow dark:bg-gray-800">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded bg-primary-100 dark:bg-primary-900 lg:h-12 lg:w-12">
                <svg
                  className="w-[28px] h-[28px] text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-bold dark:text-white">
                Essential Links
              </h3>
              <ul
                role="list"
                className="mb-4 space-y-3 text-gray-500 dark:text-gray-400"
              >
                <li>
                  <a href="#" className="hover:underline">
                    Reliability Operation Box Folder
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    ESP Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Site Master List
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Substation Monitor Service Restart Process
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-12 px-4 mx-auto max-w-screen-xl">
            <h2 className="mb-8 mt-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Frequently asked questions
            </h2>
            <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
              <div>
                <div className="mb-4">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    What is the DNE (Do Not Exceed)?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    The DNE (Do Not Exceed) is a limit set by the Balancing
                    Authority on the Desired Dispatch Point (DDP). It indicates
                    the maximum power output the site should not surpass. For
                    example, if the DDP is 20 MW and the sites output exceeds
                    this limit, the site is over the DNE. Exceeding the DNE can
                    result in fines or the site being taken offline by the
                    Balancing Authority.
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    What does self-schedule mean?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Self-scheduling means that a lead market participant commits
                    a resource to provide energy for a specific hour, regardless
                    of whether the ISO would have scheduled or dispatched it.
                    This allows the participant to control when their resource
                    is active and providing power.
                  </p>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                    <svg
                      className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    What is the WCS (Wind Controller System)?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    The Wind Controller System (WCS) manages the overall power
                    output of the wind farm and controls the Automatic Voltage
                    Regulator (AVR). The AVR handles voltage regulation, while
                    the WCS ensures the site’s power output meets grid
                    requirements and adjusts for curtailment when needed. If the
                    WCS fails, it may result in an inability to meet power or
                    voltage requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Confluence;
