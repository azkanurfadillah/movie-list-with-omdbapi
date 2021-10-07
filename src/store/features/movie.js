import { createSlice } from "@reduxjs/toolkit";
import { GetMovies } from "../services";

export const initialState = {
    movies: [],
    loading: false,
    error: null,
};

export const movieSlice = createSlice({
    name: "movie",
    initialState: initialState,
    extraReducers: {
        [GetMovies.fulfilled]: (state, action) => {
            console.log({ action })
            state.movies = action.payload.data;
        },
        [GetMovies.rejected]: (state, action) => {
            state.movies = [];
        },

    },
});

export default movieSlice.reducer;