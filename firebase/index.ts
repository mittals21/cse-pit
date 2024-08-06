import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore"
import { firestore, storage } from "./config"
import * as xlsx from "xlsx"
import { AllUploads } from "@/utils/type"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

const docRef = doc(firestore, "cse", "pit")

export const uploadExcelSheet = (file: File | null) => {
  if (!file) {
    console.log("No File Uploaded")
    return
  }

  const fileReader = new FileReader()

  fileReader.onload = async (e) => {
    try {
      const workbook = xlsx.read(e.target?.result, { type: "array" })
      const sheets = workbook.SheetNames
      let data: Array<any> = []

      for (let i = 0; i < sheets.length; i++) {
        const temp = xlsx.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[i]]
        )
        data = [...temp]
      }

      // console.log("Processed Data:", data)

      const students = data?.map((d) => ({
        name: d?.Name,
        enrollment: d["Enrollment Number"],
        contact: d?.Contact,
        email: d?.Email,
        division: d?.Division,
        fees: {
          tuition: {
            total: d["Total Tuition Fees"] || 0,
            paid: d["Paid Tuition Fees"] || 0,
            pending: d["Pending Tuition Fees"] || 0,
          },
          hostel: {
            total: d["Total Hostel Fees"] || 0,
            paid: d["Paid Hostel Fees"] || 0,
            pending: d["Pending Hostel Fees"] || 0,
          },
          bus: {
            total: d["Total Bus Fees"] || 0,
            paid: d["Paid Bus Fees"] || 0,
            pending: d["Pending Bus Fees"] || 0,
          },
        },
      }))

      // console.log(studentData)

      await updateDoc(docRef, { students })
      return "Done"
    } catch (error) {
      console.error("Error processing file:", error)
    }
  }

  fileReader.onerror = (error) => {
    console.error("FileReader error:", error)
  }

  fileReader.readAsArrayBuffer(file)
}

export const getData = async () => {
  try {
    const snap = await getDoc(docRef)
    return snap.data()
  } catch (error) {
    console.log(error)
  }
}

export const allUploads = async (
  type: string,
  data: AllUploads | null,
  oldData: any
) => {
  try {
    if (!data || !data.file) return "No Data Found"
    const storageRef = ref(storage, type)

    const upload = await uploadBytes(storageRef, data.file)
    const fileUrl = await getDownloadURL(upload.ref)

    await updateDoc(docRef, {
      [type]: oldData[type]
        ? [...oldData[type], { ...data, file: fileUrl }]
        : [{ ...data, file: fileUrl }],
    })

    return "Done"
  } catch (error) {
    console.log(error)
  }
}


