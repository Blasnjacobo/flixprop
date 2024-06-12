import { useState, useEffect, MutableRefObject } from 'react';
import { NavLink } from 'react-router-dom';
import flixprop from '../assets/flixprop-logo.png';
import '../App.css';
import LoginIcon from './Login/LoginIcon';
import Logout from './Login/Logout';
import useUser from '../context/Users/useUser';
import CarritoLogo from './Cart/CarritoLogo';

interface MenuProps {
  toggleMenu: () => void;
  showMenu: boolean;
  navbarRef: MutableRefObject<null>;
}

const Navbar = ({ toggleMenu, showMenu, navbarRef }: MenuProps) => {
  const user = useUser();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSmooth = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="Navbar" ref={navbarRef}>
      <div className="Navbar-container">
        {windowWidth < 990 ? (
          <div className="menu-icon" onClick={toggleMenu}>
            {!showMenu ? <i className="bi bi-list"></i> : <i className="bi bi-x-lg"></i>}
          </div>
        ) : (
          <section className="navbar-redirecciones">
            <NavLink className="flixprop-routes" to="/flixprop/"
            onClick={handleSmooth}>
              Inicio
            </NavLink>
            <NavLink className="flixprop-routes" to="/flixprop/universos"
            onClick={handleSmooth}>
              Universos
            </NavLink>
            <NavLink className="flixprop-routes" to="/flixprop/colecciones"
            onClick={handleSmooth}>
              Colecciones
            </NavLink>
            <NavLink className="flixprop-routes" to="/flixprop/noticias"
            onClick={handleSmooth}>
              Noticias
            </NavLink>
            <NavLink className="flixprop-routes" to="/flixprop/quizzes"
            onClick={handleSmooth}>
              Quizzes
            </NavLink>
          </section>
        )}
        <section className="navar-img">
          <NavLink className="navbar-logo" to="/flixprop/">
            <img src={flixprop} alt="Flixprop logo" onClick={handleSmooth}/>
          </NavLink>
        </section>
        <section className="navbar-icon flex-between">
          <i className="bi bi-search" style={{ paddingRight: windowWidth > 990 ? '15px' : '0' }}></i>
          <CarritoLogo windowWidth={windowWidth}/>
          {user && windowWidth > 990 && user.name !== 'Invitado' && (
            <Logout userPhoto={user.photos[0].value} />
          )}
          {(!user || windowWidth <= 990 || user.name === 'Invitado') && (
            <LoginIcon hideText={true} />
          )}
        </section>
      </div>
    </div>
  );
};

export default Navbar;

