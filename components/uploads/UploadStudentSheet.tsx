import React, { useRef, useState } from "react"
import { IoMdCloudUpload } from "react-icons/io"
import { uploadExcelSheet } from "@/firebase"
import { toast } from "react-toastify"
import { getAllData } from "@/redux/dataSlice"
import { FaCheck } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { MyDispatch } from "@/redux/store"

const UploadStudentSheet = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<MyDispatch>()
  const [excelFile, setExcelFile] = useState<File | null>(null)

  const handleFileUpload = (files: FileList | null) => {
    if (files?.length === 0) return
    setExcelFile(files && files[0])
  }

  const handleInput = () => {
    if (!inputRef) return
    inputRef.current && inputRef.current.click()
  }

  const upload = () => {
    uploadExcelSheet(excelFile)
    setExcelFile(null)
    dispatch(getAllData())
    toast.success("File uploaded successfully")
  }

  return (
    <div className="flex-1">
      <div
        className="rounded-md bg-blue-50 py-5 border-dashed border-my-green border-[2px]"
        onClick={handleInput}
      >
        {excelFile ? (
          <div className="text-[60px] flex justify-center items-center text-my-green">
            <FaCheck />
          </div>
        ) : (
          <div className="text-[60px] flex justify-center items-center text-my-green/70">
            <IoMdCloudUpload />
          </div>
        )}
        <p className="text-center">
          {excelFile ? excelFile.name : "Upload students sheet"}
        </p>
        <input
          type="file"
          accept=".xlsx,.xls,.xlsm,.ods,.ots,.xlsb,.xltx"
          placeholder="Upload"
          className="hidden"
          ref={inputRef}
          onChange={(e) => handleFileUpload(e.target.files)}
        />
      </div>
      <div className="flex justify-end my-2">
        <button
          onClick={upload}
          className={`${
            excelFile === null
              ? "bg-my-green/20 text-black cursor-not-allowed"
              : "bg-my-green text-white cursor-pointer"
          } rounded-lg px-[20px] py-[8px] flex justify-center`}
          disabled={excelFile === null}
        >
          Upload
        </button>
      </div>
    </div>
  )
}

export default UploadStudentSheet
