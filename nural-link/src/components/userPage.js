// src/components/Users.js
import React, { useState, useEffect } from 'react';
import User from './user';

function Users() {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([
        { name: 'Paul Kim', major: 'Computer Science', year: '2027' },
        { name: 'Daniel Lee', major: 'Computer Science', year: '2025' },
        { name: 'David Yim', major: 'Computer Science', year: '2027' },
        { name: 'John Doe', major: 'Physics', year: '2024' },
    ]);

    useEffect(() => {
        console.log('Search term changed:', search);
    }, [search]);

    useEffect(() => {
        console.log('New user added: ', users);
    }, [users]);

    return (
        <div className="users">
            <div className="users-page">
                <div className="mini-profile">
                    <img
                        className="profile-photo"
                        src="https://hips.hearstapps.com/hmg-prod/images/aaron-judge-of-the-new-york-yankees-poses-for-a-photo-news-photo-1729623663.jpg?crop=1.00xw:0.609xh;0,0.0301xh&resize=1200:*"
                        alt="Profile"
                    />
                    <h2>A-A-Ron Judge</h2>
                    <h3>Year</h3>
                    <h3>Major</h3>
                </div>
                <div className="user-boxes">
                    {users
                        .filter(
                            (user) =>
                                user.name.toLowerCase().includes(search.toLowerCase()) ||
                                user.major.toLowerCase().includes(search.toLowerCase()) ||
                                user.year.includes(search)
                        )
                        .map((user, index) => (
                            <User
                                key={index}
                                name={user.name}
                                major={user.major}
                                year={user.year}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Users;