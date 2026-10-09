const express = require('express');
const mysql = require('mysql');
const app = express();

// VULNERABILITY 1: Hardcoded Secret (Menggunakan format Token GitHub asli agar pasti terdeteksi)
const github_token = "ghp_1234567890abcdef1234567890abcdef1234";

// VULNERABILITY 2: SQL Injection (Injeksi input user langsung pada string query)
const db = mysql.createConnection({ host: 'localhost', user: 'root', password: 'password123' });

app.get('/user', (req, res) => {
    db.query("SELECT * FROM users WHERE id = " + req.query.id, (err, result) => {
        res.send(result);
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));