import { getData } from "@/firebase"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

// Get All Data
export const getAllData = createAsyncThunk(
  "getAllData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData()
      return response
    } catch (error: any) {
      return rejectWithValue(error.response)
    }
  }
)

const initialState: {
  status: string
  data: any
  error: any
} = {
  data: [],
  status: "",
  error: null,
}
const data = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Data
    builder.addCase(getAllData.pending, (state) => {
      state.status = "getting_data"
    })
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = "success_getting_data"
    })
    builder.addCase(getAllData.rejected, (state, action) => {
      toast.error("Error Fetching Data")
      state.error = action.payload
      state.status = "Failed"
    })
  },
})

export default data.reducer
