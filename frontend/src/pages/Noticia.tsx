import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useNoticias from '../../src/context/Noticias/useNoticias';
import type { Noticia as NoticiaType } from '../types/Noticias';
import '../css/NoticiasItem.css';
import noticiasBanner from '../assets/Noticias/noticias-banner-section.jpg';
import flixprop from '../assets/flixpropFondo.jpg';

const Noticia = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const noticias = useNoticias().noticias;
  const noticia = noticias.find((noticia: NoticiaType) => noticia.codigo === codigo);
  const [sliderCurrentIndex, setSliderCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();

  if (!noticia) {
    return <div>Noticia no encontrada</div>;
  }

  console.log(noticia.descripcion);

  const handleSocialMediaClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleCardClickSlider = (noticia: NoticiaType) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/flixprop/noticias/${noticia.codigo}`);
  };

  const scrollToSliderImage = (direction: string) => {
    setSliderCurrentIndex(curr => {
      const maxIndex = Math.ceil(noticias.length) - 1;
      if (curr === undefined) return 0; // Safety check
      return direction === 'prev'
        ? (curr === 0 ? maxIndex : curr - 1)
        : (curr === maxIndex ? 0 : curr + 1);
    });
  };

  const goToSliderSlide = (slideIndex: number) => {
    setSliderCurrentIndex(slideIndex);
  };

  const currentItems = noticias.slice(sliderCurrentIndex * 1, sliderCurrentIndex + 1);

  return (
    <div className="noticiasItem-section">
      <div className="noticiasItem-container">
        <section className="noticiasItem-intro">
          <p>{noticia.titulo}</p>
          <img src={noticia.img} alt={`Imagen de ${noticia.universo}`} />
          <h5>{noticia.fecha}</h5>
          <div className="noticiasItem-author">
            <img src={flixprop} alt="" />
            <h4>Equipo Flixprop</h4>
          </div>
        </section>
        <section className="noticiasItem-description">
          {noticia.descripcion}
        </section>
        <section className="noticiasItem-footer-container">
          <div className="noticiasItem-tags">
            <div>
              <i className="bi bi-tag"></i>
              <h4>Tags</h4>
            </div>
            <h5>{noticia.tags}</h5>
          </div>
          <div className="noticiasItem-social">
            <h4>Compartir noticia</h4>
            <div>
              <i className="bi bi-twitter" onClick={() => handleSocialMediaClick('https://x.com/flixprop?t=KwAzK9BISpx6tPr06bb9mw&s=09')}></i>
              <i className="bi bi-facebook" onClick={() => handleSocialMediaClick('https://www.facebook.com/flixprop?mibextid=ZbWKwL')}></i>
              <i className="bi bi-instagram" onClick={() => handleSocialMediaClick('https://www.instagram.com/flixprop?igsh=ZjBkdTg3eWRienln')}></i>
              <i className="bi bi-tiktok" onClick={() => handleSocialMediaClick('https://www.tiktok.com/@flixprop?_t=8m1LhcwSaXu&_r=1')}></i>
              <i className="bi bi-youtube" onClick={() => handleSocialMediaClick('https://youtube.com/@Flixprop?si=6dAGZXRJbYSGO9pb')}></i>
            </div>
          </div>
        </section>
      </div>
      <section className="noticiasItem-slider-section">
        <img src={noticiasBanner} alt="Noticias Banner" className="noticiasItem-banner-image" />
        <div className='noticiasItem-slider-container'>
          <ul>
            {currentItems.map((item) => (
              <li key={item.codigo}
              onClick={() => handleCardClickSlider(item)}
              >
                <div 
                  className='noticiasItem-slider-cards' 
                  style={{ cursor: 'pointer' }}
                >
                  <div className='noticiasItem-slider-cards-img'>
                    <img 
                      src={item.img} 
                      alt={item.titulo} 
                    />
                  </div>
                  <div className='noticiasItem-slider-cards-info'>
                    <h5>{item.titulo}</h5>
                    <p>{item.fecha}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="noticiasItem-dots-container">
                      <div className="sliderItem-arrows" onClick={() => scrollToSliderImage('prev')}>
                        <i className="bi bi-chevron-left"></i>
                      </div>
                      <div className='sliderItem-dots'>
                        {Array.from({ length: Math.ceil(noticias.length) }).map((_, idx) => (
                          <div 
                            key={idx}
                            className="dotItem-container-item"
                            onClick={() => goToSliderSlide(idx)}
                          >
                            <i className={`bi bi-circle-fill ${idx === sliderCurrentIndex ? "active" : ""}`}></i>
                          </div>
                        ))}
                      </div>
                      <div className="sliderItem-arrows" onClick={() => scrollToSliderImage('next')}>
                        <i className="bi bi-chevron-right"></i>
                      </div>
                    </div>
        </div>
      </section>
    </div>
  )
}

export default Noticia;
