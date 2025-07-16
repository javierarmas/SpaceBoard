const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/', async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    const result = await db.query(
      `INSERT INTO posts (title, content, user_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [title, content, user_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creando publicacion' });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT p.id, p.title, p.content, p.user_id, u.username, p.created_at
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo publicaciones' });
  }
});

module.exports = router;
