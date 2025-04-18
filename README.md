vconst emcodeOptions = useMemo(() => {
  return [...new Set(data.map(item => item.emcode))];
}, [data]);

const platformOptions = useMemo(() => {
  return [...new Set(data.map(item => item.platform))];
}, [data]);

const filteredData = useMemo(() => {
  return data.filter(item => {
    return (
      (selectedEmcode ? item.emcode === selectedEmcode : true) &&
      (selectedPlatform ? item.platform === selectedPlatform : true)
    );
  });
}, [data, selectedEmcode, selectedPlatform]);
