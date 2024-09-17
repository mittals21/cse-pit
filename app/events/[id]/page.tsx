"use client"

import Loader from "@/components/loader/Loader"
import { MySelector } from "@/redux/store"
import { EventData } from "@/utils/type"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

const SingleEvent = () => {
  const location = usePathname()
  const [file, setFile] = useState<string | null>(null)

  const { data } = MySelector((state) => state?.data)

  useEffect(() => {
    const fileSetter = () => {
      if (!data) return
      const file = data?.event?.find(
        (item: EventData) => item?.id === location?.split("/")[2]
      )

      setFile(file?.file)
    }
    fileSetter()
  }, [data, location])

  return (
    <div className="">
      {file ? (
        <iframe
          src={file}
          className="h-screen object-center w-full max-w-[100vw]"
          // frameBorder="0"
          title={file}
        ></iframe>
      ) : (
        <div className="scale-[3]">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default SingleEvent
