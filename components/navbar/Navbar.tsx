"use client"
import { NavbarRoutes } from "@/utils/type"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

const Navbar = () => {
  const router = useRouter()
  const location = usePathname()
  const [active, setActive] = useState<string>("Home")

  const handleClick = (url: string, title: string) => {
    router.push(url)
    setActive(title)
  }

  const data: Array<NavbarRoutes> = [
    { title: "Home", path: "/" },
    { title: "CSE Dept.", path: "/department" },
    { title: "Syllabus", path: "/syllabus" },
    { title: "Exam", path: "/exam" },
    { title: "Events", path: "/events" },
    { title: "Help", path: "/help" },
    { title: "Contact Us", path: "/contact" },
    { title: "Upload", path: "/uploads" },
    { title: "Students", path: "/students" },
  ]

  useEffect(() => {
    setActive(data?.find((d) => d?.path === location)?.title || "Home")
  }, [location])

  return (
    <div className="hidden lg:block border-b border-b-black fixed z-[50000] top-0 left-0 right-0 bg-white">
      <div className="flex p-5 text-base text-gray-900 items-center justify-between w-full sticky top-0 left-0 right-0 z-[111]">
        <p className="font-semibold text-xl" onClick={() => router.push("/")}>
          Dept. of CSE, PIT
        </p>

        <div className="flex gap-5 items-center">
          {data?.map((e: NavbarRoutes) => (
            <button
              key={e?.title}
              className={`${e?.title === active ? "underline" : ""} ${
                e?.title === "Home" && location === "/" ? "hidden" : ""
              }`}
              onClick={() => handleClick(e?.path, e?.title)}
            >
              {e?.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar
