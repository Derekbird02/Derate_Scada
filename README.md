import { useState } from "react";

const FrequencyEditModal = ({ onClose, asset }) => {
  const [dayFreq, setDayFreq] = useState(asset.one_day);
  const [weekFreq, setWeekFreq] = useState(asset.one_week);


  if (!asset) return null;

  const handleOptionDayChange = (e) => {
    setDayFreq(e.target.value);
  }

  const handleOptionWeekChange = (e) => {
    setWeekFreq(e.target.value);
  }

  const handleUpdate = () => {
      console.log("Updated Row:", {
        emcode: asset.emcode,
        platform: asset.platform,
        one_day: dayFreq,
        one_week: weekFreq,
      });
      onClose();
    };
  
    const handleDelete = () => {
      const confirm = window.confirm("Are you sure you want to delete this entry?");
      if (confirm) {
        console.log("Deleted Row:", {
          emcode: asset.emcode,
          platform: asset.platform,
        });
        onClose();
      }
    };


  return (
    <div
      id="select-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative border border-spacing-1 border-gray-400 dark:border-gray-600 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Change/Remove EM Frequency
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <div className="flow-root">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <dl className="pb-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                  <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                    EM Code
                  </dt>
                  <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                    {asset.emcode}
                  </dd>
                </dl>

                <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                  <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                    Platform
                  </dt>
                  <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                    {asset.platform}
                  </dd>
                </dl>

                <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                  <dt className="whitespace-nowrap text-base font-semibold text-gray-900 dark:text-white">
                    One Day
                  </dt>
                  <dd
                    className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right"
                  >
                    <select 
                      id="countries" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={dayFreq}
                      onChange={handleOptionDayChange}
                    >
                      <option selected disabled value="">Choose Daily Frequency</option>
                      {[...Array(41).keys()].map((num) => (
                        <option key={num} value={num}>{num}</option>
       
                      ))}
                    </select>
                  </dd>
                </dl>

                <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                  <dt className="whitespace-nowrap text-base font-semibold text-gray-900 dark:text-white">
                    One Week
                  </dt>
                  <dd
                    className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right"
                  >
                    <select 
                      id="countries" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={weekFreq}
                      onChange={handleOptionWeekChange}
                    >
                      <option selected disabled value="">Choose Weekly Frequency</option>
                      {[...Array(41).keys()].map((num) => (
                        <option key={num} value={num}>{num}</option>
       
                      ))}
                    </select>
                  </dd>
                </dl>
              </div>
            </div>

            <div className="flex w-full mt-3">
              <button
                type="button"
                onClick={handleUpdate}
                disabled={
                    dayFreq === asset?.one_day &&
                    weekFreq === asset?.one_week
                  }
                className={`font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white inline-flex w-1/2 justify-center ${
                    dayFreq !== asset?.one_day ||
                    weekFreq !== asset?.one_week
                    ? "bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Update
              </button>

              <button
                type="button"
                className="ml-5 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white inline-flex w-1/2 justify-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default FrequencyEditModal;
