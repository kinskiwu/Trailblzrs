import { Link } from 'react-router';

const Header = () => {
  return (
    <header className='header'>
      <nav className='main-nav'>
        <div className='logo-container'>
          <span className='logo-icon'>🏔️</span>
          <h1 className='logo-title'>Trailblzrs</h1>
        </div>

        <div className='nav-links'>
          <Link
            to='/parks'
            className='nav-link'
          >
            <span className='nav-icon'>🔍</span>
            <span className='nav-link-text'>Discover Parks</span>
          </Link>
          <Link
            to='/trips'
            className='nav-link'
          >
            <span className='nav-icon'>📋</span>
            <span className='nav-link-text'>Itinerary</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
