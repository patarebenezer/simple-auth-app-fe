// src/components/Logout.tsx
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { FiLogOut } from "react-icons/fi";

const Logout: React.FC = () => {
 const navigate = useNavigate();
 const handleLogout = async () => {
  try {
   await axios.get("/api/users/sign-out", { withCredentials: true });
   localStorage.removeItem("token");
   localStorage.removeItem("user");
   navigate("/");
  } catch (err) {
   console.error("Logout error:", err);
  }
 };

 return (
  <div>
   <button
    onClick={handleLogout}
    className='w-full flex justify-center items-center px-4 py-3 font-semibold antialiased text-lg bg-red-500 hover:bg-red-600 rounded-md mt-4'
   >
    <p className='text-sm font-bold antialiased'>SIGN OUT</p>
    <FiLogOut className='w-5 h-5 ml-2' />
   </button>
  </div>
 );
};

export default Logout;
