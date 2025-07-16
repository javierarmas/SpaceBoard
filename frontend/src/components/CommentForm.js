import { useState } from "react";
import axios from "axios";

function CommentForm({ postId, userId, onCommentAdded }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("https://spaceboard-ef8p.onrender.com/comments", {
      post_id: postId,
      user_id: userId,
      content
    })
    .then(() => {
      setContent("");
      onCommentAdded();
    })
    .catch((err) => {
      console.error(err);
      alert("Error creando comentario");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Tu comentario"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Comentar</button>
    </form>
  );
}

export default CommentForm;
