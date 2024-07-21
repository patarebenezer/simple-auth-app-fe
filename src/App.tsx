import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthSuccess from "./components/AuthSuccess";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Logout from "./components/Logout";
import ResetPassword from "./components/ResetPassword";
import Signup from "./components/Signup";

const App: React.FC = () => {
 return (
  <Router>
   <Routes>
    <Route path='/' element={<PublicRoute element={Login} />} />
    <Route path='/sign-up' element={<PublicRoute element={Signup} />} />
    <Route
     path='/reset-password'
     element={<ProtectedRoute element={ResetPassword} />}
    />
    <Route path='/auth-success' element={<AuthSuccess />} />
    <Route path='/dashboard' element={<ProtectedRoute element={Dashboard} />} />
    <Route path='/logout' element={<ProtectedRoute element={Logout} />} />
   </Routes>
  </Router>
 );
};

export default App;
