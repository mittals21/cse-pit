import { doc, updateDoc } from "firebase/firestore"
import { firestore } from "./config"
import * as xlsx from "xlsx"

const docRef = doc(firestore, "cse", "pit")

export const uploadExcelSheet = (file: File | null) => {
  if (!file) {
    console.log("No File Uploaded")
    return
  }

  const fileReader = new FileReader()

  fileReader.onload = (e) => {
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

      console.log("Processed Data:", data)
    } catch (error) {
      console.error("Error processing file:", error)
    }
  }

  fileReader.onerror = (error) => {
    console.error("FileReader error:", error)
  }

  fileReader.readAsArrayBuffer(file)
}
