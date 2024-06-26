import React, { useState, useEffect } from 'react';
import { GrUserWorker } from "react-icons/gr";
import { BsFillCloudSunFill } from "react-icons/bs";
import { TbWorldLongitude, TbWorldLatitude, TbBuildingFactory2 } from "react-icons/tb";
import { FaWind } from "react-icons/fa";
import { LiaTemperatureLowSolid } from "react-icons/lia";
import { GiPowerGenerator, GiSolarPower, GiWindTurbine } from "react-icons/gi";

const SiteDrawer = ({ site, onClose, setCreateAlertModal }) => {
  const [activeAccordion, setActiveAccordion] = useState(true);

  const toggleAccordion = () => {
    setActiveAccordion(!activeAccordion);
  };

  useEffect(() => {
    setActiveAccordion(true);
  }, [site]);

  return (
    <div
      id="drawer-right"
      className="w-1/4 border-l-2 border-gray-300 fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-white dark:bg-gray-800"
      tabIndex="-1"
    >
      <h5 className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
        <GiWindTurbine className="w-5 h-5 mr-2 dark:text-white text-black"/>
        {site.siteName}
      </h5>

      <div className="absolute top-2.5 right-12 flex space-x-2">
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => setCreateAlertModal(true)}
        >
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1v12M1 7h12"/>
          </svg>
          <span className="sr-only">Create Alert</span>
        </button>

        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => alert('Feeder Breakout Coming Soon')}
        >
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
          </svg>

          <span className="sr-only">View Details</span>
        </button>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span className="sr-only">Close menu</span>
      </button>

      {/* Site Information */}
      <div className="mt-5 bg-gray-50 dark:bg-gray-800 text-blue-600 dark:text-white mb-5">
        <div>
          <button
            type="button"
            onClick={toggleAccordion}
            className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 rounded-t-xl dark:border-gray-700 dark:text-gray-400 ${
              activeAccordion ? "active" : ""
            }`}
            aria-expanded={activeAccordion}
          >
            <span>Site Data</span>
            <svg
              data-accordion-icon
              className="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </div>
        <div
          className={`p-5 border border-gray-200 dark:border-gray-700 rounded-b-xl ${
            activeAccordion ? "block" : "hidden"
          }`}
        >
          <div className="grid gap-4 mb-2 sm:grid-cols-2 sm:gap-6 sm:mb-4">
            <dl>
              <dd className="flex items-center mb-1 font-xs text-gray-500 dark:text-white sm:mb-4">
                <TbBuildingFactory2 className="w-5 h-5" title="Site Rated Power"/>: {site.tHsl.reduce((acc, value) => acc + Number(value), 0)} MW
              </dd>

              {site.tHsl.map((value, index) => (
                <dd key={index} className="flex items-center mb-1 font-xs text-gray-500 dark:text-white sm:mb-4">
                  <div className="flex items-center">
                    <div className="relative flex items-center">
                      <GiPowerGenerator className="w-5 h-5 " title={`Transformer ${index + 1} HSL`} />
                      <sub className="text-xs">{index + 1}</sub>
                    </div>
                    <span className="ml-2">{value} MW</span>
                  </div>
                </dd>
              ))}
            </dl>

            <dl>
              <dt className="sr-only">Wind</dt>
              <dd className="flex items-center mb-1 font-xs text-gray-500 dark:text-white sm:mb-4">
                <FaWind className="mr-2 w-5 h-5" title="Wind Speed" />
                 m/s
              </dd>

              <dt className="sr-only">Temp</dt>
              <dd className="flex items-center mb-1 font-xs text-gray-500 dark:text-white sm:mb-4">
                <LiaTemperatureLowSolid className="mr-2 w-5 h-5" title="Temperature" />
                 °C
              </dd>

              <dt className="sr-only">Clouds</dt>
              <dd className="flex items-center mb-1 font-xs text-gray-500 dark:text-white sm:mb-4">
                <BsFillCloudSunFill className="mr-2 w-5 h-5" title="Cloud Cover" />
                 %
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                State
              </th>
              <th scope="col" className="px-6 py-3">
                Rated
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows go here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SiteDrawer;
