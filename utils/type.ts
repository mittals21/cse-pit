export type NavbarRoutes = { title: string; path: string }

export type ExamFilterData = {
  file: {
    avatar: string
    cloudinary_id: string
    exam_type: string
  }
  _id: string
  semester: number
  department: string
  createdAt: string
  updatedAt: string
  __v: number
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

export type AllUploads = CircularUpload | SyllabusUpload
