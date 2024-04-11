import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const {loading,isAuthenticated} = useSelector((state: RootState) => state.user);


  if (!loading) {
    // Handle loading state here, maybe return a loading indicato
    if (!isAuthenticated) {
        // If user is not authenticated, redirect to login page
        return <Navigate to={"/login"} />
    }
  }
  return children;

  // If user is authenticated, render the children
};

export default ProtectedRoute;
