import axios from "axios";

const API_BASE_URL = "http://localhost:4001/api/v1"; // Define base URL

// Fetch all courses
export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/course/getall`, {
      withCredentials: true, // Use if authentication is required
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch course by ID (Fixing your error)
export const fetchCourseById = async (courseId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/course/${courseId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching course ${courseId}:`, error.response?.data || error.message);
    throw error;
  }
};

// Signup function
export const signup = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/signup`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error in signup:", error.response?.data || error.message);
    throw error;
  }
};
