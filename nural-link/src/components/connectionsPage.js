import React, { useState, useEffect } from 'react';
import User from './user';

function ConnectionsPage({ useridProp }) {



    const [userId, setUserId] = useState('');
    const [userConnections, setUserConnections] = useState([]);
    const fetchConnections = async () => {

        try {
            const response = await fetch(`http://localhost:3002/api/connections/${userId}`);
            console.log(response);


            if (response.ok) {
                const connections = await response.json();
                const users = connections.users;
                console.log(users);
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
        fetchConnections()
    }, [userId])
    return (
        <div>
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