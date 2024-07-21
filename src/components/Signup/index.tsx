// src/components/Logout.tsx
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { AxiosError } from "axios";
import { FiArrowLeft } from "react-icons/fi";
import axiosInstance from "../../axiosConfig";

interface IFormInput {
 name: string;
 email: string;
 password: string;
 confirmPassword: string;
}

const Signup: React.FC = () => {
 const {
  register,
  handleSubmit,
  formState: { errors },
  setError,
 } = useForm<IFormInput>();

 const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  try {
   await axiosInstance.post("/api/users/sign-up", data);
  } catch (error) {
   if (error instanceof AxiosError && error.response) {
    const { status, data } = error.response;
    if (status === 400) {
     if (data.errors) {
      data.errors.forEach((err: { param: keyof IFormInput; msg: string }) => {
       setError(err.param, { type: "manual", message: err.msg });
      });
     }
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
 };
 return (
  <div>
   <div className='flex items-center justify-center min-h-screen bg-gray-900'>
    <div className='w-full max-w-md px-8 py-14 space-y-3 bg-gray-800 rounded-lg shadow-md'>
     <h2 className='text-2xl font-bold text-center text-white'>Sign Up</h2>
     <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
       <label htmlFor='email' className='block text-sm font-medium text-white'>
        Name
       </label>
       <input
        id='name'
        type='text'
        className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
         errors.name ? "border-red-500" : "border-gray-300"
        }`}
        {...register("name", { required: "Name is required" })}
       />
       {errors.name && (
        <p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>
       )}
      </div>
      <div className='mb-4'>
       <label htmlFor='email' className='block text-sm font-medium text-white'>
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
        <p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>
       )}
      </div>

      <div className='mb-4'>
       <label
        htmlFor='confirmPassword'
        className='block text-sm font-medium text-white'
       >
        Confirm Password
       </label>
       <input
        id='confirmPassword'
        type='password'
        className={`w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 ${
         errors.confirmPassword ? "border-red-500" : "border-gray-300"
        }`}
        {...register("confirmPassword", {
         required: "Confirm Password is required",
        })}
       />
       {errors.password && (
        <p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>
       )}
      </div>
      <button
       type='submit'
       className='w-full px-3 py-2 font-bold antialiased mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600'
      >
       Submit
      </button>

      <Link
       to={"/"}
       className='inline-flex items-center text-sm text-blue-500 hover:text-white mt-8'
      >
       <FiArrowLeft className='ml-1' />
       Back
      </Link>
     </form>
    </div>
   </div>
  </div>
 );
};

export default Signup;
