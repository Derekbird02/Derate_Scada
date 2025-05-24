<div>
  {["Cash", "Front", "Lead"].includes(user.role) && selectedSite && (
    <div>
      {!editState ? (
        <>
          <button
            type="button"
            onClick={() => setEditState(true)}
            className="ml-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-10 h-10 inline-flex items-center justify-center dark:bg-gray-600 dark:hover:text-white"
            title="Edit"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
            </svg>
            <span className="sr-only">Edit Button</span>
          </button>

          <button
            type="button"
            className="ml-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-10 h-10 inline-flex items-center justify-center dark:bg-gray-600 dark:hover:text-white"
            title="Revisions"
          >
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm6-2a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0 0h-1a5 5 0 0 1-5-5v-.5"/>
            </svg>
            <span className="sr-only">Revision Control</span>
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              // your save logic
              setEditState(false);
            }}
            className="ml-4 text-green-600 bg-transparent hover:bg-green-100 hover:text-green-800 rounded-lg text-sm w-10 h-10 inline-flex items-center justify-center dark:bg-gray-600 dark:hover:text-white"
            title="Save"
          >
            💾
            <span className="sr-only">Save</span>
          </button>

          <button
            type="button"
            onClick={() => setEditState(false)}
            className="ml-4 text-red-600 bg-transparent hover:bg-red-100 hover:text-red-800 rounded-lg text-sm w-10 h-10 inline-flex items-center justify-center dark:bg-gray-600 dark:hover:text-white"
            title="Cancel"
          >
            ✖
            <span className="sr-only">Cancel</span>
          </button>
        </>
      )}
    </div>
  )}
</div>
