import React from "react"
import LOADER from "./loader.svg"
import Image from "next/image"

const Loader = () => {
  return (
    <div>
      <Image layout="fill" src={LOADER} alt="loader" />
    </div>
  )
}

export default Loader
