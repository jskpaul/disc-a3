// src/components/Users.js
import React, { useState, useEffect } from 'react';
import User from './user';

function Users() {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([
        // { firstname: 'Paul', lastname:'Kim', major: 'Computer Science', graduationyear: '2027' },
        // { firstname: 'Daniel Lee', major: 'Computer Science', graduationyear: '2025' },
        // { firstname: 'John Doe', major: 'Physics', graduationyear: '2024' },
    ]);

    const fetchUsers = async () => {
        const response = await fetch(`http://localhost:3002/api/users`);

        if (response.ok) {
            let users = await response.json();
            console.log(users);
            setUsers(users);

        }
    }

    useEffect(() => {
        console.log('Search term changed:', search);
    }, [search]);

    useEffect(() => {
        fetchUsers();
    }, [users]);

    return (
        <div className="users">
            <div className="users-page">
                <div className="mini-profile">
                    <img
                        className="profile-photo"
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Chill_guy_original_artwork.jpg/220px-Chill_guy_original_artwork.jpg"
                        alt="Profile"
                    />
                    <h2>Chill Guy</h2>
                    <h3>Year</h3>
                    <h3>Major</h3>
                </div>
                <div className="user-boxes">
                    {users
                        .filter(
                            (user) =>
                                user.firstname.toLowerCase().includes(search.toLowerCase()) ||
                                user.major.toLowerCase().includes(search.toLowerCase()) ||
                                user.graduationyear.includes(search)
                        )
                        .map((user, index) => (
                            <User
                                key={index}
                                firstname={user.firstname}
                                lastname={user.lastname}
                                major={user.major}
                                graduationyear={user.graduationyear}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Users;