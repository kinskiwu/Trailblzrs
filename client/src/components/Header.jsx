import React from 'react';

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
          <a
            href='/parks'
            className='nav-link'
          >
            <span className='nav-icon'>🔍</span> Discover Parks
          </a>
          <a
            href='/trips'
            className='nav-link'
          >
            <span className='nav-icon'>📋</span> Itinerary
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
