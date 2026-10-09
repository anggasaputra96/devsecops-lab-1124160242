const express = require('express');
const mysql = require('mysql');
const app = express();

// VULNERABILITY 1: Hardcoded Secret (Generic API Key)
const API_KEY = "1234567890abcdef1234567890abcdef";

const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: 'password' });

// VULNERABILITY 2: SQL Injection (Pola A - Template Literal)
app.get('/search', (req, res) => {
    connection.query(`SELECT * FROM items WHERE name = '${req.query.q}'`, (err, results) => {
        res.send(results);
    });
});

// VULNERABILITY 3: SQL Injection (Pola B - String Concatenation)
app.post('/login', (req, res) => {
    let sql = "SELECT * FROM users WHERE username = '" + req.body.user + "'";
    connection.query(sql, (err, results) => {
        res.send(results);
    });
});

app.listen(3000);
