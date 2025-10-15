app.use(express.static(path.join(__dirname, 'dist')));

/**
 * Catch-all route to serve the React app's index.html for any route
 * This supports client-side routing (React Router, etc.)
 * 
 * Added a callback to handle errors gracefully without crashing the server.
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      if (!res.headersSent) {
        res.status(err.status || 500).send('Error loading the app');
      }
    }
  });
});
