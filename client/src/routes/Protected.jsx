import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom"; // or 'useNavigate' for react-router v6
import { AuthContext } from "../context/AuthProvider";

const Protected = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Loadin</h1>;
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to={"auth/login"}></Navigate>;
};

export default Protected;
