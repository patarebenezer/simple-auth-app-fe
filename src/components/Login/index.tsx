import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { isAxiosError } from "axios";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FacebookLogin";
import axiosInstance from "../../axiosConfig";
import { Link } from "react-router-dom";
import { AiFillCheckCircle, AiFillInteraction } from "react-icons/ai";
import LoadingSpinner from "../LoadingSpinner";

interface IFormInput {
 email: string;
 password: string;
}

const Login: React.FC = () => {
 const [loginEmail, setLoginEmail] = useState(false);
 const [status, setStatus] = useState("");
 const {
  register,
  handleSubmit,
  formState: { errors },
  setError,
  watch,
  reset,
 } = useForm<IFormInput>();

 const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  if (loginEmail) {
   try {
    const response = await axiosInstance.post("/api/users/sign-in", data);
    localStorage.setItem("user", JSON.stringify(response.data));
    window.location.href = `${process.env.REACT_APP_BASE_URL}/auth-success?token=${response.data.token}`;
   } catch (error) {
    if (isAxiosError(error) && error.response) {
     const { status, data } = error.response;
     if (status === 404) {
      if (data.includes("Email")) {
       setError("email", { type: "manual", message: data });
      } else if (data.includes("password")) {
       setError("password", { type: "manual", message: data });
      } else {
       setError("email", { type: "manual", message: "Invalid credentials" });
       setError("password", { type: "manual", message: "Invalid credentials" });
      }
     } else if (status === 403) {
      setError("email", { type: "manual", message: data });
     } else {
      setError("email", {
       type: "manual",
       message: "An unexpected error occurred",
      });
     }
    } else {
     setError("email", {
      type: "manual",
      message: "An unexpected error occurred",
     });
    }
   }
  }
 };

 const resendVerifyEmail = async () => {
  setStatus("Loading..");
  try {
   const response = await axiosInstance.post(
    "/api/users/resend-verification-email",
    {
     email: watch("email"),
    }
   );
   setStatus(response.data);
  } catch (error) {
   console.error(error);
  }
 };

 const redirectLoginOptions = () => {
  setLoginEmail(false);
  setStatus("");
  reset();
 };

 return (
  <div className='bg-gray-900'>
   <div className='flex justify-between items-center p-4'>
    <img
     src='https://dummyimage.com/300/09f.png/fff'
     alt='logo'
     className='w-16 h-16 rounded-full'
    />
    <Link
     to={"/sign-up"}
     className='flex justify-center items-center px-4 py-2 font-semibold antialiased text-lg border-slate-600 border-2 hover:bg-gray-600 rounded-xl  text-white'
    >
     Sign up
    </Link>
   </div>
   {!loginEmail && (
    <div className='min-h-screen flex items-center justify-center -mt-24 text-white'>
     <div className='w-full max-w-md space-y-8 mx-10'>
      <h2 className='text-center text-3xl font-extrabold'>
       Log in to Simple Auth
      </h2>
      <div className='space-y-5'>
       <GoogleLogin />
       <FacebookLogin />
      </div>
      <div className='text-center'>
       <button
        onClick={() => setLoginEmail(!loginEmail)}
        className='inline-flex items-center text-sm text-blue-500 hover:text-white'
       >
        Continue with Email <FiArrowRight className='ml-1' />
       </button>
      </div>
     </div>
    </div>
   )}

   {/* Login with email form */}
   {loginEmail && status !== "Loading.." ? (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
     <div className='w-full max-w-md px-8 py-14 space-y-3 bg-gray-800 rounded-lg shadow-md -mt-40'>
      <h2 className='text-2xl font-bold text-center text-white'>
       {status ? "Success" : "Login"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
       {!status && (
        <>
         <div className='mb-4'>
          <label
           htmlFor='email'
           className='block text-sm font-medium text-white'
          >
           Email
          </label>
          <input
           id='email'
           type='email'
           className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
            errors.email ? "border-red-500" : "border-gray-300"
           }`}
           {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
           <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
          )}
         </div>
         <div className='mb-4'>
          <label
           htmlFor='password'
           className='block text-sm font-medium text-white'
          >
           Password
          </label>
          <input
           id='password'
           type='password'
           className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
            errors.password ? "border-red-500" : "border-gray-300"
           }`}
           {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
           <p className='mt-1 text-sm text-red-600'>
            {errors.password.message}
           </p>
          )}
         </div>
        </>
       )}

       {errors?.email?.message?.includes("not verified") ? (
        <div className='text-center'>
         {status ? (
          <div className='flex items-center justify-center gap-2 mt-10'>
           <AiFillCheckCircle className='text-green-500 w-10 h-10' />
           <h3 className='text-sm text-white'>{status}</h3>
          </div>
         ) : (
          <button
           onClick={resendVerifyEmail}
           className='inline-flex items-center text-blue-500 hover:text-white'
          >
           Resend Email Verification <AiFillInteraction className='ml-1' />
          </button>
         )}
        </div>
       ) : (
        <button
         type='submit'
         className='w-full px-3 py-2 font-bold antialiased mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600'
        >
         Login
        </button>
       )}
       <div
        className='text-center cursor-pointer'
        onClick={redirectLoginOptions}
       >
        <p className='inline-flex items-center text-sm text-blue-500 hover:text-white mt-8'>
         <FiArrowLeft className='ml-1' />
         Other Login options
        </p>
       </div>
      </form>
     </div>
    </div>
   ) : (
    <div className='text-center mt-30 bg-gray-900 text-white min-h-screen flex items-center justify-center -mt-24'>
     {loginEmail && <LoadingSpinner />}
    </div>
   )}
  </div>
 );
};

export default Login;
