const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Registro
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const result = await db.query(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3) RETURNING id, username, email`,
      [username, email, password]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error registrando usuario' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.query(
      `SELECT id, username, email, password
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    delete user.password;

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error iniciando sesión' });
  }
});

module.exports = router;
