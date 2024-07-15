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

export const calculateFeederPowerActual = (feederAssets) => {
  let totalPower = 0;

  feederAssets.forEach(asset => {
    if (asset.quality === 0) {
      return; // Skip assets with quality 0
    }

    switch (asset.ieccode) {
      case 1:
      case 13:
      case 4:
      case 14:
      case 15:
        totalPower += parseInt(asset.ratedpower, 10);
        break;
      case 2:
        totalPower += parseFloat(asset.ratedpower) / 2;
        break;
      default:
        // No action needed for other codes
        break;
    }
  });

  return totalPower / 1000;
};

export const calculateTransformerPower = (relatedAssets, tNumber) => {
  let transformerPower = 0;

  const relevantAssets = relatedAssets.filter(asset => asset.unitnumber === tNumber && asset.quality !== 0);

  relevantAssets.forEach(asset => {
    switch (asset.ieccode) {
      case 1:
      case 13:
      case 4:
      case 14:
      case 15:
        transformerPower += parseInt(asset.ratedpower, 10);
        break;
      case 2:
        transformerPower += parseFloat(asset.ratedpower) / 2;
        break;
      default:
        // No action needed for other codes
        break;
    }
  });

  return transformerPower / 1000;
};

// Function to get color class based on ieccode and quality
const getColorClass = (ieccode, quality) => {
  let styles = "py-1 rounded-full text-sm font-medium text-center cursor-pointer";
  let text = "";

  switch (ieccode) {
    case 1:
    case 13:
      styles += " bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      text = "Online";
      break;
    case 4:
    case 14:
    case 15:
      styles += " bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      text = "Available";
      break;
    case 2:
      styles += " bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      text = "Impacted";
      break;
    case 6:
    case 9:
      styles += " bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      text = "Faulted";
      break;
    case 3:
    case 5:
    case 10:
    case 16:
      styles += " bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      text = "Stopped";
      break;
    case 7:
      styles += " bg-fuchsia-200 text-fuchsia-800 dark:bg-fuchsia-950 dark:text-fuchsia-300";
      text = "Maintenance";
      break;
    case 8:
      styles += " bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-800 dark:text-fuchsia-300";
      text = "Repair";
      break;
    default:
      styles += " bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      text = "Unknown";
  }

  if (quality === 0) {
    styles = "py-1 rounded-full text-sm font-medium bg-gray-100 text-center text-gray-800 dark:bg-gray-900 dark:text-gray-300 cursor-pointer border border-dashed border-gray-600";
    text = "No Data";
  }

  return { styles, text };
};

const FeederBreakdown = ({ setFeederBreakdownModal, site, relatedAssets }) => {
  const [organizedData, setOrganizedData] = useState({});
  const [assets, setAssets] = useState(
    relatedAssets.map(asset => ({ ...asset, originalIecCode: asset.ieccode }))
  );

  useEffect(() => {
    setOrganizedData(organizeData(assets));
  }, [assets]);

  const toggleAssetStatus = (unitnumber, feedernumber, assetid) => {
    setAssets(prevAssets =>
      prevAssets.map(asset => {
        if (asset.unitnumber === unitnumber && asset.feedernumber === feedernumber && asset.assetid === assetid) {
          return { ...asset, ieccode: asset.ieccode === 1 ? asset.originalIecCode : 1 };
        }
        return asset;
      })
    );
  };

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
            {site.automation ? (
              <div className="flex justify-center">
                {Object.keys(organizedData)
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map(unitnumber => (
                    <div key={unitnumber} className="m-4 p-4 border border-gray-300 rounded-lg">
                      <h2 className="text-lg font-bold dark:text-gray-200 text-black">
                        Unit {unitnumber} - {calculateTransformerPower(assets, unitnumber)} MW
                      </h2>
                      <div className="flex flex-wrap">
                        {Object.keys(organizedData[unitnumber])
                          .sort((a, b) => parseInt(a) - parseInt(b))
                          .map(feedernumber => (
                            <div key={feedernumber} className="m-2 p-2 border border-gray-200 rounded-lg w-24">
                              <h3 className="text-md font-semibold dark:text-gray-200 text-black">
                                Feeder {feedernumber}
                              </h3>
                              <hr className="mt--2 border-gray-300 dark:border-gray-700" />
                              <ul className="list-none pl-0">
                                {organizedData[unitnumber][feedernumber]
                                  .sort((a, b) => a.shortname.localeCompare(b.shortname))
                                  .map(asset => {
                                    const { styles, text } = getColorClass(asset.ieccode, asset.quality);
                                    return (
                                      <li
                                        key={asset.assetid}
                                        className={`${styles} mt-1`}
                                        title={text}
                                        onClick={() => toggleAssetStatus(unitnumber, feedernumber, asset.assetid)}
                                      >
                                        {asset.shortname}
                                      </li>
                                    );
                                  })}
                              </ul>
                              <hr className="mt--2 border-gray-300 dark:border-gray-700" />
                              <div className="text-center text-sm dark:text-gray-200 text-black cursor-pointer">
                                {calculateFeederPowerActual(organizedData[unitnumber][feedernumber])} MW
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-center text-xl dark:text-gray-200 text-black">Feeder Breakdown Coming Soon</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeederBreakdown;
