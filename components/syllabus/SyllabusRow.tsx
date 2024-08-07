import { SyllabusData } from "@/utils/type"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { CiMenuKebab } from "react-icons/ci"

const SyllabusRow = ({
  filteredData,
}: {
  filteredData: Array<SyllabusData> | null
}) => {
  const router = useRouter()

  const getDateString = (timestamp: string) => {
    const date = new Date(timestamp)

    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()

    return `${day}/${month}/${year}`
  }

  return (
    <div>
      <div
        className="grid font-semibold mt-[50px] border-t border-b py-1.5 text-2xl text-center capitalize"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}
      >
        <p>#</p>
        <p>Subject</p>
        <p>Created</p>
        <p>Updated</p>
        <p>Menu</p>
      </div>
      {filteredData ? (
        filteredData?.length > 0 ? (
          filteredData?.map((e, index) => (
            <div
              key={e?.id}
              className="grid text-lg items-center text-center capitalize cursor-pointer border-b py-1 mx-2"
              style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}
              onClick={() => router.push(`/syllabus/${e?.id}`)}
            >
              <p>{index + 1}</p>
              <p>{e?.subject}</p>
              <p>{getDateString(e?.createdAt)}</p>
              <p>{getDateString(e?.updatedAt)}</p>
              <p className="flex justify-center">
                <CiMenuKebab />
              </p>
            </div>
          ))
        ) : (
          <div className="text-center text-2xl font-medium py-6">
            No data available.
          </div>
        )
      ) : (
        <div className="text-center text-2xl font-medium py-6">
          No data available.
        </div>
      )}
    </div>
  )
}

export default SyllabusRow
