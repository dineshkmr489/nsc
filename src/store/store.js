// store/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import themeReducer from './slices/themeSlice'
import adminReducer from './slices/adminSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    admins: adminReducer,
  },
})