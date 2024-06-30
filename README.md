// SiteData.jsx
import React from 'react';
import { FaWind } from "react-icons/fa";
import { LiaTemperatureLowSolid } from "react-icons/lia";
import { BsFillCloudSunFill } from "react-icons/bs";
import { TbBuildingFactory2 } from "react-icons/tb";
import { GiPowerGenerator } from "react-icons/gi";

const SiteDrawerInfo = ({ site, relatedAssets, toggleAccordion, activeAccordion }) => {

    const calculateSitePower = () => {
        let totalPower = 0;

        relatedAssets.forEach(asset => {
            if (asset.quality === 0) {
                return; // Skip assets with quality 0
            }

            switch (asset.ieccode) {
                case 1:
                case 3:
                case 4:
                case 14:
                case 15:
                    totalPower += asset.ratedpower;
                    break;
                case 2:
                    totalPower += asset.ratedpower / 2;
                    break;
                default:
                    // No action needed for other codes
                    break;
            }
        });

        return totalPower;
    };

    return (
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
                            <TbBuildingFactory2 className="w-5 h-5" title="Site Rated Power" />: {site.tHsl.reduce((acc, value) => acc + Number(value), 0)} MW
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
                            {calculateSitePower()} m/s
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
    );
};

export default SiteDrawerInfo;

