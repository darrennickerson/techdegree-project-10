import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { userContext } from '../context/Context';

const PrivateRoute = () => {
  const value = useContext(userContext);
  const user = value.user;

  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
