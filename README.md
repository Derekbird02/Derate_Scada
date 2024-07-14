const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedExpireDate = expireDate ? dayjs(expireDate).utc().format() : null; // Format the date to ISO 8601 UTC

    const newDerate = {
      siteId: site.siteId,
      siteName: site.siteName,
      tHsl: tHslValues,
      expireDate: formattedExpireDate,
      notes,
      userName,
    };

    try {
      const response = await axios.post('http://localhost:3000/create-derate', newDerate);
      console.log(response.data);
      setCreateAlertModal(false);
    } catch (error) {
      console.error('Error creating derate:', error);
    }
  };
