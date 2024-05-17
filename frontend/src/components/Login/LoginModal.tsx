import React from 'react';
import { Modal } from 'react-bootstrap';
import Flixprop from '../../assets/flixprop-logo.png'

interface ShowProps {
    show: boolean;
    handleClose: () => void;
}

const LoginModal: React.FC<ShowProps> = ({ show, handleClose }) => {

    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };

    const facebook = () => {

    };

    const github = () => {

    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div className='loginModal'>
                <img src={Flixprop} alt='flixprop-logo' />
                <div className='login-auth-Strategies'>
                    <div className="login-auth-container" onClick={google}>
                        <i className="bi bi-google" style={{ color: '#ea4335' }}></i>
                        <h5 style={{ color: '#ea4335' }}>Inicia sesion con Google</h5>
                    </div>
                    <div className="login-auth-container" onClick={facebook}>
                        <i className="bi bi-facebook" style={{ color: '#3b5998' }}></i>
                        <h5 style={{ color: '#3b5998' }}>Inicia sesion con Facebook</h5>
                    </div>
                    <div className="login-auth-container" onClick={github}>
                        <i className="bi bi-github"></i>
                        <h5>Inicia sesion con github</h5>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;
