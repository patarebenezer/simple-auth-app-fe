import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess: React.FC = () => {
 const navigate = useNavigate();

 useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const name = params.get("name");
  const email = params.get("email");
  const profilePic = params.get("profilePic");
  const type = params.get("type");

  if (token) {
   const user = { token, name, email, profilePic, type };
   if (profilePic) {
    localStorage.setItem("user", JSON.stringify(user));
   }
   localStorage.setItem("token", token);
   navigate("/dashboard"); // Redirect to a protected route after login
  }
 }, [navigate]);

 return (
  <div className='min-h-screen flex items-center justify-center bg-black text-white'>
   <h1>Loading..</h1>
  </div>
 );
};

export default AuthSuccess;
