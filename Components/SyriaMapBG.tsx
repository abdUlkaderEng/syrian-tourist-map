import React from 'react'
import Image from 'next/image';
const SyriaMapBG = () => {
  return (
    <div>
       <Image
        src={"/assets/SVG/Syria.svg"}
        className="-z-10 h-screen blur-xs fixed w-screen "
        alt="syria map"
        width={700}
        height={500}
      />
    </div>
  )
}

export default SyriaMapBG
