import './index.css'
import SearchBar from '../SearchBar';

const NavBar = (props) => {
    const { HandleOnSearch } = props
    const imgLogo =
        "https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
    return (
        <div className="Navbar">
            <nav>
                <img
                    alt="logo-pokemon"
                    src={imgLogo}
                    className="navbar-img" />
                <SearchBar HandleOnSearch={HandleOnSearch} />
            </nav>
        </div>
    )
}

export default NavBar