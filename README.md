<div className="grid grid-cols-8 justify-center gap-2">
          {Object.keys(filteredPlatformData)
            .filter((platform) => {
              if (shownList === "DNR") {
                return platform !== "Exceptions" && platform !== "No Second Looks";
              } else if (shownList === "Exceptions"){
                return platform === "Exceptions";
              } else if (shownList === "No Second Looks"){
                return platform === "No Second Looks";
              }
            })
            .map((platform) => (
              <div key={platform} className="border p-4 rounded-md">
                <h2 title={platform} className="mb-2 text-sm text-white content-center text-center border-b border-gray-700 break-words h-16 w-full">
                  {platform}
                </h2>
                <div>
                  {filteredPlatformData[platform].map(({ emcode }, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 ${getColorClass(
                        platform
                      )}`}
                      role="alert"
                    >
                       {/* onClick={openModal} v */}
                      <svg className="flex-shrink-0 inline w-4 h-4 me-3 cursor-pointer dark:hover:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium">{emcode}</span>
                      </div>
                      {[
                        "L3: Global Fleet Support Engineer",
                        "Fleet Management",
                        "Development Team",
                      ].includes(user.role) && (
                        <button
                          onClick={() => openDeleteModal(emcode, platform)}
                          type="button"
                          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                          data-dismiss-target="#toast-default"
                          aria-label="Close"
                        >
                          <span className="sr-only">Close</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
