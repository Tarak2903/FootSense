"use client"
import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { useRouter } from 'next/navigation';
const Page = () => {
    const route=useRouter();
  return (
    <>
      <Navbar />
      <div className="top-0 z-[-2] min-h-screen w-full bg-[#000000] 
        bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white flex items-center justify-center">
        
        <div className="grid grid-cols-3 grid-rows-2 gap-x-6 gap-y-10 w-[80vw]">
          <div className="flex  flex-col justify-center items-center border border-slate-400 h-40 bg-[#334155]" onClick={()=>{route.push('/Admin/Dashboard/Add')}} >
            <img src="/add-user.gif" alt="" className='h-20' />
            Add user
            </div>
          <div className="flex flex-col justify-center items-center border border-slate-400 h-40 bg-[#334155] text-white" onClick={()=>{route.push('/Admin/Dashboard/Edit')}}>
             <img src="/user.gif" alt="" className='h-20' />
            Edit Acess</div>
          <div className="flex flex-col justify-center items-center border border-slate-400 h-40 bg-[#334155] text-white" onClick={()=>{route.push('/Admin/Dashboard/Delete')}}>
             <img src="/block.gif" alt="" className='h-20' />
            Revoke Access</div>
          <div className="flex flex-col justify-center items-center border border-slate-400 h-40 bg-[#334155] text-white">back</div>
          <div className="flex flex-col justify-center items-center border border-slate-400 h-40 bg-[#334155] text-white">to</div>
          <div className="flex flex-col justify-center items-center border border-slate-400 h-40 bg-[#334155] text-white">you</div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Page;
