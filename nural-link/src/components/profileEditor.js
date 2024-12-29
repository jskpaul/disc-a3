import React, { useState, useEffect, Component } from 'react';
import { AuthProvider, useAuth } from '../contexts/authContext';
import programs from './majors';
import { useNavigate } from 'react-router-dom';
function ProfilePage({ useridProp, tokenProp }) {
    const [major, setMajor] = useState('');
    const [graduationYear, setGraduationYear] = useState(null);
    const [birthDate, setBirthDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const loadProfile = async () => {
        try {
            const response = await fetch(`http://localhost:3002/api/user/${userId}`);
            // console.log(response);
            if (response.ok) {
                const user = await response.json();
                const profile = user.user_profiles;
                // console.log(profile);
                if (!profile.length) {
                    return;
                }
                setMajor(profile[0].major);
                setGraduationYear(profile[0].graduation_year);
                setBirthDate(profile[0].date_of_birth);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (userId) {
            loadProfile();
        }
    }, [userId]); // Only load profile when userId changes

    const handleUpdateProfile = async () => {
        setIsLoading(true);

        try {
            const profile = {
                userId,
                major,
                graduationYear,
                birthDate,

            }

            const response = await fetch("http://localhost:3002/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(profile),
            });
            if (response.ok) {
                alert('Profile successfully updated!');
                navigate('/users');
            }
        } catch (error) {
            alert("An error occured:", error.message);
        } finally {
            setIsLoading(false);
        }

    }
    useEffect(() => {
        setToken(tokenProp);
        setUserId(useridProp);


    }, [tokenProp, useridProp]);
    
    // useEffect(() => {
    //     console.log('changed token:', token);
    // }, [token]);

    if (!token) {
        return (<h2>Please Log in First</h2>);
    }
    return (<form className='form-container'>
        <h2>Enter Profile Details</h2>
        <div className='form-field'>
            <label>Date of Birth:</label>
            <input
                type="date"
                value={birthDate} // Format the date for the input
                onChange={(e) => setBirthDate(e.target.value)}
                required
            />
        </div>
        <div className="form-field">
            <label>Major:</label>
            
            <select value={major} onChange={(e) => setMajor(e.target.value)} required>
                <option value="default-select">Select your major</option>
                {programs.map((program) => (
                    <option key={program.id} value={program.label}>
                        {program.label}
                    </option>
                ))}
            </select>
        </div>
        <div className='form-field'>
            <label>Graduation year:</label>
            <select

                value={graduationYear} // Bind the selected value to graduationyear
                onChange={(e) => setGraduationYear(e.target.value)} // Handle value change
                required
            >
                <option value="" disabled>Select a year</option>
                {(() => {
                    const baseYear = new Date().getFullYear(); // Calculate the base year once
                    return Array.from({ length: 5 }, (_, i) => {
                        const year = baseYear + i; // Add `i` to the base year
                        return (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        );
                    });
                })()}
            </select>
        </div>
        <button
        className="submit-button"
        type="submit"
        disabled={isLoading}
        onClick={handleUpdateProfile}
            >
        {isLoading ? 'Saving Changes...' : 'Save Changes to Profile'}
    </button>
    </form>)
}

export default ProfilePage;