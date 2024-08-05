"use client"
import ShowExam from "@/components/exam/ShowExam"
import { ExamFilterData } from "@/utils/type"
import React, { useEffect, useState } from "react"

const data: Array<ExamFilterData> = [
  {
    file: {
      avatar:
        "https://res.cloudinary.com/dkdxeiuxr/image/upload/v1721973418/exams/qmuatqrd9ltmfh5ntjyl.png",
      cloudinary_id: "exams/qmuatqrd9ltmfh5ntjyl",
      exam_type: "midsem",
    },
    _id: "66a33aab5998c4467429a3f7",
    semester: 2,
    department: "core",
    createdAt: "2024-07-26T05:56:59.706Z",
    updatedAt: "2024-07-26T05:56:59.706Z",
    __v: 0,
  },
  {
    file: {
      avatar:
        "https://res.cloudinary.com/dkdxeiuxr/image/upload/v1721973421/exams/ksuhumwzsccpxxt3e1tr.png",
      cloudinary_id: "exams/ksuhumwzsccpxxt3e1tr",
      exam_type: "practical",
    },
    _id: "66a33aad5998c4467429a3f9",
    semester: 2,
    department: "core",
    createdAt: "2024-07-26T05:57:01.753Z",
    updatedAt: "2024-07-26T05:57:01.753Z",
    __v: 0,
  },
  {
    file: {
      avatar:
        "https://res.cloudinary.com/dkdxeiuxr/image/upload/v1721973427/exams/cidmoycppb8tbphsabws.png",
      cloudinary_id: "exams/cidmoycppb8tbphsabws",
      exam_type: "midsem",
    },
    _id: "66a33ab45998c4467429a3fb",
    semester: 5,
    department: "core",
    createdAt: "2024-07-26T05:57:08.285Z",
    updatedAt: "2024-07-26T05:57:08.285Z",
    __v: 0,
  },
  {
    file: {
      avatar:
        "https://res.cloudinary.com/dkdxeiuxr/image/upload/v1721973430/exams/r8ckyll2khoridlsdczr.png",
      cloudinary_id: "exams/r8ckyll2khoridlsdczr",
      exam_type: "midsem",
    },
    _id: "66a33ab65998c4467429a3fd",
    semester: 4,
    department: "core",
    createdAt: "2024-07-26T05:57:10.977Z",
    updatedAt: "2024-07-26T05:57:10.977Z",
    __v: 0,
  },
  {
    file: {
      avatar:
        "https://res.cloudinary.com/dkdxeiuxr/image/upload/v1721973435/exams/x7whtwzhiyfgtihsfim2.png",
      cloudinary_id: "exams/x7whtwzhiyfgtihsfim2",
      exam_type: "midsem",
    },
    _id: "66a33abc5998c4467429a3ff",
    semester: 5,
    department: "ai",
    createdAt: "2024-07-26T05:57:16.083Z",
    updatedAt: "2024-07-26T05:57:16.083Z",
    __v: 0,
  },
  {
    file: {
      avatar:
        "https://res.cloudinary.com/dkdxeiuxr/image/upload/v1721973439/exams/xlpfixemhv9rtuuekcgn.png",
      cloudinary_id: "exams/xlpfixemhv9rtuuekcgn",
      exam_type: "midsem",
    },
    _id: "66a33ac05998c4467429a401",
    semester: 7,
    department: "ai",
    createdAt: "2024-07-26T05:57:20.116Z",
    updatedAt: "2024-07-26T05:57:20.116Z",
    __v: 0,
  },
  {
    file: {
      avatar:
        "https://res.cloudinary.com/dkdxeiuxr/image/upload/v1721973463/exams/t6tm0bpiixpvc1uztq13.png",
      cloudinary_id: "exams/t6tm0bpiixpvc1uztq13",
      exam_type: "endsem",
    },
    _id: "66a33ad75998c4467429a403",
    semester: 7,
    department: "ai",
    createdAt: "2024-07-26T05:57:43.860Z",
    updatedAt: "2024-07-26T05:57:43.860Z",
    __v: 0,
  },
  {
    file: {
      avatar:
        "https://res.cloudinary.com/dkdxeiuxr/image/upload/v1721973468/exams/f6dw03wvry48njjwguie.png",
      cloudinary_id: "exams/f6dw03wvry48njjwguie",
      exam_type: "endsem",
    },
    _id: "66a33adc5998c4467429a405",
    semester: 2,
    department: "ai",
    createdAt: "2024-07-26T05:57:48.699Z",
    updatedAt: "2024-07-26T05:57:48.699Z",
    __v: 0,
  },
]

const Exam = () => {
  const [sem, setSem] = useState("")
  const [dept, setDept] = useState("")
  const [pageData, setPageData] = useState<Array<ExamFilterData> | null>(null)
  const [filteredData, setFilteredData] = useState<Array<ExamFilterData> | null>(null)

  // const { data } = useSelector((state) => state?.exams)

  useEffect(() => {
    const pageDataSetter = () => {
      setPageData(data)
    }
    pageDataSetter()
  }, [])

  useEffect(() => {
    const changeData = () => {
      if (!dept || !sem || !pageData) return
      if (dept === "default" || sem === "default") setFilteredData(null)
      const filtered = pageData.filter(
        (i) => i?.department === dept && i?.semester === Number(sem)
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
