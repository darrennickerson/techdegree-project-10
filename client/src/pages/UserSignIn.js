import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { userContext } from '../context/Context';

const UserSignIn = () => {
  const value = useContext(userContext);
  const signIn = value.actions.signIn;

  return (
    <div className="form--centered">
      <h2>Sign In</h2>

      <form onSubmit={signIn}>
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        <button className="button" type="submit">
          Sign In
        </button>
        <button
          className="button button-secondary"
          onClick={(e) => {
            e.preventDefault();
            window.location.assign('/');
          }}
        >
          Cancel
        </button>
      </form>
      <p>
        Don't have a user account? Click here to{' '}
        <Link to="/signup">sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
