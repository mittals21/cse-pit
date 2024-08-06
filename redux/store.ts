import { configureStore } from "@reduxjs/toolkit"
import dataSlice from "./dataSlice"
import { TypedUseSelectorHook, useSelector } from "react-redux"

export const store = configureStore({
  reducer: {
    data: dataSlice,
  },
})

export type MyDispatch = typeof store.dispatch

export const MySelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
