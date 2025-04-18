<div className="mb-4 items-center gap-4 sm:flex md:mb-0">
                      <Autocomplete
                        options={parkNames}
                        size="small"
                        className="block p-2.5 text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        sx={{
                            width:300,
                            svg: { color: "#FFFFFF" },
                            input: { color: "#FFFFFF" },
                            label: { color: "#FFFFFF" },
                            color:"white"
                        }}
                        value={selectedPark}
                        onChange={(event, newValue) => {
                            setSelectedPark(newValue);
                            setSelectedDevice("");
                            setPage(0);
                        }}
                        renderInput={(params) => <TextField {...params} label="Select Park" variant="outlined" />}
                    />
                    <Autocomplete
                        options={devicesForPark}
                        size="small"
                        className="block p-2.5 text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        sx={{
                            width:300,
                            svg: { color: "#FFFFFF" },
                            input: { color: "#FFFFFF" },
                            label: { color: "#FFFFFF" },
                        }}
                        value={selectedDevice}
                        onChange={(event, newValue) => setSelectedDevice(newValue)}
                        renderInput={(params) => <TextField {...params} label="Select Device" variant="outlined" disabled={!selectedPark} />}
                    />
  
                  </div>
