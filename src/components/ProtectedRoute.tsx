import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
 element: React.FC;
 [key: string]: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
 element: Component,
 ...rest
}) => {
 const isAuthenticated = !!localStorage.getItem("token");

 return isAuthenticated ? <Component {...rest} /> : <Navigate to='/' />;
};

export default ProtectedRoute;
