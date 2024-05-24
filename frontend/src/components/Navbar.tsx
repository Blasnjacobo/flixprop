import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import flixprop from '../assets/flixprop-logo.png';
import '../App.css';
import LoginIcon from './Login/LoginIcon';
import Logout from './Login/Logout';
import useUser from '../context/Users/useUser';

interface MenuProps {
  toggleMenu: () => void;
  showMenu: boolean;
}

const Navbar = ({ toggleMenu, showMenu }: MenuProps) => {
  const user = useUser();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navbarRef = useRef<HTMLDivElement>(null);

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
          <i className="bi bi-bag" style={{ paddingLeft: '15px'}}></i>
          {(user && windowWidth > 990) ? <Logout userPhoto={user.photos[0].value} /> : <LoginIcon hideText={true} />}
        </section>
      </div>
    </div>
  );
};

export default Navbar;