import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link here
import './App.css';

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    userType: 'user',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isLogin && formData.password !== formData.confirmPassword) {
    setErrorMessage("Passwords do not match");
    return;
  }

  const url = isLogin ? 'http://127.0.0.1:5000/login' : 'http://127.0.0.1:5000/register'; 
  const data = isLogin ? {
    email: formData.email,
    password: formData.password,
  } : {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    password: formData.password,
    address: formData.address,
    user_type: formData.userType,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message); 
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        userType: 'user',
      });
      if (isLogin) {
        // Redirect to user details page
        navigate('/user-details', { state: { user: result.user, card: result.card } });
      } else {
        navigate('/success');
      }
    } else {
      setErrorMessage(result.message);
      navigate('/failed', { state: { error: result.message } });
    }
  } catch (error) {
    console.error("Error during signup/login:", error);
    setErrorMessage("An error occurred. Please try again.");
    navigate('/failed', { state: { error: "An error occurred. Please try again." } });
  }
};

  

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">O</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li>Wallets</li>
          <li>Services</li>
        </ul>
        <Link to="/">
          <button className="signup-button">Back to Home</button>
        </Link>
      </nav>

      <div className="login-signup-page">
        <div className="form-container">
          <h2 className="form-title">{isLogin ? 'Login' : 'Sign Up'}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>User Type</label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </>
            )}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}
            <button type="submit" className="form-button">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
          <p className="toggle-text" onClick={toggleForm}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span>{isLogin ? 'Sign Up' : 'Login'}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
