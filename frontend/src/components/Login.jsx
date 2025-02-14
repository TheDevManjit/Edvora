import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({
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
      const response = await axios.post("http://localhost:4001/api/v1/user/login", formData,
      {
        withCredentials:true,
        headers: {
          "Content-Type": "application/json",
        }

      }
      );
      console.log("Signup Response:", response.data);
      toast.success(response.data.message);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/");


    } catch (error) { 
      if (error.response) {
        console.error("Error Response:", error.response.data);
          setError(error.response.data.error);
          toast.error(error.response.data.error);
    } else {
        setError("Network error. Please check your connection.");
    }

          
    }


    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="space-y-3">
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
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <a href="/forgot-password" className="text-blue-600 hover:underline text-sm">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
