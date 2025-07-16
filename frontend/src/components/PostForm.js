import { useState } from "react";
import axios from "axios";

function PostForm({ userId, onPostCreated }) {
  const [form, setForm] = useState({
    title: "",
    content: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/posts", {
        ...form,
        user_id: userId
      })
      .then(() => {
        alert("Post creado correctamente");
        setForm({ title: "", content: "" });
        if (onPostCreated) onPostCreated(); // notifica a App
      })
      .catch((err) => {
        console.error(err);
        alert("Error al crear el post");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="form-title">Crear publicación</h2>

      <input
        type="text"
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        required
        className="input"
      />

      <textarea
        name="content"
        placeholder="Contenido"
        value={form.content}
        onChange={handleChange}
        required
        className="textarea"
      />

      <button type="submit" className="button">
        Publicar
      </button>
    </form>
  );
}

export default PostForm;
