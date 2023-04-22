import './index.css'
import React, {useContext} from "react";
import FavContext from '../../contexts/FavContext/FavContext';

const NavBar = () => {
    const { favoritePokemons } = useContext(FavContext);
    const imgLogo =
        "https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
    return (
        <nav>
            <div>
                <img
                    alt="logo-pokemon"
                    src={imgLogo}
                    className="navbar-img" />
            </div>
            <div>{favoritePokemons.length} ❤️ FAVORITE </div>
        </nav>
    )
}

export default NavBar