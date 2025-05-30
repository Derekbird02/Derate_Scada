<div id="reviews" role="tabpanel">
      <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 md:p-6">

            <div className="items-center justify-between pb-4 md:flex">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white md:mb-0">
                Development Team - Active Ticket Overview
                <span className="ms-2 text-lg font-medium text-gray-500 dark:text-gray-400">
                  <div className="flex items-center flex-1 space-x-4 text-sm mt-1">
                    <p>
                      <span className="text-gray-500">Pending Tickets: </span>
                      <span className="dark:text-white">
                        
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-500">Completed Tickets: </span>
                      <span className="dark:text-white">
                        
                      </span>
                    </p>
                  </div>
                </span>
              </h2>
            </div>

            <div className="mb-4 items-center gap-4 flex justify-between">
              <div className="flex">
                <Autocomplete
                  options={emcodeOptions}
                  value={selectedEmcode}
                  onChange={(e, newValue) => {
                    setSelectedEmcode(newValue);
                  }}
                  size="small"
                  sx={{
                    width: 300,
                    svg: { color: "#FFFFFF" },
                    input: { color: "#FFFFFF" },
                    label: { color: "#FFFFFF" },
                    color: "white",
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select EM Code"
                      variant="outlined"
                    />
                  )}
                  className="block p-2.5 text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleAddModal}
                  className="mr-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:bg-gray-600 dark:hover:text-white"
                  title="Add Code"
                >
                  <svg className="w-5 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1v12M1 7h12" />
                  </svg>
                  <span className="sr-only">Create Alert</span>
                </button>
              </div>
            </div>

            <div className="rounded">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-3">EM Code</th>
                    <th className="px-4 py-3">Platform</th>
                    <th className="px-4 py-3">1 Day</th>
                    <th className="px-4 py-3">1 Week</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(grouped).map(([emcode, rows]) => (
                    <React.Fragment key={emcode}>
                      <tr
                        className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => toggleRow(emcode)}
                      >
                        <td className="p-2 flex items-center gap-1 font-medium text-gray-300">
                          {openRows[emcode] ? (
                            <svg class="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                              <path fill-rule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clip-rule="evenodd" />
                            </svg>
                          ) : (
                            <svg class="w-6 h-6 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
                              <path fill-rule="evenodd" d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z" clip-rule="evenodd" />
                            </svg>
                          )}
                          {emcode}
                        </td>
                        <td colSpan={4} className="p-2 italic text-gray-400">
                          {openRows[emcode]
                            ? "Click to hide platforms"
                            : "Click to view platforms"}
                        </td>
                      </tr>

                      {/* Platform rows */}
                      {openRows[emcode] &&
                        rows.map((platformRow, i) => (
                          <tr
                            key={i}
                            className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <td className="p-2 pl-6 ">
                              <svg class="w-6 h-6 text-gray-800 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                              </svg>
                            </td>
                            <td className="p-2">{platformRow.platform}</td>
                            <td className="p-2">{platformRow.one_day}</td>
                            <td className="p-2">{platformRow.one_week}</td>
                            <td className="px-4 py-2">
                              <button
                                onClick={() => handleEditClick(platformRow)}
                                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xl"
                              >
                                <svg className="w-5 h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            {showModal && (
              <FrequencyEditModal
                onClose={handleCloseModal}
                frequencyData={frequencyData}
                asset={editRow}
                mode={modalFunction}
                fetchData={fetchData}
              />
            )}
          </div>
        </div>
      </section>
    </div>
