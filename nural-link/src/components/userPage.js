// src/components/Users.js
import React, { useState, useEffect } from 'react';
import User from './user';
import { useAuth } from '../contexts/authContext';

function Users({useridProp, tokenProp}) {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([
        // { firstname: 'Paul', lastname:'Kim', major: 'Computer Science', graduationyear: '2027' },
        // { firstname: 'Daniel Lee', major: 'Computer Science', graduationyear: '2025' },
        // { firstname: 'John Doe', major: 'Physics', graduationyear: '2024' },
    ]);
    const [userid, setUserid] = useState('');
    const [token, setToken] = useState('');
    const [currentFirstName, setCurrentFirstName] = useState('');
    const [currentLastName, setCurrentLastName] = useState('');
    const [currentGradYear, setCurrentGradYear] = useState('');
    const [currentMajor, setCurrentMajor] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await fetch(`http://localhost:3002/api/users`);
            if (response.ok) {
                let users = await response.json();
                // console.log(users);
                setUsers(users);

            }
        } catch (error) {
            console.error(error);
        }
        
    }
    const fetchCurrentuser = async () => {

        try {
            const response = await fetch(`http://localhost:3002/api/user/${userid}`);
            if (response.ok) {
                const user = await response.json();
                // console.log(user)
                // console.log(user.firstname);
                setCurrentFirstName(user.firstname);
                setCurrentLastName(user.lastname);
                setCurrentMajor(user.user_profiles[0].major);
                setCurrentGradYear(user.user_profiles[0].graduation_year);
                
            }
        } catch (error) {
            console.error(error);
        }

    }
    useEffect(() => {
        console.log('Search term changed:', search);
    }, [search]);

    useEffect(() => {
        fetchUsers();
    }, [users]);
    useEffect(() => {
        fetchCurrentuser();
    })
    useEffect(() => {
        setUserid(useridProp);
        
    }, [useridProp]);

    useEffect(() => {
        setToken(tokenProp);


    }, [tokenProp]);
    
    if (!token) {
        return (<h2>Please Log in First</h2>)
    }
    return (
        <div className="users">
            <div className="users-page">
                <div className="mini-profile">
                    <img
                        className="profile-photo"
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Chill_guy_original_artwork.jpg/220px-Chill_guy_original_artwork.jpg"
                        alt="Profile"
                    />
                    <h2>{currentFirstName} {currentLastName}</h2>
                    <h3>Class of: {currentGradYear}  </h3>
                    <h3>Major: {currentMajor} </h3>
                </div>
                <div className="user-boxes">
                    {users
                        .filter(
                            (user) =>
                                user.firstname.toLowerCase().includes(search.toLowerCase()) ||
                                user.major.toLowerCase().includes(search.toLowerCase()) ||
                                user.graduation_year.includes(search)
                        )
                        .map((user, index) => (
                            <User
                                key={index}
                                firstname={user.firstname}
                                lastname={user.lastname}
                                major={user.user_profiles[0].major}
                                graduationyear={user.user_profiles[0].graduation_year}
                                // profilepictureurl={user.profilepictureurl}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Users;