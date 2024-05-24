import { useState } from 'react';
import LoginModal from './LoginModal';
import { Navbar as NavbarBs } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

interface LoginIconProps {
  hideText?: boolean;
}

const LoginIcon = ({ hideText = false }: LoginIconProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <NavbarBs as={NavLink} to='/flixprop/' style={{ textDecoration: 'none' }}>
        <i className="bi bi-person login-icon-inicio" style={{ fontSize: '25px', paddingLeft: '10px' }} onClick={handleShow}>
          {!hideText && <span style={{ fontSize: 'small' }}>Inicio de sesión</span>}
        </i>
      </NavbarBs>
      <LoginModal show={show} handleClose={handleClose} />
    </div>
  );
}

export default LoginIcon;