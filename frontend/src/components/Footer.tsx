import { NavLink } from "react-router-dom"

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-container">
            <div className="footer-main">
            <section className="footer-section">
                <h2>Nuestra Cultura</h2>
                <NavLink className="footer-links" to="/flixprop/colabora-con-nosotros/">Nuestra Misión</NavLink>
                <NavLink className="footer-links" to="/flixprop/colabora-con-nosotros/">Nuestra Visión</NavLink>
                <NavLink className="footer-links" to="/flixprop/colabora-con-nosotros/">Cultura Flixprop</NavLink>
            </section>
            <section className="footer-section">
                <h2>Más información</h2>
                <NavLink className="footer-links" to="/flixprop/colabora-con-nosotros/">Colabora con nosotros</NavLink>
                <NavLink className="footer-links" to="/flixprop/sobre-nosotros/">Sobre nosotros</NavLink>
            </section>
            <section className="footer-section">
                <h2>Legales</h2>
                <NavLink className="footer-links" to="/flixprop/politica-de-privacidad/">Política de privacidad</NavLink>
                <NavLink className="footer-links" to="/flixprop/terminos-y-condiciones/">Términos y condiciones</NavLink>
                <NavLink className="footer-links" to="/flixprop/compra-segura/">Compra Segura</NavLink>
            </section>
            </div>
            <section className="newspaper-social">
                    <p>¡Subscríbete gratis para ser el primero en enterarte de los productos más populares del momento!</p>
                    <input className="footer-newspaper" type="email" id="email" placeholder="Correo Electrónico"/>
                    <div className="footer-socialMedia">
                        <i className="bi bi-twitter"></i>
                        <i className="bi bi-facebook"></i>
                        <i className="bi bi-instagram"></i>
                        <i className="bi bi-tiktok"></i>
                        <i className="bi bi-youtube"></i>
                    </div>
            </section>
        </div>
    </div>
  )
}

export default Footer
