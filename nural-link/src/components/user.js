// user.js
import './components.css';
import React, { useState } from 'react';

function User({id, firstname, lastname, email, bio, major, graduationyear, profilepictureurl, dateofbirth, created_at }) {
    
    return (
        <div className="other-profile">
            <h4>{firstname} {lastname}</h4>
            <p>Major: {major}</p>
            <p>Year: {graduationyear}</p>
            <img className = "profile-photo" src={profilepictureurl} alt='profile'/>
            <button>Connect</button>
        </div>
    );
}

export default User;