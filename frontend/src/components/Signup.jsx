import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:4001/api/v1/user/signup", formData,
      {
        withCredentials:true,
        headers: {
          "Content-Type": "application/json",
        }

      }
      );
      console.log("Signup Response:", response.data);
       toast.success(response.data.message);
           // localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/login");
    } catch (error) { 
      if (error.response) {
        console.error("Error Response:", error.response.data);
        const errorMsg = error.response.data.error;

        if (error.response.status === 400) {
            setError("Please enter all required fields.");
        } else if (error.response.status === 401) {
            setError(errorMsg);
        } else if (error.response.status === 402) {
            setError("User already exists.");
        }
    } else {
        setError("Network error. Please check your connection.");
    }

          
    }


    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600">Sign Up</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="space-y-3">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              required
              className="w-full p-2 border rounded-lg"
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              required
              className="w-full p-2 border rounded-lg"
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-full p-2 border rounded-lg"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full p-2 border rounded-lg"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full p-2 border rounded-lg"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
