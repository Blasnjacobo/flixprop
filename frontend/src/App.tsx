import { useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Footer from './components/Footer';

import Home from './pages/Home';
import Universo from './pages/Universo';
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

import PagoExitoso from './pages/PagoExitoso';
import PagoRechazado from './pages/PagoRechazado';

import UniversosProvider from './context/Universos/Universos';
import NoticiasProvider from './context/Noticias/Noticias';
import ProductosProvider from './context/Productos/Productos';
import UserProvider from './context/Users/User';
import CartProvider from './context/Cart/Cart';
import Noticia from './pages/Noticia';
import Producto from './pages/Producto';
import CategoriasProvider from './context/Categorias/Categorias';

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
            <CategoriasProvider>
              <UniversosProvider>
                <div className='navbar-container'>
                  <Navbar toggleMenu={toggleMenu} showMenu={showMenu} navbarRef={navbarRef} />
                  <Menu showMenu={showMenu} menuRef={menuRef} navbarRef={navbarRef} setShowMenu={setShowMenu} />
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/universos/' element={<Universos />} />
                    <Route path='/universos/:codigo' element={<Universo />} />
                    <Route path='/colecciones/' element={<Colecciones />} />
                    <Route path='/noticias/' element={<Noticias />} />
                    <Route path='/noticias/:codigo' element={<Noticia />} />
                    <Route path='/productos/:codigo' element={<Producto />} />
                    <Route path='/quizzes/' element={<Quizzes />} />
                    <Route path='/terminos-y-condiciones/' element={<TerminosyCondiciones />} />
                    <Route path='/payment/success' element={<PagoExitoso />} />
                    <Route path='/payment/cancel' element={<PagoRechazado />} />
                    {/* Footer Routes */}
                    <Route path='/nuestra-mision-vision/' element={<MisionyVision />} />
                    <Route path='/cultura-flixprop/' element={<Cultura />} />
                    <Route path='/colabora-con-nosotros/' element={<Colaboracion />} />
                    <Route path='/sobre-nosotros/' element={<SobreNosotros />} />
                    <Route path='/politica-de-privacidad/' element={<Privacidad />} />
                    <Route path='/terminos-y-condiciones/' element={<TerminosyCondiciones />} />
                    <Route path='/compra-segura/' element={<CompraSegura />} />
                  </Routes>
                  <Footer />
                </div>
              </UniversosProvider>
            </CategoriasProvider>
          </NoticiasProvider>
        </CartProvider>
      </UserProvider>
    </ProductosProvider>
  );
}

export default App;
