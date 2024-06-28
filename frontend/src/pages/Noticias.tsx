import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useNoticias from '../../src/context/Noticias/useNoticias';
import Ofrecemos from '../components/Ofrecemos';
import { Noticia } from '../types/Noticias';
import desktopBanner from '../assets/desktopBanner.jpg';
import mobileBanner from '../assets/mobileBanner.png'
import '../css/NoticiasPage.css';

const Noticias = () => {
  const noticias = useNoticias();
  const noticiasPage = noticias.noticias.slice(0, 11);
  const firstThreeNoticias = noticiasPage.slice(0, 3);
  const restNoticias = noticiasPage.slice(3, 11);

  const numDots = Math.ceil(restNoticias.length / 4);


  const bannerListRef = useRef<HTMLUListElement | null>(null);
  const sliderListRef = useRef<HTMLUListElement | null>(null);
  const noticiasAllListRef = useRef<HTMLUListElement | null>(null);

  const [bannerCurrentIndex, setBannerCurrentIndex] = useState<number>(0);
  const [sliderCurrentIndex, setSliderCurrentIndex] = useState<number>(0);
  const [noticiasAllCurrentIndex, setNoticiasAllCurrentIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 960);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const listNode = bannerListRef.current;
    const slides = listNode?.querySelectorAll("li");

    if (slides) {
      slides.forEach((slide, index) => {
        slide.style.display = index === bannerCurrentIndex ? "block" : "none";
      });
    }
  }, [bannerCurrentIndex]);

  useEffect(() => {
    const listNode = sliderListRef.current;
    const slides = listNode?.querySelectorAll("li");

    if (slides) {
      slides.forEach((slide, index) => {
        slide.style.display = index === sliderCurrentIndex ? "block" : "none";
      });
    }
  }, [sliderCurrentIndex]);

  useEffect(() => {
    const listNode = noticiasAllListRef.current;
    const slides = listNode?.querySelectorAll("li");
  
    if (slides) {
      slides.forEach((slide, index) => {
        slide.style.display = (index >= noticiasAllCurrentIndex && index < noticiasAllCurrentIndex + 4) ? "grid" : "none";
      });
    }
  }, [noticiasAllCurrentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToBannerImage('next');
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToSliderImage('next');
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToAllNoticiasImage('next');
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const scrollToBannerImage = (direction: string) => {
    if (direction === 'prev') {
      setBannerCurrentIndex(curr => (curr === 0 ? firstThreeNoticias.length - 1 : curr - 1));
    } else {
      setBannerCurrentIndex(curr => (curr === firstThreeNoticias.length - 1 ? 0 : curr + 1));
    }
  };

  const scrollToSliderImage = (direction: string) => {
    if (direction === 'prev') {
      setSliderCurrentIndex(curr => (curr === 0 ? noticiasPage.length - 1 : curr - 1));
    } else {
      setSliderCurrentIndex(curr => (curr === noticiasPage.length - 1 ? 0 : curr + 1));
    }
  };

  const scrollToAllNoticiasImage = (direction: string) => {
    if (direction === 'prev') {
      setNoticiasAllCurrentIndex(curr => (curr === 0 ? (numDots - 1) * 4 : curr - 4));
    } else {
      setNoticiasAllCurrentIndex(curr => (curr >= (numDots - 1) * 4 ? 0 : curr + 4));
    }
  };

  const goToBannerSlide = (bannerIndex: number) => {
    setBannerCurrentIndex(bannerIndex);
  };

  const goToSliderSlide = (slideIndex: number) => {
    setSliderCurrentIndex(slideIndex);
  };

  const goToAllNoticiasSlide = (allNoticiasIndex: number) => {
    setNoticiasAllCurrentIndex(allNoticiasIndex * 4);
  };

  const handleCardClickSlider = (noticia: Noticia) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/noticias/${noticia.codigo}`);
  }

  return (
    <div className="noticiasPage-section">

    {/* noticiasPage */}

      <div className="noticiasPage-container">
        <h2>Noticias</h2>
        {
          !isMobile ? (
        <section className="noticiasPage-banner-section">
          <img src={desktopBanner} alt="Noticias Banner" className="noticiasPage-banner-image" />
          <div className='noticiasPage-banner-container'>
            <div className='noticiasPage-banner-column1'>
              <section onClick={() => handleCardClickSlider(firstThreeNoticias[0])} style={{ cursor: 'pointer' }}>
                <img src={firstThreeNoticias[0].img} alt="" />
                <div>
                  <h5 className='noticiasPage-banner-column1-info'>{firstThreeNoticias[0].titulo}</h5>
                  <p>{firstThreeNoticias[0].fecha}</p>
                </div>
              </section>
              <section onClick={() => handleCardClickSlider(firstThreeNoticias[1])} style={{ cursor: 'pointer' }}>
                <img src={firstThreeNoticias[1].img} alt="" />
                <div>
                  <h5 className='noticiasPage-banner-column1-info'>{firstThreeNoticias[1].titulo}</h5>
                  <p>{firstThreeNoticias[1].fecha}</p>
                </div>
              </section>
            </div>
            <div className='noticiasPage-divider' />
            <div className='noticiasPage-banner-column2' 
              onClick={() => handleCardClickSlider(firstThreeNoticias[2])} style={{ cursor: 'pointer' }}>
              <img src={firstThreeNoticias[2].img} alt="" />
              <h5>{firstThreeNoticias[2].titulo}</h5>
              <p>{firstThreeNoticias[2].fecha}</p>
            </div>
          </div>
          <div className="noticiasPage-dots-container">
              <div className='slider-dots'>
                  {
                    noticiasPage.map((_, idx) => (
                      <div key={idx}
                        className="dot-container-item"
                        onClick={() => goToBannerSlide(idx)}>
                        <i className={`bi bi-circle-fill ${idx === bannerCurrentIndex ? "active" : ""}`}></i>
                      </div>))
                  }
              </div>
            </div>
        </section>
        ) : (
          <section className="noticiasPage-banner-section">
              <img src={mobileBanner} alt="Noticias Banner" className="noticiasPage-banner-image" />
              <div className='noticiasPage-banner-container'>
                <h3>Últimas noticias</h3>
                <ul ref={bannerListRef}>
                  {
                    firstThreeNoticias.map((item) => (
                      <li key={item.codigo} onClick={() => handleCardClickSlider(item)} style={{ cursor: 'pointer' }}>
                        <div className='noticiasPage-slider-cards'>
                          <div className='noticiasPage-slider-cards-column'>
                            <img className="noticiasPage-flixprop-slider-img" 
                            src={item.img} alt="" />
                          </div>
                          <div className='noticiasPage-slider-cards-column'>
                            <h5>{item.titulo}</h5>
                            <p>{item.fecha}</p>
                          </div>
                        </div>
                      </li>
                    ))
                  }
                </ul>
                <div className="noticiasPage-dots-container">
                  <div className='slider-dots'>
                    {
                      firstThreeNoticias.map((_, idx) => (
                        <div key={idx}
                          className="dot-container-item"
                          onClick={() => goToBannerSlide(idx)}>
                          <i className={`bi bi-circle-fill ${idx === bannerCurrentIndex ? "active" : ""}`}></i>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </section>
          )
        }
            
        {/* All noticias */}
        {
          !isMobile ? (
            <section className="noticiasPage-all">
              {restNoticias.slice(0, 8).map((noticia, index) => (
                <div key={index} className='noticiasPage-all-noticia'
                onClick={() => handleCardClickSlider(noticia)} style={{ cursor: 'pointer' }}>
                  <img src={noticia.img} alt={`imagen de ${noticia.universo}`} />
                  <div>
                    <h5>{noticia.titulo}</h5>
                    <p>{noticia.fecha}</p>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <section className="noticiasPage-all">
              <ul ref={noticiasAllListRef}>
                {restNoticias.map((noticia, index) => (
                  <li key={index} className='noticiasPage-all-noticia'
                  onClick={() => handleCardClickSlider(noticia)} style={{ cursor: 'pointer' }}>
                    <img src={noticia.img} alt="" />
                    <div>
                      <h5>{noticia.titulo}</h5>
                      <p>{noticia.fecha}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="noticiasPage-dots-container">
                <div className='slider-dots'>
                  {[...Array(numDots)].map((_, idx) => (
                    <div key={idx}
                      className="dot-container-item"
                      onClick={() => goToAllNoticiasSlide(idx)}>
                      <i className={`bi bi-circle-fill ${idx === Math.floor(noticiasAllCurrentIndex / 4) ? "active" : ""}`}></i>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        }

        {/* Recomendaciones Section */}

        <h2>Recomendaciones de la semana</h2>
        <section className="noticiasPage-recomendaciones-section">
          <img src={window.innerWidth > 960 ? desktopBanner : mobileBanner } alt="Noticias Banner" className="noticiasPage-banner-image" />
          <div className='noticiasPage-slider-container'>
          <ul ref={sliderListRef}>
            {
              noticiasPage.map((item, index) => {
                return <li key={item.codigo}>
                  <div className='noticiasPage-slider-cards'
                  onClick={() => handleCardClickSlider(item)} style={{ cursor: 'pointer' }}>
                    <div className='noticiasPage-slider-cards-column1'>
                      <h1>{index+1}</h1>
                      <img className="noticiasPage-flixprop-slider-img" 
                      src={item.img} />
                    </div>
                    <div className='noticiasPage-slider-cards-column2'>
                      <h5>{item.titulo}</h5>
                      <p>{item.descripcion.length > 150 ? item.descripcion.slice(0, 150) + '...' : item.descripcion}</p>
                    </div>
                  </div>
                </li>
              })
            }
          </ul>
          <div className="noticiasPage-dots-container">
            <div className='slider-dots'>
                {
                  noticiasPage.map((_, idx) => (
                    <div key={idx}
                      className="dot-container-item"
                      onClick={() => goToSliderSlide(idx)}>
                      <i className={`bi bi-circle-fill ${idx === sliderCurrentIndex ? "active" : ""}`}></i>
                    </div>))
                }
            </div>
          </div>
          </div>      
        </section>
          { isMobile ? '' : <Ofrecemos />}
      </div>
    </div>
  );
}

export default Noticias;
