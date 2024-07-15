useEffect(() => {
    const feederMap = {};

    Object.keys(organizedData).forEach(unitnumber => {
      Object.keys(organizedData[unitnumber]).forEach(feedernumber => {
        feederMap[feedernumber] = 'o';
      });
    });

    console.log('Feeder Map:', feederMap);
    // You can now access feederMap[22] to get 'o' for feeder 22
  }, [organizedData]);
