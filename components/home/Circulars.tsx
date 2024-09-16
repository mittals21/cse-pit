"use client"

import { MySelector } from "@/redux/store"
import { CircularData } from "@/utils/type"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import Loader from "../loader/Loader"

const Circulars = () => {
  const router = useRouter()
  const [pageData, setPageData] = useState<Array<CircularData> | null>(null)
  const { data } = MySelector((state) => state?.data)

  const getDateString = (timestamp: string) => {
    const date = new Date(timestamp)

    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()

    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    const pageDataSetter = () => {
      if (!data) return
      setPageData(data?.circular)
    }
    pageDataSetter()
  }, [data])

  return (
    <div className="flex flex-col justify-center items-center gap-3 tracking-wide">
      <p className="text-center text-[25px] lg:text-[35px] font-bold">
        Circulars
      </p>
      <div className="border-2 border-my-green max-h-[300px] overflow-y-scroll bg-white/85 px-2 lg:px-5">
        {pageData ? (
          pageData?.length > 0 ? (
            pageData
              ?.map((e: any) => (
                <div
                  key={e?.id}
                  className="flex items-end justify-between border-b border-b-my-green last:border-none py-2 sm:min-w-[400px] sm:max-w-[500px] gap-10"
                >
                  <div
                    className="hover:underline text-lg lg:text-2xl cursor-pointer"
                    onClick={() => router.push(`circular/${e?.id}`)}
                  >
                    <span title={e?.name}>
                      {e?.name?.length > 16 ? `${e?.name?.slice(0, 16)}...` : e?.name}
                    </span>
                    <span className="ml-2 text-gray-600 text-base">
                      (
                      {e?.for === "all"
                        ? "All Semesters"
                        : `Semester ${e?.for}`}
                      )
                    </span>
                  </div>
                  <p className="text-sm lg:text-base text-gray-500">
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
