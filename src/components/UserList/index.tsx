import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";

interface User {
 id: number;
 name: string;
 email: string;
 createdAt: string;
 lastLoginAt: string;
 loginCount: number;
 logoutAt: string;
}

interface Statistic {
 totalUsers: number;
 averageSessionsLast7Days: Float32Array;
 email: string;
 activeSessionsToday: number;
}

const UserList: React.FC = () => {
 const [users, setUsers] = useState<User[]>([]);
 const [statictics, setStatistics] = useState<Statistic>();
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchUsers = async () => {
   try {
    const response = await axiosInstance.get("/api/users/dashboard");
    setUsers(response.data);
   } catch (err) {
    setError("Error fetching users");
   } finally {
    setLoading(false);
   }
  };

  const fetchStatistics = async () => {
   try {
    const response = await axiosInstance.get("/api/users/user-statistics");
    setStatistics(response.data);
   } catch (err) {
    setError("Error fetching users");
   } finally {
    setLoading(false);
   }
  };

  fetchStatistics();
  fetchUsers();
 }, []);

 if (loading) {
  return (
   <div className='flex items-center justify-center min-h-screen'>
    Loading...
   </div>
  );
 }

 if (error) {
  return (
   <div className='flex items-center justify-center min-h-screen'>{error}</div>
  );
 }

 return (
  <div className='bg-gray-900 text-white'>
   <h1 className='text-3xl font-bold mb-8 text-center'>User Dashboard</h1>
   <table className='table-auto w-full'>
    <thead>
     <tr>
      <th className='px-4 py-2'>Name</th>
      <th className='px-4 py-2'>Sign Up Time</th>
      <th className='px-4 py-2'>Login Count</th>
      <th className='px-4 py-2'>Last Logout</th>
     </tr>
    </thead>
    <tbody>
     {users?.map((user) => (
      <tr key={user.id}>
       <td className='border px-4 py-2'>{user.name}</td>
       <td className='border px-4 py-2'>
        {new Date(user.createdAt).toLocaleString()}
       </td>
       <td className='border px-4 py-2'>{user.loginCount}</td>
       <td className='border px-4 py-2'>
        {user.logoutAt ? new Date(user.logoutAt).toLocaleString() : "Never"}
       </td>
      </tr>
     ))}
    </tbody>
   </table>

   <h1 className='text-3xl font-bold mt-10 mb-7 text-center'>
    Statistics Dashboard
   </h1>
   <table className='table-auto w-fit mx-auto'>
    <thead>
     <tr>
      <th className='px-4 py-2'>Active session today</th>
      <th className='px-4 py-2'>Average 7 days</th>
      <th className='px-4 py-2'>Total users</th>
     </tr>
    </thead>
    <tbody>
     <tr>
      <td className='border px-4 py-2'>{statictics?.activeSessionsToday}</td>
      <td className='border px-4 py-2'>
       {statictics?.averageSessionsLast7Days}
      </td>
      <td className='border px-4 py-2'>{statictics?.totalUsers}</td>
     </tr>
    </tbody>
   </table>
  </div>
 );
};

export default UserList;
