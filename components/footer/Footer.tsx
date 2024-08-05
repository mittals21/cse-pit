import React from "react"

const Footer = () => {
  return (
    <div className="fixed bottom-0 right-0 left-0 bg-white border-t border-t-black text-gray-900 flex flex-col lg:flex-row justify-between px-10 py-2 lg:items-center gap-1 lg:gap-0">
      <p className="font-semibold text-lg lg:text-xl text-center">
        &copy; Dept. of CSE, PIT
      </p>
      <div className="flex flex-col gap-1 lg:gap-0 justify-center flex-wrap font-semibold">
        <p className="text-lg lg:text-xl leading-tight text-center lg:text-start">Team</p>
        <div className="flex justify-center items-center flex-wrap gap-x-2 lg:gap-2 font-light">
          <p>Mittal Suthar</p>
          <div className="h-[5px] w-[5px] bg-black rounded-full"></div>
          <p>Aadarsh Jha</p>
          <div className="h-[5px] w-[5px] bg-black rounded-full hidden lg:block"></div>
          <p>Aryan Singh</p>
          <div className="h-[5px] w-[5px] bg-black rounded-full"></div>
          <p>Aditya Vishwakarma</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
