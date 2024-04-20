import { useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import Menu from './components/Menu';

function App() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
        <Navbar toggleMenu = {toggleMenu} showMenu={showMenu}/>
        <Menu showMenu={showMenu} />
    </div>
  )
}

export default App
