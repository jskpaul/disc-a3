import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext.js';



function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState('');
    const { logIn } = useAuth();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const hashParams = new URLSearchParams(window.location.hash.substring(1));
    //     const accessToken = hashParams.get("access_token");

    //     if (accessToken) {
    //         setToken(accessToken);
    //         window.history.replaceState(null, "", window.location.pathname);
    //     }
    // }, []
    // );

    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);
            logIn(data.token);
            setToken(data.token);
            
            
                alert('Successfully logged in!');
            navigate('/');
            window.location.reload();
            
            
            
        } catch (err) {
            console.error(err.message);
            setError(err.message);
            alert(err.message);
        } finally {
            setIsLoading(false);
            setError("");

        }
    };

    return (
        <form className="form-container" onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            <div className="form-field">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-field">
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
            <button
                className="submit-button"
                type="submit"
                disabled={isLoading}
                onClick={handleSignIn}
            >
                {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
        </form>
    );
}

export default LogIn;
