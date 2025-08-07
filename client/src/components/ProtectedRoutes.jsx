import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, screenLoading } = useSelector(
    (state) => state.userReducer
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!screenLoading && !isAuthenticated) {
      navigate("/login");                      
    }
    // console.log(isAuthenticated)
  }, [isAuthenticated, screenLoading]);
  // if navigate('/login') runs, then url on browser changes to '/login' automatically -> <ProtectedRoutes/> will unmount & <Login/> will mount -> no return <Home/>
  return children;
};

export default ProtectedRoutes;
