import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className='not-found-container'>
      <h2 className='not-found-title'>404 - Page Not Found</h2>
      <p className='not-found-text'>
        Oops! The page you&apos;re looking for does not exist.
      </p>
      <Link
        to='/'
        className='not-found-link'
      >
        Back to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
