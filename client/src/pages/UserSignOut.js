import { useContext } from 'react';
import { userContext } from '../context/Context';

const UserSignOut = () => {
  const value = useContext(userContext);
  const signOut = value.actions.signOut;
  const user = value.user;

  // if a user is logged in sign out else goto sign in page
  if (user) {
    signOut();
  } else {
    window.location.replace('/');
  }
  return null;
};

export default UserSignOut;
