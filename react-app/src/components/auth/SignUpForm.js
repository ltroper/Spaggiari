import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';

import github from '../../github-logo.png'
import linkedin from  '../../linkedin-logo.png'


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    //error validation
    setErrors([])
    const newErrors = [];

    if (username.length < 4) {
      newErrors.push("Username must be 4 characters or more!");
    }

    if (email.length < 4) {
      newErrors.push("Email must be 4 characters or more!");
    }

    if (password !== repeatPassword) {
      newErrors.push("Passwords do not match.")
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return;
    }

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }



  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-body'>
      <div className='login-left'>
        <img src="https://static.onecms.io/wp-content/uploads/sites/23/2020/12/15/best-financial-year-1219mon-1.jpg" />
      </div>
      <div className='login-right'>
        <form onSubmit={onSignUp}>
          <div>
            <label className='login-label'>User Name</label>
            <input
              className='login-input-fields'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label className='login-label'>Email</label>
            <input
              className='login-input-fields'
              type='email'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label className='login-label'>Password</label>
            <input
              className='login-input-fields'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label className='login-label'>Repeat Password</label>
            <input
              className='login-input-fields'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button className='log-in-button sign-up-button' type='submit'>Sign Up</button>
        </form>
        <div>
          {errors.map((error, ind) => (
            <div className='error' key={ind}>{error}</div>
          ))}
        </div>
        <div className='create-new-account'>
          <p className='not-in-spaggiari'>Already have an account?</p>
          <NavLink
            to="/login"
            style={{
              textDecoration: "underline",
              color: "black",
              fontWeight: "600",
              textUnderlineOffset: "0.2rem"
            }}>
            Log In</NavLink>
        </div>
        <div className='links-to-my-socials'>
          <a href='https://github.com/ltroper/Spaggiari'>
            <img src={github} className="github-linkedin-pics"/>
          </a>
          <a href='https://www.linkedin.com/in/leon-troper-91473a232/'>
            <img src={linkedin} className="github-linkedin-pics"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
