// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const savedToken = localStorage.getItem('authToken');
        if (savedToken) {
            validateToken(savedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const validateToken = async (savedToken) => {
        try {
            const response = await fetch('/api/auth/validate-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${savedToken}`,
                },
            });

            if (response.ok) {
                setToken(savedToken);
            } else {
                localStorage.removeItem('authToken');
                // setToken('');
            }
        } catch (error) {
            console.error('Token validation failed:', error);
            localStorage.removeItem('authToken');
        } finally {
            setLoading(false);
        }
    };
    const logIn = (newToken) => {
        setToken(newToken);
        localStorage.setItem('authToken', newToken);
    };

    const logOut = () => {
        setToken(null);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ token, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
