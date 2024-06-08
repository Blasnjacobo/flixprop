import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useProducts from '../context/Productos/useProductos';
import useUniversos from "../context/Universos/useUniversos";
import { Producto as ProductoType } from '../types/Productos';
import type { Universo as UniversoType } from '../types/Universos';
import HomeUniversos from '../components/Home/HomeUniversos';
import HomeProductos from '../components/Home/HomeProductos';
import Ofrecemos from '../components/Ofrecemos';
import '../css/ProductoPage.css'

const Producto = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const productos = useProducts().productos;
  const universos = useUniversos().universos;
  const producto = productos.find((producto: ProductoType) => producto.codigo === codigo);

  const [selectedImage, setSelectedImage] = useState<string | undefined>(producto?.imgProducto);
  const [otrosUniversos, setOtrosUniversos] = useState<UniversoType[]>([]);
  const [otrosProductos, setOtrosProductos] = useState<ProductoType[]>([])
  const [productosRelacionados, setProductosRelacionados] = useState<ProductoType[]>([])
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 960)
  const [sliderCurrentIndex, setSliderCurrentIndex] = useState<number>(0);

  const images = [
    producto?.imgProducto,
    producto?.imgEscena,
    producto?.imgModelo,
    producto?.imgExtra
  ].filter(Boolean); // Remove undefined values

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (producto) {
      const filteredOtrosUniversos = universos.filter(element => element.universo !== producto.universo);
      setOtrosUniversos(filteredOtrosUniversos);

      const filteredProductosRelacionados = productos.filter(element => element.universo === producto.universo);
      setProductosRelacionados(filteredProductosRelacionados);

      const filteredOtrosProductos = productos.filter(element => element.universo !== producto.universo);
      setOtrosProductos(filteredOtrosProductos);
    }
  }, [producto, productos, universos]);

  useEffect(() => {
    setSelectedImage(images[sliderCurrentIndex]);
  }, [sliderCurrentIndex, images]);

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const goToSliderSlide = (slideIndex: number) => {
    setSliderCurrentIndex(slideIndex);
  };

  return (
    <div className='ProductoPage-section'>
      <div className='ProductoPage-container'>
        {
          !isMobile ? (
            <section className='ProductoPage-productoInfo'>
              <div className='ProductoPage-productoInfo-imagenes'>
                <div className='ProductoPage-productoInfo-imagenes-secundarios'>
                  <img
                    src={producto.imgProducto}
                    alt={`imagen del producto del producto: ${producto.codigo}`}
                    onClick={() => handleImageClick(producto.imgProducto)}
                  />
                  <img
                    src={producto.imgEscena}
                    alt={`imagen de la escena del producto: ${producto.codigo}`}
                    onClick={() => handleImageClick(producto.imgEscena)}
                  />
                  <img
                    src={producto.imgModelo}
                    alt={`imagen del modelo en producto: ${producto.codigo}`}
                    onClick={() => handleImageClick(producto.imgModelo)}
                  />
                  {producto.imgExtra && (
                    <img
                      src={producto.imgExtra}
                      alt={`imagen secundaria del producto en producto: ${producto.codigo}`}
                      onClick={() => handleImageClick(producto.imgExtra)}
                    />
                  )}
                </div>
                <div className='ProductoPage-productoInfo-imagenes-principal'>
                  <img src={selectedImage} alt={`imagen del producto del producto: ${producto.codigo}`} />
                </div>
              </div>
              <div className='ProductoPage-productoInfo-details'>
                <div className='ProductoPage-productoInfo-details-basics'>
                  <h2>{producto.nombre}</h2>
                  <h5>{producto.universo}</h5>
                  <h4>${producto.precio}.00 MXN</h4>
                </div>
                <div className='ProductoPage-productoInfo-details-cantidad'>
                  <h2>-</h2>
                  <h2>0</h2>
                  <h2>+</h2>
                </div>
                <button>Agregar al carrito</button>
              </div>
            </section>
          ) : (
            <section className='ProductoPage-productoInfo-mobile'>
              <div className='ProductoPage-productoInfo-titleUniverso-mobile'>
                <h3>{producto.nombre}</h3>
                <h5>{producto.universo}</h5>
              </div>
              <div className='ProductoPage-productoInfo-imagenes-mobile'>
                <div className='ProductoPage-productoInfo-imagenes-imagen-mobile'>
                  <img src={images[sliderCurrentIndex]} alt="" />
                </div>
                <div className="noticiasItem-dots-container">
                  <div className='sliderItem-dots'>
                    {images.map((_, idx) => (
                      <div 
                        key={idx}
                        className="dotItem-container-item"
                        onClick={() => goToSliderSlide(idx)}
                      >
                        <i className={`bi bi-circle-fill ${idx === sliderCurrentIndex ? "active" : ""}`}></i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <h2>${producto.precio}.00 MXN</h2>
              <div className='ProductoPage-productoInfo-cantidad-mobile'>
                <h5>Cantidad</h5>
                <div className='ProductoPage-productoInfo-cantidad-info-mobile'>
                  <h2>-</h2>
                  <h2>0</h2>
                  <h2>+</h2>
                </div>
              </div>
              <button>Agregar al carrito</button>
              <div className='ProductoPage-productoDescripcion'>
                {producto.descripcion}
              </div>
            </section>
            
          )
        }
        <HomeProductos productos={productosRelacionados} text={`Más productos de ${producto.universo}`} />
        <HomeUniversos universos={otrosUniversos} text="Explora otros universos"/>
        {otrosProductos.length > 0 && (
          <HomeProductos productos={otrosProductos} text={'Podria interesarte'} />
        )}
        <section>
          <Ofrecemos />
        </section>
      </div>
    </div>
  );
};

export default Producto;
