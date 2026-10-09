const express = require('express');
const mysql = require('mysql');
const app = express();

// VULNERABILITY 1: Hardcoded Secret (Menggunakan format Generic API Key 32-karakter)
const API_KEY = "1234567890abcdef1234567890abcdef";

// VULNERABILITY 2: SQL Injection (Injeksi langsung tanpa filter)
const db = mysql.createConnection({ host: 'localhost', user: 'root', password: 'password123' });

app.get('/users', (req, res) => {
    db.query("SELECT * FROM users WHERE id = " + req.query.id, (err, result) => {
        res.send(result);
    });
});

app.listen(3000);
