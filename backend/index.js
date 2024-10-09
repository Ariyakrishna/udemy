const mysql = require('mysql');
const express = require('express');
const app = express();
const PORT = 3000;

// Function to create a connection to the database
const createConnection = () => {
    return mysql.createConnection({
        host: 'db',  // use the service name defined in docker-compose
        user: 'root',
        password: 'example',
        database: 'simpledb',
    });
};

// Function to connect with retry logic
const connectWithRetry = () => {
    const connection = createConnection();
    connection.connect((err) => {
        if (err) {
            console.error('Database connection failed: ', err);
            console.log('Retrying in 5 seconds...');
            setTimeout(connectWithRetry, 5000);  // Retry after 5 seconds
        } else {
            console.log('Database connected!');
            // Start the server only after successful DB connection
            app.listen(PORT, () => {
                console.log(`Backend server running at http://localhost:${PORT}`);
            });
        }
    });
};

connectWithRetry();

// Define a route to get data
app.get('/data', (req, res) => {
    const connection = createConnection();
    connection.query('SELECT * FROM messages', (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});
