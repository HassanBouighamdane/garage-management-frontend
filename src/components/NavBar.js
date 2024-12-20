import React from "react";
import { NavLink } from "react-router-dom"; // For navigation links (optional)

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    Garage Management
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/clients">
                                Manage Clients
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/vehicles">
                                Manage Vehicles
                            </NavLink>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/workshops">
                                Manage Workshops
                            </NavLink>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/invoices">
                                Manage Invoices
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
