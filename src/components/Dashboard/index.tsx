import React, { useEffect, useState } from "react";
import Logout from "../Logout";
import { Link } from "react-router-dom";
import UserList from "../UserList";
import UserProfile from "../UserProfile";

interface User {
 email: string;
 name: string;
 profilePic?: string;
 type?: string;
}

const Dashboard: React.FC = () => {
 const [user, setUser] = useState<User | null>(null);

 useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
   setUser(JSON.parse(storedUser));
  }
 }, []);

 return (
  <div className='w-full flex flex-col px-10 pb-10 lg:pb-0 lg:px-0 lg:flex-row-reverse justify-evenly items-center bg-gray-900'>
   <div className='min-h-screen flex flex-col gap-8 items-center justify-center bg-gray-900 text-white'>
    <h1 className='text-xl font-bold antialiased'>Welcome to the Dashboard!</h1>
    {user && (
     <div className='text-center text-sm'>
      <img
       src={user?.profilePic ?? "https://dummyimage.com/250/ffffff/000000"}
       alt='Profile'
       className='rounded-full w-24 h-24 mx-auto mb-4'
      />

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
     </div>
    )}
    <Logout />
    {!user?.type && (
     <Link
      to={"/reset-password"}
      className='inline-flex mx-auto items-center text-blue-500 hover:text-white'
     >
      Reset password
     </Link>
    )}
   </div>

   <UserProfile />
   <UserList />
  </div>
 );
};

export default Dashboard;
