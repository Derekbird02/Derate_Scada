<td className="px-4 py-2">
  <button
    onClick={(e) => handleMenuOpen(e, index)}
    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xl"
  >
    ⋮
  </button>
  {menuIndex === index && (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          console.log("Edit clicked:", row);
          handleMenuClose();
        }}
      >
        Edit
      </MenuItem>
      <MenuItem
        onClick={() => {
          console.log("Delete clicked:", row);
          handleMenuClose();
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  )}
</td>
