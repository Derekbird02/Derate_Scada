app.put('/update-derate/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { expireDate, notes, derateValues, status } = req.body;
        const derateValuesConcat = derateValues.join(',');

        let query = `UPDATE deratescada_tickets 
                     SET expiredate = $1, notes = $2, deratevalues = $3`;
        const values = [expireDate, notes, derateValuesConcat, id];

        if (status === 'close') {
            query += `, closedate = NOW()`;
        } else {
            query += `, closedate = NULL`;
        }

        query += ` WHERE id = $4 RETURNING *`;

        const result = await pool.query(query, values);

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedExpireDate = expireDate ? dayjs(expireDate).utc().format() : null;

    const updatedDerate = {
      expireDate: formattedExpireDate,
      notes,
      derateValues,
      status,
    };

    try {
      const response = await axios.put(`http://localhost:3000/update-derate/${derateTicket.id}`, updatedDerate);
      console.log(response.data);
      closeDerateModal();
    } catch (error) {
      console.error('Error updating derate:', error);
    }
  };
