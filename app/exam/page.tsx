"use client"
import ShowExam from "@/components/exam/ShowExam"
import { MySelector } from "@/redux/store"
import { ExamFilterData } from "@/utils/type"
import React, { useEffect, useState } from "react"

const Exam = () => {
  const [sem, setSem] = useState("")
  const [dept, setDept] = useState("")
  const [pageData, setPageData] = useState<Array<ExamFilterData> | null>(null)
  const [filteredData, setFilteredData] =
    useState<Array<ExamFilterData> | null>(null)

  const { data } = MySelector((state) => state?.data)

  console.log(pageData, filteredData)

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
        (i) => i?.department === dept && i?.semester === sem
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
            <option value="core">Core CSE</option>
            <option value="ai">CSE AI</option>
            <option value="iot">CSE IoT</option>
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
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
            <option value="3">3rd Semester</option>
            <option value="4">4th Semester</option>
            <option value="5">5th Semester</option>
            <option value="6">6th Semester</option>
            <option value="7">7th Semester</option>
            <option value="8">8th Semester</option>
          </select>
        </div>
      </div>
      <ShowExam filteredData={filteredData} />
    </div>
  )
}

export default Exam
