const Logout = () => {
    const logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = "http://localhost:5173/flixprop/";
      };
    return (
        <div>
            <ul className="logout-container">
                <li className="logout-user">
                    <img
                        src='https://scontent.fcul2-1.fna.fbcdn.net/v/t1.6435-9/94772239_157469155763963_5664157686908846080_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uRMwnnWPQLgQ7kNvgGxjrby&_nc_ht=scontent.fcul2-1.fna&oh=00_AYBmlGKYDGZjGZsULL9pC9fLLteTGBgGUQw9k9er2Y8R-w&oe=666DE627'
                        alt='Imagen Usuario'
                        className="avatar"
                    />
                </li>
                <li className="logout-text" onClick={logout}>
                    Salir
                </li>
            </ul>
        </div>
    )
}

export default Logout
