import { createSlice } from "@reduxjs/toolkit"

const snackbarSlice = createSlice({
   name: "snackbar",
   initialState: {
      open: false,
      severity: "success",//error, success, warning
      message: "",
   },

   reducers: {
      openSuccessSnackbar: (state, action) => {
         state.open = true;
         state.severity = "success";
         state.message = action.payload;
      },
      openErrorSnackbar: (state, action) => {
         state.open = true;
         state.severity = "error";
         state.message = action.payload;
      },
      closeSnackbar: (state, action) => {
         state.open = false
      }
   }
})

// Action creators are generated for each case reducer function
export const { openSuccessSnackbar, openErrorSnackbar, closeSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer