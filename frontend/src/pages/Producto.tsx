import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useProducts from '../context/Productos/useProductos';
import useUniversos from "../context/Universos/useUniversos";
import useUser from '../context/Users/useUser';
import useCart from '../context/Cart/useCart';
import { Producto as ProductoType } from '../types/Productos';
import { Universo as UniversoType } from '../types/Universos';
import HomeUniversos from '../components/Home/HomeUniversos';
import HomeProductos from '../components/Home/HomeProductos';
import Ofrecemos from '../components/Ofrecemos';
import '../css/ProductoPage.css';

const Producto = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const productos = useProducts().productos;
  const universos = useUniversos().universos;
  const producto = productos.find((producto: ProductoType) => producto.codigo === codigo);

  const [selectedImage, setSelectedImage] = useState<string | undefined>(producto?.imgProducto);
  const [isImageManuallySelected, setIsImageManuallySelected] = useState<boolean>(false);
  const [otrosUniversos, setOtrosUniversos] = useState<UniversoType[]>([]);
  const [otrosProductos, setOtrosProductos] = useState<ProductoType[]>([]);
  const user = useUser();
  const [productosRelacionados, setProductosRelacionados] = useState<ProductoType[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 960);
  const [sliderCurrentIndex, setSliderCurrentIndex] = useState<number>(0);

  // New state for sizes and quantities
  const [selectedSize, setSelectedSize] = useState<string>('NON');
  const [sizeQuantities, setSizeQuantities] = useState<{ [key: string]: number }>({
    'S': 0,
    'M': 0,
    'L': 0,
    'XL': 0,
    '2XL': 0,
    'NON' : 0,
  });

  const images = [
    producto?.imgProducto,
    producto?.imgEscena,
    producto?.imgModelo,
    producto?.imgExtra,
  ].filter(Boolean);

  const { itemQuantity, increaseQuantity, decreaseQuantity, setTriggerEffect, triggerEffect } = useCart();
  const { openCart } = useCart();

  const handleIncreaseQuantity = async () => {
    if (!producto) return;
    try {
      await increaseQuantity(`${producto.codigo}-${selectedSize}`, user?.username || '');
      const updatedQuantity = await itemQuantity(`${producto.codigo}-${selectedSize}`, user?.username || '');
      setSizeQuantities((prev) => ({ ...prev, [selectedSize]: updatedQuantity }));
      setTriggerEffect(!triggerEffect);
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (!producto) return;
    try {
      await decreaseQuantity(`${producto.codigo}-${selectedSize}`, user?.username || '');
      const updatedQuantity = await itemQuantity(`${producto.codigo}-${selectedSize}`, user?.username || '');
      setSizeQuantities((prev) => ({ ...prev, [selectedSize]: updatedQuantity }));
      setTriggerEffect(!triggerEffect);
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  // Handle size selection
  const handleSizeChange = async (size: string) => {
    setSelectedSize(size);
    if (producto) {
      const updatedQuantity = await itemQuantity(`${producto.codigo}-${size}`, user?.username || '');
      setSizeQuantities((prev) => ({ ...prev, [size]: updatedQuantity }));
    }
  };

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
    console.log(producto);
    if (producto) {
      const filteredOtrosUniversos = universos.filter((element) => (element.universo !== producto.universo));
      setOtrosUniversos(filteredOtrosUniversos);

      const filteredProductosRelacionados = productos.filter((element) => (element.universo === producto.universo) && (element.codigo !== producto.codigo));
      setProductosRelacionados(filteredProductosRelacionados);

      const filteredOtrosProductos = productos.filter((element) => element.universo !== producto.universo);
      setOtrosProductos(filteredOtrosProductos);
    }
  }, [producto, productos, universos]);

  useEffect(() => {
    if (producto) {
      const fetchQuantities = async () => {
        const sizeKeys = ['S', 'M', 'L', 'XL', '2XL', 'NON'];
        const quantities = await Promise.all(
          sizeKeys.map(size => itemQuantity(`${producto.codigo}-${size}`, user?.username || ''))
        );
        const newSizeQuantities = sizeKeys.reduce((acc, size, index) => {
          acc[size] = quantities[index];
          return acc;
        }, {} as { [key: string]: number });
        setSizeQuantities(newSizeQuantities);
      };
      fetchQuantities();
    }
  }, [producto, triggerEffect]);

  useEffect(() => {
    if (!isImageManuallySelected) {
      setSelectedImage(images[sliderCurrentIndex]);
    }
  }, [sliderCurrentIndex, images, isImageManuallySelected]);

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsImageManuallySelected(true);
  };

  const goToSliderSlide = (slideIndex: number) => {
    setSliderCurrentIndex(slideIndex);
    setIsImageManuallySelected(false);
  };

  return (
    <div className="ProductoPage-section">
      <div className="ProductoPage-container">
        {
          /* CODE WHEN IS DESKTOP */
          !isMobile ? (
            <section className="ProductoPage-productoInfo">
              <div className="ProductoPage-productoInfo-imagenes">
                <div className="ProductoPage-productoInfo-imagenes-secundarios">
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
                <div className="ProductoPage-productoInfo-imagenes-principal">
                  <img src={selectedImage} alt={`imagen del producto del producto: ${producto.codigo}`} />
                </div>
              </div>
              <div className="ProductoPage-productoInfo-details">
                <div className="ProductoPage-productoInfo-details-basics">
                  <h2>{producto.nombre}</h2>
                  <h5>{producto.universo}</h5>
                  <h4>${producto.precio}.00 MXN</h4>
                </div>
                {producto.categoria === 'Ropa' && (
                  <div className="ProductoPage-productoInfo-talla">
                    <h2>Talla</h2>
                    <div className="ProductoPage-productoInfo-talla-list">
                      {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                        <h3
                          key={size}
                          className={selectedSize === size ? 'selected' : ''}
                          onClick={() => handleSizeChange(size)}
                        >
                          {size}
                        </h3>
                      ))}
                    </div>
                  </div>
                )}
                <div className="ProductoPage-productoInfo-details-cantidad">
                  <h3>Cantidad</h3>
                  <div className="ProductoPage-productoInfo-details-cantidad-values">
                    <h2 onClick={handleDecreaseQuantity}>-</h2>
                    <h2>{sizeQuantities[selectedSize]}</h2>
                    <h2 onClick={handleIncreaseQuantity}>+</h2>
                  </div>
                </div>
                {!sizeQuantities[selectedSize] ? (
                  <h5>Este producto no se ha agregado al carrito</h5>
                ) : (
                  <h5>{`Hay ${sizeQuantities[selectedSize]} producto(s) de talla ${selectedSize} agregados al carrito`}</h5>
                )}
                <button onClick={openCart}>
                  Ir al carrito <i className="bi bi-cart" />
                </button>
              </div>
            </section>
          ) : (
            /* CODE WHEN IS MOBILE */
            <section className="ProductoPage-productoInfo-mobile">
              <div className="ProductoPage-productoInfo-titleUniverso-mobile">
                <h3>{producto.nombre}</h3>
                <h5>{producto.universo}</h5>
                <h2>${producto.precio}.00 MXN</h2>
              </div>
              <div className="ProductoPage-productoInfo-imagenes-mobile">
                <div className="ProductoPage-productoInfo-imagenes-imagen-mobile">
                  <img src={images[sliderCurrentIndex]} alt="" />
                </div>
                <div className="ProductoPage-dots-container">
                  <div className="ProductoPage-dots">
                    {images.map((_, idx) => (
                      <div
                        key={idx}
                        className="ProductoPage-dots-container-item"
                        onClick={() => goToSliderSlide(idx)}
                      >
                        <i className={`bi bi-circle-fill ${idx === sliderCurrentIndex ? 'active' : ''}`}></i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {producto.categoria === 'Ropa' && (
                <div className="ProductoPage-productoInfo-talla">
                  <h2>Talla</h2>
                  <div className="ProductoPage-productoInfo-talla-list">
                    {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                      <h3
                        key={size}
                        className={selectedSize === size ? 'selected' : ''}
                        onClick={() => handleSizeChange(size)}
                      >
                        {size}
                      </h3>
                    ))}
                  </div>
                </div>
              )}
              <div className="ProductoPage-productoInfo-cantidad-mobile">
                <h5>Cantidad</h5>
                <div className="ProductoPage-productoInfo-cantidad-info-mobile">
                  <h2 onClick={handleDecreaseQuantity}>-</h2>
                  <h2>{sizeQuantities[selectedSize]}</h2>
                  <h2 onClick={handleIncreaseQuantity}>+</h2>
                </div>
              </div>
              {!sizeQuantities[selectedSize] ? (
                <h5>Este producto no se ha agregado al carrito</h5>
              ) : (
                <h5>{`Hay ${sizeQuantities[selectedSize]} producto(s) de talla ${selectedSize} agregados al carrito`}</h5>
              )}
              <button onClick={openCart}>
                Ir al carrito <i className="bi bi-cart" />
              </button>
            </section>
          )
        }
         <h3 className="ProductoPage-productoDescripcion">{producto.descripcion}</h3>
        <HomeProductos productos={productosRelacionados} text={`Más productos de ${producto.universo}`} />
        <HomeUniversos universos={otrosUniversos} text="Explora otros universos" />
        {otrosProductos.length > 0 && <HomeProductos productos={otrosProductos} text={'Podría interesarte'} />}
        <section>
          <Ofrecemos />
        </section>
      </div>
    </div>
  );
};

export default Producto;
