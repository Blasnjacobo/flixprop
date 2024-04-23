import { useEffect, useRef, useState } from 'react';
import flixpropSlider from '../../assets/slider/flixprop-slider.json';

export const Slider = () => {
  const [isMobile, setIsMobile] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode?.querySelectorAll("li > img")[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth"
      });
    }

  }, [currentIndex]);

  const scrollToImage = (direction: string) => {
    if (direction === 'prev') {
      setCurrentIndex(curr => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      })
    } else {
      const isLastSlide = currentIndex === flixpropSlider.length - 1;
      if (!isLastSlide) {
        setCurrentIndex(curr => curr + 1);
      }
    }
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  }

  return (
    <div className='slider-container'>
      <div className="container-images">
          <ul ref={listRef}>
            {
              flixpropSlider.map((item) => {
                return <li key={item.id}>
                  <img className="flixprop-slider-img" 
                   src={isMobile ? item.imgMobile : item.imgDesktop} />
                </li>
              })
            }
          </ul>
      </div>
      <div className="dots-container">
        <div className="slider-arrows" onClick={() => scrollToImage('prev')}><i className="bi bi-chevron-left"></i></div>
        <div className='slider-dots'>
            {
              flixpropSlider.map((_, idx) => (
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
  )
}

export default Slider;
