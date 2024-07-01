import React, { useState, useEffect } from 'react';

// Function to organize data by unitnumber and feedernumber
const organizeData = (assets) => {
  const organizedData = {};

  assets.forEach(asset => {
    const { unitnumber, feedernumber, shortname } = asset;

    if (!organizedData[unitnumber]) {
      organizedData[unitnumber] = {};
    }

    if (!organizedData[unitnumber][feedernumber]) {
      organizedData[unitnumber][feedernumber] = [];
    }

    organizedData[unitnumber][feedernumber].push(asset);
  });

  return organizedData;
};

// Function to get color class based on ieccode and quality
const getColorClass = (ieccode, quality) => {
  switch (ieccode) {
    case 'A':
      return 'text-green-500';
    case 'B':
      return 'text-blue-500';
    case 'C':
      return 'text-yellow-500';
    case 'D':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const FeederBreakdown = ({ setFeederBreakdownModal, site, relatedAssets }) => {
  const [organizedData, setOrganizedData] = useState({});

  useEffect(() => {
    setOrganizedData(organizeData(relatedAssets));
  }, [relatedAssets]);

  return (
    <div className="flex justify-center m-5">
      <div
        id="defaultModal"
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-600">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="inline-flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                {site.siteName} - Feeder Breakdown
              </h3>
              <button
                onClick={() => setFeederBreakdownModal(false)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="flex flex-wrap">
              {Object.keys(organizedData).sort().map(unitnumber => (
                <div key={unitnumber} className="m-4 p-4 border border-gray-300 flex-1">
                  <h2 className="text-lg font-bold">Unit {unitnumber}</h2>
                  <div className="flex flex-wrap">
                    {Object.keys(organizedData[unitnumber]).sort().map(feedernumber => (
                      <div key={feedernumber} className="m-2 p-2 border border-gray-200 flex-1">
                        <h3 className="text-md font-semibold">Feeder {feedernumber}</h3>
                        <ul className="list-none pl-0">
                          {organizedData[unitnumber][feedernumber].map(asset => (
                            <li key={asset.assetid} className={`ml-4 ${getColorClass(asset.ieccode, asset.quality)}`}>
                              {asset.shortname}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeederBreakdown;
