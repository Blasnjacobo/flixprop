import { useState, useEffect, MutableRefObject } from 'react'; // Import useState and useEffect hooks
import flixprop from '../assets/flixprop-logo.png'
import '../App.css'

interface menuPromp {
    toggleMenu: () => void
    showMenu: boolean
    navbarRef: MutableRefObject<null>
  }


const Navbar = ({ toggleMenu, showMenu, navbarRef } : menuPromp) => {

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
    <div className='Navbar' ref={navbarRef}>
        <div className='Navbar-container flex-between'>
            {windowWidth < 990 ? (
            <div className="menu-icon" onClick={toggleMenu}>
            {!showMenu ? <i className="bi bi-list"></i> : <i className="bi bi-x-lg"></i> }
            </div>
            ) : (
            <section className='flex-between navbar-redirecciones'>
            <div>Inicio</div>
            <div>Universos</div>
            <div>Catalogo</div>
            <div>Noticias Flixprop</div>
            </section>
            )}
            <section className='navar-img'>
                <img className='navbar-logo' src={flixprop} alt='Flixprop logo' />
            </section>
            <section className='navbar-icon flex-between'>
                <i className="bi bi-search"></i>
                <i className="bi bi-person"></i>
                <i className="bi bi-bag"></i>
            </section>
        </div>
    </div>
  )
}

export default Navbar
