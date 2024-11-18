"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const Footer = () => {
  const location = usePathname()
  const isHiddenRoute = /\/(exam|syllabus|circular|events)\/[a-zA-Z0-9-]+/.test(
    location
  )

  return (
    <div
      className={`${
        isHiddenRoute ? "hidden" : "flex"
      } fixed flex-col md:flex-row bottom-0 right-0 left-0 bg-white border-t border-t-black text-gray-900 justify-between px-10 py-2 items-center`}
    >
      <p className="font-semibold text-xl text-center hidden md:block">PIT Portal</p>
      <div className="flex flex-col justify-center flex-wrap font-semibold">
        <p className="md:text-xl leading-tight text-center">Made By:</p>
        <div className="flex justify-center items-center flex-wrap gap-x-5 md:gap-5 font-light">
          <Link
            target="_blank"
            href={"https://www.linkedin.com/in/mittal-suthar/"}
          >
            <p className="cursor-pointer">Mittal Suthar</p>
          </Link>
          <Link
            target="_blank"
            href={"https://www.linkedin.com/in/aadarshjha1401/"}
          >
            <p className="cursor-pointer">Aadarsh Jha</p>
          </Link>
          <Link
            target="_blank"
            href={"https://www.linkedin.com/in/aryan-singh-a57715224/"}
          >
            <p className="cursor-pointer">Aryan Singh</p>
          </Link>
          <Link
            target="_blank"
            href={"https://www.linkedin.com/in/aditya-vishwakarma-6b5a221a2/"}
          >
            <p className="cursor-pointer">Aditya Vishwakarma</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
