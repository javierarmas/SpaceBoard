import './App.css';
import { useState } from 'react';
import Intro from './components/Intro';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import IntroContent from './components/IntroContent';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      {/* Logo fijo arriba a la izquierda */}
      <div className="logo-fixed">SpaceBoard</div>

      {/* Si no hay usuario, muestra login */}
      {!user && <Intro onLogin={setUser} />}

      {/* Si ya inicio sesión */}
      {user &&
        <>
          <div className="welcome-bar">
            <span>Hola, {user.username}</span>
            <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
          </div>

          <PostForm userId={user.id} />
          <PostList />
        </>
      }

      {/* Introduccion y videos */}
      <IntroContent />
    </div>
  );
}

export default App;
