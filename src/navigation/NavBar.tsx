import { NavLink } from "react-router";
import SearchBar from "../components/SearchBar/SearchBar";
import classes from './NavBar.module.css'

const NavBar = () => {
    return (
        <nav className={classes.navContent}>
            <div className={classes.linkRow}>
                <NavLink className={classes.link} to="/" end>
                    Main
                </NavLink>
                <NavLink className={classes.link} to="/favorites" end>
                    Favorites
                </NavLink>
                <NavLink className={classes.link} to="/about" end>
                    About
                </NavLink>
            </div>
            <SearchBar />
        </nav>
    )
}

export default NavBar