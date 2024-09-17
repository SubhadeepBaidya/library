const express = require('express');
const db = require('../models/db');
const router = express.Router();

router.post('/add', (req, res) => {
    const { title, author, published_date } = req.body;
    db.run('INSERT INTO books (title, author, published_date, status) VALUES (?, ?, ?, ?)', [title, author, published_date, 'available'], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Book added successfully' });
    });
});

router.get('/list', (req, res) => {
    db.all('SELECT * FROM books', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;
