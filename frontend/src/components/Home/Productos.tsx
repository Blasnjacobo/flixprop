/* eslint-disable @typescript-eslint/no-unused-vars */
import { Producto } from "../../types/Productos";
import amazon from '../../assets/Productos/amazon.jpg'
import flixprop from '../../assets/flixprop-logo.png'

interface StoreItemProps {
    producto: Producto;
}

const Productos = ({ producto }: StoreItemProps) => {
    const {
        codigo,
        nombre,
        universo,
        link,
        vendedor,
        precio,
        imgProducto,
        imgEscena    } = producto;
        console.log(producto)

        const productoProvedor = ((producto.vendedor === 'Amazon') ? amazon : flixprop )

    const handleCardClick = (link: string, vendedor: string, codigo: string) => {
        if (vendedor === 'Flixprop') {
            link = codigo
        }
        window.location.href = link;
    };

    const handleImageTouchStart = (e: React.TouchEvent<HTMLImageElement>, imgEscena: string) => {
        e.currentTarget.src = imgEscena;
    };

    const handleImageTouchEnd = (e: React.TouchEvent<HTMLImageElement>, imgProducto: string) => {
        e.currentTarget.src = imgProducto;
    };

    return (
        <div className='home-productos-card' key={codigo}>
            <img
                alt={universo}
                src={imgProducto}
                onMouseOver={(e) => { e.currentTarget.src = imgEscena }}
                onMouseOut={(e) => { e.currentTarget.src = imgProducto }}
                onTouchStart={(e) => handleImageTouchStart(e, imgEscena)}
                onTouchEnd={(e) => handleImageTouchEnd(e, imgProducto)}
                onTouchCancel={(e) => handleImageTouchEnd(e, imgProducto)}
                onClick={() => handleCardClick(link, vendedor, codigo)}
                className="home-productos-card-imagen"
            />
            <img src={productoProvedor} alt={`imagen del provedor ${vendedor}`} 
                className="home-productos-imagenProvedor"/>
            <div className='home-productos-info'>
                <h3 className='home-productos-universo-card'>{universo}</h3>
                <div className='home-productos-titulo-card'>{nombre}</div>
                <div className='home-productos-precio-card'>${precio}.00 MXN</div>
            </div>
        </div>
    );
};

export default Productos;
