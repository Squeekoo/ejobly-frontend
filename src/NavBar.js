import React, { useContext } from "react";
import UserContext from "./UserContext";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ logout }) => {
    const { currUser } = useContext(UserContext);

    function loggedInNav() {
        return (
            <ul className="navbar-nav ms-auto">
                <li className="nav-item me-4">
                    <NavLink className="nav-link text-light" to="/companies">
                        Companies
                    </NavLink>
                </li>
                <li className="nav-item me-4">
                    <NavLink className="nav-link text-light" to="/jobs">
                        Jobs
                    </NavLink>
                </li>
                <li className="nav-item me-4">
                    <NavLink className="nav-link text-light" to="/profile">
                        Profile
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/" onClick={logout}>
                        Log out {currUser.username}
                    </NavLink>
                </li>
            </ul>
        );
    }

    function loggedOutNav() {
        return (
            <ul className="navbar-nav ms-auto">
                <li className="nav-item me-4">
                    <NavLink className="nav-link" to="/login">
                        Login
                    </NavLink>
                </li>
                <li className="nav-item me-4">
                    <NavLink className="nav-link" to="/signup">
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        );
    }
    return (
        <div>
            <nav className="NavBar navbar navbar-expand-md">
                <Link className="navbar-brand text-light" to="/">
                    Jobly
                </Link>
                {currUser ? loggedInNav() : loggedOutNav()}
            </nav>
        </div>
    );
}

export default NavBar;