const toggleFeederAssets = (unitnumber, feedernumber) => {
    const allAssets = organizedData[unitnumber][feedernumber];
    const currentFeederState = feederArray[feedernumber];

    let newIecCode;
    let newFeederState;

    if (currentFeederState === 'or') {
      newIecCode = 1; // Online
      newFeederState = 'on';
    } else if (currentFeederState === 'on') {
      newIecCode = 6; // Faulted
      newFeederState = 'fa';
    } else if (currentFeederState === 'fa') {
      newIecCode = 'original'; // Original state
      newFeederState = 'or';
    }

    setAssets(prevAssets =>
      prevAssets.map(asset => {
        const updatedAsset = allAssets.find(a => a.assetid === asset.assetid);

        if (!updatedAsset) {
          return asset;
        }

        if (newIecCode === 'original') {
          return { ...asset, ieccode: asset.originalIecCode, quality: asset.originalQuality };
        } else {
          return { ...asset, ieccode: newIecCode, quality: 3 };
        }
      })
    );

    setFeederArray(prevFeederArray => ({
      ...prevFeederArray,
      [feedernumber]: newFeederState
    }));
  };
