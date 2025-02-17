import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:4001/api/v1";

  // Function to verify token validity
  const verifyUser = async () => {
    let token = localStorage.getItem("token");
    console.log("Retrieved Token from Storage:", token); // Debugging
  
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
  
    try {
      token = JSON.parse(token); // Ensure the token is properly parsed
      console.log("Parsed Token:", token); // Debugging
  
      const response = await axios.get(`${API_BASE_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
  
      console.log("User Data from API:", response.data.user); // Debugging
      setUser(response.data.user);
    } catch (error) {
      console.error("Error verifying user:", error.response?.data || error.message);
      localStorage.removeItem("token"); // Remove invalid token
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    verifyUser();
  }, []);

  // Login function
  const login = (userData, token) => {
    localStorage.setItem("token", JSON.stringify(token)); // Ensure token is stored as string
    setUser(userData); // Update user state
    verifyUser(); // Force re-check after login
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
