"use client"

import Loader from "@/components/loader/Loader"
import { MySelector } from "@/redux/store"
import { CircularData } from "@/utils/type"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

const SingleCircular = () => {
  const location = usePathname()
  const [file, setFile] = useState<string | null>(null)

  const { data } = MySelector((state) => state?.data)

  useEffect(() => {
    const fileSetter = () => {
      if (!data) return
      const file = data?.circular?.find(
        (item: CircularData) => item?.id === location?.split("/")[2]
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
          className="h-screen object-center w-full max-w-[100vw] py-[70px]"
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

export default SingleCircular
