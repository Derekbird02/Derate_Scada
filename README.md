<Box
  sx={{
    backgroundColor: 'gray.50', // bg-gray-50
    border: '1px solid',        // border
    borderColor: 'gray.300',    // border-gray-300
    lineHeight: 'none',         // leading-none
    color: 'gray.900',          // text-gray-900
    fontSize: '0.875rem',       // text-sm
    borderRadius: '0.5rem',     // rounded-lg
    width: '100%',              // w-full
    padding: '0.625rem',        // p-2.5

    '&:focus': {
      ring: 1,                  // focus:ring-primary-500
      ringColor: 'primary.500',
      borderColor: 'primary.500', // focus:border-primary-500
    },

    // Dark mode styles
    '&.dark': {
      backgroundColor: 'gray.700',  // dark:bg-gray-700
      borderColor: 'gray.600',      // dark:border-gray-600
      placeholder: {
        color: 'gray.400',         // dark:placeholder-gray-400
      },
      color: 'white',               // dark:text-white
      '&:focus': {
        ring: 1,                    // dark:focus:ring-primary-500
        ringColor: 'primary.500',
        borderColor: 'primary.500', // dark:focus:border-primary-500
      },
    },
  }}
/>