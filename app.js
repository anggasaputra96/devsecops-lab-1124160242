const express = require('express');
const mysql = require('mysql');
const app = express();

// VULNERABILITY 1: Hardcoded Secret (Sudah Berhasil Terdeteksi)
const API_KEY = "1234567890abcdef1234567890abcdef";

// VULNERABILITY 2: SQL Injection (Pola standar yang diincar Semgrep)
app.post('/login', function (req, res) {
    var connection = mysql.createConnection({ host: 'localhost', user: 'root', password: 'password123' });
    
    // Aliran data kotor (tainted data) dari input user
    var username = req.body.username;
    var sqlQuery = "SELECT * FROM users WHERE user = '" + username + "'"; 
    
    // Eksekusi langsung yang memicu alarm
    connection.query(sqlQuery, function (error, results) {
        res.send(results);
    });
});

app.listen(3000);
