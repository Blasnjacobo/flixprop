import { Dispatch, SetStateAction, useEffect, RefObject } from "react";

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
    <div ref={menuRef} className={`menu-mobile ${showMenu ? 'show' : ''}`}>
      <section className="menu-options">
        <div>Inicio</div>
        <div>Universos</div>
        <div>Catalogo</div>
        <div>Noticias Flixprop</div>
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
