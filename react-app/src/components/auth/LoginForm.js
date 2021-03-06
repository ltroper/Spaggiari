import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

import github from '../../github-logo.png'
import linkedin from  '../../linkedin-logo.png'

import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleSubmitDemo = async (e) => {
    e.preventDefault();
    const demoEmail = "demo@aa.io"
    const demoPassword = "password"
    await dispatch(login(demoEmail, demoPassword)
    )
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-body'>
      <div className='login-left'>
        <img src='https://wealthofgeeks.com/wp-content/uploads/2021/08/1146589_BestFinancialPodcasts_Option1_080621.jpg' />
      </div>
      <div className='login-right'>
        <h2 className='log-in-title'>Log in to Spaggiari</h2>
        <h4 className='log-in-description'>Buying and selling crypto at your fingertips</h4>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label className='login-label' htmlFor='email'>Email</label>
            <input
              className='login-input-fields'
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label className='login-label' htmlFor='password'>Password</label>
            <input
              className='login-input-fields'
              name='password'
              type='password'
              value={password}
              onChange={updatePassword}
            />
            <button className='log-in-button' type='submit'>Log in</button>
            <button className='log-in-button bright' onClick={handleSubmitDemo}>Demo</button>
          </div>
        </form>
        <div className='create-new-account'>
          <p className='not-in-spaggiari'>Not in Spaggiari?</p>
          <NavLink
            to="/sign-up"
            style={{
              textDecoration: "underline",
              color: "black",
              fontWeight: "600",
              textUnderlineOffset: "0.2rem"
            }}>
            Create an account</NavLink>
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

export default LoginForm;
