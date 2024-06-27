import { NavLink } from "react-router-dom"

const Footer = () => {

    const handleSocialMediaClick = (url: string) => {
        window.open(url, '_blank');
      };

      const scrollToTopAndNavigate = (path: string) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.location.href = path;
      };

  return (
    <div className="footer">
        <div className="footer-container">
            <div className="footer-socialMedia">
                <i className="bi bi-twitter" onClick={() => handleSocialMediaClick('https://x.com/flixprop?t=KwAzK9BISpx6tPr06bb9mw&s=09')}></i>
                <i className="bi bi-facebook" onClick={() => handleSocialMediaClick('https://www.facebook.com/flixprop?mibextid=ZbWKwL')}></i>
                <i className="bi bi-instagram" onClick={() => handleSocialMediaClick('https://www.instagram.com/flixprop?igsh=ZjBkdTg3eWRienln')}></i>
                <i className="bi bi-tiktok" onClick={() => handleSocialMediaClick('https://www.tiktok.com/@flixprop?_t=8m1LhcwSaXu&_r=1')}></i>
                <i className="bi bi-youtube" onClick={() => handleSocialMediaClick('https://youtube.com/@Flixprop?si=6dAGZXRJbYSGO9pb')}></i>
            </div>
            <div className="footer-divider" />
            <div className="footer-main">
                <section className="footer-section">
                    <h2>Nuestra Cultura</h2>
                    <NavLink className="footer-links" to="/nuestra-mision-vision/" onClick={() => scrollToTopAndNavigate("/#/nuestra-mision-vision/")}>
                    Nuestra Misión y Visión
                    </NavLink>
                    <NavLink className="footer-links" to="/cultura-flixprop/" onClick={() => scrollToTopAndNavigate("/#/cultura-flixprop/")}>
                    Cultura Flixprop
                    </NavLink>
                </section>
                <section className="footer-section">
                    <h2>Más información</h2>
                    <NavLink className="footer-links" to="/colabora-con-nosotros/" onClick={() => scrollToTopAndNavigate("/#/colabora-con-nosotros/")}>
                    Colabora con nosotros
                    </NavLink>
                    <NavLink className="footer-links" to="/sobre-nosotros/" onClick={() => scrollToTopAndNavigate("/#/sobre-nosotros/")}>
                    Sobre nosotros
                    </NavLink>
                </section>
                <section className="footer-section">
                    <h2>Legales</h2>
                    <NavLink className="footer-links" to="/politica-de-privacidad/" onClick={() => scrollToTopAndNavigate("/#/politica-de-privacidad/")}>
                    Política de privacidad
                    </NavLink>
                    <NavLink className="footer-links" to="/terminos-y-condiciones/" onClick={() => scrollToTopAndNavigate("/#/terminos-y-condiciones/")}>
                    Términos y condiciones
                    </NavLink>
                    <NavLink className="footer-links" to="/compra-segura/" onClick={() => scrollToTopAndNavigate("/#/compra-segura/")}>
                    Compra Segura
                    </NavLink>
                </section>
            </div>
        </div>
    </div>
  )
}

export default Footer
