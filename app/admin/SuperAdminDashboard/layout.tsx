import Link from 'next/link'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
<>
    {/* <nav className="navbar top-15   bg-transparent  backdrop-blur-sm z-50 hover:backdrop-blur-lg  transition-all duration-400   flex justify-between ">
          <Link
            className="ml-5 p-1 rounded-lg text-[#E7A24A]  hover:text-[#832411]   hover:scale-105 hover:bg-transparent hover:backdrop-blur-3xl transition-all duration-200   flex items-center justify-center"
            href={"/"}>
            مكان جديد
          </Link>
          <Link
            className="ml-5 p-1 rounded-lg text-[#E7A24A]  hover:text-[#832411]   hover:scale-105 hover:bg-transparent hover:backdrop-blur-3xl transition-all duration-200   flex items-center justify-center"
            href={"/"}>
            تعديل مكان 
          </Link>
          <Link
            className="ml-5 p-1 rounded-lg text-[#E7A24A]  hover:text-[#832411]   hover:scale-105 hover:bg-transparent hover:backdrop-blur-3xl transition-all duration-200   flex items-center justify-center"
            href={"/"}>
          إعداد مشرف
          </Link>
    </nav> */}
    {children}
</>)
}

export default layout
