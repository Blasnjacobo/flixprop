import { Dispatch, SetStateAction, useEffect, RefObject } from "react";
import { NavLink } from 'react-router-dom';
interface MenuProps {
  showMenu: boolean;
  menuRef: RefObject<HTMLDivElement>;
  navbarRef: RefObject<HTMLDivElement>;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

const Menu = ({ showMenu, menuRef, navbarRef, setShowMenu }: MenuProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        navbarRef.current?.contains(event.target as Node) !== true
      ) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMenu, menuRef, navbarRef, setShowMenu]);

  return (
    <div ref={menuRef} className={`menu-container ${showMenu ? 'show' : ''}`}>
      <section className="menu-options">
        <NavLink className="menu-links" onClick={() => setShowMenu(false)} to="/flixprop/">Inicio</NavLink>
        <NavLink className="menu-links" onClick={() => setShowMenu(false)} to="/flixprop/universos">Universos</NavLink>
        <NavLink className="menu-links" onClick={() => setShowMenu(false)} to="/flixprop/colecciones">Colecciones</NavLink>
        <NavLink className="menu-links" onClick={() => setShowMenu(false)} to="/flixprop/noticias">Noticias</NavLink>
        <NavLink className="menu-links" onClick={() => setShowMenu(false)} to="/flixprop/quizzes">Quizzes</NavLink>
      </section>
      <section className="menu-icons-login">
        <div><i className="bi bi-person"></i>Log In</div>
        <div className="menu-socialMedia">
          <i className="bi bi-twitter"></i>
          <i className="bi bi-facebook"></i>
          <i className="bi bi-instagram"></i>
          <i className="bi bi-tiktok"></i>
          <i className="bi bi-youtube"></i>
        </div>
      </section>
    </div>
  );
}

export default Menu;
