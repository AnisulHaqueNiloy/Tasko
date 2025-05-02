import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/api/axiosInstance";

// Create the context
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0); // Initialize points

  const incrementPoints = (taskStatus) => {
    if (taskStatus === "Done") {
      setPoints((prevPoints) => prevPoints + 20); // Add 20 points when the task is done
    }
  };
  console.log(points);

  // Check authentication on mount
  useEffect(() => {
    axiosInstance
      .get("/user")
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
        console.log(res.data.user); // Log user data directly
      })
      .catch((err) => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const authInfo = { user, loading, setUser, incrementPoints, points };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
