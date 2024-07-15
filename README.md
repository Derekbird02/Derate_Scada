import { useState, useEffect } from 'react';

// Assuming organizedData is defined somewhere
const organizedData = {
  // Define your organized data structure here
};

const MyComponent = () => {
  const [assets, setAssets] = useState([]); // Your initial assets state
  const [feedersState, setFeedersState] = useState({}); // Initial state for feeders state tracking

  // Initialize feedersState on component mount
  useEffect(() => {
    // Initialize feedersState based on organizedData structure
    const initialFeedersState = {};

    Object.keys(organizedData).forEach(unitnumber => {
      Object.keys(organizedData[unitnumber]).forEach(feedernumber => {
        initialFeedersState[`${unitnumber}-${feedernumber}`] = 'Original';
      });
    });

    setFeedersState(initialFeedersState);
  }, []);

  const toggleFeederAssets = (unitnumber, feedernumber) => {
    const allAssets = organizedData[unitnumber][feedernumber];

    setFeedersState(prevState => {
      const currentFeederState = prevState[`${unitnumber}-${feedernumber}`] || 'Original';

      let nextState;
      if (currentFeederState === 'Original') {
        nextState = 'Online';
      } else if (currentFeederState === 'Online') {
        nextState = 'Faulted';
      } else {
        nextState = 'Original';
      }

      return {
        ...prevState,
        [`${unitnumber}-${feedernumber}`]: nextState,
      };
    });

    setAssets(prevAssets =>
      prevAssets.map(asset => {
        const updatedAsset = allAssets.find(a => a.assetid === asset.assetid);

        if (!updatedAsset) {
          return asset;
        }

        if (feedersState[`${unitnumber}-${feedernumber}`] === 'Original') {
          return { ...asset, ieccode: 1, quality: 3 }; // Online
        } else if (feedersState[`${unitnumber}-${feedernumber}`] === 'Online') {
          return { ...asset, ieccode: 6, quality: 3 }; // Faulted
        } else {
          return { ...asset, ieccode: updatedAsset.originalIecCode, quality: updatedAsset.originalQuality }; // Original state
        }
      })
    );
  };

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default MyComponent;
