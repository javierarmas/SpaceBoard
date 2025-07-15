const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET /posts
router.get('/', async (req, res) => {
  try {
    const posts = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(posts.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /posts
router.post('/', async (req, res) => {
  try {
    const { user_id, title, content, media_url } = req.body;
    const newPost = await db.query(
      `INSERT INTO posts (user_id, title, content, media_url)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, title, content, media_url]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
