"use client"
import Loader from "@/components/loader/Loader"
import UploadStudentSheet from "@/components/uploads/UploadStudentSheet"
import { FaCheck } from "react-icons/fa"
import { allUploads, uploadEventImage } from "@/firebase"
import { getAllData } from "@/redux/dataSlice"
import { MyDispatch, MySelector } from "@/redux/store"
import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { IoMdCloudUpload } from "react-icons/io"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
  departments,
  dropdowns,
  examTypes,
  semesters,
  uploadTypes,
} from "@/utils/common"

const AllUploads = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const eventImageRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<MyDispatch>()
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState<string>("")
  const [uploadType, setUploadType] = useState<string>("")
  const [department, setDepartment] = useState<string>("")
  const [semester, setSemester] = useState<string>("")
  const [examType, setExamType] = useState<string>("")
  const [apiCall, setApiCall] = useState<boolean>(false)
  const [eventData, setEventData] = useState<{
    image: File | null
    link: string
    coordinator: string
    deadline?: string
  }>({ link: "", coordinator: "", deadline: "", image: null })
  const { data, host } = MySelector((state) => state.data)

  // For opening file manager
  const handleInput = () => {
    if (!inputRef) return
    inputRef.current && inputRef.current.click()
  }

  // For opening file manager for evetn image
  const handleEventImage = () => {
    if (!eventImageRef) return
    eventImageRef.current && eventImageRef.current.click()
  }

  // For saving the selected file
  const handleFileUpload = (files: FileList | null) => {
    if (files?.length === 0) return
    setFile(files && files[0])
  }

  // For saving the selected file event image
  const handleEventImageUpload = (files: FileList | null) => {
    if (files?.length === 0) return
    setEventData((prev) => ({ ...prev, image: files && files[0] }))
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

  // active upload logic
  const notAllowUpload = () => {
    if (!uploadType || !name || !file) return true
    if (uploadType === "syllabus" && !department) return true
    if (uploadType === "event") {
      if (!eventData?.link || !eventData?.coordinator || !eventData?.image)
        return true
    } else {
      if (!semester) return true
    }

    return false
  }

  // For uploading data
  const upload = async () => {
    setApiCall(true)
    let imageUrl: string | undefined = ""
    if (uploadType === "event") {
      imageUrl = await uploadEventImage(eventData?.image)
      if (!imageUrl) return
    }
    const newData =
      uploadType === "circular"
        ? { file, name, for: semester }
        : uploadType === "syllabus"
        ? { file, subject: name, semester, department }
        : uploadType === "exam"
        ? { file, semester, department, examType }
        : uploadType === "event"
        ? {
            file,
            name,
            link: eventData?.link,
            coordinator: eventData?.coordinator,
            deadline: eventData?.deadline,
            image: imageUrl,
          }
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
    setEventData({ link: "", coordinator: "", deadline: "", image: null })
  }

  // For clearing the department value if circular is selected
  useEffect(() => {
    if (uploadType === "circular") {
      setDepartment("")
    }
  }, [uploadType])

  useEffect(() => {
    const changePage = () => {
      if (!host) return
      if (host !== "admin") window.location.href = "/"
    }
    changePage()
  }, [host])

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
              {uploadTypes?.map((ut: dropdowns) => (
                <option key={ut?.value} value={ut?.value}>
                  {ut?.name}
                </option>
              ))}
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
                  {departments?.map((d: dropdowns) => (
                    <option key={d?.value} value={d?.value}>
                      {d?.name}
                    </option>
                  ))}
                </select>
                {department && (
                  <select
                    onChange={(e) => setSemester(e.target.value)}
                    value={semester}
                    className="bg-transparent rounded-lg border-[2px] my-2 cursor-pointer outline-none py-2 pl-2 border-my-green"
                  >
                    <option value="">---Select Semester---</option>
                    {semesters?.map((s: dropdowns) => (
                      <option key={s?.value} value={s?.value}>
                        {s?.name}
                      </option>
                    ))}
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
                  {semesters?.map((s: dropdowns) => (
                    <option key={s?.value} value={s?.value}>
                      {s?.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {uploadType === "exam" && (
              <div>
                <select
                  onChange={(e) => setDepartment(e.target.value)}
                  value={department}
                  className="bg-transparent rounded-lg border-[2px] my-2 cursor-pointer outline-none py-2 pl-2 border-my-green"
                >
                  <option value="">---Select Department---</option>
                  {departments?.map((d: dropdowns) => (
                    <option key={d?.value} value={d?.value}>
                      {d?.name}
                    </option>
                  ))}
                </select>
                {department && (
                  <select
                    onChange={(e) => setSemester(e.target.value)}
                    value={semester}
                    className="bg-transparent rounded-lg border-[2px] my-2 cursor-pointer outline-none py-2 pl-2 border-my-green"
                  >
                    <option value="">---Select Semester---</option>
                    <option value="all">All Semesters</option>
                    {semesters?.map((s: dropdowns) => (
                      <option key={s?.value} value={s?.value}>
                        {s?.name}
                      </option>
                    ))}
                  </select>
                )}
                {semester && (
                  <select
                    onChange={(e) => setExamType(e.target.value)}
                    value={examType}
                    className="bg-transparent rounded-lg border-[2px] my-2 cursor-pointer outline-none py-2 pl-2 border-my-green"
                  >
                    <option value="">---Select Exam Type---</option>
                    {examTypes?.map((et: dropdowns) => (
                      <option key={et?.value} value={et?.value}>
                        {et?.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-5">
            <div
              className="rounded-md bg-blue-50 py-5 border-dashed border-my-green border-[2px] w-full"
              onClick={handleInput}
            >
              {file ? (
                <div className="text-[60px] flex justify-center items-center text-my-green">
                  <FaCheck />
                </div>
              ) : (
                <div className="text-[60px] flex justify-center items-center text-my-green/70">
                  <IoMdCloudUpload />
                </div>
              )}
              <p className="text-center">
                {file
                  ? file.name
                  : uploadType === "event"
                  ? "Upload Description"
                  : "Upload a File"}
              </p>

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

            <div
              className={`rounded-md bg-blue-50 py-5 border-dashed border-my-green border-[2px] w-full ${
                uploadType === "event" ? "block" : "hidden"
              }`}
              onClick={handleEventImage}
            >
              {eventData?.image ? (
                <div className="text-[60px] flex justify-center items-center text-my-green">
                  <FaCheck />
                </div>
              ) : (
                <div className="text-[60px] flex justify-center items-center text-my-green/70">
                  <IoMdCloudUpload />
                </div>
              )}
              <p className="text-center">
                {eventData?.image
                  ? eventData?.image?.name
                  : "Upload Event Image"}
              </p>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
                placeholder="Upload"
                className="hidden"
                onChange={(e) => {
                  handleEventImageUpload(e.target.files)
                }}
                ref={eventImageRef}
              />
            </div>
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
          {uploadType === "event" && (
            <>
              <input
                type="text"
                placeholder="Registration Link"
                value={eventData?.link}
                onChange={(e) =>
                  setEventData((prev) => ({ ...prev, link: e.target.value }))
                }
                className="w-full rounded-lg border-[2px] outline-none my-2 py-1.5 px-3 border-my-green"
              />
              <input
                type="text"
                placeholder="Coordinator Name"
                value={eventData?.coordinator}
                onChange={(e) =>
                  setEventData((prev) => ({
                    ...prev,
                    coordinator: e.target.value,
                  }))
                }
                className="w-full rounded-lg border-[2px] outline-none my-2 py-1.5 px-3 border-my-green"
              />
              <input
                type="date"
                placeholder="Deadline"
                value={eventData?.deadline}
                onChange={(e) =>
                  setEventData((prev) => ({
                    ...prev,
                    deadline: e.target.value,
                  }))
                }
                className="w-full rounded-lg border-[2px] outline-none my-2 py-1.5 px-3 border-my-green"
              />
            </>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={upload}
            className={`${
              notAllowUpload()
                ? "bg-my-green/20 text-black cursor-not-allowed"
                : "bg-my-green text-white cursor-pointer"
            } rounded-lg px-[20px] py-[8px] flex justify-center `}
            disabled={notAllowUpload()}
          >
            {apiCall ? <Loader /> : "Upload"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AllUploads
