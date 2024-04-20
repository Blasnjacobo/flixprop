interface menuPromp {
    showMenu: boolean
  }

const Menu = ({showMenu}:menuPromp) => {

  return (
    <div className={`menu-mobile ${showMenu ? 'show' : ''}`}>
        <section className="menu-options">
            <div>Inicio</div>
            <div>Universos</div>
            <div>Catalogo</div>
            <div>Noticias Flixprop</div>
        </section>
        <section>
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
  )
}

export default Menu
