import { useState } from 'react';

const Ofrecemos = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null)

  const toggleExpansion = (sectionIndex: number) => {
    setExpandedSection(sectionIndex === expandedSection ? null : sectionIndex);
  };

  return (
    <div className="Ofrecemos-section">
      <div className="Ofrecemos-container">
        <section className="ofrecemos-title">
          <div>OFRECEMOS:</div>
        </section>
        <div className="ofrecemos-info">
          <div className="ofrecemos-info-title" onClick={() => toggleExpansion(0)}>
            <div>
                <i className="bi bi-truck"></i>
                <span>Cancelación y devolución gratuita</span>
            </div>
            <i className={`bi bi-chevron-${expandedSection === 0 ? 'up' : 'down'}`}></i>
          </div>
          {expandedSection === 0 && (
            <div className="ofrecemos-info-description">
              Puedes cancelar tu pedido en cualquier momento o devolverlo si no deseas conservarlo y te devolveremos el 100% de tu dinero. No incluye comercios afiliados como Amazon y Etsy, aplica sólo para productos marca Flixprop.
            </div>
          )}
        </div>
        <div className="ofrecemos-info">
          <div className="ofrecemos-info-title" onClick={() => toggleExpansion(1)}>
            <div>
                <i className="bi bi-lock"></i>
                <span>Compra segura</span>
            </div>
            <i className={`bi bi-chevron-${expandedSection === 1 ? 'up' : 'down'}`}></i>
          </div>
          {expandedSection === 1 && (
            <div className="ofrecemos-info-description">
             Todos tus datos están protegidos por nuestra politica de cookies y protección de datos al igual que por nuestra pasarela de pago a travez de Stripe.
            </div>
          )}
        </div>
        <div className="ofrecemos-info">
          <div className="ofrecemos-info-title" onClick={() => toggleExpansion(2)}>
            <div>
                <i className="bi bi-chat-dots"></i>
                <span>Atención al cliente personalizada</span>
            </div>
            <i className={`bi bi-chevron-${expandedSection === 2 ? 'up' : 'down'}`}></i>
          </div>
          {expandedSection === 2 && (
            <div className="ofrecemos-info-description">
               No dudes en contactarnos para cualquier duda que tengas y uno de nuestros colaboradores te atenderá. Contamos con atención al cliente a travez del chat de la página o cualquiera de nuestras redes sociales. Te responderemos lo más pronto que podamos.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ofrecemos;
