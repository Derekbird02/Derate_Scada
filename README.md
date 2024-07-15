const toggleFeederAssets = (unitnumber, feedernumber) => {
    setFeederArray(prevFeederArray => {
      const currentFeederState = prevFeederArray[feedernumber];
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
          if (asset.unitnumber === unitnumber && asset.feedernumber === feedernumber) {
            if (newIecCode === 'original') {
              return { ...asset, ieccode: asset.originalIecCode, quality: asset.originalQuality };
            } else {
              return { ...asset, ieccode: newIecCode, quality: 3 };
            }
          }
          return asset;
        })
      );

      return {
        ...prevFeederArray,
        [feedernumber]: newFeederState
      };
    });
  };
