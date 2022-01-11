import axios from 'axios';
import { useState } from 'react/cjs/react.development';
import ValidationErrors from '../components/ValidationErrors';
import Cookies from 'js-cookie';

const UserSignUp = () => {
  const [valErrors, setValErrors] = useState([]);

  //Form to create a new user. Then automatically logs them in
  const handleSignUp = (e) => {
    e.preventDefault();
    let data = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      emailAddress: e.target.emailAddress.value,
      password: e.target.password.value,
    };

    axios
      .post('users', data)
      .then((response) => {
        if (response.status === 201) {
          const encodedCredentials = Buffer.from(
            `${data.emailAddress}:${data.password}`
          ).toString('base64');
          data.id = response.data.id;
          data.encodedCreds = encodedCredentials;
          delete data['password'];
          Cookies.set('authenticatedUser', JSON.stringify(data), {
            expires: 1,
          });

          window.location.assign('/');
        }
      })
      .catch((error) => {
        setValErrors(error.response.data.errors);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    window.location.assign('/');
  };
  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      {valErrors.length > 0 ? <ValidationErrors errors={valErrors} /> : ''}

      <form onSubmit={handleSignUp}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" />
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" />
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        <button className="button" type="submit">
          Sign Up
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <p>
        Already have a user account? Click here to
        <a href="sign-in.html">sign in</a>!
      </p>
    </div>
  );
};

export default UserSignUp;
