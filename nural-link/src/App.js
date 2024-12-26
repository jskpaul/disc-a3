import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/Home';
import Users from './components/userPage';
import NewUser from './components/newUserPage';
import { createClient } from '@supabase/supabase-js'
import { Auth, SignIn } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import LogIn from './components/signIn';




function App() {

  const [search, setSearch] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");

    if (accessToken) {
      setToken(accessToken);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const checkLogIn = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/auth/status", {
        method: "GET",
        // headers: {
        //   "authorization": `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // },
        credentials: "include",
      });
      
      
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        // console.log(response);
        setToken(data.session_token); // Update token state if authenticated
        
      } else {
        setToken(''); // Clear token if not authenticated
      }
    } catch (error) {
      console.error("Error checking login status:", error);

    }

  }

  useEffect(() => {
    checkLogIn()
  })

  // Log when search term changes
  // useEffect(() => {
  //   console.log('Search term changed:', search);
  // }, [search]); // This effect runs every time `search` state changes
  // useEffect(() => {
  //   console.log('New user added: ')
  // }, [users])
  return (
    <Router>
      <div className="App">
        <Navbar setSearch={setSearch} tokenProp={token} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/new" element={<NewUser />} />
          <Route path="/auth" element={<LogIn />} />
        </Routes>
      </div>
    </Router>
    // <div className="App">
    //   <Navbar setSearch={setSearch} />
    //   <div className="users">
    //     {/* <nav className="navbar">
    //       <h1>NUral Network</h1>
    //       <div className="links">
    //         <div>Home</div>
    //         <button>Connect with users</button>
    //         <input type="text" className="search-input" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
    //       </div>
    //     </nav> */}

    //     <div className="users-page">
    //       <div className="mini-profile">
    //         <img
    //           className="profile-photo"
    //           src="https://hips.hearstapps.com/hmg-prod/images/aaron-judge-of-the-new-york-yankees-poses-for-a-photo-news-photo-1729623663.jpg?crop=1.00xw:0.609xh;0,0.0301xh&resize=1200:*"
    //           alt="Profile"
    //         />
    //         <h2>A-A-Ron Judge</h2>
    //         <h3>Year</h3>
    //         <h3>Major</h3>
    //       </div>
    //       <div className="user-boxes">
    //         {users
    //           .filter(
    //             (user) =>
    //               user.name.toLowerCase().includes(search.toLowerCase()) ||
    //               user.major.toLowerCase().includes(search.toLowerCase()) ||
    //               user.year.includes(search)
    //           )
    //           .map((user, index) => (
    //             <User
    //               key={index} // Ensure each component has a unique key
    //               name={user.name}
    //               major={user.major}
    //               year={user.year}
    //             />
    //           ))}

    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
