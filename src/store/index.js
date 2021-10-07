import { configureStore } from '@reduxjs/toolkit'
import movieSlice from './features/movie';
// import { combineReducers } from "redux";
// import thunk from "redux-thunk";


export default configureStore({
  reducer: {
    movies: movieSlice
  }
})

