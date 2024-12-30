// src/components/Home.js
import React, { useEffect, useState } from 'react';
import ConnectionsPage from './connectionsPage';
// import Users from './Users';

function Home({ useridProp, tokenProp }) {

    // const [token, setToken] = useState('');
    // const [userId, setUserId] = useState('');

    // useEffect(() => {
    //     setToken(tokenProp)
    // }, [tokenProp])
    // useEffect(() => {
    //     setUserId(useridProp)
    // }, [useridProp])
    return (
        <div className="home">
            <h1>Welcome to the NUral Network</h1>
            <ConnectionsPage useridProp={useridProp} tokenProp={tokenProp} />
            {/* <Users /> */}
        </div>
    );
}

export default Home;