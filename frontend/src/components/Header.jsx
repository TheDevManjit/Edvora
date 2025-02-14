import { useState,useEffect} from "react";
import { Menu, X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ]= useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);


  const handleLogout = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/api/v1/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      //  localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left: Logo and Name */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-600"><Link to="/">Edvora</Link></span>
        </div>

        {/* Mid: Search Bar (Visible in all views) */}
        <div className="flex flex-1 mx-4 max-w-md justify-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>

        {/* Right: Login & Signup Buttons */}
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-[100px] px-2 py-2 my-3 border rounded-lg hover:bg-gray-100 text-center"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-[100px] px-2 py-2 my-3 border rounded-lg hover:bg-gray-100 text-center block"
              >
                Login
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 my-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Sign Up
                </button>
              </Link>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full p-5 bg-white shadow-lg transform ${isOpen ? "translate-y-20" : "-translate-y-full"} transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center pt-16 mt-[-8px] `}
      >
        {/* <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
          <X size={28} />
        </button> */}
        {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-[100px] px-2 py-2 my-3 border rounded-lg hover:bg-gray-100 text-center"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-[100px] px-2 py-2 my-3 border rounded-lg hover:bg-gray-100 text-center block"
              >
                Login
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Sign Up
                </button>
              </Link>
            </>
          )}



        <Link to="/signup" onClick={() => setIsOpen(false)} className="w-[100px] px-2 py-2 my-3 border rounded-lg hover:bg-gray-100 text-center">
          <button >Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}
