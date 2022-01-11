import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { userContext } from '../context/Context';

const PrivateRoute = () => {
  const value = useContext(userContext);
  console.log(value.user);
  return value.user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
