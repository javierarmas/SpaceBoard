import { useEffect, useState } from "react";
import axios from "axios";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

function PostList({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get("https://spaceboard-ef8p.onrender.com/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Error cargando publicaciones");
      });
  };

  return (
    <div>
      <h2>Publicaciones</h2>

      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3 className="post-title">{post.title}</h3>
          <p>{post.content}</p>
          <small>
            Publicado por: <strong>{post.username}</strong> | Creado: {new Date(post.created_at).toLocaleString()}
          </small>

          <CommentList postId={post.id} />

          <CommentForm
            postId={post.id}
            userId={userId}
            onCommentAdded={fetchPosts}
          />
        </div>
      ))}
    </div>
  );
}

export default PostList;
