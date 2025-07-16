const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/', async (req, res) => {
  try {
    const { post_id, user_id, content } = req.body;

    const result = await db.query(
      `INSERT INTO comments (post_id, user_id, content)
       VALUES ($1, $2, $3) RETURNING *`,
      [post_id, user_id, content]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creando comentario' });
  }
});

router.get('/', async (req, res) => {
  try {
    const post_id = req.query.post_id;

    const result = await db.query(`
      SELECT c.id, c.content, c.post_id, c.user_id, u.username
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = $1
      ORDER BY c.id ASC
    `, [post_id]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo comentarios' });
  }
});

module.exports = router;
