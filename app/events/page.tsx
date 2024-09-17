"use client"

import { MySelector } from "@/redux/store"
import { getDateInput, getDateString } from "@/utils/common"
import { EventData } from "@/utils/type"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { IoOpen } from "react-icons/io5"

const Events = () => {
  const [pageData, setPageData] = useState<Array<EventData> | null>(null)

  const { data } = MySelector((state) => state?.data)

  useEffect(() => {
    const pageDataSetter = () => {
      if (!data) return
      setPageData(data?.event)
    }
    pageDataSetter()
  }, [data])

  return (
    <div className="my-[100px] px-14">
      {pageData ? (
        pageData?.length > 0 ? (
          <div className="flex flex-wrap justify-evenly gap-y-10 gap-x-5">
            {pageData?.map((pd) => (
              <div
                key={pd?.id}
                className="border-2 border-my-green max-w-fit p-3 rounded-md shadow-lg"
              >
                <Image
                  className="shadow-lg object-contain rounded"
                  height={400}
                  width={400}
                  src={pd?.image}
                  alt=""
                />
                <p className="mt-5 text-2xl font-semibold text-center">
                  {pd?.name}
                </p>
                <div className="flex items-center justify-center my-2 gap-8">
                  <Link target="_blank" className="flex gap-2" href={pd?.link}>
                    <span>Visit Website</span>
                    <IoOpen className="cursor-pointer" size={20} />
                  </Link>
                  <Link
                    target="_blank"
                    className="flex gap-2"
                    href={`/events/${pd?.id}`}
                  >
                    <span>Read Description</span>
                    <IoOpen className="cursor-pointer" size={20} />
                  </Link>
                </div>
                <div className="flex items-center justify-center mb-2 gap-8 text-stone-600">
                  <p>Coordinator: {pd?.coordinator}</p>
                  <p>Uploaded On: {getDateString(pd?.updatedAt)}</p>
                </div>
                <p className="text-center text-stone-600">
                  Deadline: {getDateInput(pd?.deadline)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-screen flex items-center justify-center -mt-[100px]">
            Nothing to Show
          </div>
        )
      ) : (
        <div className="h-screen flex items-center justify-center -mt-[100px]">
          Nothing to Show
        </div>
      )}
    </div>
  )
}

export default Events
