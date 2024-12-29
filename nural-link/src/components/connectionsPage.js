import React, { useState, useEffect } from 'react';
import User from './user';

function ConnectionsPage({ useridProp, tokenProp }) {


    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const [userConnections, setUserConnections] = useState([]);
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

    if (!userConnections.length) {
        return <h3>Your saved user profiles will display here.</h3>
    }
    return (
        <div className='user-boxes'>
            {userConnections.length && userConnections.map((user, index) => (
                <User key={index}

                    firstname={user.firstname}
                    lastname={user.lastname}
                    major={user.user_profiles[0].major}
                    graduationyear={user.user_profiles[0].graduation_year} />
            )

            )}
        </div>
    )
}

export default ConnectionsPage;