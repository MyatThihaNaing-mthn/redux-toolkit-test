import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = { cartIsVisible: false }
const uiSlice = createSlice({
    name: "ui",
    initialState: uiInitialState,
    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible
        }
    }
})

export default uiSlice
export const uiActions = uiSlice.actions