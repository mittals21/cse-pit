import React from "react"
import LOADER from "./loader.svg"
import Image from "next/image"

const Loader = () => {
  return (
    <div className="px-[15px]">
      <Image width={25} height={25} src={LOADER} alt="loader" />
    </div>
  )
}

export default Loader
