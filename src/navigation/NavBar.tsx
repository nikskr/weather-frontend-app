import { NavLink } from "react-router";
import './index.css'
import SearchBar from "../components/SearchBar/SearchBar";

const NavBar = () => {
    return (
        <nav className="nav-content">
            <div className="link-row">
                <NavLink className='link' to="/" end>
                    Main
                </NavLink>
                <NavLink className='link' to="/favorites" end>
                    Favorites
                </NavLink>
                <NavLink className='link' to="/about" end>
                    About
                </NavLink>
            </div>
            <SearchBar />
        </nav>
    )
}

export default NavBar