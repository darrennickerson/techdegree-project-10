import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useState } from 'react/cjs/react.development';

const UserSignIn = () => {
  const [message, setMessage] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    const encodedCredentials = Buffer.from(
      `${e.target.emailAddress.value}:${e.target.password.value}`
    ).toString('base64');

    axios
      .get('users', {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          res.data.encodedCreds = encodedCredentials;
          Cookies.set('authenticatedUser', JSON.stringify(res.data), {
            expires: 7,
            path: '',
          });
          window.location.assign('/');
        }
      })
      .catch(async (error) => {
        if (error.response.status === 401) {
          await setMessage('Email address and password do not match');
          console.log(message);
        }
      });
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <div>{message ? message : ''}</div>

      <form onSubmit={handleSubmit}>
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
        <Link to="/sign_up">sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
