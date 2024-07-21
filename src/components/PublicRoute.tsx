import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
 element: React.FC;
 [key: string]: any;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
 element: Component,
 ...rest
}) => {
 const isAuthenticated = !!localStorage.getItem("token");

 return !isAuthenticated ? (
  <Component {...rest} />
 ) : (
  <Navigate to='/dashboard' />
 );
};

export default PublicRoute;
