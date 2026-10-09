const express = require('express');
const mysql = require('mysql');
const app = express();

// VULNERABILITY 1: Hardcoded Secret
const API_KEY = "1234567890abcdef1234567890abcdef";

// VULNERABILITY 2: SQL Injection
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: 'password' });

app.get('/users', (req, res) => {
    // Penulisan query dipisah agar Semgrep mendeteksi perpindahan data kotor (tainted data)
    const q = "SELECT * FROM users WHERE id = '" + req.query.id + "'";
    connection.query(q, (error, results) => {
        res.send(results);
    });
});

app.listen(3000);
