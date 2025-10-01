app.post("/insert-assets", async (req, res) => {
  const { assets, action, startDate, stopDate, timeZone, user } = req.body;

  if (!assets || !Array.isArray(assets) || assets.length === 0) {
    return res.status(400).json({ error: "Assets array is required" });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    let rows = [];

    for (const asset of assets) {
      if (action === "Stop & Start") {
        rows.push([817, asset, "Stop", stopDate, timeZone, user]);
        rows.push([817, asset, "Start", startDate, timeZone, user]);
      } else if (action === "Start") {
        rows.push([817, asset, "Start", startDate, timeZone, user]);
      } else if (action === "Stop") {
        rows.push([817, asset, "Stop", stopDate, timeZone, user]);
      } else {
        throw new Error(`Unknown action: ${action}`);
      }
    }

    // build placeholders
    const placeholders = rows
      .map(
        (row, i) =>
          `($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${i * 6 + 4}, $${i * 6 + 5}, $${i * 6 + 6}, now())`
      )
      .join(", ");

    const values = rows.flat();

    // single bulk insert
    await client.query(
      `
      INSERT INTO my_table (
        id, assetid, triggertext, triggerdate, information, createdby, createddate
      ) VALUES ${placeholders}
      `,
      values
    );

    await client.query("COMMIT");
    res.json({ message: `Inserted ${rows.length} rows successfully` });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Insert failed:", err);
    res.status(500).json({ error: "Insert failed" });
  } finally {
    client.release();
  }
});
