const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET /comments/:post_id
router.get('/:post_id', async (req, res) => {
  try {
    const comments = await db.query(
      'SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC',
      [req.params.post_id]
    );
    res.json(comments.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /comments
router.post('/', async (req, res) => {
  try {
    const { post_id, user_id, content } = req.body;
    const newComment = await db.query(
      `INSERT INTO comments (post_id, user_id, content)
       VALUES ($1, $2, $3) RETURNING *`,
      [post_id, user_id, content]
    );
    res.json(newComment.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
