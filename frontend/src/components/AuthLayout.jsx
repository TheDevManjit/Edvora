import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AuthLayout = () => {
  return (
    <div>
      <Header />
      <main className="auth-container">
        <Outlet />  {/* Login or Signup will be rendered here */}
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
