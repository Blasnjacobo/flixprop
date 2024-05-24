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

  return (
    <div className="Navbar" ref={navbarRef}>
      <div className="Navbar-container">
        {windowWidth < 990 ? (
          <div className="menu-icon" onClick={toggleMenu}>
            {!showMenu ? <i className="bi bi-list"></i> : <i className="bi bi-x-lg"></i>}
          </div>
        ) : (
          <section className="navbar-redirecciones">
            <NavLink className="flixprop-routes" to="/flixprop/">
              Inicio
            </NavLink>
            <NavLink className="flixprop-routes" to="/flixprop/universos">
              Universos
            </NavLink>
            <NavLink className="flixprop-routes" to="/flixprop/colecciones">
              Colecciones
            </NavLink>
            <NavLink className="flixprop-routes" to="/flixprop/noticias">
              Noticias
            </NavLink>
            <NavLink className="flixprop-routes" to="/flixprop/quizzes">
              Quizzes
            </NavLink>
          </section>
        )}
        <section className="navar-img">
          <NavLink className="navbar-logo" to="/flixprop/">
            <img src={flixprop} alt="Flixprop logo" />
          </NavLink>
        </section>
        <section className="navbar-icon flex-between">
          <i className="bi bi-search"></i>
          <CarritoLogo />
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

