"use client"
import React from 'react'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
const page = () => {
  const [id, setid] = useState('');
  const [password, setpassword] = useState('');
  const route = useRouter();
  const handle1 = (e) => {
    setid(e.target.value);
  }
  const handle2 = (e) => {
    setpassword(e.target.value);
  }
  const handleclick = () => {
    if (password === "Tarak@29" && id === "Tarak29") {
      route.push('/Admin/Dashboard');
    }
    else {
      toast('Id or password is wrong', {
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
      <Navbar />
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
        theme="light"

      />
      <div className="top-0 z-[-2] min-h-screen w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">
        <div className="flex w-[40vw] h-[60vh]   m-auto justify-center items-center ">
          <div className="flex flex-col gap-y-15 border p-10 rounded-2xl border-slate-500">
            <h1 className=" text-3xl font-bold">Enter your Credentials</h1>

            <div className="flex flex-col justify-center gap-y-4">
              <input onChange={handle1} className=' border border-slate-500 rounded-2xl' type="text" placeholder='  Enter Username' />
              <input onChange={handle2} className=' border border-slate-500 rounded-2xl' type="password" name="" id="" placeholder='  Enter Password' />
              <button type="button" onClick={handleclick} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In</button>

            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>

  )
}

export default page
