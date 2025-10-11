import React from 'react';
import { useNavigate } from 'react-router';
import '../style/Home.css';


function HomePage () {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="main-content">
        <div className="page-title">
          <h1>Queue System</h1>
          <p>Monitor current numbers and wait times</p>
        </div>

        <div className="home-role-buttons">
          <button
            className="role-btn customer"
            onClick={() => navigate('/customer')}
          >
            Customer
          </button>
          <button
            className="role-btn employee"
            onClick={() => navigate('/employee')}
          >
            Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export { HomePage };
