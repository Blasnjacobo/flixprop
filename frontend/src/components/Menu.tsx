import { Dispatch, SetStateAction, useEffect, RefObject } from "react";
import { NavLink } from 'react-router-dom';
import LoginIcon from './Login/LoginIcon';
import Logout from './Login/Logout';
import useUser from '../context/Users/useUser';

interface MenuProps {
  showMenu: boolean;
  menuRef: RefObject<HTMLDivElement>;
  navbarRef: RefObject<HTMLDivElement>;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

const Menu = ({ showMenu, menuRef, navbarRef, setShowMenu }: MenuProps) => {
  const user = useUser()
  console.log(user)
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

  const handleSocialMediaClick = (url: string) => {
    window.open(url, '_blank');
  };

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
          {
          !user ? <LoginIcon /> : <Logout />
          }
        <div className="menu-socialMedia">
          <i className="bi bi-twitter" onClick={() => handleSocialMediaClick('https://x.com/flixprop?t=KwAzK9BISpx6tPr06bb9mw&s=09')}></i>
          <i className="bi bi-facebook" onClick={() => handleSocialMediaClick('https://www.facebook.com/flixprop?mibextid=ZbWKwL')}></i>
          <i className="bi bi-instagram" onClick={() => handleSocialMediaClick('https://www.instagram.com/flixprop?igsh=ZjBkdTg3eWRienln')}></i>
          <i className="bi bi-tiktok" onClick={() => handleSocialMediaClick('https://www.tiktok.com/@flixprop?_t=8m1LhcwSaXu&_r=1')}></i>
          <i className="bi bi-youtube" onClick={() => handleSocialMediaClick('https://youtube.com/@Flixprop?si=6dAGZXRJbYSGO9pb')}></i>
        </div>
      </section>
    </div>
  );
}

export default Menu;
