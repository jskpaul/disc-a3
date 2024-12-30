// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './components.css';
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { useAuth } from '../contexts/authContext';




function Navbar({ tokenProp }) {

    const [showAlert, setShowAlert] = useState(false);
    const [token, setToken] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const { logOut } = useAuth();


    // useEffect(() => {
    //     supabase.auth.getSession().then(({ data: { session } }) => {
    //         setSession(session)
    //     })

    //     const {
    //         data: { subscription },
    //     } = supabase.auth.onAuthStateChange((_event, session) => {
    //         setSession(session)
    //     })

    //     return () => subscription.unsubscribe()
    // }, [])
    useEffect(() => {
        setToken(tokenProp);


    }, [tokenProp]);

    const handleConnectClick = () => {
        // console.log(token);
        if (!token) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000); // Hide the alert after 3 seconds
        } else {
            navigate('/users'); // Navigate to the users page if logged in
        }
    };
    const handleSignOut = async () => {
        try {
            const response = await fetch('https://disc-assignment-social-connections-backend.vercel.app/api/auth/logout', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",

            })
            if (response.ok) {
                alert("Logged out.")
                localStorage.removeItem('authToken'); // or sessionStorage depending on where you store it
                navigate('/');
                setTimeout(() => window.location.reload(), 0);
            }
            

        } catch (error) {
            console.error(error);
        }

    }


    return (
        <nav className="navbar">
            <Link to="/" className='navbar-home-link' ><h1>NUral Network</h1></Link>
            <div className="links">
                {token ? (<div><Link to='/'><button className='signout-button' onClick={handleSignOut}>Log Out</button></Link>
                    <Link to='/profile'><button className='create-edit-button' >Create/Update Profile</button></Link>
                    <button className='connect-button' onClick={handleConnectClick}>Connect with users</button>
                    <Link to='/connections'><button className='connect-button' >View my Connections</button></Link>
                </div>) :
                    (<div><Link to='/new'><button className='new-user-button'>Sign Up</button></Link>
                        <Link to='/auth'><button className='signin-button'>Log in</button></Link></div>)}

                {/* <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                /> */}
            </div>
            {showAlert && (
                <Alert severity="warning" className="alert-box">
                    <strong>Log in</strong> to connect with users.
                </Alert>
            )}
        </nav>
    );
}

export default Navbar;
