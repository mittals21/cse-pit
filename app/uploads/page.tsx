"use client"
import Loader from "@/components/loader/Loader"
import UploadStudentSheet from "@/components/uploads/UploadStudentSheet"
import { allUploads } from "@/firebase"
import { getAllData } from "@/redux/dataSlice"
import { MyDispatch, MySelector } from "@/redux/store"
import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { IoMdCloudUpload } from "react-icons/io"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

const AllUploads = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<MyDispatch>()
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState<string>("")
  const [uploadType, setUploadType] = useState<string>("")
  const [department, setDepartment] = useState<string>("")
  const [semester, setSemester] = useState<string>("")
  const [apiCall, setApiCall] = useState<boolean>(false)
  const { data } = MySelector((state) => state.data)

  // For opening file manager
  const handleInput = () => {
    if (!inputRef) return
    inputRef.current && inputRef.current.click()
  }

  // For saving the selected file
  const handleFileUpload = (files: FileList | null) => {
    if (files?.length === 0) return
    setFile(files && files[0])
  }

  // For resetting the data on type change
  const handleUploadTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUploadType(e.target.value)
    setFile(null)
    setName("")
    if (e.target.value === "circular") {
      setDepartment("")
    }
  }

  // For uploading data
  const upload = async () => {
    setApiCall(true)
    const newData =
      uploadType === "circular"
        ? { file, name, for: semester }
        : uploadType === "syllabus"
        ? { file, subject: name, semester, department }
        : null

    const res = await allUploads(uploadType, newData, data)

    if (res === "Done") {
      dispatch(getAllData())
      toast.success("File uploaded successfully")
    }
    // setUploadType("")
    // setDepartment("")
    // setSemester("")
    setApiCall(false)
    setFile(null)
    setName("")
  }

  // For clearing the department value if circular is selected
  useEffect(() => {
    if (uploadType === "circular") {
      setDepartment("")
    }
  }, [uploadType])

  return (
    <div className="px-60 my-[100px] ">
      <div className="flex-1">
        <div>
          <div>
            <select
              onChange={handleUploadTypeChange}
              value={uploadType}
              className="bg-transparent rounded-lg border-[2px] my-2 cursor-pointer outline-none py-2 pl-2 border-my-green"
            >
              <option value="">---Select Type---</option>
              <option value="syllabus">Syllabus</option>
              <option value="circular">Circular</option>
            </select>
          </div>
          <div>
            {uploadType === "syllabus" && (
              <div>
                <select
                  onChange={(e) => setDepartment(e.target.value)}
                  value={department}
                  className="bg-transparent rounded-lg border-[2px] my-2 cursor-pointer outline-none py-2 pl-2 border-my-green"
                >
                  <option value="">---Select Department---</option>
                  <option value="core">CSE</option>
                  <option value="ai">AI</option>
                </select>
                {department && (
                  <select
                    onChange={(e) => setSemester(e.target.value)}
                    value={semester}
                    className="bg-transparent rounded-lg border-[2px] my-2 cursor-pointer outline-none py-2 pl-2 border-my-green"
                  >
                    <option value="">---Select Semester---</option>
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                    <option value="3">3rd Semester</option>
                    <option value="4">4th Semester</option>
                    <option value="5">5th Semester</option>
                    <option value="6">6th Semester</option>
                    <option value="7">7th Semester</option>
                    <option value="8">8th Semester</option>
                  </select>
                )}
              </div>
            )}
            <div>
              {uploadType === "circular" && (
                <select
                  onChange={(e) => setSemester(e.target.value)}
                  value={semester}
                  className="bg-transparent rounded-lg border-[2px] my-2 cursor-pointer outline-none py-2 pl-2 border-my-green"
                >
                  <option value="semester">---Select Semester---</option>
                  <option value="all">All Semesters</option>
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                  <option value="3">3rd Semester</option>
                  <option value="4">4th Semester</option>
                  <option value="5">5th Semester</option>
                  <option value="6">6th Semester</option>
                  <option value="7">7th Semester</option>
                  <option value="8">8th Semester</option>
                </select>
              )}
            </div>
          </div>
          <div
            className="rounded-md bg-blue-50 py-5 border-dashed border-my-green border-[2px]"
            onClick={handleInput}
          >
            <div className="text-[60px] flex justify-center items-center text-my-green ">
              <IoMdCloudUpload />
            </div>
            <p className="text-center">{file ? file.name : "Upload a File"}</p>

            <input
              type="file"
              accept=".pdf"
              placeholder="Upload"
              className="hidden"
              onChange={(e) => {
                handleFileUpload(e.target.files)
              }}
              ref={inputRef}
            />
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="File Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border-[2px] outline-none my-2 py-1.5 px-3 border-my-green"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={upload}
            className={`${
              !file ||
              !name ||
              !uploadType ||
              (uploadType === "syllabus" && !department) ||
              !semester
                ? "bg-my-green/20 text-black cursor-not-allowed"
                : "bg-my-green text-white cursor-pointer"
            } rounded-lg px-[20px] py-[8px] flex justify-center `}
            disabled={
              !file ||
              !name ||
              !uploadType ||
              (uploadType === "syllabus" && !department) ||
              !semester
            }
          >
            {apiCall ? <Loader /> : "Upload"}
          </button>
        </div>
      </div>

      <div className="mt-20">
        <UploadStudentSheet />
      </div>
    </div>
  )
}

export default AllUploads
