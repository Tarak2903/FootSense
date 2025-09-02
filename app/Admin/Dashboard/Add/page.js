"use client"
import React, { useState } from 'react'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'
import { ToastContainer, toast } from 'react-toastify';
const Page = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
//moonlight
//bright
//moon
//soon
  const handle1 = (e) => {
    setemail(e.target.value);
  }
  const handle2 = (e) => {
    setpassword(e.target.value)
  }
  const handleclick = async () => {
    const res = await fetch('http://localhost:5174/auth/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      toast('User Sucessfuly registered 🤩!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });
    }
    else {
      toast('User already exists', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,        
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"

      />
      <Navbar />
      <div className="flex justify-center items-center min-h-screen w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white px-4">
        <div className="w-full max-w-md bg-[#0f172a] border border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
          <h1 className="text-3xl font-semibold text-center">Enter the Credentials to Set</h1>

          <div className="flex flex-col gap-5">
            <input
              type="text"
              onChange={handle1}
              value={email}
              placeholder="Enter Username"
              className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              onChange={handle2}
              value={password}
              placeholder="Enter Password"
              className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              
              onClick={handleclick}
              className="w-full bg-blue-700
               hover:bg-blue-800 text-white font-medium rounded-full py-2.5
                transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              Set Credetials
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Page
