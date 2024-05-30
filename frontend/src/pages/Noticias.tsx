import { useEffect, useRef, useState } from 'react';
import noticiasBanner from '../assets/Noticias/noticias-banner-section.jpg';
import useNoticias from '../../src/context/Noticias/useNoticias';

const Noticias = () => {
  const noticias = useNoticias();
  const noticiasPage = noticias.noticias.slice(0, 11);
  const firstThreeNoticias = noticiasPage.slice(0, 3);
  const restNoticias = noticiasPage.slice(3, 11);

  const listRef = useRef<HTMLUListElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const listNode = listRef.current;
    const slides = listNode?.querySelectorAll("li");
  
    if (slides) {
      slides.forEach((slide, index) => {
        if (index === currentIndex) {
          slide.style.display = "block"; 
        } else {
          slide.style.display = "none";
        }
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToImage('next');
    }, 7000); 

    return () => clearInterval(interval);
  }, []);

  const scrollToImage = (direction: string) => {
    if (direction === 'prev') {
      setCurrentIndex(curr => {
        const isFirstSlide = curr === 0;
        return isFirstSlide ? noticiasPage.length - 1 : curr - 1;
      });
    } else {
      setCurrentIndex(curr => {
        const isLastSlide = curr === noticiasPage.length - 1;
        return isLastSlide ? 0 : curr + 1;
      });
    }
  }
  
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  }

  return (
    <div className="noticiasPage-section">
      <div className="noticiasPage-container">
        <h2>Noticias</h2>
        <section className="noticiasPage-banner-section">
          <img src={noticiasBanner} alt="Noticias Banner" className="noticiasPage-banner-image" />
          <div className='noticiasPage-banner-container'>
            <div className='noticiasPage-banner-column1'>
              <section>
                <img src={firstThreeNoticias[0].img} alt="" />
                <div>
                  <h5>{firstThreeNoticias[0].titulo}</h5>
                  <p>{firstThreeNoticias[0].fecha}</p>
                </div>
              </section>
              <section>
                <img src={firstThreeNoticias[1].img} alt="" />
                <div>
                  <h5>{firstThreeNoticias[1].titulo}</h5>
                  <p>{firstThreeNoticias[1].fecha}</p>
                </div>
              </section>
            </div>
            <div className='noticiasPage-divider' />
            <div className='noticiasPage-banner-column2'>
              <img src={firstThreeNoticias[2].img} alt="" />
              <h5>{firstThreeNoticias[2].titulo}</h5>
              <p>{firstThreeNoticias[2].fecha}</p>
            </div>
          </div>
        </section>
        <section className="noticiasPage-all">
          {restNoticias.map((noticia, index) => (
            <div key={index} className='noticiasPage-all-noticia'>
              <img src={noticia.img} alt="" />
              <div>
                <h5 style={{ fontWeight: 'bold' }}>{noticia.titulo}</h5>
                <p style={{ color: 'gray'}}>{noticia.fecha}</p>
              </div>
            </div>
          ))}
        </section>
        <h2>Recomendaciones de la semana</h2>
        <section className="noticiasPage-slider-section">
        <img src={noticiasBanner} alt="Noticias Banner" className="noticiasPage-banner-image" />
        <div className='noticiasPage-slider-container'>
        <ul ref={listRef}>
                  {
                    noticiasPage.map((item, index) => {
                      return <li key={item.codigo}>
                        <div className='noticiasPage-slider-cards'>
                          <div className='noticiasPage-slider-cards-column1'>
                            <h1 style={{ color: 'black'}}>{index+1}</h1>
                            <img className="noticiasPage-flixprop-slider-img" 
                            src={item.img} />
                          </div>
                          <div className='noticiasPage-slider-cards-column2'>
                            <h5 style={{ color: 'black' }}>{item.titulo}</h5>
                            <p style={{ color: 'black' }}>No te pierdas esta precuela épica que expande el universo de Mad Max y nos presenta a una Furiosa joven, valiente y determinada en su lucha por la supervivencia y la libertad</p>
                          </div>
                        </div>
                      </li>
                    })
                  }
                </ul>
            <div className="dots-container">
              <div className="slider-arrows" onClick={() => scrollToImage('prev')}><i className="bi bi-chevron-left"></i></div>
              <div className='slider-dots'>
                  {
                    noticiasPage.map((_, idx) => (
                      <div key={idx}
                        className="dot-container-item"
                        onClick={() => goToSlide(idx)}>
                        <i className={`bi bi-circle-fill ${idx === currentIndex ? "active" : ""}`}></i>
                      </div>))
                  }
              </div>
              <div className="slider-arrows" onClick={() => scrollToImage('next')}><i className="bi bi-chevron-right"></i></div>
            </div>
          </div>      
        </section>
      </div>
    </div>
  );
}

export default Noticias;
