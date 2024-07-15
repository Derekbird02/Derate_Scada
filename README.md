{site.automation ? (
              <div className="flex justify-center">
                {Object.keys(organizedData)
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map(unitnumber => (
                    <div key={unitnumber} className="m-4 p-4 border border-gray-300 rounded-lg">
                      <h2 className="text-lg font-bold dark:text-gray-200 text-black">
                        Unit {unitnumber} - {calculateTransformerPower(assets, unitnumber)} MW
                      </h2>
                      <div className="flex flex-wrap">
                        {Object.keys(organizedData[unitnumber])
                          .sort((a, b) => parseInt(a) - parseInt(b))
                          .map(feedernumber => (
                            <div key={feedernumber} className="m-2 p-2 border border-gray-200 rounded-lg w-24">
                              <h3 className="text-md font-semibold dark:text-gray-200 text-black">
                                Feeder {feedernumber}
                              </h3>
                              <hr className="mt--2 border-gray-300 dark:border-gray-700" />
                              <ul className="list-none pl-0">
                                {organizedData[unitnumber][feedernumber]
                                  .sort((a, b) => a.shortname.localeCompare(b.shortname))
                                  .map(asset => (
                                    <li
                                      key={asset.assetid}
                                      className="mt-1"
                                      onClick={() => toggleAssetStatus(unitnumber, feedernumber, asset.assetid)}
                                    >
                                      {getColorClass(asset.ieccode, asset.quality, asset.shortname)}
                                    </li>
                                  ))}
                              </ul>
                              <hr className="mt--2 border-gray-300 dark:border-gray-700" />
                              <div className="text-center text-sm dark:text-gray-200 text-black cursor-pointer">
                                {calculateFeederPowerActual(organizedData[unitnumber][feedernumber])} MW
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-center text-xl dark:text-gray-200 text-black"> Feeder Breakdown Coming Soon</p>
            )}
