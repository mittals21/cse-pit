"use client"
import Loader from "@/components/loader/Loader"
import SyllabusRow from "@/components/syllabus/SyllabusRow"
import { MySelector } from "@/redux/store"
import { SyllabusData } from "@/utils/type"
import React, { useEffect, useState } from "react"

const Syllabus = () => {
  const [dept, setDept] = useState("")
  const [semester, setSemester] = useState<string>("")
  const [pageData, setPageData] = useState<Array<SyllabusData> | null>(null)
  const [filteredData, setFilteredData] = useState<Array<SyllabusData> | null>(
    null
  )
  const { data } = MySelector((state) => state?.data)

  useEffect(() => {
    const pageDataSetter = () => {
      if (!data) return
      setPageData(data?.syllabus)
    }
    pageDataSetter()
  }, [data])

  useEffect(() => {
    const changeData = () => {
      if (!dept || !semester || !pageData) return
      if (dept === "default" || semester === "default") setFilteredData(null)
      const filtered = pageData.filter(
        (i) => i?.department === dept && i?.semester === semester
      )
      setFilteredData(filtered)
    }
    changeData()
  }, [dept, semester, pageData])

  return (
    <div className="my-[100px]">
      {/* {data && data?.length > 0 && ( */}
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
            onChange={(e) => setSemester(e.target.value)}
            defaultValue={semester}
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
      {/* )} */}

      {pageData ? (
        <SyllabusRow filteredData={filteredData} />
      ) : (
        <div className="flex w-screen justify-center items-center py-20">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Syllabus
