// user.js
import './components.css';
import React, { useState } from 'react';

function User({ name, major, year }) {
    
    return (
        <div className="other-profile">
            <h4>{name}</h4>
            <p>Major: {major}</p>
            <p>Year: {year}</p>
            <button>Connect</button>
        </div>
    );
}

export default User;