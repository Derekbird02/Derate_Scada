(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white md:mb-6">
              General Information
            </h2>
            <div className="rounded-lg border col-span-1 border-gray-100 bg-gray-50 p-4 md:p-6 dark:border-gray-700 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-800 mb-6 md:mb-8">
              <div className="flow-root">
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
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white md:mb-6">
              Contact Information
            </h2>
            <div className="rounded-lg border col-span-1 border-gray-100 bg-gray-50 p-4 md:p-6 dark:border-gray-700 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-800 mb-6 md:mb-8">
              <div className="flow-root">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <dl className="pb-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                      ISO / Balancing Authority
                    </dt>
                    <div className="space-y-4 whitespace-pre-wrap text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                      {selectedSite?.ba}
                    </div>
                  </dl>

                  <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                      Reliability Coordinator
                    </dt>
                    <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                      {selectedSite?.rc}
                    </dd>
                  </dl>

                  <dl className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <dt className="whitespace-nowrap text-base font-semibold text-gray-900 dark:text-white">
                      Transmission Operator / Utility
                    </dt>
                    <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                      {selectedSite?.tou}
                    </dd>
                  </dl>

                  <div className="space-y-4 p-6">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Site / Customer
                    </h4>

                    <div className="space-y-4 whitespace-pre-wrap text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right">
                      {selectedSite?.site_contacts}
                      <dl className="flex mt-3 items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700"></dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-bold dark:text-white">
              Site Guidelines & Special Notes
            </h3>
            <div id="accordion-flush" data-accordion="collapse">
              <h2 id="accordion-flush-heading-1">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                  onClick={() => toggleAccordion(1)}
                >
                  <span>Site-Specific Notes</span>
                  <svg className={`w-5 h-5 ${ activeIndex === 1 ? "rotate-180" : "" } shrink-0`} aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                  </svg>
                </button>
              </h2>
              <div
                id="accordion-flush-body-1"
                className={`py-5 border-b border-gray-200 dark:border-gray-700 ${
                  activeIndex === 1 ? "block" : "hidden"
                }`}
              >
                <div>
                  {selectedSite?.site_specific_notes &&
                    (Array.isArray(selectedSite?.site_specific_notes) ? (
                      selectedSite?.site_specific_notes.map((note, index) => (
                        <p
                          key={index}
                          className="mb-2 text-gray-500 dark:text-gray-400"
                        >
                          {note}
                        </p>
                      ))
                    ) : (
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {JSON.parse(selectedSite?.site_specific_notes).map(
                          (note, index) => (
                            <span key={index}>{note}</span>
                          )
                        )}
                      </p>
                    ))}
                </div>
              </div>
              <h2 id="accordion-flush-heading-2">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                  onClick={() => toggleAccordion(2)}
                >
                  <span>Site-Specific Known Issues</span>
                  <svg className={`w-5 h-5 ${ activeIndex === 2 ? "rotate-180" : "" } shrink-0`} aria-hidden="true" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                  </svg>
                </button>
              </h2>
              <div
                id="accordion-flush-body-2"
                className={`py-5 border-b border-gray-200 dark:border-gray-700 ${
                  activeIndex === 2 ? "block" : "hidden"
                }`}
              >
                <div>
                  {selectedSite?.known_alarms &&
                    (Array.isArray(selectedSite?.known_alarms) ? (
                      selectedSite?.known_alarms.map((alarm, index) => (
                        <p
                          key={index}
                          className="mb-2 text-gray-500 dark:text-gray-400"
                        >
                          {alarm}
                        </p>
                      ))
                    ) : (
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {JSON.parse(selectedSite?.known_alarms).map(
                          (alarm, index) => (
                            <span key={index}>{alarm}</span>
                          )
                        )}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <h3 className="mb-4 text-lg font-bold dark:text-white">
                  Document Resources
                </h3>
                <ul
                  role="list"
                  className="mt-4 space-y-2 text-primary-700 dark:text-primary-500"
                >
                  {selectedSite?.associated_documents &&
                    Array.isArray(selectedSite?.associated_documents) &&
                    selectedSite?.associated_documents.map(
                      (document, index) => (
                        <li key={index}>
                          <a
                            href={document.document_url}
                            className="hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {document.document_name}{" "}
                          </a>
                        </li>
                      )
                    )}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold dark:text-white">
                  Outage Specifics
                </h3>
                <ul
                  role="list"
                  className="mt-4 space-y-2 text-primary-700 dark:text-primary-500"
                >
                  {selectedSite?.outage_specifics &&
                  Array.isArray(selectedSite?.outage_specifics) &&
                  selectedSite?.outage_specifics.length > 0 ? (
                    selectedSite?.outage_specifics.map((outage, index) => (
                      <li key={index}>
                        <a
                          href={outage.outage_url}
                          className="hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {outage.outage_name}
                        </a>
                      </li>
                    ))
                  ) : (
                    <li>Not Applicable</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
