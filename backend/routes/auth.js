const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

const JWT_SECRET = process.env.JWT_SECRET || 'evitaamenzi_secret_2026';

// Inregistrare
router.post('/register', (req, res) => {
  const { nume, email, telefon, parola } = req.body;

  if (!nume || !email || !parola) {
    return res.status(400).json({ error: 'Toate campurile sunt obligatorii' });
  }

  try {
    const hashedParola = bcrypt.hashSync(parola, 10);
    const stmt = db.prepare('INSERT INTO users (nume, email, telefon, parola) VALUES (?, ?, ?, ?)');
    const result = stmt.run(nume, email, telefon, hashedParola);

    const token = jwt.sign({ id: result.lastInsertRowid, email }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      token,
      user: { id: result.lastInsertRowid, nume, email, telefon }
    });
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Email-ul este deja folosit' });
    }
    res.status(500).json({ error: 'Eroare server' });
  }
});

// Login
router.post('/login', (req, res) => {
  const { email, parola } = req.body;

  if (!email || !parola) {
    return res.status(400).json({ error: 'Email si parola sunt obligatorii' });
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user || !bcrypt.compareSync(parola, user.parola)) {
      return res.status(401).json({ error: 'Email sau parola incorecte' });
    }

    const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      token,
      user: { id: user.id, nume: user.nume, email: user.email, telefon: user.telefon }
    });
  } catch (err) {
    res.status(500).json({ error: 'Eroare server' });
  }
});

module.exports = router;