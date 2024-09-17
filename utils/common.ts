export type dropdowns = {
  value: string
  name: string
}

export const uploadTypes: Array<dropdowns> = [
  { value: "circular", name: "Circular" },
  { value: "syllabus", name: "Syllabus" },
  { value: "exam", name: "Exam" },
  { value: "event", name: "Event" },
]

export const departments: Array<dropdowns> = [
  { value: "core", name: "CSE" },
  { value: "ai", name: "AI" },
  { value: "bda", name: "BDA" },
  { value: "cs", name: "CS" },
]

export const semesters: Array<dropdowns> = [
  { value: "1", name: "1st Semester" },
  { value: "2", name: "2nd Semester" },
  { value: "3", name: "3rd Semester" },
  { value: "4", name: "4th Semester" },
  { value: "5", name: "5th Semester" },
  { value: "6", name: "6th Semester" },
  { value: "7", name: "7th Semester" },
  { value: "8", name: "8th Semester" },
]

export const examTypes: Array<dropdowns> = [
  { value: "practical", name: "Practical" },
  { value: "midsem", name: "Midsem" },
  { value: "endsem", name: "Endsem" },
  { value: "remid", name: "Remid" },
  { value: "supplementary", name: "Supplementary" },
]

export const getDateString = (timestamp: string) => {
  const date = new Date(timestamp)
  const day = date.getUTCDate()
  const month = date.getUTCMonth() + 1
  const year = date.getUTCFullYear()
  return `${day}/${month}/${year}`
}
