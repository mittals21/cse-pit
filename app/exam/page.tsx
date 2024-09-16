"use client"
import ShowExam from "@/components/exam/ShowExam"
import { MySelector } from "@/redux/store"
import { departments, dropdowns, semesters } from "@/utils/common"
import { ExamFilterData } from "@/utils/type"
import React, { useEffect, useState } from "react"

const Exam = () => {
  const [sem, setSem] = useState("")
  const [dept, setDept] = useState("")
  const [pageData, setPageData] = useState<Array<ExamFilterData> | null>(null)
  const [filteredData, setFilteredData] =
    useState<Array<ExamFilterData> | null>(null)

  const { data } = MySelector((state) => state?.data)

  useEffect(() => {
    const pageDataSetter = () => {
      if (!data) return
      setPageData(data?.exam)
    }
    pageDataSetter()
  }, [data])

  useEffect(() => {
    const changeData = () => {
      if (!dept || !sem || !pageData) return
      if (dept === "default" || sem === "default") setFilteredData(null)
      const filtered = pageData.filter(
        (i) =>
          i?.department === dept &&
          (i?.semester === sem || i?.semester === "all")
      )
      setFilteredData(filtered)
    }
    changeData()
  }, [dept, sem, pageData])

  return (
    <div className="my-[100px]">
      <div className="flex gap-2 mx-10">
        <div className=" border-[1px] w-[30%] px-6 py-5 border-my-green ">
          <select
            onChange={(e) => setDept(e.target.value)}
            defaultValue={dept}
            className="bg-transparent cursor-pointer w-full px-3 py-2 border-[1px]  "
          >
            <option value="default">------Select Department------</option>
            {departments?.map((d: dropdowns) => (
              <option key={d?.value} value={d?.value}>
                {d?.name}
              </option>
            ))}
          </select>
        </div>

        <div className=" border-[1px] w-[70%] px-6 py-5 border-my-green ">
          <select
            onChange={(e) => setSem(e.target.value)}
            defaultValue={sem}
            className={`${
              dept ? "cursor-pointer" : "cursor-not-allowed"
            } bg-transparent w-full px-3 py-2 border-[1px]  `}
            disabled={!dept}
          >
            <option value="default">------Select Semester------</option>
            {semesters?.map((s: dropdowns) => (
              <option key={s?.value} value={s?.value}>
                {s?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ShowExam filteredData={filteredData} />
    </div>
  )
}

export default Exam
