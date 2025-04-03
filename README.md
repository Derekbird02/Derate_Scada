{/* Pagination Controls */}
<div className="flex justify-between items-center mt-4">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
    disabled={page === 0}
    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span className="text-gray-700 dark:text-gray-300">
    Page {page + 1} of {Math.ceil(filteredData.length / rowsPerPage)}
  </span>

  <button
    onClick={() =>
      setPage((prev) =>
        prev < Math.ceil(filteredData.length / rowsPerPage) - 1 ? prev + 1 : prev
      )
    }
    disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>
