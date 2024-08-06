import { getData } from "@/firebase"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

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
  loading: boolean
  data: any
  error: any
} = {
  data: [],
  status: "",
  loading: false,
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
      state.loading = true
    })
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = "success_getting_data"
      state.loading = false
    })
    builder.addCase(getAllData.rejected, (state, action) => {
      // toast.error("Error Fetching Circulars")
      state.error = action.payload
      state.loading = false
      state.status = "Failed"
    })
  },
})

export default data.reducer
