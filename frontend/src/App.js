import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LoginSignup from './LoginSignup';
import UserDetails from './UserDetails';  // Import UserDetails component

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              {/* Navigation Bar */}
              <nav className="navbar">
                <div className="logo">O</div>
                <ul className="nav-links">
                  <li>Home</li>
                  <li>About</li>
                  <li>Wallets</li>
                  <li>Services</li>
                </ul>
                <Link to="/login-signup">
                  <button className="signup-button">Sign Up</button>
                </Link>
              </nav>

              {/* Main Content */}
              <div className="main-content">
                {/* Left Section */}
                <div className="text-section">
                  <p className="tagline">The card is key to</p>
                  <h1 className="main-heading">
                    The <span>Thinking</span>
                    <br /> Behind the Money
                  </h1>
                  <button className="cta-button">Get Started</button>
                </div>

                {/* Right Section */}
                <div className="card-section">
                  <div className="credit-card card1">
                    <p>**** 7995 4585 5335</p>
                    <div className="chip"></div>
                  </div>
                  <div className="credit-card card2">
                    <p>VISA</p>
                    <p>5478 2535 4565 9123</p>
                  </div>
                  <div className="credit-card card3">
                    <p>Transaction Details</p>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/user-details" element={<UserDetails />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
