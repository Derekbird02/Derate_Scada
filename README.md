const [organizedData, setOrganizedData] = useState({});
  const [assets, setAssets] = useState(
    relatedAssets.map(asset => ({ ...asset, originalIecCode: asset.ieccode, originalQuality: asset.quality }))
  );
  const [feederArray, setFeederArray] = useState({});

  useEffect(() => {
    setOrganizedData(organizeData(assets));
  }, [assets]);

  useEffect(() => {
    const initialFeederArray = {};

    Object.keys(organizedData).forEach(unitnumber => {
      Object.keys(organizedData[unitnumber]).forEach(feedernumber => {
        initialFeederArray[feedernumber] = 'or';
      });
    });

    setFeederArray(initialFeederArray);
  }, [organizedData]);

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

      console.log(`Changing feeder ${feedernumber} from ${currentFeederState} to ${newFeederState} with ieccode ${newIecCode}`);

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
