import { useNavigate } from "react-router-dom";
import useUniversos from "../context/Universos/useUniversos";
import { Universo as universoType } from '../types/Universos'

const Universos = () => {
    const universos = useUniversos().universos;
    const navigate = useNavigate()

    const handleCardClick = (universo: universoType) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate(`/flixprop/universos/${universo.codigo}`)
      };

    return (
        <div className="universosPage-section">
            <h3 className='universosPage-text'>Universos</h3>
            <p>¡Bienvenido al apartado de Universos de Flixprop! Aquí, tu pasión por las series y películas toma vida de una manera única y especial. En Flixprop, sabemos que cada universo cinematográfico y televisivo tiene su propia magia, su propia historia y un lugar especial en el corazón de los fans. Por eso, hemos creado este espacio dedicado a los mundos que amas, para que puedas explorar y celebrar cada uno de ellos con la misma intensidad con la que los disfrutas en la pantalla.</p>
            <div className='universosPage-Cards-container'>
            {universos.map((universo) => (
              <div className='universosPage-card' key={universo.codigo} onClick={() => handleCardClick(universo)}>
                <img src={universo.url} alt={universo.universo} />
              </div>
            ))}
          </div>
        </div>
    )
}

export default Universos
