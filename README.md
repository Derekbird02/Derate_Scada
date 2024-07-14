import React, { useState } from "react";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import DemoContainer from "@mui/lab/DemoContainer";

const MyForm = ({ site }) => {
  const [tHslValues, setTHslValues] = useState(Array(site.tHsl.length).fill(""));
  const [expireDate, setExpireDate] = useState(null);
  const [userName, setUserName] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  const handleTHslChange = (index, event) => {
    const newValues = [...tHslValues];
    newValues[index] = event.target.value;
    setTHslValues(newValues);
  };

  const handleDateUpdate = (newValue) => {
    setExpireDate(newValue);
  };

  const validate = () => {
    const newErrors = {};
    tHslValues.forEach((value, index) => {
      if (!value) newErrors[`t${index + 1}`] = "This field is required";
    });
    if (!expireDate) newErrors.expireDate = "This field is required";
    if (!userName) newErrors.userName = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      // Form submission logic
      console.log({
        tHslValues,
        expireDate,
        userName,
        notes,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {site.tHsl.map((_, index) => (
          <div key={index}>
            <label
              htmlFor={`t${index + 1}`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              T{index + 1} HSL
            </label>
            <input
              type="text"
              name={`t${index + 1}`}
              id={`t${index + 1}`}
              value={tHslValues[index]}
              onChange={(event) => handleTHslChange(index, event)}
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                errors[`t${index + 1}`] ? "border-red-500" : "border-gray-300"
              } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
              placeholder="Enter HSL in MW"
              required
            />
            {errors[`t${index + 1}`] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[`t${index + 1}`]}
              </p>
            )}
          </div>
        ))}
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker
            label="Start Up Date and Time"
            value={expireDate}
            onChange={handleDateUpdate}
            ampm={false}
            timeSteps={{ hours: 1, minutes: 1 }}
            className={`block p-2.5 w-full text-sm text-gray-100 bg-gray-50 rounded-lg border focus:ring-primary-500 focus:border-primary-500 ${
              errors.expireDate ? "border-red-500" : "border-gray-300"
            } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
            sx={{
              svg: { color: "#787777" },
              input: { color: "#787777" },
              label: { color: "#787777" },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      {errors.expireDate && (
        <p className="text-red-500 text-xs mt-1">{errors.expireDate}</p>
      )}

      <input
        type="text"
        name="userName"
        id="userName"
        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
          errors.userName ? "border-red-500" : "border-gray-300"
        } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
        placeholder="Enter site name"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        required
      />
      {errors.userName && (
        <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
      )}

      <input
        type="text"
        name="notes"
        id="notes"
        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
          errors.notes ? "border-red-500" : "border-gray-300"
        } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
        placeholder="Enter notes"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
      {errors.notes && (
        <p className="text-red-500 text-xs mt-1">{errors.notes}</p>
      )}

      <button
        type="submit"
        className="text-white inline-flex items-center bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        <svg
          className="mr-1 -ml-1 w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        Create Derate
      </button>
    </form>
  );
};

export default MyForm;
