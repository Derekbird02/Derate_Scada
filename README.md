const toggleAssetStatus = (unitnumber, feedernumber, assetid) => {
    setAssets(prevAssets =>
      prevAssets.map(asset => {
        if (asset.unitnumber === unitnumber && asset.feedernumber === feedernumber && asset.assetid === assetid) {
          return { ...asset, ieccode: asset.ieccode === 1 ? 6 : 1 };
        }
        return asset;
      })
    );
  };
