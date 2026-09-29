const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'evitaamenzi.db'));

// Cream tabelele
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nume TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    telefon TEXT,
    parola TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS masini (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    numar TEXT NOT NULL,
    marca TEXT NOT NULL,
    model TEXT NOT NULL,
    an INTEGER,
    vin TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS acte (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    masina_id INTEGER NOT NULL,
    tip TEXT NOT NULL,
    data_expirare TEXT,
    serie TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (masina_id) REFERENCES masini(id)
  );
`);

module.exports = db;