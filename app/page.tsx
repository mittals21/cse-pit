import Circulars from "@/components/home/Circulars"
import Image from "next/image"
import React from "react"
import HomeBg from '@/public/assets/mainBgImage.jpeg'

const Home = () => {
  return (
    <div className="flex justify-center items-center relative h-screen bg-black/25">
      <Image
        src={HomeBg}
        layout="fill"
        className="w-full h-full object-fill -z-10"
        alt=""
      />
      <div className="absolute lg:right-10 bg-white/70 rounded-lg p-3 lg:p-5">
        <Circulars />
      </div>
    </div>
  )
}

export default Home
