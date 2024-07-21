import { BiLogoFacebookSquare } from "react-icons/bi";
import { Link } from "react-router-dom";

const FacebookLogin: React.FC = () => {
 return (
  <div>
   <Link
    to={`${process.env.REACT_APP_API_URL}/auth/facebook`}
    className='w-full flex justify-center items-center px-2 py-3 font-semibold antialiased text-lg bg-blue-600 hover:bg-blue-700 rounded-xl'
   >
    <BiLogoFacebookSquare className='w-8 h-8 mr-2' />{" "}
    <p>Continue with Facebook</p>
   </Link>
  </div>
 );
};

export default FacebookLogin;
