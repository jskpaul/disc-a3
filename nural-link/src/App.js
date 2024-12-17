import './App.css';
import { useState, useEffect } from 'react';
import User from './components/user';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/Home';
import Users from './components/userPage';



function App() {

  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([{ name: 'Paul Kim', major: 'Computer Science', year: '2027' },
  { name: 'Daniel Lee', major: 'Computer Science', year: '2025' },
  { name: 'David Yim', major: 'Computer Science', year: '2027' },
  { name: 'John Doe', major: 'Physics', year: '2024' },]);

  // Log when search term changes
  useEffect(() => {
    console.log('Search term changed:', search);
  }, [search]); // This effect runs every time `search` state changes
  useEffect(() => {
    console.log('New user added: ')
  }, [users])
  return (
    <Router>
      <div className="App">
        <Navbar setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
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
