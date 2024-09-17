import { getDateString } from "@/utils/common"
import { ExamFilterData } from "@/utils/type"
import Link from "next/link"
import React from "react"
import { IoOpen } from "react-icons/io5"

const ShowExam = ({
  filteredData,
}: {
  filteredData: Array<ExamFilterData> | null
}) => {
  return (
    <div>
      <div
        className="grid font-semibold mt-[50px] border-2 py-3 text-2xl text-center capitalize mx-20"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}
      >
        <p>Exam Type</p>
        <p>Department</p>
        <p>Semester</p>
        <p>Uploaded On</p>
        <p>Open</p>
      </div>

      {filteredData ? (
        filteredData?.length > 0 ? (
          filteredData?.map((e, index) => (
            <div
              key={e?.id}
              className="grid text-lg items-center text-center capitalize border-b border-x py-1 mx-20"
              style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}
            >
              <p>{e?.examType}</p>
              <p>{e?.department}</p>
              <p>{e?.semester}</p>
              <p>{getDateString(e?.updatedAt)}</p>
              <p className="flex justify-center gap-5 items-center">
                <Link href={`/exam/${e?.id}`} target="_blank">
                  <IoOpen className="cursor-pointer" size={25} />
                </Link>
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

export default ShowExam
