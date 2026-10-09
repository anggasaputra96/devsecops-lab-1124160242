const express = require('express');
const mysql = require('mysql');
const app = express();

// VULNERABILITY 1: Hardcoded Secret Key (SAST Violation)
const API_SECRET_KEY = "AKIAIOSFODNN7EXAMPLE";

// VULNERABILITY 2: SQL Injection (SAST Violation)
app.get('/user', (req, res) => {
    let userId = req.query.id;
    mysql.query("SELECT * FROM users WHERE id = " + userId, (err, result) => {
        res.send(result);
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));