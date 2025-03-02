import React from 'react';
import { Link } from 'react-router';

const Header = () => {
  return (
    <header className='header'>
      <nav className='main-nav'>
        <div className='logo-container'>
          <div className='logo'>
            <span className='logo-icon'>🏔️</span>
          </div>
          <h1 className='site-title'>Trailblzrs</h1>
        </div>

        <div className='nav-links'>
          <Link
            to='/parks'
            className='nav-link'
          >
            <span className='nav-icon'>🔍</span> Discover Parks
          </Link>
          <Link
            to='/trips'
            className='nav-link'
          >
            <span className='nav-icon'>📋</span> Itinerary
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
