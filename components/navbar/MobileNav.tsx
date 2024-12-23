"use client"
import { getAllData } from "@/redux/dataSlice"
import { MyDispatch } from "@/redux/store"
import { NavbarRoutes } from "@/utils/type"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { FiMenu } from "react-icons/fi"
import { IoClose } from "react-icons/io5"
import { useDispatch } from "react-redux"

const MobileNav = () => {
  const router = useRouter()
  const dispatch = useDispatch<MyDispatch>()

  const location = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [active, setActive] = useState<string>("Home")

  const handleClick = (title: string) => {
    setActive(title)
    setIsMenuOpen(false)
  }

  const data: Array<NavbarRoutes> = [
    { title: "Home", path: "/" },
    { title: "CSE Dept.", path: "/department" },
    { title: "Syllabus", path: "/syllabus" },
    { title: "Exam", path: "/exam" },
    { title: "Events", path: "/events" },
    { title: "Help", path: "/help" },
    { title: "Contact Us", path: "/contact" },
  ]

  useEffect(() => {
    dispatch(getAllData())
  }, [])

  useEffect(() => {
    setActive(data?.find((d) => d?.path === location)?.title || "")
  }, [location])

  return (
    <div className="fixed top-0 left-0 right-0 lg:hidden text-gray-900 bg-white z-[50000] border-b border-b-black">
      <div className="flex p-3 justify-between items-center">
        <p className="font-semibold text-lg" onClick={() => router.push("/")}>
          PIT Portal
        </p>
        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <IoClose size={25} /> : <FiMenu size={25} />}
        </div>
      </div>
      <div
        className={`flex flex-col gap-3 text-[18px] ${
          isMenuOpen ? "p-3 border border-black" : "h-0 overflow-hidden"
        } transition-all duration-200 ease-linear`}
      >
        {data?.map((e: NavbarRoutes) => (
          <Link href={e?.path} key={e?.title}>
            <button
              className={`${
                e?.title === active ? "underline text-my-green" : ""
              } ${e?.title === "Home" && location === "/" ? "hidden" : ""}`}
              onClick={() => handleClick(e?.title)}
            >
              {e?.title}
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MobileNav
