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
    <div className="mt-10 md:mt-0">
      <div
        className="hidden md:grid font-semibold mt-[50px] border-2 py-3 lg:text-2xl text-center capitalize mx-5 lg:mx-10"
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
            <>
              <div
                key={e?.id}
                className="hidden md:grid lg:text-lg items-center text-center capitalize border-b border-x py-1 mx-5 lg:mx-10"
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

              <div className="md:hidden flex flex-col gap-1.5 text-lg border-2 border-my-green p-2 mb-4 mx-5">
                <div className="flex items-center gap-5">
                  <p className="text-xl font-bold">Exam Type: </p>
                  <p>{e?.examType}</p>
                </div>
                <div className="flex items-center gap-5">
                  <p className="text-xl font-bold">Department: </p>
                  <p>{e?.department}</p>
                </div>
                <div className="flex items-center gap-5">
                  <p className="text-xl font-bold">Semester: </p>
                  <p>{e?.semester}</p>
                </div>
                <div className="flex items-center gap-5">
                  <p className="text-xl font-bold">Uploaded On: </p>
                  <p>{getDateString(e?.updatedAt)}</p>
                </div>
                <div className="flex items-center gap-5">
                  <p className="text-xl font-bold">Open: </p>
                  <p className="flex justify-center gap-5 items-center">
                    <Link href={`/exam/${e?.id}`} target="_blank">
                      <IoOpen className="cursor-pointer" size={25} />
                    </Link>
                  </p>
                </div>
              </div>
            </>
          ))
        ) : (
          <div className="text-center lg:text-2xl font-medium py-6">
            No data available.
          </div>
        )
      ) : (
        <div className="text-center lg:text-2xl font-medium py-6">
          No data available.
        </div>
      )}
    </div>
  )
}

export default ShowExam
