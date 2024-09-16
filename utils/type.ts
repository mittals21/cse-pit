export type NavbarRoutes = { title: string; path: string }

export type ExamFilterData = {
  file: string
  id: string
  semester: string
  department: string
  createdAt: string
  updatedAt: string
  examType: string
}

export type SyllabusData = {
  file: string
  id: string
  semester: string
  department: string
  subject: string
  createdAt: string
  updatedAt: string
}

export type CircularData = {
  file: string
  id: string
  for: string
  name: string
  createdAt: string
  updatedAt: string
}

export type StudentData = {
  id: string
  name: string
  enrollment: number
  contact: number
  email: string
  division: string
  fees: {
    tuition: {
      total: number
      paid: number
      pending: number
    }
    hostel: {
      total: number
      paid: number
      pending: number
    }
    bus: {
      total: number
      paid: number
      pending: number
    }
  }
}

export type CircularUpload = {
  file: File | null
  name: string
  for: string
}
export type SyllabusUpload = {
  file: File | null
  subject: string
  semester: string
  department: string
}

export type ExamUpload = {
  file: File | null
  examType: string
  semester: string
  department: string
}

export type EventUpload = {
  file: File | null
  name: string
  link: string
  coordinator: string
  deadline?: string
}

export type AllUploads =
  | CircularUpload
  | SyllabusUpload
  | ExamUpload
  | EventUpload
