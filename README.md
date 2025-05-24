<dl className="py-4 sm:flex sm:items-start sm:justify-between sm:gap-4">
  <dt className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
    Site / Customer Contacts
  </dt>
  <dd className="mt-2 text-gray-500 dark:text-gray-400 sm:mt-0 sm:text-right w-full">
    {editState ? (
      <textarea
        rows={Math.max(3, (editSite.site_contacts || '').split(/\r?\n/).length)}
        className="w-full border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        value={editSite.site_contacts || ''}
        onChange={e =>
          setEditSite({ ...editSite, site_contacts: e.target.value })
        }
      />
    ) : (
      (selectedSite.site_contacts || '')
        .split(/\r?\n/)
        .map((line, idx) => (
          <p key={idx} className="mb-1">
            {line}
          </p>
        ))
    )}
  </dd>
</dl>
