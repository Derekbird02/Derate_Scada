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
