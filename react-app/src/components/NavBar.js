import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from "react-redux";


import "./NavBar.css"
import SearchBar from './SearchBar';
import logo from '../Logo.png'


const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user);


  return (sessionUser &&
    <nav className='nav-bar-container'>
      <ul>
        <div className='nav-bar-left'>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              <img className='logo-navbar' src={logo} />
            </NavLink>
          </li>
          <SearchBar />
        </div>
        <div className='nav-bar-rigth'>
          <li className='logout-button'>
            <LogoutButton />
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
