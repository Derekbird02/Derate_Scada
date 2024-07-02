<div className="flex justify-center m-5">
  <div
    id="defaultModal"
    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
  >
    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 border border-gray-600">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 className="inline-flex items-center text-lg font-semibold text-gray-900 dark:text-white">
            {site.siteName} - Feeder Breakdown
          </h3>
          <button
            onClick={() => setFeederBreakdownModal(false)}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {site.automation ? (
          <div className="flex overflow-auto">
            {Object.keys(organizedData).sort((a, b) => parseInt(a) - parseInt(b)).map(unitnumber => (
              <div key={unitnumber} className="m-4 p-4 border border-gray-300 flex-none rounded-lg w-72">
                <h2 className="text-lg font-bold dark:text-gray-200 text-black">Unit {unitnumber}</h2>
                <div className="flex overflow-auto">
                  {Object.keys(organizedData[unitnumber]).sort((a, b) => parseInt(a) - parseInt(b)).map(feedernumber => (
                    <div key={feedernumber} className="m-2 p-2 border border-gray-200 flex-none w-40 rounded-lg">
                      <h3 className="text-md font-semibold dark:text-gray-200 text-black">Feeder {feedernumber}</h3>
                      <ul className="list-none pl-0">
                        {organizedData[unitnumber][feedernumber]
                          .sort((a, b) => a.shortname.localeCompare(b.shortname))
                          .map(asset => (
                            <li key={asset.assetid} className="mt-1">
                              {getColorClass(asset.ieccode, asset.quality, asset.shortname)}
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl dark:text-gray-200 text-black">Feeder Breakdown Coming Soon</p>
        )}
      </div>
    </div>
  </div>
</div>
