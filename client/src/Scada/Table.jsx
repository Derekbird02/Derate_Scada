import React, { useState } from 'react';
import sites from '../Data/sites';

const Table = ({ selectedSite, assetData, onRowClick, insertTime }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (timestamp) => {
    const date = new Date (timestamp);
    const options = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    return date.toLocaleString('en-US', options);
  }

  // Filtered sites based on search query
  const filteredSites = sites.filter((site) =>
    site.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handler for updating search query
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to count assets by iecode
  const countAssetsByIecode = (siteId, iecodeList, quality) => {
    return assetData.filter(
      (asset) => asset.siteid === siteId && asset.quality === quality && iecodeList.includes(asset.iecode)
    ).length;
  };

  return (
    <div className="relative overflow-x-auto">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        BOP Derate Portal
      </h2>

    <div className="flex justify-between">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-1/2 mb-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
          </svg>
        </div>
        <input
          type="search"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 py-2.5 pr-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Search Site Names or Customers..."
          value={searchQuery}
          onChange={handleSearchChange}
          required
        />

    
      </div>


      <div className="relative w-1/6 mb-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>

        </div>
        <p title="Last Updated" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 py-2.5 pr-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300">{insertTime ? formatDate(insertTime): '-'}</p>
      </div>

      </div>

      <div className="shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Site Name
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex">
                  <div className="ml-5">O</div>
                  <div className="ml-10">A</div>
                  <div className="ml-10">I</div>
                  <div className="ml-11">T</div>
                  <div className="ml-10">S</div>
                  <div className="ml-10">N</div>
                  <div className="ml-11">M</div>
                  <div className="ml-10">R</div>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Alerts
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSites.map((site) => (
              <tr
                key={site.siteId}
                className={`${selectedSite && selectedSite.siteId === site.siteId ? 'bg-gray-200 dark:bg-gray-600' : 'bg-white dark:bg-gray-800'} border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer`}
                onClick={() => onRowClick(site)}
              >
                <td className="px-6 py-4">{site.siteName}</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">
                <span className="border border-green-400 bg-green-100 text-green-800 text-sm font-medium inline-block w-12 text-center py-0.5 rounded-l-lg dark:bg-green-900 dark:text-green-300" title="Online">
                    {/* {countAssetsByIeccode(site.siteId, [1,13], "3")} */}0
                </span>
                <span className="border border-blue-400 bg-blue-100 text-blue-800 text-sm font-medium inline-block w-12 text-center py-0.5 dark:bg-blue-900 dark:text-blue-300" title="Available">
                    {/* {countAssetsByIeccode(site.siteId, [4,14,15], "3")} */}0
                </span>
                <span className="border border-purple-400 bg-purple-100 text-purple-800 text-sm font-medium inline-block w-12 text-center py-0.5 dark:bg-purple-900 dark:text-purple-300" title="Impacted">
                  {/* {countAssetsByIeccode(site.siteId, [2], "3")} */}0
                </span>
                <span className="border border-red-400 bg-red-100 text-red-800 text-sm font-medium inline-block w-12 text-center py-0.5  dark:bg-red-900 dark:text-red-300" title="Faulted">
                  {/* {countAssetsByIeccode(site.siteId, [6,9], "3")} */}0
                </span>
                <span className="border border-yellow-400 bg-yellow-100 text-yellow-800 text-sm font-medium inline-block w-12 text-center py-0.5  dark:bg-yellow-900 dark:text-yellow-300" title="Stopped">
                  {/* {countAssetsByIeccode(site.siteId, [3,5,10,16], "3")} */}0
                </span>
                <span className="border border-gray-400 bg-gray-100 text-gray-800 text-sm font-medium mr-2 inline-block w-12 text-center py-0.5 rounded-r-lg dark:bg-gray-900 dark:text-gray-300" title="No Communication">
                  {/* {countAssetsByIeccode(site.siteId, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], "0")} */}0
                </span>

                <span className="border border-fuchsia-400 bg-fuchsia-200 text-fuchsia-800 text-sm font-medium inline-block w-12 text-center py-0.5 rounded-l-lg dark:bg-fuchsia-950 dark:text-fuchsia-300" title="Maintenance">
                  {/* {countAssetsByIeccode(site.siteId, [7], "3")} */}0
                </span>

                <span className="border border-fuchsia-400 bg-fuchsia-100 text-fuchsia-800 text-sm font-medium inline-block w-12 text-center py-0.5 rounded-r-lg dark:bg-fuchsia-800 dark:text-fuchsia-300" title="Repair">
                  {/* {countAssetsByIeccode(site.siteId, [8], "3")} */}0
                </span>
              </td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">{site.customer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
