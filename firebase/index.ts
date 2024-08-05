import { doc, updateDoc } from "firebase/firestore"
import { firestore } from "./config"
import * as xlsx from "xlsx"
import { StudentData } from "@/utils/type"

const docRef = doc(firestore, "cse", "pit")

export const uploadExcelSheet = async (file: File | null) => {
  try {
    if (!file) return "No File Uploaded"

    let data: any = []

    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      const workbook = xlsx.read(e.target?.result, { type: "binary" })
      const sheets = workbook.SheetNames
      for (let i = 0; i < sheets.length; i++) {
        const temp = xlsx.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[i]]
        )
        console.log(temp)
        const headers:any = temp[0]
        temp.forEach(async (row: any) => {
          let rowData: any = {}
          row.forEach(async (e: any, i: any) => {
            rowData[headers[i]] = e
          })
          data.push(rowData)
        })
      }
    }
    fileReader.readAsBinaryString(file)
    fileReader.DONE
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
