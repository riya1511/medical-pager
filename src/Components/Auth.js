import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import signUpImage from "../assets/signup.jpg";

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    avatarURL: '',
    phoneNumber: ''
}

function Auth() {

  const [form, setForm] = useState(initialState);

  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, password, phoneNo, avatarURL } = form;

    // const URL = "http://localhost:5000/auth";
    const URL = "https://medical-team-pager.herokuapp.com/auth";


    const { data: { token, userID, hashedPassword, fullName }} = await axios.post(`${URL}/${isSignUp ? 'signup' : 'login'}`, {
      username, password, fullName: form.fullName, phoneNo, avatarURL,
    });

    cookies.set('token', token);
    cookies.set('username', username);
    cookies.set('fullName', fullName);
    cookies.set('userID', userID);

    if(isSignUp){
      cookies.set('phoneNo', phoneNo);
      cookies.set('avatarURL', avatarURL);
      cookies.set('hashedPassword', hashedPassword);
    }

    //this will reload the app, where the authToken will not be null and we will render Auth again insted
    //the app will be rendered
    window.location.reload();
  }

  const handleChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value});
  }

  const switchMode = () => {
    setIsSignUp(prevOption => !prevOption)
  }

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignUp ? "Sign Up" : "Log In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="FullName"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNo">Phone Number</label>
                <input
                  name="phoneNo"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
                <button>{isSignUp ? 'Sign Up' : 'Log In'}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>{isSignUp 
                ? "Already have an account?"
                : "Don't have an account?"
                }
                <span onClick={switchMode}>
                    {isSignUp ? ' Log In' : ' Sign Up'}
                </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signUpImage} alt='sign up' />
      </div>
    </div>
  );
}

export default Auth;
