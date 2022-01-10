import React, { useState, createContext } from 'react';
import Cookies from 'js-cookie';

export const userContext = createContext();
export const UserProvider = (props) => {
  const [user, setUser] = useState();
  const signOut = () => {
    Cookies.remove('authenticatedUser');
    setUser(null);
    window.location.assign('/');
  };

  const value = {
    user,
    setUser,
    actions: {
      signOut: signOut,
    },
  };

  return (
    <userContext.Provider value={value}>{props.children}</userContext.Provider>
  );
};

export const Consumer = userContext.Consumer;
