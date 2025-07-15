const express = require('express');
const cors = require('cors');
require('dotenv').config();

const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
