const insertTicket = async (ticket) => {
    const insertQuery = `
        INSERT INTO derate_scada_tickets (ticket_id, description, created_at)
        VALUES ($1, $2, $3)
    `;
    try {
        const res = await pool2.query(insertQuery, [ticket.ticketId, ticket.description, ticket.createdAt]);
        console.log('Insert successful:', res);
    } catch (err) {
        console.error('Error executing insert query:', err);
        throw err;
    }
};

// Endpoint to handle the insert operation
app.post('/add-ticket', async (req, res) => {
    const newTicket = req.body;
    try {
        await insertTicket(newTicket);
        res.status(200).send('Ticket inserted successfully');
    } catch (err) {
        res.status(500).send('Error inserting ticket');
    }
});
