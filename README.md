<div className="overflow-x-auto">
  <table className="w-full table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th className="px-4 py-3 w-36">Park Name</th>
        <th className="px-4 py-3 w-36">Device Name</th>
        <th className="px-4 py-3 w-48">Variable Name</th>
        <th className="px-4 py-3 w-32">Value</th>
        <th className="px-4 py-3 w-40">Timestamp</th>
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
          <tr
            key={index}
            className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <td className="px-4 py-3 w-36 truncate">{item.park_name}</td>
            <td className="px-4 py-3 w-36 truncate">{item.device_name}</td>
            <td className="px-4 py-3 w-48 truncate">{item.variable_name}</td>
            <td className="px-4 py-3 w-32 truncate">{displayValue}</td>
            <td className="px-4 py-3 w-40 truncate">{item.insert_dttm}</td>
          </tr>
        );
      })}

      {[...Array(rowsPerPage - paginatedData.length)].map((_, index) => (
        <tr key={`empty-${index}`} className="border-b dark:border-gray-600">
          <td className="px-4 py-3 w-36">
            <span className="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 inline-block w-full"></span>
          </td>
          <td className="px-4 py-3 w-36">
            <span className="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 inline-block w-full"></span>
          </td>
          <td className="px-4 py-3 w-48">
            <span className="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 inline-block w-full"></span>
          </td>
          <td className="px-4 py-3 w-32">
            <span className="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 inline-block w-full"></span>
          </td>
          <td className="px-4 py-3 w-40">
            <span className="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 inline-block w-full"></span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
