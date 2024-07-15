const toggleFeederAssets = (unitnumber, feedernumber) => {
    const allAssets = organizedData[unitnumber][feedernumber];

    // Determine the current state of the feeder assets
    const currentFeederState = determineCurrentFeederState(allAssets);

    // Toggle based on the current state
    let updatedAssets = [];
    switch (currentFeederState) {
      case "original":
        updatedAssets = allAssets.map(asset => ({
          ...asset,
          ieccode: asset.originalIecCode,
          quality: asset.originalQuality
        }));
        break;
      case "online":
        updatedAssets = allAssets.map(asset => ({
          ...asset,
          ieccode: 1,
          quality: 3
        }));
        break;
      case "faulted":
        updatedAssets = allAssets.map(asset => ({
          ...asset,
          ieccode: 6,
          quality: 3
        }));
        break;
      default:
        updatedAssets = allAssets;
    }

    setAssets(prevAssets =>
      prevAssets.map(asset => {
        const updatedAsset = updatedAssets.find(a => a.assetid === asset.assetid);
        return updatedAsset || asset;
      })
    );
  };

  const determineCurrentFeederState = (feederAssets) => {
    const firstAsset = feederAssets[0];
    if (!firstAsset) return "original";

    if (firstAsset.ieccode === firstAsset.originalIecCode && firstAsset.quality === firstAsset.originalQuality) {
      return "original";
    } else if (firstAsset.ieccode === 1 || firstAsset.ieccode === 13) {
      return "online";
    } else if (firstAsset.ieccode === 6) {
      return "faulted";
    } else {
      return "unknown";
    }
  };
