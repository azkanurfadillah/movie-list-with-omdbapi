import { configureStore } from '@reduxjs/toolkit'
import movieSlice from './features/movie';

export default configureStore({
  reducer: {
    movies: movieSlice
  }
})

