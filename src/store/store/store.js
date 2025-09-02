// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'; // .js extension
import themeReducer from '../slices/themeSlice'; // .js extension
import adminReducer from '../slices/adminSlice'; // .js extension

export default configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    admin: adminReducer,
  },
});