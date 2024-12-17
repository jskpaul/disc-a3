// user.js
import './components.css';
import React, { useState } from 'react';

function User({id, firstName, lastName, email, bio, major, graduationYear, profilePicture, created_at }) {
    
    return (
        <div className="other-profile">
            <h4>{firstName} {lastName}</h4>
            <p>Major: {major}</p>
            <p>Year: {graduationYear}</p>
            <button>Connect</button>
        </div>
    );
}

export default User;