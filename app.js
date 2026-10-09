const express = require('express');
const mysql = require('mysql');
const app = express();

// VULNERABILITY 1: Hardcoded Secret / Credentials
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'SuperSecretPassword123!' 
});

// VULNERABILITY 2: SQL Injection
app.get('/user', (req, res) => {
    const userId = req.query.id;
    const query = "SELECT * FROM users WHERE id = '" + userId + "'";
    connection.query(query, (err, result) => {
        res.send(result);
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));