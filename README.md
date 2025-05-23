<div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <dl className="pb-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                      Site Name
                    </dt>
                    <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                      {selectedSite.site_name}
                    </dd>
                  </dl>
                  <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                      Customer
                    </dt>
                    <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                      {selectedSite.customer}
                    </dd>
                  </dl>
                  <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <dt className="whitespace-nowrap text-base font-semibold text-gray-900 dark:text-white">
                      Number of Turbines
                    </dt>
                    <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                      {selectedSite.number_of_turbines}
                    </dd>
                  </dl>
                  <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <dt className="whitespace-nowrap text-base font-semibold text-gray-900 dark:text-white">
                      Rated Power
                    </dt>
                    <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                      {selectedSite.rated_power}
                    </dd>
                  </dl>
                  <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                      Voltage Schedule
                    </dt>
                    <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                      {selectedSite.voltage_schedule}
                    </dd>
                  </dl>
                  <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                      Location
                    </dt>
                    <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                      {selectedSite.location}
                    </dd>
                  </dl>
                  <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                      Timezone
                    </dt>
                    <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                      {selectedSite.timezone}
                    </dd>
                  </dl>
                  <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                      Site Software
                    </dt>
                    <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                      {selectedSite.site_software}
                    </dd>
                  </dl>
                  <dl className="pt-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                      WCS Configuration
                    </dt>
                    <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                      {Array.isArray(selectedSite["wcs_config"]) ? (
                        <div>
                          {selectedSite["wcs_config"].map((item, index) => (
                            <div key={index} className="mb-2">
                              {item}
                            </div>
                          ))}
                        </div>
                      ) : (
                        selectedSite["wcs_config"]
                      )}
                    </dd>
                  </dl>
                </div>
