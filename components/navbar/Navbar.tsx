"use client"

import { getAllData, setHostName } from "@/redux/dataSlice"
import { MyDispatch, MySelector } from "@/redux/store"
import { hostname } from "@/utils/hostname"
import { NavbarRoutes } from "@/utils/type"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import Loader from "../loader/Loader"

const Navbar = () => {
  const router = useRouter()
  const dispatch = useDispatch<MyDispatch>()
  const location = usePathname()
  const [active, setActive] = useState<string>("Home")
  const { host } = MySelector((state) => state.data)
  const [data, setData] = useState<Array<NavbarRoutes>>([
    { title: "Home", path: "/" },
    { title: "CSE Dept.", path: "/department" },
    { title: "Syllabus", path: "/syllabus" },
    { title: "Exam", path: "/exam" },
    { title: "Events", path: "/events" },
    { title: "Help", path: "/help" },
    { title: "Contact Us", path: "/contact" },
  ])

  useEffect(() => {
    dispatch(getAllData())
    dispatch(setHostName(hostname()))
  }, [])

  useEffect(() => {
    setActive(data?.find((d) => d?.path === location)?.title || "Home")
  }, [location])

  useEffect(() => {
    const changePage = () => {
      if (!host || !process.env.NEXT_PUBLIC_ADMIN_ROUTE) return
      if (host === process.env.NEXT_PUBLIC_ADMIN_ROUTE) {
        setData([
          { title: "Home", path: "/" },
          { title: "CSE Dept.", path: "/department" },
          { title: "Syllabus", path: "/syllabus" },
          { title: "Exam", path: "/exam" },
          { title: "Events", path: "/events" },
          { title: "Help", path: "/help" },
          { title: "Contact Us", path: "/contact" },
          { title: "Uploads", path: "/uploads" },
          { title: "Students", path: "/students" },
        ])
      }
    }
    changePage()
  }, [host])

  return (
    <>
      {host ? (
        <div className="hidden lg:block border-b border-b-black fixed z-[50000] top-0 left-0 right-0 bg-white">
          <div className="flex p-5 text-base text-gray-900 items-center justify-between w-full sticky top-0 left-0 right-0 z-[111]">
            <p
              className="font-semibold text-xl"
              onClick={() => router.push("/")}
            >
              PIT Portal
            </p>

            <div className="flex gap-5 items-center">
              {data?.map((e: NavbarRoutes) => (
                <Link href={e?.path} key={e?.title}>
                  <button
                    className={`${e?.title === active ? "underline" : ""} ${
                      e?.title === "Home" && location === "/" ? "hidden" : ""
                    }`}
                    onClick={() => setActive(e?.title)}
                  >
                    {e?.title}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen fixed top-0 left-0 z-[505050] bg-white right-0 bottom-0 flex items-center justify-center scale-[3]">
          <Loader />
        </div>
      )}
    </>
  )
}

export default Navbar
