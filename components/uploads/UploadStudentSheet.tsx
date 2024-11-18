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
    <div>
      <input
        type="file"
        accept=".xlsx,.xls,.xlsm,.ods,.ots,.xlsb,.xltx,.numbers"
        placeholder="Upload"
        className="hidden"
        ref={inputRef}
        onChange={(e) => handleFileUpload(e.target.files)}
      />
      <div className="flex justify-end mt-2 mr-2">
        {excelFile === null ? (
          <button
            onClick={handleInput}
            className="bg-my-green/20 text-black cursor-pointer rounded-lg px-[20px] py-[8px] flex justify-center"
          >
            Select New Students Sheet
          </button>
        ) : (
          <button
            onClick={upload}
            className="bg-my-green text-white cursor-pointer rounded-lg px-[20px] py-[8px] flex justify-center"
          >
            Upload
          </button>
        )}
      </div>
    </div>
  )
}

export default UploadStudentSheet
