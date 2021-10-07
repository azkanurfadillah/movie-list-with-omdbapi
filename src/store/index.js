import { configureStore } from '@reduxjs/toolkit'
import movieSlice from './features/movie';
import { combineReducers } from "redux";
import thunk from "redux-thunk";


// const reducers = combineReducers({
//   metamask: metamaskSlice
// });


export default configureStore({
  reducer: {
    movies: movieSlice
  }
})

