

  className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                errors[`t${index + 1}`] ? "border-red-500" : "border-gray-300"
              } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}

className={`block p-2.5 w-full text-sm text-gray-100 bg-gray-50 rounded-lg border focus:ring-primary-500 focus:border-primary-500 ${
              errors.expireDate ? "border-red-500" : "border-gray-300"
            } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}

            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
          errors.userName ? "border-red-500" : "border-gray-300"
        } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
