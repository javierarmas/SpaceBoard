import { useEffect, useState } from "react";
import axios from "axios";

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = () => {
    axios
      .get(`http://localhost:3000/comments?post_id=${postId}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Error cargando comentarios");
      });
  };

  return (
    <div>
      <h4>Comentarios</h4>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="comment">
            <strong>{comment.username}:</strong> {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
