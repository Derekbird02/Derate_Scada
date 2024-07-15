useEffect(() => {
    const feederCount = Object.keys(organizedData).reduce((count, unitnumber) => {
      return count + Object.keys(organizedData[unitnumber]).length;
    }, 0);

    const feederArray = Array.from({ length: feederCount }, () => 'o');
    console.log('Array of o\'s:', feederArray);
  }, [organizedData]);
