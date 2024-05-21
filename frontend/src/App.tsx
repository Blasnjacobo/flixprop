import { useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Footer from './components/Footer';

import Home from './pages/Home';
import Universos from './pages/Universos';
import Colecciones from './pages/Colecciones';
import Noticias from './pages/Noticias';
import Quizzes from './pages/Quizzes';

import Cultura from './pages/Footer/Cultura';
import Colaboracion from './pages/Footer/Colaboracion';
import SobreNosotros from './pages/Footer/SobreNosotros';
import Privacidad from './pages/Footer/Privacidad';
import TerminosyCondiciones from './pages/Footer/TerminosyCondiciones';
import CompraSegura from './pages/Footer/CompraSegura';
import MisionyVision from './pages/Footer/MisionyVision';

import UniversosProvider from './context/Universos/Universos';
import NoticiasProvider from './context/Noticias/Noticias';
import ProductosProvider from './context/Productos/Productos';
import UserProvider from './context/Users/User';
import CartProvider from './context/Cart/Cart';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navbarRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <ProductosProvider>
      <UserProvider>
        <CartProvider>
          <NoticiasProvider>
            <UniversosProvider>
              <div className='navbar-container'>
                <Navbar toggleMenu={toggleMenu} showMenu={showMenu} navbarRef={navbarRef} />
                <Menu showMenu={showMenu} menuRef={menuRef} navbarRef={navbarRef} setShowMenu={setShowMenu} />
                <Routes>
                  <Route path='/flixprop/' element={<Home />} />
                  <Route path='/flixprop/universos/' element={<Universos />} />
                  <Route path='/flixprop/colecciones/' element={<Colecciones />} />
                  <Route path='/flixprop/noticias/' element={<Noticias />} />
                  <Route path='/flixprop/quizzes/' element={<Quizzes />} />
                  {/* Footer Routes */}
                  <Route path='/flixprop/nuestra-mision-vision/' element={<MisionyVision />} />
                  <Route path='/flixprop/cultura-flixprop/' element={<Cultura />} />
                  <Route path='/flixprop/colabora-con-nosotros/' element={<Colaboracion />} />
                  <Route path='/flixprop/sobre-nosotros/' element={<SobreNosotros />} />
                  <Route path='/flixprop/politica-de-privacidad/' element={<Privacidad />} />
                  <Route path='/flixprop/terminos-y-condiciones/' element={<TerminosyCondiciones />} />
                  <Route path='/flixprop/compra-segura/' element={<CompraSegura />} />
                </Routes>
                <Footer />
              </div>
            </UniversosProvider>
          </NoticiasProvider>
        </CartProvider>
      </UserProvider>
    </ProductosProvider>
  );
}

export default App;

