// src/components/Users.js
import React, { useState, useEffect } from 'react';
import User from './user';
import { useAuth } from '../contexts/authContext';

function Users({ useridProp, tokenProp }) {
    const [firstNameSearch, setFirstNameSearch] = useState('');
    const [lastNameSearch, setLastNameSearch] = useState('');
    const [majorSearch, setMajorSearch] = useState('');
    const [graduationYearSearch, setGraduationYearSearch] = useState('')
    const [users, setUsers] = useState([
        // { firstname: 'Paul', lastname:'Kim', major: 'Computer Science', graduationyear: '2027' },
        // { firstname: 'Daniel Lee', major: 'Computer Science', graduationyear: '2025' },
        // { firstname: 'John Doe', major: 'Physics', graduationyear: '2024' },
    ]);
    const [hasProfile, setHasProfile] = useState(false);
    const [userid, setUserid] = useState('');
    const [token, setToken] = useState('');
    const [currentFirstName, setCurrentFirstName] = useState('');
    const [currentLastName, setCurrentLastName] = useState('');
    const [currentGradYear, setCurrentGradYear] = useState('');
    const [currentMajor, setCurrentMajor] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await fetch(`http://localhost:3002/api/users/${userid}`);
            if (response.ok) {
                let users = await response.json();
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
                if (!user.user_profiles.length) {
                    return;
                }
                setHasProfile(true);
                setCurrentMajor(user.user_profiles[0].major);
                setCurrentGradYear(user.user_profiles[0].graduation_year);

            }
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        fetchUsers();
    }, [users,userid]);
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
    if (!hasProfile) {
        return (<h2>Other user profiles will show here once you have created your profile.</h2>)
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
                                (!firstNameSearch || user.firstname.toLowerCase().includes(firstNameSearch.toLowerCase())) &&
                                (!lastNameSearch || user.lastname.toLowerCase().includes(lastNameSearch.toLowerCase())) &&
                                (!majorSearch || user.user_profiles[0].major.toLowerCase().includes(majorSearch.toLowerCase())) &&
                                (!graduationYearSearch || String(user.user_profiles[0].graduation_year).includes(String(graduationYearSearch)) )
                        )
                        .map((user, index) => (
                            <User
                                key={index}
                                requestorId = {userid}
                                id = {user.id}
                                firstname={user.firstname}
                                lastname={user.lastname}
                                email={user.email}
                                major={user.user_profiles[0].major}
                                graduationyear={user.user_profiles[0].graduation_year}
                            // profilepictureurl={user.profilepictureurl}
                            />
                        ))}
                </div>
                <div className='search-criteria'>
                    <h2>Search filters</h2>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by First Name"
                        onChange={(e) => setFirstNameSearch(e.target.value)}
                    />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by Last Name"
                        onChange={(e) => setLastNameSearch(e.target.value)}
                    />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by Major"
                        onChange={(e) => setMajorSearch(e.target.value)}
                    />
                    <input
                        type="number"
                        className="search-input"
                        placeholder="Search by Graduation Year"
                        onChange={(e) => setGraduationYearSearch(e.target.value)}
                    />
                </div>

            </div>
        </div>
    );
}

export default Users;