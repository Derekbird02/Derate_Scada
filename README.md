<div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-4 py-3">Park Name</th>
                                <th className="px-4 py-3">Device Name</th>
                                <th className="px-4 py-3">Variable Name</th>
                                <th className="px-4 py-3">Value</th>
                                <th className="px-4 py-3">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                        {paginatedData.map((item, index) => {
                            let displayValue;
                            if (item.unit == "null") {
                            if (item.value_string === "1") displayValue = "Forced True";
                            else if (item.value_string === "0") displayValue = "Forced False";
                            else displayValue = item.value_string;
                            } else {
                            displayValue = `${item.value_string} ${item.unit}`;
                            }

                            return (
                            <tr key={index} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="px-4 py-3">{item.park_name}</td>
                                <td className="px-4 py-3">{item.device_name}</td>
                                <td className="px-4 py-3">{item.variable_name}</td>
                                <td className="px-4 py-3">{displayValue}</td>
                                <td className="px-4 py-3">{item.insert_dttm}</td>
                            </tr>
                            );
                        })}

                            {[...Array(rowsPerPage - paginatedData.length)].map((_, index) => (
                                <tr key={`empty-${index}`} className="border-b dark:border-gray-600">
                                    <td className="px-4 py-3 font-normal whitespace-nowrap dark:text-white">
                                        <span className="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 inline-block w-[100%]"></span>
                                    </td>
                                    <td className="px-4 py-3 font-normal whitespace-nowrap dark:text-white">
                                        <span className="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 inline-block w-[100%]"></span>
                                    </td>
                                    <td className="px-4 py-3 font-normal whitespace-nowrap dark:text-white">
                                        <span className="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 inline-block w-[100%]"></span>
                                    </td>
                                    <td className="px-4 py-3 font-normal whitespace-nowrap dark:text-white">
                                        <span className="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 inline-block w-[100%]"></span>
                                    </td>
                                    <td className="px-4 py-3 font-normal whitespace-nowrap dark:text-white">
                                        <span className="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 inline-block w-[100%]"></span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
