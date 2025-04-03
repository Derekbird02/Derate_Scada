<tbody>
  {paginatedData.map((item, index) => {
    let displayValue = item.unit 
      ? `${item.value_string} ${item.unit}` 
      : item.value_string === "1" 
      ? "Forced True" 
      : "Forced False";

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

  {/* Add empty rows if needed */}
  {[...Array(rowsPerPage - paginatedData.length)].map((_, index) => (
    <tr key={`empty-${index}`} className="border-b dark:border-gray-600">
      <td className="px-4 py-3 text-gray-400">—</td>
      <td className="px-4 py-3 text-gray-400">—</td>
      <td className="px-4 py-3 text-gray-400">—</td>
      <td className="px-4 py-3 text-gray-400">—</td>
      <td className="px-4 py-3 text-gray-400">—</td>
    </tr>
  ))}
</tbody>
