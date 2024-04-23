import { useRef, useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import Menu from './components/Menu';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Categorias from './pages/Categorias';
import Universos from './pages/Universos';
import Colecciones from './pages/Colecciones';
import Noticias from './pages/Noticias';
import Quizzes from './pages/Quizzes';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navbarRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <div className='navbar-container'>
        <Navbar toggleMenu={toggleMenu} showMenu={showMenu} navbarRef={navbarRef}/>
        <Menu showMenu={showMenu} menuRef={menuRef} navbarRef={navbarRef} setShowMenu={setShowMenu} />
        <Routes>
          <Route path='/flixprop/' element={<Home />} />
          <Route path='/flixprop/categorias/' element={<Categorias />} />
          <Route path='/flixprop/universos/' element={<Universos />} />
          <Route path='/flixprop/colecciones/' element={<Colecciones/>} />
          <Route path='/flixprop/noticias/' element={<Noticias />} />
          <Route path='/flixprop/quizzes/' element={<Quizzes />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
