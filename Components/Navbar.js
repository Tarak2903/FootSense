import React from 'react'
import Image from 'next/image'
const Navbar = () => {
  return (
    <div>
      <div className='bg-blue-950 w-full h-[10vh] text-white text-3xl flex justify-center items-center font-bold'>
        FootSense
        <img src="/foot.png" alt="" className='h-20 w-20 py-2   ' />
      </div>
    </div>
  )
}

export default Navbar
