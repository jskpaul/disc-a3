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
    const [selectedFile, setSelectedFile] = useState(null);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('');


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
                setProfilePhotoUrl(profile[0].profilephotourl);

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
        // console.log(selectedFile)

        try {
            let profile = new FormData();
            // Append fields to FormData
            profile.append('userId', userId);
            profile.append('major', major);
            profile.append('graduationYear', graduationYear);
            profile.append('birthDate', birthDate);

            if (selectedFile) {
                profile.append('profilePhoto', selectedFile); // Key name should match the server's expectation
            }
            // console.log(profile);
            // const profile = {
            //     userId,
            //     major,
            //     graduationYear,
            //     birthDate,
            //     selectedFile

            // }

            const response = await fetch("http://localhost:3002/api/profile", {
                method: "PUT",

                credentials: "include",
                body: profile,
            });
            if (response.ok) {
                const data = await response.json()
                console.log(data);
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
        <div className='form-field'>
            <label>Profile Photo (optional):</label>
            {profilePhotoUrl && (
                <div>
                    <p>Current Profile Photo:</p>
                    <img src={profilePhotoUrl} alt="Profile" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                </div>
            )}

            {/* File input to upload new photo */}
            <label htmlFor="fileInput">Choose File:</label>
            <input
                type="file"
                id="fileInput"
                onChange={(e) => { setSelectedFile(e.target.files[0]) }}
                accept="image/*" // Restrict to image files
            />
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