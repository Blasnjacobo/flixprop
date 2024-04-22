import { useEffect, useRef, useState } from 'react';
import flixpropSlider from '../../assets/slider/flixprop-slider.json';

export const Slider = () => {
  const listRef = useRef<HTMLUListElement>(null); // Initialize listRef with null
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Specify type for currentIndex

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode?.querySelectorAll("li > img")[currentIndex]; // Add null check for listNode

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [currentIndex]);

  const scrollToImage = (direction: 'prev' | 'next') => { // Specify type for direction
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

  const goToSlide = (slideIndex: number) => { // Specify type for slideIndex
    setCurrentIndex(slideIndex);
  }

  return (
    <div className="flixprop-slider">
      <div className="flixprop-slider-container">
        <div className='leftArrow' onClick={() => scrollToImage('prev')}>&#10092;</div>
        <div className='rightArrow' onClick={() => scrollToImage('next')}>&#10093;</div>
        <div className="container-images">
          <ul ref={listRef}>
            {
              flixpropSlider.map((item) => {
                return <li key={item.id}>
                  <img src={item.imgUrl} width={500} height={280} alt={`Slider Image ${item.id}`} />
                </li>
              })
            }
          </ul>
        </div>
        <div className="dots-container">
          {
            flixpropSlider.map((_, idx) => (
              <div key={idx}
                className={`dot-container-item ${idx === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(idx)}>
                &#9865;
              </div>))
          }
        </div>
      </div>
    </div >
  )
}

export default Slider