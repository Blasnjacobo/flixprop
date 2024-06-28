import { useNavigate } from "react-router-dom";
import useUniversos from "../context/Universos/useUniversos";
import { Universo as universoType } from '../types/Universos'

const Universos = () => {
    const universos = useUniversos().universos;
    const navigate = useNavigate()

    const handleCardClick = (universo: universoType) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate(`/universos/${universo.codigo}`)
      };

    return (
        <div className="universosPage-section">
            <h3 className='universosPage-text'>Universos</h3>
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
