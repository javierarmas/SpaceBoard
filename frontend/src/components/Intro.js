import { useState } from "react";
import axios from "axios";


function Intro({ onLogin }) {
  const [mode, setMode] = useState("login"); // "login" o "register"
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "login") {
      // login
      try {
        const res = await axios.post("https://spaceboard-ef8p.onrender.com/users/login", {
          email,
          password,
        });
        onLogin(res.data);
        alert(`Bienvenido ${res.data.username}`);
      } catch (err) {
        console.error(err);
        alert("Credenciales incorrectas o usuario no existe");
      }
    } else {
      // registro
      try {
        const res = await axios.post("https://spaceboard-ef8p.onrender.com/users", {
          username,
          email,
          password,
        });
        onLogin(res.data);
        alert(`Bienvenido ${res.data.username}, tu cuenta ha sido creada`);
      } catch (err) {
        console.error(err);
        alert("Error al registrar usuario");
      }
    }
  };

  return (
    <div className="intro-container">
      <div className="intro-form">
        <div className="intro-buttons">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Iniciar sesión
          </button>
          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {mode === "register" && (
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {mode === "login" ? "Entrar" : "Crear cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Intro;
