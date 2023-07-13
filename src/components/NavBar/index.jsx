import './index.css'
import SearchBar from '../SearchBar';
import { useNavigate } from 'react-router-dom';

const NavBar = (props) => {
    const navigate = useNavigate()
    const { HandleOnSearch } = props
    const { hideSearch } = props
    const imgLogo =
        "https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
    return (
        <div className="Navbar">
            <nav>
                <img
                    alt="logo-pokemon"
                    src={imgLogo}
                    className="navbar-img" 
                    onClick={()=> navigate("/")}/>
                {!hideSearch && (
                <SearchBar HandleOnSearch={HandleOnSearch}/>)}
            </nav>
        </div>
    )
}

export default NavBar