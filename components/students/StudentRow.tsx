import React, { Dispatch, useEffect, useState } from "react"
import { LiaRupeeSignSolid } from "react-icons/lia"
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md"
import { MdOutlineCheckBox } from "react-icons/md"

const StudentRow = ({
  e,
  i,
  feeType,
  setSendEmailTo,
  sendEmailTo,
  emailIsSent,
  setEmailIsSent,
}: {
  e: any
  i: number
  feeType: any
  setSendEmailTo: Dispatch<any>
  sendEmailTo: any
  emailIsSent: boolean
  setEmailIsSent: Dispatch<boolean>
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    if (isSelected) {
      setSendEmailTo((prev: any) => [...prev, e])
    } else {
      const newData = Array.from(sendEmailTo).filter((d: any) => d.id !== e.id)
      setSendEmailTo(newData)
    }
  }, [isSelected])

  useEffect(() => {
    if (emailIsSent) {
      setIsSelected(false)
      setEmailIsSent(false)
    }
  }, [emailIsSent])

  return (
    <div
      className={`grid text-lg items-center text-center capitalize cursor-pointer border-b py-1 mx-2 ${
        isHovered && "shadow-sm shadow-black/60"
      } ${isSelected && "bg-my-green text-white"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsSelected(!isSelected)}
      style={{ gridTemplateColumns: "auto 1fr 1fr 1fr 1fr 1fr" }}
    >
      {isSelected ? (
        <div className="w-[50px] pl-3">
          <MdOutlineCheckBox size={23} />
        </div>
      ) : (
        <div>
          {isHovered ? (
            <div className="w-[50px] pl-3">
              <MdOutlineCheckBoxOutlineBlank size={23} />
            </div>
          ) : (
            <p className="w-[50px]">{i + 1}</p>
          )}
        </div>
      )}
      <p>{e?.name}</p>
      <p>{e?.enrollment}</p>
      <p>{e?.contact}</p>
      <p>{e?.division}</p>
      <div className="grid " style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
        <p className="flex items-center  pl-[10px] min-w-[100px]">
          <LiaRupeeSignSolid />
          {e?.fees[feeType]?.total || 0}
        </p>
        <p className="flex items-center  pl-[10px] min-w-[100px]">
          <LiaRupeeSignSolid />
          {e?.fees[feeType]?.paid || 0}
        </p>
        <p className="flex items-center  pl-[15px] min-w-[100px]">
          <LiaRupeeSignSolid />
          {e?.fees[feeType]?.pending || 0}
        </p>
      </div>
    </div>
  )
}

export default StudentRow
