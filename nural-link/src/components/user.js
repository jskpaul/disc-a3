// user.js
import './components.css';
import React, { useState } from 'react';

function User({id, requestorId, firstname, lastname, email, bio, major, graduationyear, profilepictureurl, dateofbirth, created_at }) {
    

    const handleConnectUser = async () => {
        try {
            if (id === requestorId) {
                alert("Please try connecting to a different user");
            }
            const response = await fetch("http://localhost:3002/api/connect", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ requestorId, id }),


            });

            console.log(response);
            if (response.ok) {
                alert('User added to personal connections!');
            } else {
                throw new Error('Failed to add user to connections')
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="other-profile">
            <h4>{firstname} {lastname}</h4>
            <p>Major: {major}</p>
            <p>Class Of: {graduationyear}</p>
            <img className="profile-photo" src={profilepictureurl} alt='profile' />
            <p>Contact: <a href={`mailto:${email}`}>{email}</a></p>
            <button onClick={handleConnectUser}>Connect</button>
        </div>
    );
}

export default User;