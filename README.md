app.get('/platform-codes', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, code, platform FROM your_table ORDER BY platform, code ASC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
