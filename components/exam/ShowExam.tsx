import { getDateString } from "@/utils/common"
import { ExamFilterData } from "@/utils/type"
import Link from "next/link"
import React from "react"

const ShowExam = ({
  filteredData,
}: {
  filteredData: Array<ExamFilterData> | null
}) => {
  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-4 font-semibold mt-[50px] border-2 py-3 text-lg md:text-xl lg:text-2xl text-center capitalize mx-2 md:mx-5 lg:mx-10">
        <p>Exam Type</p>
        <p>Department</p>
        <p>Semester</p>
        <p className="hidden md:block">Uploaded On</p>
      </div>

      {filteredData ? (
        filteredData?.length > 0 ? (
          filteredData?.map((e, index) => (
            <Link key={e?.id} href={`/exam/${e?.id}`} target="_blank">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:text-lg items-center text-center capitalize border-b border-x py-1 mx-2 md:mx-5 lg:mx-10 hover:bg-my-green/20 cursor-pointer">
                <p>{e?.examType}</p>
                <p>{e?.department}</p>
                <p>{e?.semester}</p>
                <p className="hidden md:block">{getDateString(e?.updatedAt)}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-xl md:text-2xl font-medium py-6">
            No data available.
          </div>
        )
      ) : (
        <div className="text-center text-xl md:text-2xl font-medium py-6">
          No data available.
        </div>
      )}
    </div>
  )
}

export default ShowExam
