import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation(); // Get current route for dynamic "active" class

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
            <div className="container">
                <Link className="navbar-brand fw-bold fs-3" to="/">SavoryStack</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavDropdown" 
                    aria-controls="navbarNavDropdown" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/recipes" ? "active" : ""}`} to="/recipes">Recipes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/create-recipe" ? "active" : ""}`} to="/create-recipe">Create Recipe</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About Us</Link>
                        </li>
                    </ul>

                    {/* Search Bar */}
                    <form className="d-flex me-3" role="search">
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Search recipes..." 
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    {/* User Actions */}
                    <ul className="navbar-nav">
                        {user ? (
                            <>
                                <li className="nav-item d-flex align-items-center">
                                    <span className="nav-link fw-bold">Welcome, {user.username}</span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-danger ms-2" onClick={logout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
