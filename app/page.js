'use client'
import Image from "next/image";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { useRouter } from "next/navigation";
export default function Home() {
  const hello=useRouter();
  return (
    <>
    <Navbar/>
    <div className="top-0 z-[-2] min-h-screen w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">

      <div className="flex w-[40vw] h-[60vh]  font-bold m-auto justify-center items-center ">
        <div className="flex flex-col gap-y-4 border p-10 rounded-2xl border-slate-500">
       <h1 className=" text-3xl">Welcome to FootSense</h1>
        <h2 className="text-2xl flex justify-center">Login as</h2>
        <div className="flex justify-center gap-x-8 scheme-dark">
          
      <button type="button" onClick={()=>hello.push('/Admin')} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 cursor-pointer">Admin</button>
      <button type="button" onClick={()=>hello.push('/Staff')} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 cursor-pointer">Staff</button>


        </div>
        </div>
       
      </div>
    

    </div>
  <Footer/>
    </>
  )
}   
