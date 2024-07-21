import { useForm, SubmitHandler } from "react-hook-form";
import { isAxiosError } from "axios";
import axiosInstance from "../../axiosConfig";
import { AiFillCheckCircle } from "react-icons/ai";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

interface IFormInput {
 oldPassword: string;
 newPassword: string;
 confirmNewPassword: string;
}

const ResetPassword: React.FC = () => {
 const {
  register,
  handleSubmit,
  formState: { errors },
  setError,
 } = useForm<IFormInput>();

 const [messageSuccess, setMessageSuccess] = useState("");

 const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  try {
   const payload = {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
    confirmNewPassword: data.confirmNewPassword,
   };

   // Get the token from localStorage or another secure storage
   const token = localStorage.getItem("token");

   const response = await axiosInstance.post(
    "/api/users/reset-password",
    payload,
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );
   setMessageSuccess(response.data);
  } catch (error) {
   if (isAxiosError(error) && error.response) {
    const { status, data } = error.response;
    if (status === 400) {
     setError("oldPassword", { type: "manual", message: data });
    } else if (status === 400) {
     setError("newPassword", { type: "manual", message: data });
    } else if (status === 400) {
     setError("confirmNewPassword", { type: "manual", message: data });
    }
   }
  }
 };

 return (
  <>
   {/* Reset password form */}
   <div className='flex items-center justify-center min-h-screen bg-gray-900'>
    {messageSuccess && (
     <div className='flex flex-col justify-center'>
      <AiFillCheckCircle className='text-green-500 mx-auto my-5 w-20 h-20' />
      <h3 className='text-xl text-white'>{messageSuccess}</h3>
      <Link
       to={"/"}
       className='inline-flex mt-5 mx-auto items-center text-blue-500 hover:text-white'
      >
       <FiArrowLeft />
       Back
      </Link>
     </div>
    )}

    {!messageSuccess && (
     <div className='w-full max-w-md px-8 py-14 space-y-3 bg-gray-800 rounded-lg shadow-md'>
      <div className='flex items-center justify-between mb-10'>
       <Link
        to={"/"}
        className='inline-flex items-center text-sm text-blue-500 hover:text-white'
       >
        <FiArrowLeft className='mr-1' />
        Back
       </Link>
       <h2 className='text-2xl font-bold text-center text-white'>
        Reset password
       </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
       <div className='mb-4'>
        <label
         htmlFor='oldPassword'
         className='block text-sm font-medium text-white'
        >
         Old Password
        </label>
        <input
         id='oldPassword'
         type='password'
         className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
          errors.oldPassword ? "border-red-500" : "border-gray-300"
         }`}
         {...register("oldPassword", { required: "Old Password is required" })}
        />
        {errors.oldPassword && (
         <p className='mt-1 text-sm text-red-600'>
          {errors.oldPassword.message}
         </p>
        )}
       </div>

       <div className='mb-4'>
        <label
         htmlFor='newPassword'
         className='block text-sm font-medium text-white'
        >
         New Password
        </label>
        <input
         id='newPassword'
         type='password'
         className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
          errors.newPassword ? "border-red-500" : "border-gray-300"
         }`}
         {...register("newPassword", { required: "New Password is required" })}
        />
        {errors.newPassword && (
         <p className='mt-1 text-sm text-red-600'>
          {errors.newPassword.message}
         </p>
        )}
       </div>

       <div className='mb-4'>
        <label
         htmlFor='confirmNewPassword'
         className='block text-sm font-medium text-white'
        >
         Confirm New Password
        </label>
        <input
         id='confirmNewPassword'
         type='password'
         className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
          errors.confirmNewPassword ? "border-red-500" : "border-gray-300"
         }`}
         {...register("confirmNewPassword", {
          required: "Confirm New Password is required",
         })}
        />
        {errors.confirmNewPassword && (
         <p className='mt-1 text-sm text-red-600'>
          {errors.confirmNewPassword.message}
         </p>
        )}
       </div>

       <button
        type='submit'
        className='w-full px-3 py-2 font-bold antialiased mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600'
       >
        Submit
       </button>
      </form>
     </div>
    )}
   </div>
  </>
 );
};

export default ResetPassword;
