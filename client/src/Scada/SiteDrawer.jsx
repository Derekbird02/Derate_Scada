import React, { useState, useEffect } from 'react';
import SiteDrawerInfo from './SiteDrawerInfo';

import {GiWindTurbine } from "react-icons/gi";

const SiteDrawer = ({ site, relatedAssets, onClose, setCreateAlertModal }) => {
  const [activeAccordion, setActiveAccordion] = useState(true);

  const [sortCriteria, setSorfCriteria] = useState("state");
  const [sortOrder, setSortOrder] = useState("asc");

  const stateOrder = { 6: 1, 9: 1, 2: 2, 4: 3, 14: 3, 15: 3, 3: 4, 5: 4, 10: 4, 16: 4, 7: 5, 8: 6, 1: 7, 13: 7 };

  const sortByState = (a, b) => {
    if (a.quality === 0 && b.quality !== 0) return 1;
    if (a.quality !== 0 && b.quality === 0) return -1;

    if (a.quality === 3 && b.quality === 3) {
      const stateA = stateOrder[a.ieccode] || 99;
      const stateB = stateOrder[b.ieccode] || 99;
      return stateA - stateB;
    }

    if (a.quality === 3 && b.quality !== 3) return -1;
    if (a.quality !== 3 && b.quality === 3) return 1;

    return 0;
  };

  const sortByName = (a,b) => {
    const nameA = a.shortname.toLowerCase();
    const nameB = b.shortname.toLowerCase();
    if(nameA < nameB) return -1;
    if(nameA > nameB) return 1;
    return 0;
  }

  const handleSort = (criteria) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSorfCriteria(criteria);
    setSortOrder(newSortOrder);
  }

  const sortedAssets = [...relatedAssets].sort((a,b) => {
    if(sortCriteria === 'name') { return sortOrder === 'asc' ? sortByName(a,b) : sortByName(b,a);}
    else if (sortCriteria === 'state'){ return sortOrder === 'asc' ? sortByState(a,b) : sortByState(b,a);}
  });

  const toggleAccordion = () => {
    setActiveAccordion(!activeAccordion);
  };

  useEffect(() => {
    setActiveAccordion(true);
    setSorfCriteria("state");
  }, [site]);

  const getStatusDiv = (quality, ieccode) => {
    if (quality == 0) {
      return <div className="px-2 py-1 rounded-full text-sm font-medium bg-gray-100 text-center text-gray-800 dark:bg-gray-900 dark:text-gray-300">No Data</div>;
    }
  
    let styles = "px-2 py-1 rounded-full text-sm font-medium text-center ";
    let text = "";
  
    switch (ieccode) {
      case 1:
      case 13:
        styles += "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        text = "Online";
        break;
      case 4:
      case 14:
      case 15:
        styles += "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
        text = "Available";
        break;
      case 2:
        styles += "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
        text = "Impacted";
        break;
      case 6:
      case 9:
        styles += "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
        text = "Faulted";
        break;
      case 3:
      case 5:
      case 10:
      case 16:
        styles += "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
        text = "Stopped";
        break;
      case 7:
        styles += "bg-fuchsia-200 text-fuchsia-800 dark:bg-fuchsia-950 dark:text-fuchsia-300";
        text = "Maintenance";
        break;
      case 8:
        styles += "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-800 dark:text-fuchsia-300";
        text = "Repair";
        break;
      default:
        styles += "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
        text = "Unknown";
    }
  
    return <div className={styles}>{text}</div>;
  };

  return (
    <div
      id="drawer-right"
      className="w-1/4 border-l-2 border-gray-300 fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-white dark:bg-gray-800"
      tabIndex="-1"
    >
      <h5 className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
        <GiWindTurbine className="w-5 h-5 mr-2 dark:text-white text-black"/>
        {site.siteName}
      </h5>

      <div className="absolute top-2.5 right-12 flex space-x-2">
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => setCreateAlertModal(true)}
        >
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1v12M1 7h12"/>
          </svg>
          <span className="sr-only">Create Alert</span>
        </button>

        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => alert('Feeder Breakout Coming Soon')}
        >
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
          </svg>

          <span className="sr-only">View Details</span>
        </button>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span className="sr-only">Close menu</span>
      </button>


    <SiteDrawerInfo site={site} relatedAssets={relatedAssets} toggleAccordion={toggleAccordion} activeAccordion={activeAccordion}/>
      

      {/* Render Assets Releated To Specified Site */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('name')} >
                Name {sortCriteria === "name" && (
                  <span className="ml-1">
                      {sortOrder === "asc" ?
                      <svg class="w-4 h-4 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M5.575 13.729C4.501 15.033 5.43 17 7.12 17h9.762c1.69 0 2.618-1.967 1.544-3.271l-4.881-5.927a2 2 0 0 0-3.088 0l-4.88 5.927Z" clip-rule="evenodd"/>
                      </svg>
                      :                    
                      <svg class="w-4 h-4 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clip-rule="evenodd"/>
                      </svg>
                      }
                  </span>
                )}
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer flex justify-center" onClick={() => handleSort('state')}>
                State {sortCriteria === "state" && (
                  <span className="ml-1">
                      {sortOrder === "asc" ?
                      <svg class="w-4 h-4 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M5.575 13.729C4.501 15.033 5.43 17 7.12 17h9.762c1.69 0 2.618-1.967 1.544-3.271l-4.881-5.927a2 2 0 0 0-3.088 0l-4.88 5.927Z" clip-rule="evenodd"/>
                      </svg>
                      :                    
                      <svg class="w-4 h-4 text-gray-800 dark:text-white inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clip-rule="evenodd"/>
                      </svg>
                      }
                  </span>
                )}
              </th>
              <th scope="col" className="px-6 py-3">
                Rated
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedAssets.map((asset) => (
              <tr key={asset.assetid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                <td className="px-6 py-4">{asset.assetid}</td>
                <td className="px-6 py-4">{asset.shortname}</td>
                <td className="px-6 py-4">{getStatusDiv(asset.quality, asset.iecode)}</td>
                <td className="px-6 py-4">{asset.ratedpower}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SiteDrawer;
