import { useState } from 'react'
import LoginModal from './LoginModal';
import { Navbar as NavbarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const LoginIcon = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div>
            <NavbarBs as={NavLink} to='/flixprop/'>
                <i className="bi bi-person" onClick={handleShow} style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'white' }}><span style={{ fontSize: 'medium'}}>Inicio de sesión</span></i>
            </NavbarBs>
            <LoginModal show={show} handleClose={handleClose} />
        </div>
    )
}

export default LoginIcon
