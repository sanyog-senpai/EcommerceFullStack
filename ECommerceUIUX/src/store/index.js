import { configureStore } from '@reduxjs/toolkit'
import snackbarReducer from "./slices/snackbarSlices"

const store = configureStore({
   reducer: {
      snackbar: snackbarReducer,
   }
})

export default store;