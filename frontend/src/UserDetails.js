import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './App.css';

function UserDetails() {
  const location = useLocation();
  const { user, card } = location.state || {}; // Get the user and card data from state

  const [cardDetails, setCardDetails] = useState({
    card_number: '',
    card_holder: '',
    expiry_date: '',
    credit_limit: ''
  });

  const [cards, setCards] = useState(card ? [card] : []); // Initialize cards state with existing card if available
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Send the card details to the back-end
    const response = await fetch('http://localhost:5000/add-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...cardDetails,
        customer_id: user.customer_id // Send the user ID along with the card details
      })
    });

    const data = await response.json();
    if (data.status === 'success') {
      alert('Card added successfully!');
      setIsFormVisible(false); // Close the form after submission

      // Fetch updated cards list
      fetchCards();
    } else {
      alert('Failed to add card');
    }
  };

  const fetchCards = async () => {
    const response = await fetch(`http://localhost:5000/get-cards/${user.customer_id}`);
    const data = await response.json();
    if (data.cards) {
      setCards(data.cards); // Update the state with the new list of cards
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  useEffect(() => {
    if (user) {
      fetchCards(); // Fetch the cards when the component mounts
    }
  }, [user]);

  if (!user) {
    return <p>No user data found.</p>;
  }

  return (
    <div className="user-details">
      <nav className="navbar">
        <div className="logo">O</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Offers</li>
          <li>Wallets</li>
          <li>Profile</li>
        </ul>
        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </nav>

      <div className="profile-container">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-header">
            <img className="profile-picture" src={user.profile_picture || "https://via.placeholder.com/150"} alt="Profile" />
            <div className="profile-info">
              <h2>{user.first_name} {user.last_name}</h2>
              <div className="profile-detail">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>ID:</strong> {user.customer_id}</p>
              </div>
              <button className="edit-button">Edit Profile</button>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="cards-section">
          <h3>My Cards</h3>
          {cards.length > 0 ? (
            <table className="card-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Card No</th>
                  <th>Card Holder</th>
                  <th>Outstanding Amount</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{card.card_number}</td>
                    <td>{card.card_holder}</td>
                    <td>₹{card.outstanding}</td>
                    <td>
                      <Link to="/card-details">
                        <button className="details-button">View Details</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No cards available.</p>
          )}

          {/* Add Card Button */}
          <button className="add-card-button" onClick={toggleFormVisibility}>
            {isFormVisible ? 'Cancel' : 'Add Card'}
          </button>

          {/* Card Form */}
          {isFormVisible && (
            <form onSubmit={handleFormSubmit} className="card-form">
              <input
                type="text"
                name="card_number"
                placeholder="Card Number"
                value={cardDetails.card_number}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="card_holder"
                placeholder="Card Holder Name"
                value={cardDetails.card_holder}
                onChange={handleInputChange}
                required
              />
              <input
                type="date"
                name="expiry_date"
                placeholder="Expiry Date"
                value={cardDetails.expiry_date}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="credit_limit"
                placeholder="Credit Limit"
                value={cardDetails.credit_limit}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="submit-button">Submit</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
