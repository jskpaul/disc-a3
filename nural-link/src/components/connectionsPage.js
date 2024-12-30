import React, { useState, useEffect } from 'react';
import User from './user';

function ConnectionsPage({ useridProp, tokenProp }) {


    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const [userConnections, setUserConnections] = useState([]);
    const [currentFirstName, setCurrentFirstName] = useState('');
    const [currentLastName, setCurrentLastName] = useState('');
    const [hasProfile, setHasProfile] = useState(false);
    const [currentMajor, setCurrentMajor] = useState('');
    const [currentGradYear, setCurrentGradYear] = useState('');
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
    
    const fetchConnections = async () => {

        try {
            const response = await fetch(`http://localhost:3002/api/connections/${userId}`);
            // console.log(response);


            if (response.ok) {
                const connections = await response.json();
                const users = connections.users;
                setUserConnections(users);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const fetchCurrentuser = async () => {

        try {
            const response = await fetch(`http://localhost:3002/api/user/${userId}`);
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
                setProfilePhotoUrl(user.user_profiles[0].profilephotourl);
            }
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        fetchCurrentuser();
    }, [userId])
    useEffect(() => {
        setUserId(useridProp);
    }, [useridProp])

    useEffect(() => {
        setToken(tokenProp);
    }, [tokenProp])

    useEffect(() => {
        fetchConnections()
    }, [userId])

    if (!token) {
        return (<div><h3>Please log in to create your own student profile, view/connect with other profiles.</h3>
            <h3>Your saved user profiles will display here.</h3>
        </div>)
    }

    
    return (<div className="connections-page">
        {hasProfile && <div className="mini-profile">
                    {profilePhotoUrl && <img
                        className="profile-photo"
                        src={profilePhotoUrl}
                        alt="Profile"
                    />}
                    <h2>{currentFirstName} {currentLastName}</h2>
                    <h3>Class of: {currentGradYear}  </h3>
                    <h3>Major: {currentMajor} </h3>
        </div>}
        <h3>Profiles saved</h3>
        <div className='user-boxes'>
            {userConnections.length ? userConnections.map((user, index) => (
                <User key={index}

                    firstname={user.firstname}
                    lastname={user.lastname}
                    email={user.email}
                    major={user.user_profiles[0].major}
                    graduationyear={user.user_profiles[0].graduation_year}
                    profilepictureurl={user.user_profiles[0].profilephotourl}
                    
                />
            )

            ) : <h3>Your saved user profiles will display here.</h3>}
        </div>
    </div>
    )
}

export default ConnectionsPage;