
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from "react-redux";


import "./NavBar.css"
import SearchBar from './SearchBar';


const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user);


  return (sessionUser &&
    <nav className='nav-bar-container'>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <SearchBar />

        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
