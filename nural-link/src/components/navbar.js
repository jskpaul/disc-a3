// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './components.css';

function Navbar({ setSearch }) {
    return (
        <nav className="navbar">
            <Link to="/" className='navbar-home-link' ><h1>NUral Network</h1></Link>
            <div className="links">

                <Link to="/users"><button className='connect-button'>Connect with users</button></Link>

                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </nav>
    );
}

export default Navbar;
