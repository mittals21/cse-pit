import { ExamFilterData } from "@/utils/type"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

const ShowExam = ({
  filteredData,
}: {
  filteredData: Array<ExamFilterData> | null
}) => {
  const router = useRouter()
  return (
    <div
      className="grid items-center justify-center gap-16 p-10 mx-16 my-10 "
      style={{ gridTemplateColumns: "1fr 1fr" }}
    >
      {filteredData && filteredData?.length > 0 ? (
        filteredData?.map((e: ExamFilterData) => (
          <div
            key={e?.id}
            className="relative overflow-hidden rounded-lg shadow-md "
            onClick={() => router.push(`/${e?.id}`)}
          >
            <Image
              src="https://api.ignitehost.in/api/v-1/view/a6319350-b6cf-11ee-b929-f5a9fff8a41a/file_20240119193411_b851b86b-b701-11ee-b929-f5a9fff8a41a.jpg/"
              height={1000}
              width={1000}
              className="w-full h-full object-cover"
              alt=""
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
              {e?.examType}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-2xl font-medium py-6">
          No data available for the selected department and semester.
        </div>
      )}
    </div>
  )
}

export default ShowExam
