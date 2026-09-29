const express = require('express');
const router = express.Router();
const db = require('../db/database');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'evitaamenzi_secret_2026';

// Middleware verificare token
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token lipsa' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: 'Token invalid' });
  }
}

// Get toate masinile userului
router.get('/', authMiddleware, (req, res) => {
  try {
    const masini = db.prepare('SELECT * FROM masini WHERE user_id = ?').all(req.userId);
    
    const masiniCuActe = masini.map(masina => {
      const acte = db.prepare('SELECT * FROM acte WHERE masina_id = ?').all(masina.id);
      return { ...masina, acte };
    });

    res.json(masiniCuActe);
  } catch (err) {
    res.status(500).json({ error: 'Eroare server' });
  }
});

// Adauga masina
router.post('/', authMiddleware, (req, res) => {
  const { numar, marca, model, an, vin } = req.body;

  if (!numar || !marca || !model) {
    return res.status(400).json({ error: 'Numar, marca si model sunt obligatorii' });
  }

  try {
    const stmt = db.prepare('INSERT INTO masini (user_id, numar, marca, model, an, vin) VALUES (?, ?, ?, ?, ?, ?)');
    const result = stmt.run(req.userId, numar, marca, model, an, vin);

    res.json({ id: result.lastInsertRowid, numar, marca, model, an, vin, acte: [] });
  } catch (err) {
    res.status(500).json({ error: 'Eroare server' });
  }
});

// Sterge masina
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    db.prepare('DELETE FROM acte WHERE masina_id = ?').run(req.params.id);
    db.prepare('DELETE FROM masini WHERE id = ? AND user_id = ?').run(req.params.id, req.userId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Eroare server' });
  }
});

// Adauga act la masina
router.post('/:id/acte', authMiddleware, (req, res) => {
  const { tip, data_expirare, serie } = req.body;

  try {
    const stmt = db.prepare('INSERT INTO acte (masina_id, tip, data_expirare, serie) VALUES (?, ?, ?, ?)');
    const result = stmt.run(req.params.id, tip, data_expirare, serie);
    res.json({ id: result.lastInsertRowid, tip, data_expirare, serie });
  } catch (err) {
    res.status(500).json({ error: 'Eroare server' });
  }
});

module.exports = router;