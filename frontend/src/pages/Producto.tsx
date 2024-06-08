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

  useEffect(() => {

    const fetchOtrosUniversos = () => {
      try {
        if (producto) {
          const filteredOtrosUniversos = universos.filter(element => element.universo !== producto.universo);
          setOtrosUniversos(filteredOtrosUniversos);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchProductosRelacionados = () => {
        try {
            if (producto) {
                const filteredProductosRelacionados = productos.filter(element => element.universo == producto.universo);
                setProductosRelacionados(filteredProductosRelacionados);
              }
        } catch (error) {
          console.error('Error:', error);
        }
    }

    const fetchOtrosProductos = () => {
        try {
            if (producto) {
                const filteredOtrosProductos = productos.filter(element => element.universo !== producto.universo);
                setOtrosProductos(filteredOtrosProductos);
              }
        } catch (error) {
          console.error('Error:', error);
        }
    }

    fetchProductosRelacionados()
    fetchOtrosUniversos()
    fetchOtrosProductos()
  }, [productos]);

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  console.log(producto);

  return (
    <div className='ProductoPage-section'>
        <div className='ProductoPage-container'>
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
                        {
                            (producto.imgExtra) && (
                                <img
                                src={producto.imgExtra}
                                alt={`imagen secundaria del producto en producto: ${producto.codigo}`}
                                onClick={() => handleImageClick(producto.imgExtra)}
                            />
                            )
                        }
                    </div>
                    <div className='ProductoPage-productoInfo-imagenes-principal'>
                        <img src={selectedImage} alt={`imagen del producto del producto: ${producto.codigo}`} />
                    </div>
                </div>
                <div className='ProductoPage-productoInfo-details'>
                    <div className='ProductoPage-productoInfo-details-basics'>
                        <div>{producto.nombre}</div>
                        <div>{producto.universo}</div>
                        <div>${producto.precio}.00 MXN</div>
                    </div>
                    <div className='ProductoPage-productoInfo-details-cantidad'>
                        <h2>-</h2>
                        <h2>0</h2>
                        <h2>+</h2>
                    </div>
                    <button>Agregar al carrito</button>
                </div>
            </section>
            <section className='ProductoPage-productoDescripcion'>
                {producto.descripcion}
            </section>
            <HomeProductos productos={productosRelacionados} text={'Productos Relacionados'} />
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
