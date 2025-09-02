"use client"
import React, { useState } from 'react'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
const Page = () => {
const { register: register1, handleSubmit: handleSubmit1, watch: watch1, formState: { errors: errors1 } } = useForm();
const { register: register2, handleSubmit: handleSubmit2, watch: watch2, formState: { errors: errors2 } } = useForm();
const { register: register3, handleSubmit: handleSubmit3, watch: watch3, formState: { errors: errors3 } } = useForm();
const route=useRouter();
    const [flag, setflag] = useState(false)
    const [flag1, setflag1] = useState(true)
    const [flag2, setflag2] = useState(false)
    const handleClick = async ({ id }) => {
        
        const res = await fetch('https://footsense.onrender.com/api/auth/check', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        const data = await res.json();
        if (data.success) {
            setflag(true)
            
        }
        else {
            toast('User doesnt exists', {
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
    const handleClick1 = async ({ oldpassword, password, cnfpassword}) => {
       
         const id = watch1('id');
          console.log(id)
        if (password !== cnfpassword) {
            toast('Passwords doesnt match', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
            return;
        }

        const res = await fetch('http://localhost:5174/api/auth/updatepass', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, password, oldpassword })
        }
        )
        const data = await res.json();
      
        if (data.success) {
            toast('Password changed successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }
        else {
            toast('You have entered Wrong password', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }
    }
    const handleClick3= async ({newid,password}) => {
        const id=watch1('id')
        console.log(id)
        const res= await fetch('http://localhost:5174/auth/updateid',{
            method:'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({newid,password,id})
        })
        const data= await res.json();
        if(data.success){
             toast('Username changed succesfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
            route.push('/Admin/Dashboard')
        }
        else{
             toast(`${data.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
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
                <form onSubmit={handleSubmit1(handleClick)}>
                    <div className="w-full max-w-md bg-[#0f172a] border border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
                        <h1 className="text-3xl font-semibold text-center">Enter the Username to Edit Credentials</h1>

                        <div className="flex flex-col gap-5">

                            <input
                                type="text"
                                {...register1('id', { required: "Username is required" })}
                                placeholder="Enter Username"
                                className={`w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border ${errors1.id ? "border-red-500" : "border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"}  `}
                            />
                            {errors1.id && <p className="text-red-400 p-0">{errors1.id.message}</p>}
                            <div className={flag ? "flex text-blue-500 justify-around cursor-pointer" : "hidden "}>
                                <div onClick={() => { setflag2(true) }}>
                                    Change Password
                                </div>
                                <div onClick={() => { setflag1(false) }}>
                                    Change Username
                                </div>
                            </div>
                            <button
                                type="submit"


                                className="w-full bg-blue-700
               hover:bg-blue-800 text-white font-medium rounded-full py-2.5
                transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500"
                            >
                                Enter
                            </button>


                        </div>
                    </div>
                </form>

                {/* PASSWORD CHANGE KRNE WALA PORTION */}


                <form onSubmit={handleSubmit2(handleClick1)}>

                <div className={flag2 ? "fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm" : "hidden"}>

                    <div className=" absolute w-full max-w-md bg-[#0f172a] border border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
                        <div className='flex justify-end'>
                            <img src="/close.png" alt="" className='h-5 w-5 cursor-pointer' onClick={() => { setflag2(false) }} />
                        </div>


                        <input
                            type="password"
                            {...register2('oldpassword', { required: "This is required" })}
                            placeholder="Enter old Password"
                            className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            {...register2('password', { required: "This is required" })}
                            placeholder="Enter new Password"
                            className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            {...register2('cnfpassword', { required: "This is required" })}
                            placeholder="Confirm new Password"
                            className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-700
               hover:bg-blue-800 text-white font-medium rounded-full py-2.5
                transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500"

                        >
                            Change Password
                        </button>

                    </div>

                </div>
                </form>
            </div>


            {/* //  USER NAME CHANGE KRNE WALA PORTION */}
            <form onSubmit={handleSubmit3(handleClick3)}>
            <div className={flag1 ? "hidden" : "fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"}>

                <div className=" absolute w-full max-w-md bg-[#0f172a] border border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
                    <div className='flex justify-end'>
                        <img src="/close.png" alt="" className='h-5 w-5 cursor-pointer' onClick={() => { setflag1(true) }} />
                    </div>

                    <input
                        type="text"

                       {...register3('newid', { required: "This is required" })}
                        placeholder="Enter New Username"
                        className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        {...register3('password',{required:"This as well"})}
                        placeholder="Confirm Password"
                        className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-700
               hover:bg-blue-800 text-white font-medium rounded-full py-2.5
                transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 "
                    >
                        Change UserName
                    </button>

                </div>

            </div>
            </form>

            <Footer />
        </>
    )
}

export default Page
