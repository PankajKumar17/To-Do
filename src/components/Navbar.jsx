import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-gray-200 mx-auto w-3/4 py-2 rounded-2xl  text-purple-900'>
        <div className="logo font-bold text-lg md:text-2xl">
            iTASK
        </div>
      <ul className='flex justify-around gap-[2vw] font-semibold text-sm md:text-xl'>
        <li className='cursor-pointer hover:font-bold duration-500'>Home</li>
        <li className='cursor-pointer hover:font-bold duration-500'>Your Tasks</li>
        <li className='cursor-pointer hover:font-bold duration-500'>Done Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
