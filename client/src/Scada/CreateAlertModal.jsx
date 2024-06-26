import React, { useState } from 'react';
import { GiSnail } from "react-icons/gi";

const CreateAlertModal = ({ site, setCreateAlertModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    tHsl: site.tHsl.map(() => '') // Initialize an array of empty strings with the same length as site.tHsl
  });

  const handleInputChange = (index, event) => {
    const newTHsl = [...formData.tHsl];
    newTHsl[index] = event.target.value;
    setFormData({
      ...formData,
      tHsl: newTHsl,
    });
  };

  const handleDateChange = (event) => {
    setFormData({
      ...formData,
      date: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add form submission logic here
    console.log(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center m-5">
      <div
        id="defaultModal"
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-600">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="inline-flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                <GiSnail className="w-5 h-5 mr-2 dark:text-white text-black"/>Create Derate For {site.siteName}
              </h3>
              <button
                onClick={() => setCreateAlertModal(false)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                {site.tHsl.map((_, index) => (
                  <div key={index}>
                    <label htmlFor={`t${index + 1}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      T{index + 1} HSL
                    </label>
                    <input
                      type="text"
                      name={`t${index + 1}`}
                      id={`t${index + 1}`}
                      value={formData.tHsl[index]}
                      onChange={(event) => handleInputChange(index, event)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter HSL in MW"
                      required
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Valid Until Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleDateChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="MM/DD/YYYY"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="text-white inline-flex items-center bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                </svg>
                Create Derate
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAlertModal;
