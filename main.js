const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Import the cors module
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse incoming JSON data

// MySQL connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abdennour", 
    database: "loginone"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL database!");
});

// Handle POST request for /insert
app.post('/insert', (req, res) => {
    const { username, password } = req.body; // Extract username and password from request
    const query = `INSERT INTO info (username, password) VALUES (?, ?)`;
    connection.query(query, [username, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to insert data' });
        }
        res.json({ message: `Thank you ${username} for login the page`});
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
