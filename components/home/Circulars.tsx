"use client"

import { MySelector } from "@/redux/store"
import { CircularData } from "@/utils/type"
import React, { useEffect, useState } from "react"
import Loader from "../loader/Loader"
import { getDateString } from "@/utils/common"
import Link from "next/link"

const Circulars = () => {
  const [pageData, setPageData] = useState<Array<CircularData> | null>(null)
  const { data } = MySelector((state) => state?.data)

  useEffect(() => {
    const pageDataSetter = () => {
      if (!data) return
      setPageData(data?.circular)
    }
    pageDataSetter()
  }, [data])

  return (
    <div className="flex flex-col justify-center items-center gap-2 lg:gap-3 tracking-wide">
      <p className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
        Circulars
      </p>
      <div className="border-2 border-my-green max-h-[400px] overflow-y-scroll bg-white/85 px-2 md:px-5">
        {pageData ? (
          pageData?.length > 0 ? (
            pageData
              ?.map((e: any) => (
                <div
                  key={e?.id}
                  className="flex items-end justify-between border-b border-b-my-green last:border-none py-2 min-w-[240px] md:min-w-[400px] gap-2"
                >
                  <Link
                    href={`circular/${e?.id}`}
                    target="_blank"
                    className="hover:underline sm:text-lg md:text-xl xl:text-2xl cursor-pointer"
                  >
                    {/* TITLE FOR SMALL SCREENS */}
                    <span title={e?.name} className="block md:hidden">
                      {e?.name?.length > 35
                        ? `${e?.name?.slice(0, 35)}...`
                        : e?.name}
                    </span>
                    {/* TITLE FOR MEDIUM SCREENS */}
                    <span title={e?.name} className="hidden md:block lg:hidden">
                      {e?.name?.length > 50
                        ? `${e?.name?.slice(0, 50)}...`
                        : e?.name}
                    </span>
                    {/* TITLE FOR LARGE SCREENS */}
                    <span title={e?.name} className="hidden lg:block">
                      {e?.name?.length > 70
                        ? `${e?.name?.slice(0, 70)}...`
                        : e?.name}
                    </span>
                    <span className="sm:ml-2 text-gray-600 text-sm sm:text-base">
                      (
                      {e?.for === "all"
                        ? "All Semesters"
                        : `Semester ${e?.for}`}
                      )
                    </span>
                  </Link>
                  <p className="text-gray-500 hidden md:block">
                    {getDateString(e?.createdAt)}
                  </p>
                </div>
              ))
              .reverse()
          ) : (
            <p className="px-20 py-10 text-xl font-medium">
              No Circulars to Show
            </p>
          )
        ) : (
          <div className="px-40 py-20">
            <Loader />
          </div>
        )}
      </div>
    </div>
  )
}

export default Circulars
