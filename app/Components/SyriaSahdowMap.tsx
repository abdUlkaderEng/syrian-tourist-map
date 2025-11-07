import React from 'react'
import Image from 'next/image';
const SyriaSahdowMap = () => {
  return (
    <div>
      <Image
                width={"600"}
                height={"300"}
                className=" opacity-50 top-15  absolute blur-xs -z-10  "
                src={"/assets/SVG/MapBG.svg"}
                alt={""}
              />
              <Image
                width={"600"}
                height={"300"}
                className="  opacity-20 top-15 absolute -z-10"
                src={"/assets/SVG/MapBG.svg"}
                alt={""}
              />
    </div>
  )
}

export default SyriaSahdowMap
