const mergedData = fetchedData.map(fetchedAsset => {
      const hardcodedAsset = hardcodedAssets.find(asset => asset.assetid === fetchedAsset.assetid);
      return {
        ...fetchedAsset,
        feedernumber: hardcodedAsset ? hardcodedAsset.feedernumber : null,
        feedername: hardcodedAsset ? hardcodedAsset.feedername : null,
        unitnumber: hardcodedAsset ? hardcodedAsset.unitnumber : null,
      };
    });
