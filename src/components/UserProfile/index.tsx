import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosInstance from "../../axiosConfig";

interface UserProfileType {
 email: string;
 name: string;
}

interface IFormInput {
 name: string;
}

const UserProfile: React.FC = () => {
 const [profile, setProfile] = useState<UserProfileType | null>(null);
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<string | null>(null);
 const [success, setSuccess] = useState<number | null>(null);

 const {
  register,
  handleSubmit,
  formState: { errors },
  setError: setFormError,
 } = useForm<IFormInput>();

 useEffect(() => {
  const fetchProfile = async () => {
   try {
    const response = await axiosInstance.get("/api/users/profile");
    setProfile(response.data);
    setSuccess(response.status);
   } catch (err) {
    setError("Error fetching user profile");
   } finally {
    setLoading(false);
   }
  };

  fetchProfile();
 }, []);

 const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  try {
   const response = await axiosInstance.put("/api/users/profile", data);
   setProfile(response.data);
  } catch (error) {
   console.error(error);
   setFormError("name", { type: "manual", message: "Error updating name" });
  }
 };

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
  <div className='flex items-center justify-center min-h-screen bg-gray-900 text-white'>
   <div className='w-full max-w-md px-8 py-14 space-y-3 bg-gray-800 rounded-lg shadow-md'>
    <p className='text-sm text-center'>Welcome to dashboard</p>
    <h2 className='text-2xl font-bold text-center'>User Profile</h2>
    {success === 200 && (
     <p className='bg-green-600 text-white px-2 rounded-md'>
      Name successfull updated!
     </p>
    )}
    <div className='mb-4'>
     <label className='block text-sm font-medium'>Email</label>
     <div className='mt-1 text-sm'>{profile?.email}</div>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
     <div className='mb-4'>
      <label htmlFor='name' className='block text-sm font-medium'>
       Name
      </label>
      <input
       id='name'
       type='text'
       defaultValue={profile?.name}
       className={`w-full px-3 py-2 mt-1 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
        errors.name ? "border-red-500" : "border-gray-300"
       }`}
       {...register("name", { required: "Name is required" })}
      />
      {errors.name && (
       <p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>
      )}
     </div>
     <button
      type='submit'
      className='w-full px-3 py-2 font-bold antialiased mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600'
     >
      Update Name
     </button>
    </form>
   </div>
  </div>
 );
};

export default UserProfile;
