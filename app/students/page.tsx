"use client"
import React, { useEffect, useRef, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { sendEmailStudents } from "../redux/StudentSlice"
import { MdOutlineArrowDropDown } from "react-icons/md"
import Loader from "@/components/loader/Loader"
import StudentRow from "@/components/students/StudentRow"

const StudentTable = () => {
  // const dispatch = useDispatch()
  const tableRef = useRef<HTMLDivElement>(null)
  // const { data } = useSelector((state) => state?.students)
  const [feeType, setFeeType] = useState<string>("tuition")
  const [sendEmailTo, setSendEmailTo] = useState<any>([])
  const [showDropDown, setShowDropDown] = useState<boolean>(false)
  const [emailIsSent, setEmailIsSent] = useState<boolean>(false)
  const data:any = []

  // const { loading, status } = useSelector((state) => state?.students)

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
      <div className="sticky bg-white top-0 px-2 pt-2">
        <div
          className="grid font-medium text-2xl text-center capitalize mb-2 relative"
          style={{ gridTemplateColumns: "auto 1fr 1fr 1fr 1fr 1fr" }}
        >
          <p className="w-[50px]">#</p>
          <p>Name</p>
          <p>Enrollment Number</p>
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
          className="grid pb-2 font-medium text-xl text-center capitalize mb-4 border-b-my-green border-b"
          style={{ gridTemplateColumns: "auto 1fr 1fr 1fr 1fr 1fr" }}
        >
          <p className="w-[50px] invisible">#</p>
          <p className="invisible">Name</p>
          <p className="invisible">Enrollment Number</p>
          <p className="invisible">Phone Number</p>
          <p className="invisible">Division</p>
          <div
            className="grid border-t border-t-my-green pt-1"
            style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
          >
            <p className="min-w-[100px]">Total</p>
            <p className="min-w-[100px]">Paid</p>
            <p className="min-w-[100px]">Pending</p>
          </div>
        </div>
      </div>

      <div className="py-2">
        <div className="mb-[4px]">
          {data && data?.length > 0 ? (
            data?.map((e:any, i:any) => (
              <StudentRow
                e={e}
                i={i}
                feeType={feeType}
                key={e?._id}
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
              onClick={() => {
                // dispatch(
                //   sendEmailStudents({ type: feeType, students: sendEmailTo })
                // )
                setSendEmailTo([])
                setEmailIsSent(true)
              }}
              className={`bg-my-green cursor-pointer text-white text-xl rounded-lg px-[30px] py-[12px] flex justify-center `}
            >
              {/* {status === "sending_email" && loading ? (
                <Loader />
              ) : (
                `Send Email [${sendEmailTo.length}]`
              )} */}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentTable
