"use client"
import React, { useEffect, useRef, useState } from "react"
import { MdOutlineArrowDropDown } from "react-icons/md"
import Loader from "@/components/loader/Loader"
import StudentRow from "@/components/students/StudentRow"
import { MySelector } from "@/redux/store"
import { StudentData } from "@/utils/type"
import { toast } from "react-toastify"
import UploadStudentSheet from "@/components/uploads/UploadStudentSheet"

const StudentTable = () => {
  const tableRef = useRef<HTMLDivElement>(null)
  const { data, host } = MySelector((state) => state?.data)
  const [feeType, setFeeType] = useState<string>("tuition")
  const [sendEmailTo, setSendEmailTo] = useState<Array<StudentData>>([])
  const [showDropDown, setShowDropDown] = useState<boolean>(false)
  const [emailIsSent, setEmailIsSent] = useState<boolean>(false)
  const [pageData, setPageData] = useState<Array<StudentData> | null>(null)
  const [apiCall, setApiCall] = useState<boolean>(false)

  const DropDown = () => (
    <div className="hidden absolute right-16 top-8 p-2 border border-my-green rounded-md lg:flex flex-col gap-[5px] text-xl bg-white shadow-2xl shadow-black">
      <p
        onClick={() => {
          setFeeType("tuition")
          setShowDropDown(false)
        }}
        className="border-b  px-6 py-3 cursor-pointer"
      >
        Tuition Fees
      </p>
      <p
        onClick={() => {
          setFeeType("bus")
          setShowDropDown(false)
        }}
        className="border-b  px-6 py-3 cursor-pointer"
      >
        Bus Fees
      </p>
      <p
        onClick={() => {
          setFeeType("hostel")
          setShowDropDown(false)
        }}
        className="px-6 py-3 cursor-pointer"
      >
        Hostel Fees
      </p>
    </div>
  )

  const updateMaxHeightNotif = () => {
    if (tableRef.current) {
      const distanceFromTop = tableRef.current.getBoundingClientRect().top
      const screenHeight = window.innerHeight
      const maxHeight = screenHeight - distanceFromTop - 100
      tableRef.current.style.maxHeight = `${maxHeight}px`
    }
  }

  const sendEmail = async () => {
    setApiCall(true)

    const response = await fetch("/api/nodemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feesType: feeType,
        students: sendEmailTo,
      }),
    })

    setSendEmailTo([])
    setEmailIsSent(true)
    setApiCall(false)
    if (!response?.ok) {
      throw new Error(`HTTP error! Status: ${response?.status}`)
    }
    const data = await response.json()
    toast.success(data?.message)
  }

  useEffect(() => {
    const pageDataSetter = () => {
      if (!data) return
      setPageData(data?.students)
    }
    pageDataSetter()
  }, [data])

  useEffect(() => {
    const changePage = () => {
      if (!host) return
      if (host !== "admin") window.location.href = "/"
    }
    changePage()
  }, [host])

  useEffect(() => {
    updateMaxHeightNotif()
    window.addEventListener("resize", updateMaxHeightNotif)

    return () => {
      window.removeEventListener("resize", updateMaxHeightNotif)
    }
  }, [])

  return (
    <div
      ref={tableRef}
      className="mx-5 my-[100px] tracking-wide relative border-[2px] overflow-y-scroll border-my-green rounded-md "
    >
      <div className="">
        <UploadStudentSheet />
      </div>
      <div className="sticky bg-white top-0 px-2 pt-2">
        <div
          className="grid font-medium text-xl xl:text-2xl text-center capitalize mb-2 relative"
          style={{ gridTemplateColumns: "auto 1fr 1fr 1fr 1fr 1fr" }}
        >
          <p className="w-[50px]">#</p>
          <p>Name</p>
          <p className="hidden xl:block">Enrollment Number</p>
          <p className="xl:hidden">Er. No.</p>
          <p>Phone Number</p>
          <p>Division</p>
          <p
            className="flex justify-center items-center cursor-pointer"
            onClick={() => setShowDropDown(!showDropDown)}
          >
            {feeType} Fees{" "}
            <span>
              <MdOutlineArrowDropDown size={23} />
            </span>
          </p>
          {showDropDown && <DropDown />}
        </div>

        <div
          className="grid pb-2 font-medium text-lg xl:text-xl text-center h-fit capitalize xl:mb-4 border-b-my-green border-b"
          style={{ gridTemplateColumns: "auto 1fr 1fr 1fr 1fr 1fr" }}
        >
          <p className="w-[50px] invisible h-fit">#</p>
          <p className="invisible h-fit">Name</p>
          <p className="invisible h-fit">Er. No.</p>
          <p className="invisible h-fit">Ph No.</p>
          <p className="invisible h-fit">Division</p>
          <div
            className="grid border-t border-t-my-green pt-1 h-fit"
            style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
          >
            <p className="min-w-[100px] h-fit">Total</p>
            <p className="min-w-[100px] h-fit">Paid</p>
            <p className="min-w-[100px] h-fit">Pending</p>
          </div>
        </div>
      </div>

      <div className="py-2">
        <div className="mb-[4px]">
          {pageData && pageData?.length > 0 ? (
            pageData?.map((e: StudentData, i: number) => (
              <StudentRow
                e={e}
                i={i}
                feeType={feeType}
                key={i}
                setSendEmailTo={setSendEmailTo}
                sendEmailTo={sendEmailTo}
                emailIsSent={emailIsSent}
                setEmailIsSent={setEmailIsSent}
              />
            ))
          ) : (
            <p className="text-center text-2xl font-medium pb-6 pt-3">
              No Data to Show
            </p>
          )}
        </div>
        {sendEmailTo?.length > 0 && (
          <div className="flex sticky bottom-0 justify-end mr-3">
            <button
              onClick={sendEmail}
              className={`bg-my-green cursor-pointer text-white text-xl rounded-lg px-[30px] py-[12px] flex justify-center `}
            >
              {apiCall ? <Loader /> : `Send Email [${sendEmailTo.length}]`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentTable
