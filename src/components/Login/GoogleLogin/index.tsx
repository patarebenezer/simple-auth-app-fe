import { BiLogoGoogle } from "react-icons/bi";
import { Link } from "react-router-dom";

const GoogleLogin: React.FC = () => {
 return (
  <div>
   <Link
    to={`${process.env.REACT_APP_API_URL}/auth/google`}
    className='w-full flex justify-center items-center px-2 py-3 font-semibold antialiased text-lg bg-gray-500 hover:bg-gray-600 rounded-xl'
   >
    <BiLogoGoogle className='w-8 h-8 mr-2' /> <p>Continue with Google</p>
   </Link>
  </div>
 );
};

export default GoogleLogin;
