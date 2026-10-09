const express = require('express');
const mysql = require('mysql');
const app = express();

// VULNERABILITY 1: Hardcoded Secret (AWS Key)
const AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";

// VULNERABILITY 2: SQL Injection
const db = mysql.createConnection({ host: 'localhost', user: 'root', password: 'password123' });
app.get('/users', (req, res) => {
    let username = req.query.username;
    let query = "SELECT * FROM users WHERE name = '" + username + "'";
    db.query(query, (err, result) => {
        res.send(result);
    });
});
