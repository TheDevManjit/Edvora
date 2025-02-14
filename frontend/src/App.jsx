import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import AuthLayout from './components/AuthLayout'
import { Toaster } from "react-hot-toast";

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Wrap Login & Signup with AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
