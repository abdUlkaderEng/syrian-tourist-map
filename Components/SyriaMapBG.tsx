"use client";
import React from 'react'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
const SyriaMapBG = () => {
    const path = usePathname();
  
  return (
    <>
    {path === '/' ? <></> :

      <Image
       src={"/assets/SVG/Syria.svg"}
       className=" -z-10 h-screen blur-xs fixed  w-screen "
       alt="syria map"
       width={700}
       height={500}
     />
    }
    </>
  )
}

export default SyriaMapBG
