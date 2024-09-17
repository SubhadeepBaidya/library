const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./library.db');

db.serialize(() => {
    // Create users table
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)");

    // Create books table
    db.run("CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, published_date TEXT, status TEXT)");
});

module.exports = db;
