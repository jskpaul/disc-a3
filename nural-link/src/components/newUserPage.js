import React, { useState, useEffect } from 'react';
import User from './user';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

// Supabase client setup
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_PUBLIC_API;
const supabase = createClient(supabaseUrl, supabaseKey);

function NewUser() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [major, setMajor] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());
    const [graduationyear, setGraduationyear] = useState('');
    const [isLoading, setIsLoading] = useState(false); // For loading state
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(''); // Store the URL of the uploaded photo
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const navigate = useNavigate();

    const handleDateChange = (event) => {
        setBirthdate(new Date(event.target.value)); // Update the date
    };
    const handleValueChange = (e, setValue) => {
        setValue(e.target.value);
    };

    const handlePwdChange = (e) => {
        const newPwd = e.target.value;
        setPwd(newPwd);
        validatePwds(newPwd, confirmPwd);
    }
    const handleConfirmPwdChange = (e) => {
        const newConfirmPwd = e.target.value;
        setConfirmPwd(newConfirmPwd);
        validatePwds(newConfirmPwd, pwd);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProfilePhoto(file);
    };

    const validatePwds = () => {
        if (pwd !== confirmPwd) {
            setError('Passwords do not match');
            return false;
        } else {
            setError('');
            return true;
        }
        
    };

    useEffect(() => {
        validatePwds();
    });

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validatePwds) {
            setError('Passwords do not match');
            return;
        }
        setIsLoading(true);

        try {
            // if (profilePhoto) {
            //     // Upload the photo to Supabase Storage
            //     const { data, error } = await supabase.storage
            //         .from('profile-photos') // 'profile-photos' is the storage bucket name
            //         .upload(`public/${Date.now()}_${profilePhoto.name}`, profilePhoto, {
            //             cacheControl: '3600',
            //             upsert: false,
            //         });

            //     if (error) {
            //         console.error("Error uploading photo:", error);
            //         setIsLoading(false);
            //         return;
            //     }

            //     // Get the public URL of the uploaded photo
            //     const { publicURL, error: urlError } = supabase.storage
            //         .from('profile-photos')
            //         .getPublicUrl(data.path);

            //     if (urlError) {
            //         console.error("Error getting photo URL:", urlError);
            //         setIsLoading(false);
            //         return;
            //     }

            //     setPhotoUrl(publicURL); // Store the URL of the uploaded photo
            // }


            const newUser = {
                firstname,
                lastname,
                major,
                birthdate,
                email,
                graduationyear,
                // profilePhoto: profilePhoto ?? null,
                photoUrl: photoUrl ?? null,
                pwd

            }
            const response = await addUser(newUser);
            if (response['statusCode'] !== 200) {
                alert('Error adding user:', response.msg);
                setIsLoading(false);
                return;
            }
            // Simulate form submission
            setTimeout(() => {
                alert('User successfully created! You can now log in with your email.');
                setIsLoading(false);
                // Proceed to save form data (including photoUrl) to your database or wherever needed
            }, 2000);
            navigate('/');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // const resetAll = () => {
    //     setFirstname('');
    //     setLastname('');
    //     setEmail('');

    // }

    const addUser = async (user) => {
        const response = await fetch("https://disc-assignment-social-connections-backend.vercel.app/api/user", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });
        try {
            if (response.ok) {
                const response_data = await response.json();
                const newUser = response_data['user'];
                return {statusCode: response.status, user: newUser};
            }
        } catch (error) {
            console.error(error);
            return { statusCode: response.status, msg: error };
        }

    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!validatePwds) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await fetch("https://disc-assignment-social-connections-backend.vercel.app/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, pwd, firstname, lastname }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);
            alert("Registration successful! Try logging in with your email.")
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };



    return (
        <form className='form-container'>
            <h2>Sign Up</h2>
             <div className='form-field'>

                <label>First Name:</label>
                <input
                    type='text'
                    value={firstname}
                    onChange={(e) => handleValueChange(e, setFirstname)}
                    required></input>
            </div>
            <div className='form-field'>
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastname}
                    onChange={(e) => handleValueChange(e, setLastname)}
                    required
                />
            </div>
            {/* <div className='form-field'>
                <label>Major:</label>
                <input
                    type="text"
                    value={major}
                    onChange={(e) => handleValueChange(e, setMajor)}
                    required
                />
            </div>
            <div className='form-field'>
                <label>Date of Birth:</label>
                <input
                    type="date"
                    value={birthdate.toISOString().split('T')[0]} // Format the date for the input
                    onChange={handleDateChange}
                    required
                />
            </div> */}
            <div className='form-field'>
                <label>Email:</label>
                <input
                    type="text"
                    value={email} // Format the date for the input
                    onChange={(e) => handleValueChange(e, setEmail)}
                    required
                />
            </div>
            {/* <div className='form-field'>
                <label>Graduation year:</label>
                <select
                    
                    value={graduationyear} // Bind the selected value to graduationyear
                    onChange={(e) => handleValueChange(e, setGraduationyear)} // Handle value change
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
            </div> */}
            {/* <div className="form-field">
                <label>Profile Photo:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {profilePhoto && <p>Selected file: {profilePhoto.name}</p>}
            </div> */}
            <div className="form-field">
                <label>New Password:</label>
                <input
                    type="password"
                    value={pwd}
                    onChange={handlePwdChange}
                    required
                />
            </div>
            <div className="form-field">
                <label>Confirm New Password:</label>
                <input
                    type="password"
                    value={confirmPwd}
                    onChange={handleConfirmPwdChange}
                    required
                />
            </div>

            {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
            <button className='submit-button' type="submit" disabled={isLoading} onClick={handleSignUp}>
                {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>

        </form>)
}

export default NewUser;

