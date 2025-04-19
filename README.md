<Modal open={!!editRow} onClose={() => setEditRow(null)}>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: 2,
      minWidth: 300,
      maxWidth: 400,
    }}
  >
    {editRow && (
      <>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Edit Frequency</Typography>
          <button
            onClick={() => setEditRow(null)}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              color: "#888",
            }}
          >
            ✕
          </button>
        </Box>

        <Typography variant="body2">EM Code: <b>{editRow.emcode}</b></Typography>
        <Typography variant="body2" gutterBottom>Platform: <b>{editRow.platform}</b></Typography>

        <Box mt={2}>
          <Typography>1 Day</Typography>
          <Select
            fullWidth
            value={editRow.one_day_new}
            onChange={(e) => setEditRow({ ...editRow, one_day_new: e.target.value })}
          >
            {Array.from({ length: 41 }, (_, i) => (
              <SelectItem key={i} value={i}>{i}</SelectItem>
            ))}
          </Select>
        </Box>

        <Box mt={2}>
          <Typography>7 Day</Typography>
          <Select
            fullWidth
            value={editRow.one_week_new}
            onChange={(e) => setEditRow({ ...editRow, one_week_new: e.target.value })}
          >
            {Array.from({ length: 41 }, (_, i) => (
              <SelectItem key={i} value={i}>{i}</SelectItem>
            ))}
          </Select>
        </Box>

        <Box mt={4} display="flex" justifyContent="space-between">
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" onClick={handleUpdate} disabled={!hasChanges}>
            Update
          </Button>
        </Box>
      </>
    )}
  </Box>
</Modal>




<td className="px-4 py-2">
  <button
    onClick={() => handleEditClick(row)}
    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xl"
  >
    ✎
  </button>
</td>
