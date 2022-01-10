import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../context/Context';

const Header = () => {
  const value = useContext(userContext);
  const user = value.user;
  const handleSignOut = value.actions.signOut;

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          <ul className="header--signedout">
            {user ? (
              <>
                <li>
                  Welcome {user.firstName} {user.lastName} !
                </li>
                <li>
                  <Link to="/" onClick={handleSignOut}>
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
