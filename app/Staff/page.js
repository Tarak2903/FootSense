"use client"
import React from 'react'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '@/Context/AuthContext'
import RouteGuard from '@/Guard/RouteGuard'
const Page = () => {
  const {checkAuthStatus}=useAuth();
  const [id, setid] = useState('')
  const [pass, setpass] = useState('');
  const [flag, setflag] = useState(true)
  const handle1 = (e) => {
    setid(e.target.value);
  }
  const handle2 = (e) => {
    setpass(e.target.value);
  }
  const route = useRouter();
  const handleClick = async () => {

    try {
      let res = await fetch('http://localhost:5174/auth/Signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: id, password: pass }),
        credentials: 'include'
      })
      const data = await res.json();
      if (data.success) {
        setid('');
        setpass('');
       await checkAuthStatus();
        route.push('/Staff/Dashboard')
      }
      else {
        toast(`${data.message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",

        });
      }
    }
    catch (error) {
      alert(error.message);
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
      <div className="top-0 z-[-2] min-h-screen w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">
        <div className="flex w-[40vw] h-[60vh]   m-auto justify-center items-center ">
          <div className="flex flex-col gap-y-15 border p-10 rounded-2xl border-slate-500">
            <h1 className=" text-3xl font-bold">Enter your Credentials</h1>

            <div className="flex flex-col justify-center gap-y-4">
              <input onChange={handle1} value={id} className='border border-slate-500 rounded-2xl' type="text" placeholder='  Enter Username' />
              <div className='flex gap-x-2'>

                <input onChange={handle2} value={pass} className=' border border-slate-500 rounded-2xl' type={flag ? "password" : "text"} name="" id="" placeholder='  Enter Password' />
                <div onClick={() => { setflag(!flag) }}><img src={flag ? "/eye.png" : "/eyeo.png"} alt="" /></div>
              </div>
              <button onClick={handleClick} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In</button>

            </div>
          </div>

        </div>
      </div>
      <Footer />

    </>

  )
}

export default Page
