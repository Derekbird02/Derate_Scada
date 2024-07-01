import React, { useState, useEffect } from 'react';

// Function to organize data by unitnumber and feedernumber
const organizeData = (assets) => {
  const organizedData = {};

  assets.forEach(asset => {
    const { unitnumber, feedernumber, assetid } = asset;

    if (!organizedData[unitnumber]) {
      organizedData[unitnumber] = {};
    }

    if (!organizedData[unitnumber][feedernumber]) {
      organizedData[unitnumber][feedernumber] = [];
    }

    organizedData[unitnumber][feedernumber].push(assetid);
  });

  return organizedData;
};

const FeederBreakdown = ({relatedAssets}) => {
  const [organizedData, setOrganizedData] = useState({});

  useEffect(() => {
    setOrganizedData(organizeData(relatedAssets));
  }, []);

  return (
    <div className="flex flex-wrap">
      {Object.keys(organizedData).sort().map(unitnumber => (
        <div key={unitnumber} className="m-4 p-4 border border-gray-300 flex-1">
          <h2 className="text-lg font-bold">Unit {unitnumber}</h2>
          {Object.keys(organizedData[unitnumber]).sort().map(feedernumber => (
            <div key={feedernumber} className="mt-2 p-2 border border-gray-200">
              <h3 className="text-md font-semibold">Feeder {feedernumber}</h3>
              <ul className="list-none pl-0">
                {organizedData[unitnumber][feedernumber].map(assetid => (
                  <li key={assetid} className="ml-4">{assetid}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FeederBreakdown;
