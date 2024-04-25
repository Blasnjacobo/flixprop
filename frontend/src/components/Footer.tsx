import { NavLink } from "react-router-dom"

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-container">
            <section className="footer-section">
                <h2>Nuestra misión</h2>
                <p>En Flixprop buscamos los productos más deseados y originales para darle a los fans de verdad los artículos de sus series y péliculas favoritas con los que se identifiquen genuinamente.</p>
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
    </div>
  )
}

export default Footer
