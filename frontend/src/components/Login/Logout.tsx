interface PhotoProms {
    userPhoto: string;
}

const Logout = ({userPhoto}: PhotoProms) => {
    console.log(userPhoto)
    const logout = () => {
        localStorage.removeItem('jwtToken');
        // window.location.href = "http://localhost:5173/flixprop/";
        window.location.href = "https://blasnjacobo.github.io/flixprop/";
      };
    return (
        <div>
            <ul className="logout-container">
                <li className="logout-user">
                    <img
                        src={userPhoto}
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
