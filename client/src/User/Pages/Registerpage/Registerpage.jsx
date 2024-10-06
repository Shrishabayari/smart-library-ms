import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import './Registerpage.css';

const Registerpage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const RegisterUser = async (e) => {
    e.preventDefault();

    // Validate mobile number length
    if (mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/register', {
        name,
        mobile,
        email,
        password,
      });

      console.log(response.data);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);

      // Display specific error messages if possible
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Registration failed: ${error.response.data.message}`);
      } else {
        alert('Registration failed. Please check your input and try again.');
      }
    }
  };

  return (
    <div>
      <Header />
      <hr />
      <div className="header">
        <h1 className='Register-heading1'>USER SIGN-UP PAGE</h1>
      </div>
      <div className="Register-container">
        <form onSubmit={RegisterUser}>
          <h2 className="Register-heading2">Registration Form</h2>
          <div className="form-group">
            <input
              className="Register-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              />
              <label className={name ? 'filled' : ''}>Name </label>
          </div>
          <div className="form-group">
          <input
            className="Register-input"
            type="text"
            maxLength={10}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <label className={mobile ? 'filled' : ''}>Mobile :</label>
          </div>
          <div className="form-group">
          <input
            className="Register-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className={email ? 'filled' : ''}>Email :</label>
          </div>
          <div className="form-group">
          <input
            className="Register-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className={password ? 'filled' : ''}>Password :</label>
          </div>
          <button className="Register-Buttion" type="submit">REGISTER</button>
          <br /><br />
          <div className="Log-link">
            Already have an account ?  <Link className="Links" to="/login">Login</Link>
          </div>
        </form>
      </div><br /><br />
      <hr />
      <Footer />
    </div>
  );
};

export default Registerpage;
