const validate = () => {
    const newErrors = {};
    tHslValues.forEach((value, index) => {
      if (!value) newErrors[`t${index + 1}`] = "This field is required";
    });
    if (!expireDate) newErrors.expireDate = "This field is required";
    if (!userName) newErrors.userName = "This field is required";
    if (!notes) newErrors.notes = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
