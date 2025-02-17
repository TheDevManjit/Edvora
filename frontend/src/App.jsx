import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AuthLayout from "./components/AuthLayout";
import CourseDetail from "./components/CourseDetail"; // Import CourseDetail
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Course Detail Route */}
        <Route path="/course/:category" element={<CourseDetail />} />

        {/* Wrap Login & Signup with AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
